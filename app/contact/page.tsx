"use client";

import { useState, FormEvent, useRef } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    screenName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showAwayMessage, setShowAwayMessage] = useState(false);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Easter egg: typing indicator when user types
  const handleMessageChange = (value: string) => {
    setFormData({ ...formData, message: value });
    setTypingIndicator(true);
    setTimeout(() => setTypingIndicator(false), 1000);
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Check reCAPTCHA if configured
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
          name: formData.screenName,
          email: formData.email,
          message: `Subject: ${formData.subject}\n\n${formData.message}`,
          recaptchaToken: recaptchaToken || "",
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setStatus("success");
      setFormData({ screenName: "", email: "", subject: "", message: "" });
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
    <div className="min-h-screen bg-gradient-to-b from-[#e8f4f8] via-[#d0e8f0] to-[#b8dce8] pt-20 pb-8 px-4">
      {/* AOL-style subtle pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230066cc' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-6xl mx-auto relative h-[calc(100vh-10rem)] flex flex-col">
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">
          {/* Main Email Window */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* AOL Window */}
            <div className="bg-[#f5f5f5] rounded-lg shadow-xl border border-[#0066cc]/30 overflow-hidden flex-1 flex flex-col">
              {/* Title Bar - AOL Blue */}
              <div className="bg-gradient-to-r from-[#003d99] via-[#0055cc] to-[#0077ee] px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-300 text-lg">✉️</div>
                  <span className="text-white font-bold text-sm drop-shadow">Write Mail - Compu-ServiceVision</span>
                </div>
                <div className="flex gap-1">
                  <button className="w-5 h-5 bg-[#4a90d9] hover:bg-[#5aa0e9] rounded text-white text-xs flex items-center justify-center">−</button>
                  <button className="w-5 h-5 bg-[#4a90d9] hover:bg-[#5aa0e9] rounded text-white text-xs flex items-center justify-center">□</button>
                  <button className="w-5 h-5 bg-[#cc4444] hover:bg-[#dd5555] rounded text-white text-xs flex items-center justify-center font-bold">×</button>
                </div>
              </div>

              {/* Toolbar - Lighter AOL style */}
              <div className="bg-gradient-to-b from-[#e8e8e8] to-[#d8d8d8] border-b border-[#b0b0b0] px-2 py-1 flex items-center gap-1">
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                  className="flex flex-col items-center px-3 py-1 hover:bg-[#f0f0f0] active:bg-[#d0d0d0] rounded transition-colors"
                >
                  <span className="text-xl">📤</span>
                  <span className="text-[10px] font-bold text-[#003366]">Send</span>
                </button>
                <div className="w-px h-8 bg-[#b0b0b0] mx-1" />
                <button className="flex flex-col items-center px-3 py-1 hover:bg-[#f0f0f0] rounded transition-colors">
                  <span className="text-xl">📋</span>
                  <span className="text-[10px] text-[#003366]">Quote</span>
                </button>
                <button className="flex flex-col items-center px-3 py-1 hover:bg-[#f0f0f0] rounded transition-colors">
                  <span className="text-xl">📎</span>
                  <span className="text-[10px] text-[#003366]">Attach</span>
                </button>
                <button className="flex flex-col items-center px-3 py-1 hover:bg-[#f0f0f0] rounded transition-colors">
                  <span className="text-xl">📖</span>
                  <span className="text-[10px] text-[#003366]">Address</span>
                </button>
                <div className="ml-auto flex items-center gap-2">
                  <span className="text-[10px] text-[#0055aa] font-medium">💡 Tip: We respond in ~4 hours!</span>
                </div>
              </div>

              {/* Success State - "You've Got Mail" */}
              {status === "success" ? (
                <div className="bg-white p-8 flex-1 flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4 animate-bounce">📬</div>
                  <h2 className="text-2xl font-bold text-[#000080] mb-2">You&apos;ve Got Mail!</h2>
                  <p className="text-gray-600 mb-4 text-center">
                    Your message has been sent to ServiceVision.<br />
                    We&apos;ll reply faster than dial-up connects!
                  </p>
                  <div className="bg-[#ffffcc] border border-[#cccc00] p-3 rounded text-sm mb-4">
                    <strong>📧 Delivery Status:</strong> Message sent successfully!
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="bg-[#c0c0c0] border-2 border-[#dfdfdf] border-r-[#404040] border-b-[#404040] px-6 py-2 font-bold hover:bg-[#d0d0d0] active:border-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf]"
                  >
                    Write New Mail
                  </button>
                </div>
              ) : (
                /* Email Form */
                <form onSubmit={handleSubmit} className="bg-white flex-1 flex flex-col">
                  {/* Email Header Fields */}
                  <div className="border-b border-[#c0c0c0] bg-white">
                    <div className="flex items-center border-b border-[#e0e0e0]">
                      <label className="w-24 shrink-0 px-3 py-2 bg-[#e8e8e8] text-sm font-bold text-right border-r border-[#c0c0c0] text-[#333]">
                        To:
                      </label>
                      <div className="flex-1 px-3 py-2 text-sm text-[#0055aa] font-medium bg-white">
                        info@servicevision.net
                      </div>
                    </div>
                    <div className="flex items-center border-b border-[#e0e0e0]">
                      <label className="w-24 shrink-0 px-3 py-2 bg-[#e8e8e8] text-sm font-bold text-right border-r border-[#c0c0c0] text-[#333]">
                        From:
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="flex-1 px-3 py-2 text-sm outline-none bg-white text-[#333] placeholder-gray-400"
                      />
                    </div>
                    <div className="flex items-center border-b border-[#e0e0e0]">
                      <label className="w-24 shrink-0 px-3 py-2 bg-[#e8e8e8] text-sm font-bold text-right border-r border-[#c0c0c0] text-[#333]">
                        Name:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.screenName}
                        onChange={(e) => setFormData({ ...formData, screenName: e.target.value })}
                        placeholder="Your Name"
                        className="flex-1 px-3 py-2 text-sm outline-none bg-white text-[#333] placeholder-gray-400"
                      />
                    </div>
                    <div className="flex items-center">
                      <label className="w-24 shrink-0 px-3 py-2 bg-[#e8e8e8] text-sm font-bold text-right border-r border-[#c0c0c0] text-[#333]">
                        Subject:
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Let's build something amazing!"
                        className="flex-1 px-3 py-2 text-sm outline-none bg-white text-[#333] placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="relative flex-1 flex flex-col min-h-[200px] bg-white">
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleMessageChange(e.target.value)}
                      placeholder="Tell us about your project...

What are you building?
What's your timeline?
What's your budget range?

We'll get back to you faster than you can say 'You've Got Mail!'"
                      className="w-full h-full px-4 py-3 text-sm outline-none resize-none font-mono flex-1 bg-white text-[#333] placeholder-gray-400"
                    />
                    {typingIndicator && (
                      <div className="absolute bottom-2 right-2 text-xs text-gray-400 italic">
                        ✏️ typing...
                      </div>
                    )}
                  </div>

                  {/* Error State */}
                  {status === "error" && (
                    <div className="bg-[#ffcccc] border-t border-[#ff0000] px-4 py-3 flex items-center gap-2">
                      <span className="text-xl">⚠️</span>
                      <span className="text-sm text-[#cc0000]">{errorMessage}</span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="bg-[#f0f0f0] border-t border-[#c0c0c0] px-4 py-3 flex items-center justify-between flex-wrap gap-3">
                    {/* reCAPTCHA */}
                    {RECAPTCHA_SITE_KEY && (
                      <div className="flex-shrink-0">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={RECAPTCHA_SITE_KEY}
                          onChange={handleRecaptchaChange}
                          size="compact"
                        />
                      </div>
                    )}
                    {!RECAPTCHA_SITE_KEY && (
                      <div className="text-[10px] text-gray-500">
                        📡 Connection: Broadband (we&apos;ve upgraded from 56k!)
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-[#c0c0c0] border-2 border-[#dfdfdf] border-r-[#404040] border-b-[#404040] px-8 py-2 font-bold text-sm hover:bg-[#d0d0d0] active:border-[#404040] active:border-r-[#dfdfdf] active:border-b-[#dfdfdf] disabled:opacity-50 flex items-center gap-2"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <span>📤</span>
                          Send Now
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* AOL Footer Bar */}
            <div className="bg-gradient-to-b from-[#e0e0e0] to-[#d0d0d0] rounded-b-lg border-t border-[#b0b0b0] px-3 py-2 flex items-center justify-between text-[11px] text-[#333]">
              <div className="flex items-center gap-4">
                <span>🏃 Running Man says: Ship it!</span>
              </div>
              <div>
                Keywords: <span className="text-[#0055aa] underline cursor-pointer hover:text-[#0077cc]">AI</span>, <span className="text-[#0055aa] underline cursor-pointer hover:text-[#0077cc]">Development</span>, <span className="text-[#0055aa] underline cursor-pointer hover:text-[#0077cc]">Enterprise</span>
              </div>
            </div>
          </div>

          {/* Buddy List Sidebar */}
          <div className="lg:w-72 flex flex-col gap-3 overflow-y-auto">
            <div className="bg-[#f5f5f5] rounded-lg shadow-xl border border-[#0066cc]/30 overflow-hidden">
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-[#003d99] via-[#0055cc] to-[#0077ee] px-3 py-2 flex items-center justify-between">
                <span className="text-white font-bold text-xs drop-shadow">Buddy List</span>
                <div className="flex gap-1">
                  <button className="w-4 h-4 bg-[#4a90d9] hover:bg-[#5aa0e9] rounded text-white text-[10px] flex items-center justify-center">−</button>
                  <button className="w-4 h-4 bg-[#cc4444] hover:bg-[#dd5555] rounded text-white text-[10px] flex items-center justify-center font-bold">×</button>
                </div>
              </div>

              {/* Buddy Categories */}
              <div className="bg-white p-3 text-xs">
                <div className="mb-3">
                  <div className="font-bold text-[#003366] flex items-center gap-1 cursor-pointer hover:bg-[#e8f4ff] p-1 rounded">
                    <span className="text-[#0055aa]">▼</span> ServiceVision Team (4/4)
                  </div>
                  <div className="ml-4 space-y-1 mt-1">
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#fff8e0] cursor-pointer rounded text-[#333]">
                      <span className="text-green-500 text-sm">●</span>
                      <span className="font-medium">SV_Engineering</span>
                      <span className="text-[10px] text-gray-400">🏃</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#fff8e0] cursor-pointer rounded text-[#333]">
                      <span className="text-green-500 text-sm">●</span>
                      <span className="font-medium">SV_Support</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#fff8e0] cursor-pointer rounded text-[#333]">
                      <span className="text-green-500 text-sm">●</span>
                      <span className="font-medium">SV_AITeam</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:bg-[#fff8e0] cursor-pointer rounded text-[#333]">
                      <span className="text-green-500 text-sm">●</span>
                      <span className="font-medium">Chris_SV</span>
                      <span className="text-[10px] text-gray-400">👤</span>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="font-bold text-[#003366] flex items-center gap-1 cursor-pointer hover:bg-[#e8f4ff] p-1 rounded">
                    <span className="text-[#0055aa]">▶</span> Offline (0)
                  </div>
                </div>

                {/* Away Message */}
                <div className="border-t border-[#ddd] pt-2 mt-2">
                  <button
                    onClick={() => setShowAwayMessage(!showAwayMessage)}
                    className="text-[11px] text-[#0055aa] underline cursor-pointer hover:text-[#0077cc] font-medium"
                  >
                    {showAwayMessage ? "Hide" : "View"} Away Message
                  </button>
                  {showAwayMessage && (
                    <div className="mt-2 bg-[#fff8e0] border border-[#e6d56c] p-2 text-[11px] rounded text-[#554400]">
                      <strong>SV_Support&apos;s Away Message:</strong>
                      <p className="mt-1 italic">
                        &quot;Building the future, one commit at a time.
                        BRB - shipping code! 🚀
                        Response time: ~4 hours (we&apos;re faster than dial-up!)&quot;
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-b from-[#e8e8e8] to-[#ddd] border-t border-[#ccc] p-3 text-[11px] text-[#333]">
                <div className="font-bold mb-1 text-[#003366]">📊 Quick Stats:</div>
                <div className="space-y-0.5">
                  <div>✓ Est. 2001 (Seattle, WA)</div>
                  <div>✓ 25+ Years Experience</div>
                  <div>✓ 4hr Response Time</div>
                  <div>✓ 100% Human Replies</div>
                </div>
              </div>

              {/* Ad Banner */}
              <div className="bg-gradient-to-r from-[#003d99] to-[#0055cc] text-white text-center py-2 text-[11px]">
                🌟 FREE CONSULTATION! 🌟<br />
                <a href="mailto:info@servicevision.net?subject=Free%20Consultation%20Request" className="text-yellow-300 font-medium hover:text-yellow-100 underline cursor-pointer">Click Here!</a>
              </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-[#f5f5f5] rounded-lg shadow-lg border border-[#0066cc]/30 overflow-hidden">
              <div className="bg-gradient-to-r from-[#003d99] via-[#0055cc] to-[#0077ee] px-3 py-2">
                <span className="text-white font-bold text-xs drop-shadow">Contact Info</span>
              </div>
              <div className="bg-white p-3 text-xs space-y-2 text-[#333]">
                <div>
                  <strong className="text-[#003366]">📧 Email:</strong><br />
                  <a href="mailto:info@servicevision.net" className="text-[#0055aa] underline hover:text-[#0077cc]">
                    info@servicevision.net
                  </a>
                </div>
                <div>
                  <strong className="text-[#003366]">📍 Location:</strong><br />
                  Seattle, WA (Remote-friendly!)
                </div>
                <div>
                  <strong className="text-[#003366]">⏰ Hours:</strong><br />
                  24/7 (AI never sleeps, humans do)
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="bg-[#f5f5f5] rounded-lg shadow-lg border border-[#0066cc]/30 p-3">
              <div className="text-[11px] space-y-1.5">
                <Link href="/" className="block text-[#0055aa] underline hover:text-[#0077cc] font-medium">🏠 Home</Link>
                <Link href="/services" className="block text-[#0055aa] underline hover:text-[#0077cc] font-medium">💼 Services</Link>
                <Link href="/portfolio" className="block text-[#0055aa] underline hover:text-[#0077cc] font-medium">📁 Portfolio</Link>
                <Link href="/about" className="block text-[#0055aa] underline hover:text-[#0077cc] font-medium">ℹ️ About Us</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-3 shrink-0 bg-gradient-to-b from-[#e0e0e0] to-[#ccc] rounded-lg shadow-lg border border-[#0066cc]/20 px-4 py-2 flex items-center justify-between text-[11px] text-[#333]">
          <div className="flex items-center gap-2">
            <span className="text-green-500 text-sm">●</span>
            <span className="font-medium">Online</span>
            <span className="text-gray-400">|</span>
            <span>Mail: 0 new</span>
            <span className="text-gray-400">|</span>
            <span>📡 Connected at: Ludicrous Speed</span>
            <span className="text-gray-400">|</span>
            <span className="text-[#003366]/50 hover:text-[#003366] transition-colors cursor-help" title="25/Seattle/Building Cool Stuff">a/s/l? 25y/Seattle/Shipping</span>
          </div>
          <div className="text-[#003366]">
            ServiceVision © 2001-2026
          </div>
        </div>
      </div>
    </div>
  );
}
