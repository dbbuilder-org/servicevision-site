"use client";

import Link from "next/link";
import { useState } from "react";

const featuredProjects = [
  {
    name: "Remote2me",
    url: "https://remote2me.com",
    mood: "Professional",
    friends: "2,847",
    description:
      "Secure remote desktop and access solution enabling seamless connectivity for distributed teams and IT administrators.",
    tech: ["Cloud Infrastructure", "Security", "Real-time"],
    topFriends: ["AWS", "Azure", "VPN"],
  },
  {
    name: "AnalyzeMyCloud",
    url: "https://analyzemycloud.com",
    mood: "Optimizing",
    friends: "5,231",
    description:
      "Cloud cost optimization and infrastructure analysis platform helping businesses reduce spend and improve performance.",
    tech: ["AWS", "Azure", "GCP", "Analytics"],
    topFriends: ["Cost Savings", "Performance", "Insights"],
  },
  {
    name: "FireProofApp",
    url: "https://fireproofapp.com",
    mood: "Compliant",
    friends: "1,923",
    description:
      "Compliance and security documentation platform streamlining audit preparation and regulatory requirements.",
    tech: ["SOC 2", "HIPAA", "Automation"],
    topFriends: ["Auditors", "Security", "Docs"],
  },
];

const ndaProjects = [
  {
    id: "healthcare_01",
    industry: "Healthcare",
    type: "AI Integration",
    description: "HIPAA-compliant patient data analysis platform",
    outcome: "40% reduction in processing time",
  },
  {
    id: "fintech_01",
    industry: "Financial Services",
    type: "Compliance",
    description: "Automated KYC/AML screening system",
    outcome: "95% faster onboarding",
  },
  {
    id: "education_01",
    industry: "Education",
    type: "SaaS Platform",
    description: "Student info and payment processing for K-12",
    outcome: "$50M+ processed annually",
  },
  {
    id: "logistics_01",
    industry: "Logistics",
    type: "Predictive Analytics",
    description: "Route optimization and demand forecasting",
    outcome: "18% cost reduction",
  },
];

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <div className="dotcom-page pt-20 pb-12">
      {/* Marquee Banner */}
      <div className="bg-[#000033] text-[#00ff00] py-2 overflow-hidden border-y border-[#336699]">
        <div className="dotcom-marquee whitespace-nowrap font-mono text-sm">
          ★ ★ ★ Welcome to ServiceVision&apos;s Portfolio! ★ ★ ★ Check out our latest projects! ★ ★ ★ We&apos;ve helped 100+ companies build amazing software! ★ ★ ★ Thanks for visiting! ★ ★ ★
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="dotcom-profile-box mb-6">
          <div className="dotcom-header">
            ServiceVision&apos;s Profile - [Online Now!]
          </div>
          <div className="dotcom-content">
            <table className="dotcom-table">
              <tbody>
                <tr>
                  <td style={{ width: "200px", background: "#f0f0f0" }}>
                    {/* Profile Picture Area */}
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#336699] to-[#003366] flex items-center justify-center text-white text-4xl font-bold mb-2">
                        SV
                      </div>
                      <div className="text-[10px] text-gray-600 mb-2">
                        &quot;Building the Future&quot;
                      </div>
                      <div className="dotcom-blurb">
                        <span className="dotcom-sparkle">★</span> Online Now! <span className="dotcom-sparkle">★</span>
                      </div>
                    </div>
                    <div className="mt-4 text-[10px]">
                      <div><strong>Mood:</strong> Innovating</div>
                      <div><strong>Status:</strong> Taking Projects</div>
                      <div><strong>View Count:</strong> 48,392</div>
                    </div>
                  </td>
                  <td>
                    <h1 style={{ fontFamily: "Georgia, serif", fontSize: "24px", color: "#003366", marginBottom: "8px" }}>
                      ServiceVision
                    </h1>
                    <div className="text-[11px] mb-4">
                      <span className="text-gray-600">Est.</span> <strong>2001</strong> |
                      <span className="text-gray-600"> Location:</span> <strong>Seattle, WA</strong> |
                      <span className="text-gray-600"> Specialty:</span> <strong>AI + Enterprise Software</strong>
                    </div>
                    <div className="dotcom-blurb mb-4">
                      <strong>About Me:</strong><br />
                      We&apos;re not just developers - we&apos;re your technical partners! 25 years of enterprise experience meets cutting-edge AI. We answer our phones, show up to meetings, and treat your project like our own.
                      <br /><br />
                      <em>&quot;No vibe coders here - just battle-tested engineers who&apos;ve seen it all.&quot;</em>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Link href="/contact" className="dotcom-button dotcom-button-primary">
                        Add to Friends
                      </Link>
                      <Link href="/contact" className="dotcom-button">
                        Send Message
                      </Link>
                      <Link href="/services" className="dotcom-button">
                        View Services
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Project Friends */}
          <div className="lg:col-span-2 space-y-6">
            {/* Featured Projects as "Friends" */}
            <div className="dotcom-profile-box">
              <div className="dotcom-header">
                ServiceVision&apos;s Top Projects ({featuredProjects.length})
              </div>
              <div className="dotcom-content">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {featuredProjects.map((project, index) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block p-3 border-2 transition-all ${
                        selectedProject === index
                          ? "border-[#ff6600] bg-[#fff8f0]"
                          : "border-[#cccccc] hover:border-[#336699]"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedProject(index);
                      }}
                    >
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#6699cc] to-[#336699] flex items-center justify-center text-white font-bold mb-2">
                        {project.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="text-center">
                        <div className="dotcom-link font-bold text-[12px]">{project.name}</div>
                        <div className="text-[10px] text-gray-500">{project.friends} users</div>
                        <div className="text-[10px] mt-1">
                          Mood: <em>{project.mood}</em>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Selected Project Details */}
                <div className="mt-6 pt-4 border-t border-[#cccccc]">
                  <h3 className="font-bold text-[14px] mb-2 text-[#003366]">
                    ★ {featuredProjects[selectedProject].name} ★
                  </h3>
                  <p className="text-[11px] mb-3">{featuredProjects[selectedProject].description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {featuredProjects[selectedProject].tech.map((t) => (
                      <span key={t} className="bg-[#336699] text-white text-[10px] px-2 py-0.5">
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href={featuredProjects[selectedProject].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dotcom-button dotcom-button-primary"
                  >
                    Visit Site →
                  </a>
                </div>
              </div>
            </div>

            {/* NDA Projects as "Private Albums" */}
            <div className="dotcom-profile-box">
              <div className="dotcom-header">
                🔒 Private Projects (NDA Protected)
              </div>
              <div className="dotcom-content">
                <div className="dotcom-blurb mb-4">
                  <strong>Note:</strong> These projects are under NDA. Details available during consultation. Click &quot;Request Access&quot; to learn more!
                </div>
                <div className="space-y-3">
                  {ndaProjects.map((project, index) => (
                    <div key={project.id} className="flex items-center gap-3 p-2 border border-[#dddddd] hover:bg-[#f8f8f8]">
                      <div className="w-10 h-10 bg-[#999999] flex items-center justify-center text-white text-[10px] font-bold">
                        🔒
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[11px] text-[#003366]">
                          {project.industry} - {project.type}
                        </div>
                        <div className="text-[10px] text-gray-600">{project.description}</div>
                        <div className="text-[10px] text-[#006600]">Result: {project.outcome}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Link href="/contact" className="dotcom-button dotcom-button-primary">
                    Request Access to Full Case Studies
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Widgets */}
          <div className="space-y-6">
            {/* Contact Widget */}
            <div className="dotcom-profile-box">
              <div className="dotcom-header">
                📧 Contact ServiceVision
              </div>
              <div className="dotcom-content text-center">
                <div className="mb-3">
                  <span className="dotcom-sparkle text-2xl">✉</span>
                </div>
                <p className="text-[11px] mb-3">
                  Want to work together? Drop us a line!
                </p>
                <Link href="/contact" className="dotcom-button dotcom-button-primary block">
                  Send Message
                </Link>
                <div className="mt-3 text-[10px] text-gray-500">
                  Response time: ~4 hours
                </div>
              </div>
            </div>

            {/* Stats Widget */}
            <div className="dotcom-profile-box">
              <div className="dotcom-header">
                📊 Our Stats
              </div>
              <div className="dotcom-content">
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span>Years Experience:</span>
                    <strong>25+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Projects Completed:</span>
                    <strong>150+</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Satisfaction:</span>
                    <strong>98%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance Rate:</span>
                    <strong>100%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Profit to Charity:</span>
                    <strong>25%</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Guestbook Widget */}
            <div className="dotcom-profile-box">
              <div className="dotcom-header">
                📝 Guestbook
              </div>
              <div className="dotcom-content">
                <div className="space-y-3 text-[10px]">
                  <div className="border-b border-[#eeeeee] pb-2">
                    <div className="text-[#003399] font-bold">★ TechStartupCEO</div>
                    <div className="text-gray-600">They actually pick up the phone! 10/10</div>
                  </div>
                  <div className="border-b border-[#eeeeee] pb-2">
                    <div className="text-[#003399] font-bold">★ EnterpriseArch</div>
                    <div className="text-gray-600">Compliance? Sorted. AI? Brilliant.</div>
                  </div>
                  <div>
                    <div className="text-[#003399] font-bold">★ HealthTechPM</div>
                    <div className="text-gray-600">HIPAA compliant AND user-friendly!</div>
                  </div>
                </div>
                <Link href="/contact" className="dotcom-button block text-center mt-3">
                  Sign Guestbook
                </Link>
              </div>
            </div>

            {/* Web Ring */}
            <div className="dotcom-profile-box">
              <div className="dotcom-header">
                🔗 ServiceVision Web Ring
              </div>
              <div className="dotcom-content text-center text-[10px]">
                <div className="flex justify-center gap-4 mb-2">
                  <Link href="/services" className="dotcom-link">&lt;&lt; Prev</Link>
                  <span>|</span>
                  <Link href="/" className="dotcom-link">Home</Link>
                  <span>|</span>
                  <Link href="/ai" className="dotcom-link">Next &gt;&gt;</Link>
                </div>
                <div className="text-gray-500">
                  Part of the Tech Excellence Web Ring
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Banner */}
        <div className="mt-8 text-center">
          <div className="inline-block bg-[#000033] text-[#00ff00] px-6 py-2 font-mono text-[10px]">
            Best viewed in Netscape Navigator 4.0+ | 800x600 resolution | 16-bit color
          </div>
          <div className="mt-2">
            <img
              src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
              alt=""
              className="inline-block"
              style={{ width: 88, height: 31, background: "linear-gradient(90deg, #336699, #6699cc)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
