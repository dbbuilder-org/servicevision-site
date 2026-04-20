import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: vi.fn().mockReturnValue("/"),
}));

// Render Script as a plain <script> so querySelector can find it
vi.mock("next/script", () => ({
  default: ({ id, src, children }: { id?: string; src?: string; children?: string }) => {
    if (src) return <script data-ga="src" src={src} />;
    if (id) return <script data-ga="inline" id={id} dangerouslySetInnerHTML={{ __html: children ?? "" }} />;
    return null;
  },
}));

describe("GoogleAnalytics", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("renders nothing when NEXT_PUBLIC_GA_MEASUREMENT_ID is not set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    const { default: GoogleAnalytics } = await import("@/components/GoogleAnalytics");
    const { container } = render(<GoogleAnalytics />);
    expect(container.querySelector("[data-ga]")).toBeNull();
  });

  it("renders GA scripts when measurement ID is set", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST12345");
    const { default: GoogleAnalytics } = await import("@/components/GoogleAnalytics");
    const { container } = render(<GoogleAnalytics />);
    expect(container.querySelector('[data-ga="src"]')).not.toBeNull();
    expect(container.querySelector('[data-ga="inline"]')).not.toBeNull();
  });

  it("includes the measurement ID in the gtag script src", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST12345");
    const { default: GoogleAnalytics } = await import("@/components/GoogleAnalytics");
    const { container } = render(<GoogleAnalytics />);
    const src = container.querySelector('[data-ga="src"]')?.getAttribute("src") ?? "";
    expect(src).toContain("G-TEST12345");
  });

  it("fires gtag page_path when pathname changes", async () => {
    const { usePathname } = await import("next/navigation");
    vi.mocked(usePathname).mockReturnValue("/services");

    const mockGtag = vi.fn();
    vi.stubGlobal("gtag", mockGtag);

    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST12345");
    const { default: GoogleAnalytics } = await import("@/components/GoogleAnalytics");

    await act(async () => {
      render(<GoogleAnalytics />);
    });

    expect(mockGtag).toHaveBeenCalledWith("config", "G-TEST12345", { page_path: "/services" });
  });
});
