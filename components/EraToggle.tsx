"use client";

import { useState, useCallback } from "react";
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
  const [forceShowModal, setForceShowModal] = useState(false);

  const handleToggle = () => setShowModern(!showModern);

  const handleBarClick = () => {
    setForceShowModal(true);
  };

  const handleForceShowHandled = useCallback(() => {
    setForceShowModal(false);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Era Info Modal */}
      <EraInfoModal
        eraYear={beforeYear}
        eraName={beforeLabel}
        showModern={showModern}
        onToggle={handleToggle}
        forceShow={forceShowModal}
        onForceShowHandled={handleForceShowHandled}
      />

      {/* Toggle Bar - matching modal aesthetic, clickable to show modal */}
      <div
        className="fixed top-16 left-0 right-0 z-30 bg-gradient-to-r from-[#0d0d0d] via-[#111] to-[#0d0d0d] backdrop-blur-sm border-b border-purple-500/30 cursor-pointer hover:border-purple-500/50 transition-colors"
        onClick={handleBarClick}
      >
        {/* Purple accent line */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-center md:justify-between gap-4">
            {/* Left: Era description - hidden on mobile */}
            <div className="flex-1 hidden md:block">
              <p className="text-xs text-gray-400 leading-snug max-w-sm">
                {showModern
                  ? <><span className="text-purple-400 font-medium">ServiceVision AI accelerates</span> 40 years of design evolution—better solutions, modern best practices.</>
                  : <><span className="text-white font-bold text-sm">Remember {beforeYear}?</span> <span className="text-gray-500">This is how we built software then.</span></>}
              </p>
            </div>

            {/* Center: Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-xs sm:text-sm font-mono transition-colors whitespace-nowrap ${!showModern ? "text-white font-semibold" : "text-gray-500"}`}>
                {beforeYear}
              </span>

              {/* Toggle Switch - matching modal style */}
              <button
                onClick={(e) => { e.stopPropagation(); handleToggle(); }}
                className="relative w-14 sm:w-16 h-7 sm:h-8 rounded-full bg-[#1a1a1a] border border-purple-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 hover:border-purple-400/70"
                aria-label={showModern ? "Show retro version" : "Show modern version"}
              >
                <div
                  className={`absolute top-0.5 sm:top-1 w-5 sm:w-6 h-5 sm:h-6 rounded-full transition-all duration-300 shadow-lg ${
                    showModern
                      ? "left-8 sm:left-9 bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-emerald-500/30"
                      : "left-0.5 sm:left-1 bg-gradient-to-r from-amber-400 to-orange-500 shadow-amber-500/30"
                  }`}
                />
              </button>

              <span className={`text-xs sm:text-sm font-mono transition-colors whitespace-nowrap ${showModern ? "text-white font-semibold" : "text-gray-500"}`}>
                2026
              </span>
            </div>

            {/* Right: AI message - hidden on mobile */}
            <div className="flex-1 hidden md:block text-right">
              <p className="text-xs text-gray-400 leading-snug max-w-sm ml-auto">
                {showModern
                  ? <><span className="text-emerald-400">Any design, any code</span>—solved better and more reliably.</>
                  : <>The <span className="text-purple-400">{beforeLabel.toLowerCase()}</span> aesthetic—a window into the past.</>}
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
