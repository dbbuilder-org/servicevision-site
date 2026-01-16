"use client";

import Link from "next/link";

export default function EraBanner() {
  return (
    <section className="relative py-16 bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#1a1a2e] border-y border-[#2a2a2a]">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-terminal-grid opacity-20" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">
          AI amplifies expertise.
          <span className="text-gray-400"> It doesn&apos;t replace it.</span>
        </h2>

        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
          No vibe coder can deliver what an enterprise team with{" "}
          <span className="text-white font-semibold">decades of pre-AI expertise</span>{" "}
          brings. And no solo developer—however experienced—can match a team{" "}
          <span className="text-white font-semibold">empowered by AI</span>.
        </p>

        <div className="font-mono text-sm text-emerald-400 mb-8">
          That&apos;s the ServiceVision advantage.
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="btn-retro rounded-lg px-6 py-3"
          >
            Work With Us
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-medium hover:border-emerald-400 hover:text-emerald-400 transition-colors"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}
