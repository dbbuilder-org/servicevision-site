import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ContactEmail from "@/emails/ContactEmail";

describe("ContactEmail", () => {
  describe("required fields", () => {
    it("renders name", () => {
      render(<ContactEmail name="Jane Smith" email="jane@example.com" message="Hello!" />);
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    it("renders email", () => {
      render(<ContactEmail name="Jane Smith" email="jane@example.com" message="Hello!" />);
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    });

    it("renders message", () => {
      render(<ContactEmail name="Jane Smith" email="jane@example.com" message="Hello there!" />);
      expect(screen.getByText("Hello there!")).toBeInTheDocument();
    });

    it("renders the heading", () => {
      render(<ContactEmail name="Jane" email="jane@example.com" message="Hi" />);
      expect(screen.getByText("New Contact Form Submission")).toBeInTheDocument();
    });

    it("renders the footer attribution", () => {
      render(<ContactEmail name="Jane" email="jane@example.com" message="Hi" />);
      expect(
        screen.getByText(/This email was sent from the contact form at servicevision\.io/)
      ).toBeInTheDocument();
    });
  });

  describe("optional fields — shown when provided", () => {
    it("renders phone when provided", () => {
      render(
        <ContactEmail
          name="Jane"
          email="jane@example.com"
          message="Hi"
          phone="+1 555-1234"
        />
      );
      expect(screen.getByText("+1 555-1234")).toBeInTheDocument();
      expect(screen.getByText("Phone")).toBeInTheDocument();
    });

    it("renders company when provided", () => {
      render(
        <ContactEmail
          name="Jane"
          email="jane@example.com"
          message="Hi"
          company="Acme Corp"
        />
      );
      expect(screen.getByText("Acme Corp")).toBeInTheDocument();
      expect(screen.getByText("Company")).toBeInTheDocument();
    });

    it("renders subject when provided", () => {
      render(
        <ContactEmail
          name="Jane"
          email="jane@example.com"
          message="Hi"
          subject="Need a quote"
        />
      );
      expect(screen.getByText("Need a quote")).toBeInTheDocument();
      expect(screen.getByText("Subject")).toBeInTheDocument();
    });

    it("renders all optional fields together", () => {
      render(
        <ContactEmail
          name="Jane Smith"
          email="jane@example.com"
          phone="+1 555-9999"
          company="BigCo"
          subject="AI project"
          message="Let's work together"
        />
      );
      expect(screen.getByText("+1 555-9999")).toBeInTheDocument();
      expect(screen.getByText("BigCo")).toBeInTheDocument();
      expect(screen.getByText("AI project")).toBeInTheDocument();
      expect(screen.getByText("Let's work together")).toBeInTheDocument();
    });
  });

  describe("optional fields — hidden when omitted", () => {
    it("does not render Phone label when phone is absent", () => {
      render(<ContactEmail name="Jane" email="jane@example.com" message="Hi" />);
      expect(screen.queryByText("Phone")).not.toBeInTheDocument();
    });

    it("does not render Company label when company is absent", () => {
      render(<ContactEmail name="Jane" email="jane@example.com" message="Hi" />);
      expect(screen.queryByText("Company")).not.toBeInTheDocument();
    });

    it("does not render Subject label when subject is absent", () => {
      render(<ContactEmail name="Jane" email="jane@example.com" message="Hi" />);
      expect(screen.queryByText("Subject")).not.toBeInTheDocument();
    });
  });

  describe("preview text", () => {
    it("includes name in preview", () => {
      const { container } = render(
        <ContactEmail name="Jane Smith" email="jane@example.com" message="Hi" />
      );
      expect(container.textContent).toContain("Jane Smith");
    });

    it("includes company in preview when provided", () => {
      const { container } = render(
        <ContactEmail
          name="Jane"
          email="jane@example.com"
          message="Hi"
          company="Acme Corp"
        />
      );
      expect(container.textContent).toContain("Acme Corp");
    });
  });
});
