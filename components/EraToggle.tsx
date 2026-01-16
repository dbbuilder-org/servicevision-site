"use client";

import { useState } from "react";
import EraInfoModal from "./EraInfoModal";

interface EraToggleProps {
  beforeYear: string;
  beforeLabel: string;
  defaultModern?: boolean;
  children: {
    before: React.ReactNode;
    after: React.ReactNode;
  };
}

export default function EraToggle({ beforeYear, beforeLabel, defaultModern = false, children }: EraToggleProps) {
  const [showModern, setShowModern] = useState(defaultModern);

  return (
    <div className="min-h-screen">
      {/* Era Info Modal */}
      <EraInfoModal eraYear={beforeYear} eraName={beforeLabel} />

      {/* Toggle Bar */}
      <div className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-purple-900/95 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center md:justify-between gap-4">
            {/* Left: Era description - hidden on mobile */}
            <div className="flex-1 hidden md:block">
              <p className="text-xs text-purple-300/70 leading-snug max-w-sm">
                {showModern
                  ? "AI accelerates 40 years of design evolution - better solutions, modern best practices, continuously improving."
                  : <><span className="text-white font-bold text-sm">Remember {beforeYear}?</span> This is how we built software then.</>}
              </p>
            </div>

            {/* Center: Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`text-xs sm:text-sm font-mono transition-colors whitespace-nowrap ${!showModern ? "text-white" : "text-gray-500"}`}>
                {beforeYear}
              </span>

              {/* Toggle Switch */}
              <button
                onClick={() => setShowModern(!showModern)}
                className="relative w-12 sm:w-14 h-6 sm:h-7 rounded-full bg-gray-800 border border-purple-500/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                aria-label={showModern ? "Show retro version" : "Show modern version"}
              >
                <div
                  className={`absolute top-0.5 w-5 sm:w-6 h-5 sm:h-6 rounded-full transition-all duration-300 ${
                    showModern
                      ? "left-6 sm:left-7 bg-gradient-to-r from-emerald-400 to-emerald-500"
                      : "left-0.5 bg-gradient-to-r from-amber-400 to-orange-500"
                  }`}
                />
              </button>

              <span className={`text-xs sm:text-sm font-mono transition-colors whitespace-nowrap ${showModern ? "text-white" : "text-gray-500"}`}>
                2026
              </span>
            </div>

            {/* Right: AI message - hidden on mobile */}
            <div className="flex-1 hidden md:block text-right">
              <p className="text-xs text-purple-300/70 leading-snug max-w-sm ml-auto">
                {showModern
                  ? "Any design, any code, any schematic - solved better and more reliably."
                  : `The ${beforeLabel.toLowerCase()} aesthetic - a window into the past.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area - adds padding for the fixed toggle bar */}
      <div className="pt-12">
        {showModern ? children.after : children.before}
      </div>
    </div>
  );
}
