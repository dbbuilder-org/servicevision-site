"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "SERVICES", href: "/services" },
  { name: "PORTFOLIO", href: "/portfolio" },
  { name: "LIBRARY", href: "/library" },
  { name: "AI", href: "/ai", isAI: true },
];

const MAX_BLINKS = 60; // Total blinks allowed per session
const BLINK_DURATION_MS = 1000; // Each blink cycle is ~1 second

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shouldBlink, setShouldBlink] = useState(true);
  const pathname = usePathname();

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-purple-500/30">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="group flex items-center gap-1">
              <span className="font-mono font-bold transition-colors">
                <span className="text-purple-400">&gt;</span><span className="text-white group-hover:text-purple-300">SERVICEVISION</span><span className="text-purple-400">AI</span><span className="text-white group-hover:text-purple-300">.com</span>
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
              const isAI = 'isAI' in item && item.isAI;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors font-mono ${
                    isAI
                      ? isActive
                        ? "text-purple-300"
                        : "text-purple-400 hover:text-purple-300"
                      : isActive
                        ? "text-emerald-400"
                        : "text-gray-400 hover:text-emerald-400"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className={`absolute bottom-0 left-2 right-2 h-0.5 rounded-full ${isAI ? "bg-purple-400" : "bg-emerald-400"}`} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* About + Contact Buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
            <Link
              href="/about"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`rounded-md text-sm px-4 py-2 font-medium border transition-colors ${
                pathname === "/contact"
                  ? "bg-emerald-500 border-emerald-500 text-white"
                  : "btn-retro"
              }`}
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
              const isAI = 'isAI' in item && item.isAI;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors font-mono border-l-2 ${
                    isAI
                      ? isActive
                        ? "text-purple-400 border-purple-400"
                        : "text-purple-400 hover:text-purple-300 hover:bg-[#111111] border-transparent"
                      : isActive
                        ? "text-emerald-400 border-emerald-400"
                        : "text-gray-400 hover:text-emerald-400 hover:bg-[#111111] border-transparent"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className={isAI ? "text-purple-400 mr-2" : "text-emerald-400 mr-2"}>&gt;</span>
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-4 px-4 flex flex-col gap-3">
              <div className="flex gap-3">
                <Link
                  href="/about"
                  className={`flex-1 text-center px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === "/about"
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`rounded-md text-sm px-4 py-3 flex-1 text-center font-medium border transition-colors ${
                    pathname === "/contact"
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "btn-retro"
                  }`}
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
  );
}
