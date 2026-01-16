"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface EraInfoModalProps {
  eraName: string;
  eraYear: string;
  showModern: boolean;
  onToggle: () => void;
  forceShow?: boolean;
  onForceShowHandled?: () => void;
}

const rotatingWords = ["code", "projects", "solutions", "business"];

const rememberPhrases: Record<string, string> = {
  "1995": "Remember Windows 95?",
  "1997": "Remember your first email?",
  "2000": "Remember the dot-com era?",
  "2005": "Remember your first PC?",
  "2010": "Remember when the cloud was new?",
};

export default function EraInfoModal({ eraName, eraYear, showModern, onToggle, forceShow, onForceShowHandled }: EraInfoModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const rotationCount = useRef(0);

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

  // Handle force show from parent
  useEffect(() => {
    if (forceShow) {
      setIsDismissed(false);
      setIsVisible(true);
      // Reset rotation
      setCurrentWordIndex(0);
      setIsRotating(true);
      rotationCount.current = 0;
      onForceShowHandled?.();
    }
  }, [forceShow, onForceShowHandled]);

  // Rotate through words and land on "business"
  useEffect(() => {
    if (!isVisible || !isRotating) return;

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        const nextIndex = (prev + 1) % rotatingWords.length;
        rotationCount.current += 1;

        // After 2 full rotations, stop on "business" (index 3)
        if (rotationCount.current >= 8 && nextIndex === 3) {
          setIsRotating(false);
        }

        return nextIndex;
      });
    }, 700);

    return () => clearInterval(interval);
  }, [isVisible, isRotating]);

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
      {/* Backdrop - no blur, subtle darkening */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleDismiss}
      />

      {/* Modal - wide horizontal bar in bottom third */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-out left-4 right-4 md:left-8 md:right-8 lg:left-16 lg:right-16 xl:left-24 xl:right-24 ${
          isVisible
            ? "opacity-100 translate-y-0 bottom-[8%] md:bottom-[10%]"
            : "opacity-0 translate-y-12 bottom-[4%] pointer-events-none"
        }`}
      >
        {/* Glow effect behind modal */}
        <div className="absolute -inset-4 bg-purple-500/20 rounded-3xl blur-2xl" />
        <div className="absolute -inset-2 bg-purple-600/10 rounded-2xl blur-xl" />

        <div className="relative bg-gradient-to-r from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/50">
          {/* Purple accent bar */}
          <div className="h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600" />

          <div className="p-6 md:p-8">
            {/* 1/3 - 1/3 - 1/3 Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

              {/* Left 1/3: Header + Toggle */}
              <div className="flex flex-col justify-center items-center lg:items-start">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-purple-600/20 border border-purple-500/30 flex items-center justify-center shadow-lg shadow-purple-500/20">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-white">
                      {rememberPhrases[eraYear] || `Remember ${eraName.replace(/ Era$/, '')}?`}
                    </h2>
                    <p className="text-[10px] text-purple-400 font-mono">{eraYear}</p>
                  </div>
                </div>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Toggle between eras</span>
                <div className="flex items-center gap-3 bg-black/30 rounded-full px-4 py-2 border border-white/5">
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
                          ? "left-9 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-emerald-500/40"
                          : "left-1 bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/40"
                      }`}
                    />
                  </button>
                  <span className={`text-sm font-mono transition-colors ${showModern ? "text-white font-semibold" : "text-gray-500"}`}>
                    2026
                  </span>
                </div>
              </div>

              {/* Center 1/3: Copy */}
              <div className="flex flex-col justify-center">
                <p className="text-emerald-400 text-sm leading-relaxed">
                  We built this site—interface, games, backend—in <span className="text-white font-bold">under 12 hours</span> with one senior engineer and our AI agents trained on our best practices.
                </p>
                <p className="text-white font-semibold text-sm md:text-base mt-2">
                  Imagine what 12 hours with <span className="text-purple-400">ServiceVision</span> could do to revolutionize your <span className={`inline-block min-w-[70px] text-purple-400 transition-all duration-200 ${isRotating ? "opacity-90" : "opacity-100"}`}>{rotatingWords[currentWordIndex]}</span>.
                </p>
              </div>

              {/* Right 1/3: Actions */}
              <div className="flex flex-col justify-center gap-3">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium px-6 py-3 rounded-xl text-center transition-all shadow-lg shadow-purple-500/30 whitespace-nowrap"
                  onClick={handleDismiss}
                >
                  Start a Conversation
                </Link>
                <button
                  onClick={handleDismiss}
                  className="bg-white/5 hover:bg-white/10 text-gray-300 font-medium px-6 py-3 rounded-xl text-center transition-colors border border-white/10 whitespace-nowrap"
                >
                  Explore our site first
                </button>
              </div>
            </div>
          </div>

          {/* Close button - top right */}
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
