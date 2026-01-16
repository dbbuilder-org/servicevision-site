"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "LIBRARY", href: "/library" },
  { name: "ABOUT", href: "/about" },
];

// Game configuration per page/era
const pageGames: Record<string, { game: string; label: string; era: string }> = {
  "/": { game: "/games/asteroids.html", label: "Experience x AI", era: "80s" },
  "/services": { game: "/games/blocks.html", label: "Block Drop", era: "90s" },
  "/portfolio": { game: "/games/match3.html", label: "Gem Cascade", era: "2000s" },
  "/library": { game: "/games/wordguess.html", label: "Lexicon", era: "2010s" },
  "/ai": { game: "/games/adventure.html", label: "Adventure", era: "AI" },
  "/about": { game: "/games/adventure.html", label: "Adventure", era: "AI" },
  "/contact": { game: "/games/asteroids.html", label: "Experience x AI", era: "Classic" },
};

const MAX_BLINKS = 60; // Total blinks allowed per session
const BLINK_DURATION_MS = 1000; // Each blink cycle is ~1 second

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [shouldBlink, setShouldBlink] = useState(true);
  const pathname = usePathname();

  // Get the game for the current page
  const currentGame = pageGames[pathname] || pageGames["/"];

  // Track blinks across session and stop after MAX_BLINKS
  useEffect(() => {
    const storedBlinks = parseInt(sessionStorage.getItem("cursorBlinks") || "0", 10);
    if (storedBlinks >= MAX_BLINKS) {
      setShouldBlink(false);
      return;
    }

    const interval = setInterval(() => {
      const currentBlinks = parseInt(sessionStorage.getItem("cursorBlinks") || "0", 10);
      const newBlinks = currentBlinks + 1;
      sessionStorage.setItem("cursorBlinks", newBlinks.toString());

      if (newBlinks >= MAX_BLINKS) {
        setShouldBlink(false);
        clearInterval(interval);
      }
    }, BLINK_DURATION_MS);

    return () => clearInterval(interval);
  }, []);

  const handleCloseGame = useCallback(() => {
    setShowGame(false);
  }, []);

  // Handle ESC key to close game
  useEffect(() => {
    if (!showGame) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showGame, handleCloseGame]);

  return (
    <>
      {/* Game Overlay */}
      {showGame && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          {/* Game Header */}
          <div className="bg-[#111] border-b border-[#333] px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-sm">SERVICEVISION ARCADE</span>
              <span className="text-gray-600 font-mono text-xs">// {currentGame.era}: {currentGame.label}</span>
            </div>
            <button
              onClick={handleCloseGame}
              className="text-gray-400 hover:text-white transition-colors font-mono text-sm flex items-center gap-2"
            >
              <span className="text-xs text-gray-600">[ESC]</span>
              Close
            </button>
          </div>

          {/* Game iframe */}
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <iframe
              src={currentGame.game}
              className="w-full h-full max-w-[900px] max-h-[700px] border-0 rounded-lg"
              title={currentGame.label}
              allow="autoplay"
            />
          </div>

          {/* Game Footer */}
          <div className="bg-[#111] border-t border-[#333] px-4 py-2 text-center shrink-0">
            <span className="text-gray-500 font-mono text-xs">
              ESC to exit
            </span>
          </div>
        </div>
      )}
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-purple-500/30">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group flex items-center gap-1">
              <span className="font-mono font-bold text-white group-hover:text-purple-400 transition-colors">
                <span className="text-purple-400">&gt;</span>SERVICE<span className="text-purple-400">\</span>VISION
              </span>
              {shouldBlink && <span className="hidden sm:inline-block w-2 h-5 bg-purple-400 animate-blink" />}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-400 hover:text-emerald-400 transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <span className="font-mono text-lg">
                {mobileMenuOpen ? "[×]" : "[≡]"}
              </span>
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors font-mono ${
                    isActive
                      ? "text-emerald-400"
                      : "text-gray-400 hover:text-emerald-400"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* AI + Play + Contact Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
            <Link
              href="/ai"
              className="px-4 py-2 text-sm font-medium rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 transition-colors"
            >
              AI
            </Link>
            <button
              onClick={() => setShowGame(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-gray-400 hover:text-emerald-400 transition-colors"
              title={`Play ${currentGame.label}`}
            >
              <span className="text-emerald-400">&#9654;</span>
              Play
            </button>
            <Link
              href="/contact"
              className="btn-retro rounded-md text-sm px-4 py-2"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-1 border-t border-[#2a2a2a] mt-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors font-mono border-l-2 ${
                    isActive
                      ? "text-emerald-400 border-emerald-400"
                      : "text-gray-400 hover:text-emerald-400 hover:bg-[#111111] border-transparent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-emerald-400 mr-2">&gt;</span>
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 px-4 flex flex-col gap-3">
              <Link
                href="/ai"
                className="text-center px-4 py-3 text-sm font-medium rounded-md border border-purple-500 text-purple-400 hover:bg-purple-500/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI
              </Link>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowGame(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-mono text-gray-400 border border-gray-600 rounded-md hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                >
                  <span className="text-emerald-400">&#9654;</span>
                  Play
                </button>
                <Link
                  href="/contact"
                  className="btn-retro rounded-md text-sm px-4 py-3 flex-1 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}
