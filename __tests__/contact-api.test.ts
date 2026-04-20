import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the resend module before importing the route
vi.mock("@/lib/resend", () => ({
  getResend: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";
import { getResend } from "@/lib/resend";

const mockSend = vi.fn();

function makeRequest(body: Record<string, unknown>) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getResend).mockReturnValue({ emails: { send: mockSend } } as never);
  // Default: reCAPTCHA passes
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true, score: 0.9 }),
    })
  );
});

describe("POST /api/contact", () => {
  describe("validation", () => {
    it("returns 400 when name is missing", async () => {
      const res = await POST(makeRequest({ email: "a@b.com", message: "Hello" }));
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/required/i);
    });

    it("returns 400 when email is missing", async () => {
      const res = await POST(makeRequest({ name: "Jane", message: "Hello" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 when message is missing", async () => {
      const res = await POST(makeRequest({ name: "Jane", email: "a@b.com" }));
      expect(res.status).toBe(400);
    });

    it("returns 400 for invalid email format", async () => {
      const res = await POST(makeRequest({ name: "Jane", email: "not-an-email", message: "Hi" }));
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/valid email/i);
    });
  });

  describe("reCAPTCHA", () => {
    it("returns 400 when reCAPTCHA score is too low", async () => {
      process.env.RECAPTCHA_SECRET_KEY = "test-secret";
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          json: () => Promise.resolve({ success: true, score: 0.2 }),
        })
      );

      const res = await POST(
        makeRequest({ name: "Jane", email: "a@b.com", message: "Hi", recaptchaToken: "bad-token" })
      );
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toMatch(/recaptcha/i);

      delete process.env.RECAPTCHA_SECRET_KEY;
    });

    it("skips reCAPTCHA when no secret key is configured", async () => {
      delete process.env.RECAPTCHA_SECRET_KEY;
      mockSend.mockResolvedValue({ data: { id: "msg_1" }, error: null });

      const res = await POST(
        makeRequest({ name: "Jane", email: "a@b.com", message: "Hi", recaptchaToken: "any-token" })
      );
      expect(res.status).toBe(200);
    });
  });

  describe("successful submission", () => {
    beforeEach(() => {
      delete process.env.RECAPTCHA_SECRET_KEY;
      mockSend.mockResolvedValue({ data: { id: "msg_123" }, error: null });
    });

    it("returns 200 with id on success", async () => {
      const res = await POST(
        makeRequest({ name: "Jane", email: "jane@example.com", message: "Hello there" })
      );
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.success).toBe(true);
      expect(body.id).toBe("msg_123");
    });

    it("sends to CONTACT_EMAIL env var", async () => {
      process.env.CONTACT_EMAIL = "custom@example.com";
      await POST(makeRequest({ name: "Jane", email: "a@b.com", message: "Hi" }));
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ to: "custom@example.com" })
      );
      delete process.env.CONTACT_EMAIL;
    });

    it("falls back to info@servicevision.io when CONTACT_EMAIL is unset", async () => {
      delete process.env.CONTACT_EMAIL;
      await POST(makeRequest({ name: "Jane", email: "a@b.com", message: "Hi" }));
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ to: "info@servicevision.io" })
      );
    });

    it("sets replyTo to the sender's email", async () => {
      await POST(makeRequest({ name: "Jane", email: "jane@example.com", message: "Hi" }));
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ replyTo: "jane@example.com" })
      );
    });
  });

  describe("subject line formatting", () => {
    beforeEach(() => {
      delete process.env.RECAPTCHA_SECRET_KEY;
      mockSend.mockResolvedValue({ data: { id: "msg_1" }, error: null });
    });

    it("uses subject field in email subject when provided", async () => {
      await POST(
        makeRequest({ name: "Jane", email: "a@b.com", message: "Hi", subject: "Need a quote" })
      );
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ subject: "[Need a quote] from Jane" })
      );
    });

    it("falls back to generic subject when subject is not provided", async () => {
      await POST(makeRequest({ name: "Jane", email: "a@b.com", message: "Hi" }));
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({ subject: "New contact from Jane" })
      );
    });
  });

  describe("optional fields passed through", () => {
    beforeEach(() => {
      delete process.env.RECAPTCHA_SECRET_KEY;
      mockSend.mockResolvedValue({ data: { id: "msg_1" }, error: null });
    });

    it("passes phone, company, and subject to the email template", async () => {
      await POST(
        makeRequest({
          name: "Jane",
          email: "jane@example.com",
          phone: "+1 555-1234",
          company: "Acme Corp",
          subject: "AI project",
          message: "Let's chat",
        })
      );
      // The react prop passed to send should include all fields
      const callArg = mockSend.mock.calls[0][0];
      expect(callArg.react).toBeDefined();
    });
  });

  describe("resend errors", () => {
    beforeEach(() => {
      delete process.env.RECAPTCHA_SECRET_KEY;
    });

    it("returns 500 when resend returns an error", async () => {
      mockSend.mockResolvedValue({ data: null, error: { message: "API key invalid" } });
      const res = await POST(makeRequest({ name: "Jane", email: "a@b.com", message: "Hi" }));
      expect(res.status).toBe(500);
      const body = await res.json();
      expect(body.error).toMatch(/failed to send/i);
    });
  });
});
