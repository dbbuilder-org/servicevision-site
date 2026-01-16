"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="macos-page pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Hero Card */}
        <div className="macos-window">
          <div className="macos-titlebar">
            <div className="macos-traffic-lights">
              <div className="macos-traffic-light macos-close" />
              <div className="macos-traffic-light macos-minimize" />
              <div className="macos-traffic-light macos-maximize" />
            </div>
            <div className="macos-title font-mono">&gt;SERVICE\VISION</div>
            <div className="w-[68px]" />
          </div>
          <div className="macos-content">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-mono font-bold shrink-0">
                &gt;S\V
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-white mb-1">
                  AI-Powered Software Development
                </h1>
                <p className="text-gray-400">
                  25+ years of enterprise experience meets cutting-edge AI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="macos-card text-center py-6">
            <div className="text-3xl font-bold text-blue-400 font-mono">25+</div>
            <div className="text-sm text-gray-400 mt-1">YEARS</div>
          </div>
          <div className="macos-card text-center py-6">
            <div className="text-3xl font-bold text-blue-400 font-mono">150+</div>
            <div className="text-sm text-gray-400 mt-1">PROJECTS</div>
          </div>
          <div className="macos-card text-center py-6">
            <div className="text-3xl font-bold text-blue-400 font-mono">4hr</div>
            <div className="text-sm text-gray-400 mt-1">RESPONSE</div>
          </div>
          <div className="macos-card text-center py-6">
            <div className="text-3xl font-bold text-blue-400 font-mono">100%</div>
            <div className="text-sm text-gray-400 mt-1">COMPLIANCE</div>
          </div>
        </div>

        {/* The Difference Card */}
        <div className="macos-window">
          <div className="macos-titlebar">
            <div className="macos-traffic-lights">
              <div className="macos-traffic-light macos-close" />
              <div className="macos-traffic-light macos-minimize" />
              <div className="macos-traffic-light macos-maximize" />
            </div>
            <div className="macos-title">THE DIFFERENCE</div>
            <div className="w-[68px]" />
          </div>
          <div className="macos-content space-y-4 text-gray-300 leading-relaxed">
            <p>
              You&apos;ve probably worked with agencies that disappear after the contract is signed.
              Offshore teams you can never reach. AI vendors who promise the world and deliver a demo.
            </p>
            <p>
              We&apos;re different. When you work with us, you get a named engineer who knows your
              business, picks up when you call, and takes personal responsibility for your success.
            </p>
            <p className="text-white font-medium">
              No vibe coders. No black boxes. Just battle-tested engineers who&apos;ve seen it all.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="macos-card">
            <div className="flex items-start gap-4">
              <div className="text-2xl">✓</div>
              <div>
                <h3 className="font-semibold text-white mb-2">COMPLIANCE FIRST</h3>
                <p className="text-sm text-gray-400">
                  SOC 2, HIPAA, audit trails—compliance isn&apos;t an afterthought, it&apos;s where we start.
                </p>
              </div>
            </div>
          </div>
          <div className="macos-card">
            <div className="flex items-start gap-4">
              <div className="text-2xl">⚡</div>
              <div>
                <h3 className="font-semibold text-white mb-2">ALWAYS AVAILABLE</h3>
                <p className="text-sm text-gray-400">
                  4-hour response time. Direct phone and Slack access. You get a person—not a ticket.
                </p>
              </div>
            </div>
          </div>
          <div className="macos-card">
            <div className="flex items-start gap-4">
              <div className="text-2xl">👁</div>
              <div>
                <h3 className="font-semibold text-white mb-2">HUMAN OVERSIGHT</h3>
                <p className="text-sm text-gray-400">
                  We use AI, but humans review every critical output. Automation with guardrails.
                </p>
              </div>
            </div>
          </div>
          <div className="macos-card">
            <div className="flex items-start gap-4">
              <div className="text-2xl">🤝</div>
              <div>
                <h3 className="font-semibold text-white mb-2">REAL PARTNERSHIP</h3>
                <p className="text-sm text-gray-400">
                  We show up to your meetings, learn your business, and take ownership.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Card */}
        <div className="macos-window">
          <div className="macos-titlebar">
            <div className="macos-traffic-lights">
              <div className="macos-traffic-light macos-close" />
              <div className="macos-traffic-light macos-minimize" />
              <div className="macos-traffic-light macos-maximize" />
            </div>
            <div className="macos-title">BUILDING FOR GOOD</div>
            <div className="w-[68px]" />
          </div>
          <div className="macos-content">
            <div className="flex items-center gap-6">
              <div className="text-5xl font-bold text-green-400 font-mono">25%</div>
              <div>
                <div className="text-white font-semibold mb-1">OF PROFITS DONATED</div>
                <p className="text-gray-400 text-sm">
                  To organizations using technology for social good—education, healthcare, environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Card */}
        <div className="macos-card flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <div>
            <h3 className="font-semibold text-white text-lg">READY TO START?</h3>
            <p className="text-gray-400 text-sm">Schedule a call with a senior engineer today.</p>
          </div>
          <Link href="/contact" className="macos-btn macos-btn-primary px-8 py-3 font-medium">
            GET IN TOUCH
          </Link>
        </div>

      </div>
    </div>
  );
}
