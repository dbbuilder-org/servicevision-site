"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface EraInfoModalProps {
  eraName: string;
  eraYear: string;
  showModern: boolean;
  onToggle: () => void;
}

export default function EraInfoModal({ eraName, eraYear, showModern, onToggle }: EraInfoModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already seen the modal this session
    const hasSeen = sessionStorage.getItem("eraInfoModalSeen");
    if (hasSeen) {
      setIsDismissed(true);
      return;
    }

    // Show modal after a short delay to let page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      sessionStorage.setItem("eraInfoModalSeen", "true");
    }, 300);
  };

  if (isDismissed) return null;

  return (
    <>
      {/* Backdrop - subtle, clickable to dismiss */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleDismiss}
      />

      {/* Modal - slides up from bottom on mobile, centered on desktop */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        } bottom-4 left-4 right-4 md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg`}
      >
        <div className="bg-gradient-to-br from-[#0d0d0d] via-[#111] to-[#0d0d0d] border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10 overflow-hidden">
          {/* Purple accent bar */}
          <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/20 flex items-center justify-center">
                  <span className="text-xl">⚡</span>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-white">
                    Remember {eraYear}?
                  </h2>
                  <p className="text-xs text-purple-400 font-mono">{eraName}</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-500 hover:text-white transition-colors p-1"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Toggle Section */}
            <div className="bg-gradient-to-r from-purple-900/30 via-purple-800/20 to-purple-900/30 border border-purple-500/20 rounded-xl p-4 mb-4">
              <p className="text-gray-300 text-sm mb-3 text-center">
                <span className="text-white font-medium">Toggle back and forth</span>—see decades of progress in one click.
              </p>

              {/* Inline Toggle */}
              <div className="flex items-center justify-center gap-3">
                <span className={`text-sm font-mono transition-colors ${!showModern ? "text-white font-semibold" : "text-gray-500"}`}>
                  {eraYear}
                </span>

                <button
                  onClick={onToggle}
                  className="relative w-16 h-8 rounded-full bg-[#1a1a1a] border border-purple-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:border-purple-400/70"
                  aria-label={showModern ? "Show retro version" : "Show modern version"}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-300 shadow-lg ${
                      showModern
                        ? "left-9 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-emerald-500/30"
                        : "left-1 bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/30"
                    }`}
                  />
                </button>

                <span className={`text-sm font-mono transition-colors ${showModern ? "text-white font-semibold" : "text-gray-500"}`}>
                  2026
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-4 text-sm md:text-base">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-purple-400 font-semibold">This site?</span> Interface, games, backend—all of it.
                  Built in <span className="text-white font-bold">under 12 hours</span>. One senior engineer × AI agents
                  trained on our best practices.
                </p>
              </div>

              <p className="text-gray-400 leading-relaxed">
                With ServiceVision, you get that speed <em>with</em> compliance-first engineering.
                <span className="text-emerald-400"> Enterprise-ready from day one.</span>
              </p>

              <p className="text-white font-semibold text-base md:text-lg">
                Imagine what 12 hours could do to revolutionize your projects and your business.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="/contact"
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium px-6 py-3 rounded-xl text-center transition-all shadow-lg shadow-purple-500/20"
                onClick={handleDismiss}
              >
                Start a Conversation
              </Link>
              <button
                onClick={handleDismiss}
                className="flex-1 bg-white/5 hover:bg-white/10 text-gray-300 font-medium px-6 py-3 rounded-xl text-center transition-colors border border-white/10"
              >
                Explore the Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
