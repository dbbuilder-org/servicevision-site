"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const eras = [
  { name: "PCs", year: "1984", href: "/", label: "Personal Computing", color: "from-green-900 to-green-700" },
  { name: "Networks", year: "1995", href: "/services", label: "Windows Era", color: "from-[#008080] to-[#004040]" },
  { name: "Web", year: "2000", href: "/portfolio", label: "Dot-Com", color: "from-blue-600 to-purple-600" },
  { name: "Cloud", year: "2010", href: "/library", label: "Mobile", color: "from-slate-700 to-slate-900" },
  { name: "AI", year: "2026", href: "/ai", label: "AI Era", color: "from-emerald-600 to-emerald-800" },
];

// Map pages to their era
const pageEraMap: Record<string, string> = {
  "/": "PCs",
  "/services": "Networks",
  "/portfolio": "Web",
  "/library": "Cloud",
  "/ai": "AI",
  "/about": "AI",
  "/contact": "Networks",
};

export default function EraFooter() {
  const pathname = usePathname();
  const currentEra = pageEraMap[pathname] || "AI";

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-t border-[#2a2a2a]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-12">
          {/* Left: Tagline link */}
          <Link
            href="/blog/what-40-years-of-computing-taught-us"
            className="font-mono text-xs sm:text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Multiply what matters, <em className="italic">and always has...</em>
          </Link>

          {/* Center: Era navigation */}
          <div className="flex items-stretch">
            {eras.map((era) => {
              const isActive = era.name === currentEra;
              return (
                <Link
                  key={era.name}
                  href={era.href}
                  className={`
                    relative flex flex-col items-center justify-center px-2 sm:px-3 py-1
                    transition-all duration-200 group
                    ${isActive
                      ? "text-white"
                      : "text-gray-500 hover:text-gray-300"
                    }
                  `}
                >
                  {/* Active indicator glow */}
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-t ${era.color} opacity-30 rounded-t-lg`} />
                  )}

                  {/* Top highlight bar for active */}
                  {isActive && (
                    <div className="absolute top-0 left-1 right-1 h-0.5 bg-white rounded-full" />
                  )}

                  {/* Era content */}
                  <span className={`relative font-mono text-[10px] sm:text-sm font-bold ${isActive ? "text-white" : ""}`}>
                    {era.name}
                  </span>
                  <span className={`relative text-[8px] sm:text-[9px] font-mono ${isActive ? "text-white/70" : "text-gray-600"}`}>
                    {era.year}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Right: Start a Conversation */}
          <Link
            href="/contact"
            className="font-mono text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Start a Conversation →
          </Link>
        </div>
      </div>
    </footer>
  );
}
