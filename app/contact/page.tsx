"use client";

import { useState, FormEvent, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import EraToggle from "@/components/EraToggle";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

// Modern Contact Form
function ModernContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (RECAPTCHA_SITE_KEY && !recaptchaToken) {
      setStatus("error");
      setErrorMessage("Please complete the reCAPTCHA verification");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
          recaptchaToken: recaptchaToken || "",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Get in Touch
          </h1>
          <p className="text-gray-400 text-sm">
            We&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Success State */}
        {status === "success" ? (
          <div className="bg-[#111] border border-emerald-500/30 rounded-lg p-6 text-center">
            <div className="text-4xl mb-3">✓</div>
            <h2 className="text-xl font-bold text-white mb-2">Message Sent</h2>
            <p className="text-gray-400 text-sm mb-4">
              Thanks for reaching out. We&apos;ll reply shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-retro rounded-lg px-6 py-3"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          /* Contact Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#111] border border-[#333] rounded-lg p-4 space-y-3">
              {/* To field - read only */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                <div className="px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-emerald-400 font-mono text-sm">
                  info@servicevision.net
                </div>
              </div>

              {/* Name & Email row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Let's discuss my project"
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded text-white text-sm placeholder-gray-600 focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Error State */}
            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            {/* reCAPTCHA + Submit */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {RECAPTCHA_SITE_KEY && (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  theme="dark"
                  size="compact"
                />
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full sm:w-auto btn-retro rounded-lg px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}

        {/* Contact Details - Bottom */}
        <div className="mt-8 pt-6 border-t border-[#333] text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
            <a
              href="mailto:info@servicevision.net"
              className="hover:text-emerald-400 transition-colors"
            >
              info@servicevision.net
            </a>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span>Seattle, WA</span>
            <span className="hidden sm:inline text-gray-600">•</span>
            <span>24hr response time</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// AOL-style Retro Contact Form
function RetroContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showBuddyList, setShowBuddyList] = useState(true);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
          recaptchaToken: "",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20" style={{ background: "linear-gradient(180deg, #4a86c7 0%, #2c5aa0 100%)" }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* AOL Header */}
        <div className="bg-gradient-to-b from-[#ffffd4] to-[#e8e8c8] border-2 border-[#000080] rounded-t-lg p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#ffcc00] rounded-full flex items-center justify-center text-[#000080] font-bold text-xs border border-[#cc9900]">
              AOL
            </div>
            <span className="font-bold text-[#000080] text-sm">ServiceVision Mail</span>
          </div>
          <div className="flex gap-1">
            <button className="px-2 py-0.5 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs">_</button>
            <button className="px-2 py-0.5 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs">□</button>
            <button className="px-2 py-0.5 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs">×</button>
          </div>
        </div>

        <div className="flex gap-0">
          {/* Buddy List Sidebar */}
          {showBuddyList && (
            <div className="w-48 bg-[#ffffd4] border-l-2 border-b-2 border-[#000080] p-2 hidden md:block">
              <div className="bg-[#000080] text-white text-xs font-bold px-2 py-1 mb-2">
                Buddy List
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-green-600">●</span>
                  <span className="font-bold">ServiceVision Team</span>
                </div>
                <div className="pl-4 space-y-0.5 text-[#000080]">
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 text-[8px]">●</span>
                    <span>SVEngineer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-green-600 text-[8px]">●</span>
                    <span>SVSupport</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-600 text-[8px]">●</span>
                    <span>SVSales</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-[#c0c0c0]">
                <div className="text-xs text-[#666] italic">
                  We&apos;re online now!
                </div>
                <div className="text-[10px] text-[#888] mt-1">
                  Response time: ~4 hours
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 bg-white border-r-2 border-b-2 border-[#000080]">
            {/* Toolbar */}
            <div className="bg-gradient-to-b from-[#e8e8c8] to-[#d0d0b0] border-b border-[#808080] p-1 flex items-center gap-2">
              <button className="px-3 py-1 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs flex items-center gap-1 hover:bg-[#d0d0d0]">
                📧 Write
              </button>
              <button className="px-3 py-1 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-xs flex items-center gap-1 hover:bg-[#d0d0d0]">
                📤 Send
              </button>
              <div className="flex-1" />
              <button
                onClick={() => setShowBuddyList(!showBuddyList)}
                className="px-2 py-1 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-[10px] hover:bg-[#d0d0d0] md:hidden"
              >
                👥
              </button>
            </div>

            {status === "success" ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">📬</div>
                <div className="bg-[#ffffd4] border border-[#000080] p-4 inline-block">
                  <h2 className="text-lg font-bold text-[#000080] mb-2">You&apos;ve Got Mail!</h2>
                  <p className="text-sm text-[#333]">Your message has been sent successfully.</p>
                  <p className="text-xs text-[#666] mt-2">We&apos;ll respond within 24 hours.</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-4 py-2 bg-[#ffcc00] border-2 border-[#cc9900] text-[#000080] font-bold text-sm hover:bg-[#ffdd33]"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4">
                {/* Email Header Fields */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <label className="w-16 text-right text-xs font-bold text-[#000080]">To:</label>
                    <div className="flex-1 bg-[#e8e8e8] border border-[#808080] px-2 py-1 text-sm text-[#000080]">
                      info@servicevision.net
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-16 text-right text-xs font-bold text-[#000080]">From:</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@aol.com"
                      className="flex-1 border border-[#808080] px-2 py-1 text-sm focus:outline-none focus:border-[#000080]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-16 text-right text-xs font-bold text-[#000080]">Name:</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="flex-1 border border-[#808080] px-2 py-1 text-sm focus:outline-none focus:border-[#000080]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="w-16 text-right text-xs font-bold text-[#000080]">Subject:</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Re: My Project Inquiry"
                      className="flex-1 border border-[#808080] px-2 py-1 text-sm focus:outline-none focus:border-[#000080]"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div className="border border-[#808080] mb-4">
                  <div className="bg-[#c0c0c0] border-b border-[#808080] px-2 py-0.5 text-xs font-bold">
                    Message:
                  </div>
                  <textarea
                    required
                    rows={8}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project..."
                    className="w-full p-2 text-sm focus:outline-none resize-none"
                    style={{ fontFamily: "Courier New, monospace" }}
                  />
                </div>

                {/* Error Message */}
                {status === "error" && (
                  <div className="bg-[#ffcccc] border border-[#cc0000] p-2 mb-4 text-sm text-[#cc0000]">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="px-6 py-2 bg-[#ffcc00] border-2 border-[#cc9900] text-[#000080] font-bold text-sm hover:bg-[#ffdd33] disabled:opacity-50"
                    >
                      {status === "loading" ? "Sending..." : "📤 Send Now"}
                    </button>
                    <Link
                      href="/"
                      className="px-4 py-2 bg-[#c0c0c0] border border-t-white border-l-white border-b-[#808080] border-r-[#808080] text-sm hover:bg-[#d0d0d0]"
                    >
                      Cancel
                    </Link>
                  </div>
                  <div className="text-xs text-[#666] italic">
                    💬 Instant Message available
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#c0c0c0] border-2 border-t-0 border-[#000080] rounded-b-lg px-2 py-1 flex items-center justify-between text-[10px]">
          <span>Connected to ServiceVision Mail Server</span>
          <span className="flex items-center gap-1">
            <span className="text-green-600">●</span>
            Online - 56.6 Kbps
          </span>
        </div>

        {/* Retro Links */}
        <div className="mt-4 text-center text-white text-xs">
          <Link href="/" className="hover:underline">Home</Link>
          {" | "}
          <Link href="/services" className="hover:underline">Services</Link>
          {" | "}
          <Link href="/portfolio" className="hover:underline">Portfolio</Link>
          {" | "}
          <Link href="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </div>
  );
}

// Main Page Component with Era Toggle - defaults to modern
export default function ContactPage() {
  return (
    <EraToggle beforeYear="1997" beforeLabel="AOL Era" defaultModern={true}>
      {{
        before: <RetroContact />,
        after: <ModernContact />,
      }}
    </EraToggle>
  );
}
