"use client";

import { useEffect, useCallback, useRef } from "react";

interface AsteroidsGameProps {
  onClose: () => void;
}

export default function AsteroidsGame({ onClose }: AsteroidsGameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    // Use capture phase to catch ESC before iframe can consume it
    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keydown", handleKeyDown, true);
    // Prevent body scroll while game is open
    document.body.style.overflow = "hidden";

    // Focus the iframe to start game immediately
    const focusGame = () => {
      if (iframeRef.current) {
        iframeRef.current.focus();
      }
    };

    // Focus after a brief delay to ensure iframe is ready
    const focusTimeout = setTimeout(focusGame, 100);

    // Periodically check if we need to handle ESC (backup for iframe focus issues)
    const escInterval = setInterval(() => {
      // Listen for ESC even when iframe has focus by checking document
      const activeElement = document.activeElement;
      if (activeElement === iframeRef.current) {
        // Iframe has focus - our capture listeners should still work
        // but add the container as a backup focus target for ESC
        containerRef.current?.addEventListener("keydown", handleKeyDown as any);
      }
    }, 500);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = "";
      clearTimeout(focusTimeout);
      clearInterval(escInterval);
    };
  }, [handleKeyDown]);

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      className="fixed inset-0 z-[9999] bg-black flex flex-col outline-none"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      }}
    >
      {/* Fixed Close Button - Top Right Corner */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[10000] px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-lg rounded-lg transition-colors flex items-center gap-3 shadow-xl border-2 border-red-400"
      >
        <span className="text-red-200 font-bold">[ESC]</span>
        CLOSE
      </button>

      {/* Header */}
      <div className="bg-[#111] border-b border-[#333] px-4 py-2 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-mono text-sm">SERVICEVISION ARCADE</span>
          <span className="text-gray-600 font-mono text-xs">// ServiceVision: Experience x AI</span>
        </div>
        <div className="w-32" /> {/* Spacer for the fixed close button */}
      </div>

      {/* Game iframe */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 min-h-0">
        <iframe
          ref={iframeRef}
          src="/games/asteroids.html"
          className="w-full h-full max-w-[850px] max-h-[700px] border-0 rounded-lg"
          title="ServiceVision: Experience x AI"
          allow="autoplay"
        />
      </div>

      {/* Footer */}
      <div className="bg-[#111] border-t border-[#333] px-4 py-2 text-center shrink-0">
        <span className="text-gray-500 font-mono text-xs">
          Arrow keys to move • Space to shoot • Click game to start • ESC or close button to exit
        </span>
      </div>
    </div>
  );
}
