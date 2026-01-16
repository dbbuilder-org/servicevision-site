"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const eras = [
  {
    name: "1980s",
    year: "1984",
    style: "era-80s",
    icon: "█▀█",
    label: "Personal Computing",
  },
  {
    name: "1990s",
    year: "1995",
    style: "era-95",
    icon: "🪟",
    label: "Windows Era",
  },
  {
    name: "2000s",
    year: "2000",
    style: "era-dotcom",
    icon: "🌐",
    label: "Dot-Com Boom",
  },
  {
    name: "2010s",
    year: "2010",
    style: "era-mobile",
    icon: "📱",
    label: "Mobile Revolution",
  },
  {
    name: "TODAY",
    year: "2026",
    style: "era-ai",
    icon: "🤖",
    label: "AI Era",
  },
];

export default function EraBanner() {
  const [currentEra, setCurrentEra] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentEra((prev) => (prev + 1) % eras.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered]);

  const era = eras[currentEra];

  return (
    <section
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background that morphs through eras */}
      <div className={`era-banner-bg ${era.style}`}>
        {/* Scan line effect for retro feel */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="h-full w-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Era Timeline Visual */}
            <div className="flex-shrink-0">
              <div className="relative">
                {/* Era indicator ring */}
                <div className="w-32 h-32 rounded-full border-4 border-white/20 flex items-center justify-center relative overflow-hidden">
                  {/* Animated fill based on era progress */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-white/10 transition-all duration-500"
                    style={{ height: `${((currentEra + 1) / eras.length) * 100}%` }}
                  />

                  {/* Era icon */}
                  <div className="relative z-10 text-center">
                    <div className="text-4xl mb-1 transition-all duration-300">
                      {era.icon}
                    </div>
                    <div className="text-white font-mono text-sm font-bold">
                      {era.year}
                    </div>
                  </div>
                </div>

                {/* Era dots */}
                <div className="flex justify-center gap-2 mt-4">
                  {eras.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentEra(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === currentEra
                          ? "bg-white scale-125"
                          : i < currentEra
                          ? "bg-white/60"
                          : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Message Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-4">
                <span className="text-white/60 font-mono text-sm">
                  {era.label}
                </span>
                <span className="text-white/40 font-mono text-sm mx-2">→</span>
                <Link
                  href="/blog/what-40-years-of-computing-taught-us"
                  className="text-white font-mono text-sm font-bold hover:underline inline-flex items-center gap-2"
                >
                  40 Years of Evolution
                  <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Read why history matters</span>
                </Link>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                AI amplifies expertise.
                <br />
                <span className="text-white/80">It doesn&apos;t replace it.</span>
              </h2>

              <p className="text-white/70 text-lg max-w-2xl mb-6 leading-relaxed">
                No vibe coder can deliver what an enterprise team with{" "}
                <span className="text-white font-semibold">25 years of pre-AI expertise</span>{" "}
                brings. And no solo developer—however experienced—can match a team{" "}
                <span className="text-white font-semibold">empowered by AI</span>.
                <span className="block mt-2 text-white font-medium">
                  That&apos;s the ServiceVision advantage.
                </span>
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
                >
                  Work With Us
                  <span>→</span>
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  See Our Work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
