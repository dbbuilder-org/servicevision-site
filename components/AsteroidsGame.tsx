"use client";

import { useEffect, useCallback } from "react";

interface AsteroidsGameProps {
  onClose: () => void;
}

export default function AsteroidsGame({ onClose }: AsteroidsGameProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while game is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
      {/* Header */}
      <div className="bg-[#111] border-b border-[#333] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-mono text-sm">SERVICEVISION ARCADE</span>
          <span className="text-gray-600 font-mono text-xs">// ServiceVision: Experience x AI</span>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors font-mono text-sm flex items-center gap-2"
        >
          <span className="text-xs text-gray-600">[ESC]</span>
          Close
        </button>
      </div>

      {/* Game iframe */}
      <div className="flex-1 flex items-center justify-center p-4 min-h-0">
        <iframe
          src="/games/asteroids.html"
          className="w-full h-full max-w-[850px] max-h-[750px] border-0 rounded-lg"
          title="ServiceVision: Experience x AI"
          allow="autoplay"
        />
      </div>

      {/* Footer */}
      <div className="bg-[#111] border-t border-[#333] px-4 py-2 text-center shrink-0">
        <span className="text-gray-500 font-mono text-xs">
          Arrow keys to move • Space to shoot • ESC to exit
        </span>
      </div>
    </div>
  );
}
