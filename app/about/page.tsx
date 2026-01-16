"use client";

import Link from "next/link";
import EraToggle from "@/components/EraToggle";

// Modern macOS-style About Page
function ModernAbout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6">
            SV
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About ServiceVision
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            25+ years of enterprise experience meets cutting-edge AI.
            Real people, extraordinary technology, measurable results.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "25+", label: "Years" },
            { value: "150+", label: "Projects" },
            { value: "24hr", label: "Response" },
            { value: "100%", label: "Compliance" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111] border border-[#222] rounded-xl text-center py-6">
              <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* The Difference Section */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-8">
          <h2 className="text-xl font-semibold text-white mb-4">The Difference</h2>
          <div className="space-y-4 text-gray-400 leading-relaxed">
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
          {[
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
              title: "Compliance First",
              desc: "SOC 2, HIPAA, audit trails - compliance isn't an afterthought, it's where we start.",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: "Always Available",
              desc: "24-hour response time. Direct phone and Slack access. You get a person, not a ticket.",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ),
              title: "Human Oversight",
              desc: "We use AI, but humans review every critical output. Automation with guardrails.",
            },
            {
              icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Real Partnership",
              desc: "We show up to your meetings, learn your business, and take ownership.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-[#111] border border-[#222] rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-xl p-8">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="text-5xl font-bold text-emerald-400">25%</div>
            <div>
              <div className="text-white font-semibold mb-1">Of Profits Donated</div>
              <p className="text-gray-400 text-sm">
                To organizations using technology for social good - education, healthcare, environment.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-8 text-center">
          <h3 className="font-semibold text-white text-xl mb-2">Ready to Start?</h3>
          <p className="text-gray-400 text-sm mb-6">Schedule a call with a senior engineer today.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Get in Touch
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Classic Corporate Web 1.0 Style About Page
function RetroAbout() {
  return (
    <div className="min-h-screen pt-20 pb-20" style={{ background: "#f5f5f5" }}>
      {/* Classic Header Banner */}
      <div className="bg-gradient-to-r from-[#003366] to-[#336699] py-8 mb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-serif text-white mb-2">About ServiceVision</h1>
          <p className="text-blue-200">Your Trusted Technology Partner Since 2001</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6 font-sans">
          <Link href="/" className="text-blue-700 hover:underline">Home</Link>
          {" > "}
          <span>About Us</span>
        </div>

        {/* Main Content Card */}
        <div className="bg-white border border-gray-300 shadow-md mb-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 border-b border-gray-300">
            <h2 className="font-bold text-[#003366]">Our Company</h2>
          </div>
          <div className="p-6">
            <div className="float-right ml-6 mb-4">
              <div className="w-32 h-32 bg-gradient-to-br from-[#003366] to-[#336699] flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-300">
                SV
              </div>
              <p className="text-xs text-center text-gray-500 mt-1">Est. 2001</p>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              <strong>ServiceVision</strong> is a premier software development and technology consulting firm
              headquartered in Seattle, Washington. For over two decades, we have been delivering
              enterprise-grade solutions to businesses of all sizes.
            </p>

            <p className="text-gray-700 mb-4 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              Our team of experienced professionals combines deep technical expertise with a commitment
              to client success. We don&apos;t just build software - we become your technology partner.
            </p>

            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
              When you work with ServiceVision, you get a named project lead who answers their phone,
              attends your meetings, and takes personal responsibility for delivering results.
            </p>

            <div className="clear-both"></div>
          </div>
        </div>

        {/* Stats Table */}
        <div className="bg-white border border-gray-300 shadow-md mb-6">
          <div className="bg-gradient-to-r from-gray-100 to-gray-200 px-4 py-2 border-b border-gray-300">
            <h2 className="font-bold text-[#003366]">Company Statistics</h2>
          </div>
          <div className="p-4">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-700">Years in Business</td>
                  <td className="py-3 px-4 text-[#003366] font-bold">25+</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-700">Projects Completed</td>
                  <td className="py-3 px-4 text-[#003366] font-bold">150+</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-700">Client Satisfaction</td>
                  <td className="py-3 px-4 text-[#003366] font-bold">98%</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-700">Response Time</td>
                  <td className="py-3 px-4 text-[#003366] font-bold">24 Hours</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 bg-gray-50 font-semibold text-gray-700">Compliance Rate</td>
                  <td className="py-3 px-4 text-[#003366] font-bold">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-300 shadow-md">
            <div className="bg-gradient-to-r from-[#006600] to-[#339933] px-4 py-2 border-b border-gray-300">
              <h2 className="font-bold text-white">Our Mission</h2>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: "Georgia, serif" }}>
                To deliver exceptional software solutions that drive business value, while maintaining
                the highest standards of quality, security, and compliance. We believe technology
                should empower people, not replace them.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-300 shadow-md">
            <div className="bg-gradient-to-r from-[#cc6600] to-[#ff9933] px-4 py-2 border-b border-gray-300">
              <h2 className="font-bold text-white">Our Values</h2>
            </div>
            <div className="p-4">
              <ul className="text-gray-700 text-sm space-y-2" style={{ fontFamily: "Georgia, serif" }}>
                <li>✓ Accountability & Transparency</li>
                <li>✓ Compliance-First Approach</li>
                <li>✓ Human-Centered Technology</li>
                <li>✓ Continuous Improvement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Responsibility */}
        <div className="bg-white border border-gray-300 shadow-md mb-6">
          <div className="bg-gradient-to-r from-[#990099] to-[#cc33cc] px-4 py-2 border-b border-gray-300">
            <h2 className="font-bold text-white">Corporate Social Responsibility</h2>
          </div>
          <div className="p-6 text-center">
            <div className="text-5xl font-bold text-[#990099] mb-2">25%</div>
            <p className="text-gray-700 font-semibold mb-2">Of Profits Donated to Charity</p>
            <p className="text-gray-600 text-sm">
              Supporting organizations that use technology for education, healthcare, and environmental causes.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-[#003366] text-white p-6 text-center mb-6">
          <h3 className="text-xl font-bold mb-2">Ready to Get Started?</h3>
          <p className="text-blue-200 mb-4">Contact us today for a free consultation.</p>
          <Link
            href="/contact"
            className="inline-block bg-[#ff9900] hover:bg-[#ffaa33] text-[#003366] font-bold px-8 py-3 border-2 border-[#cc7700] transition-colors"
          >
            Contact Us Now!
          </Link>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-gray-500">
          <p>Last Updated: January 2026 | ServiceVision, Inc. | Seattle, WA</p>
          <p className="mt-1">
            <Link href="/" className="text-blue-700 hover:underline">Home</Link>
            {" | "}
            <Link href="/services" className="text-blue-700 hover:underline">Services</Link>
            {" | "}
            <Link href="/portfolio" className="text-blue-700 hover:underline">Portfolio</Link>
            {" | "}
            <Link href="/contact" className="text-blue-700 hover:underline">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Page Component with Era Toggle
export default function AboutPage() {
  return (
    <EraToggle beforeYear="2005" beforeLabel="Web 1.0 Corporate" defaultModern={false}>
      {{
        before: <RetroAbout />,
        after: <ModernAbout />,
      }}
    </EraToggle>
  );
}
