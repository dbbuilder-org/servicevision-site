"use client";

import Link from "next/link";
import { useState } from "react";
import EraToggle from "@/components/EraToggle";

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

// Modern Portfolio UI
function ModernPortfolio() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Portfolio
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            25 years of delivering enterprise solutions. From startups to Fortune 500,
            we build software that works.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Years Experience", value: "25+" },
            { label: "Projects Completed", value: "150+" },
            { label: "Client Satisfaction", value: "98%" },
            { label: "Profit to Charity", value: "25%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111] border border-[#222] rounded-lg p-4 text-center"
            >
              <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Featured Projects */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#111] border border-[#222] rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
              >
                {/* Project Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-400 font-bold text-lg mb-4 group-hover:from-emerald-500/30 group-hover:to-emerald-600/30 transition-colors">
                  {project.name.substring(0, 2).toUpperCase()}
                </div>

                {/* Project Info */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-[#1a1a1a] text-gray-400 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <div className="mt-4 flex items-center text-sm text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit Site
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* NDA Projects */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Enterprise Projects (NDA)
          </h2>
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
            <div className="p-4 bg-purple-500/5 border-b border-[#222]">
              <p className="text-sm text-gray-400">
                Details available during consultation. These represent a sample of our enterprise work.
              </p>
            </div>
            <div className="divide-y divide-[#222]">
              {ndaProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {project.industry} - {project.type}
                        </div>
                        <div className="text-sm text-gray-500">{project.description}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-emerald-400">{project.outcome}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-purple-500/10 via-emerald-500/5 to-purple-500/10 border border-purple-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Want to See More?</h2>
          <p className="text-gray-400 mb-6">
            Schedule a call to discuss detailed case studies and how we can help with your project.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Request Case Studies
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// MySpace/Dot-com Era Portfolio
function RetroPortfolio() {
  const [selectedProject, setSelectedProject] = useState(0);

  return (
    <div className="dotcom-page pt-20 pb-12">
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
                Private Projects (NDA Protected)
              </div>
              <div className="dotcom-content">
                <div className="dotcom-blurb mb-4">
                  <strong>Note:</strong> These projects are under NDA. Details available during consultation. Click &quot;Request Access&quot; to learn more!
                </div>
                <div className="space-y-3">
                  {ndaProjects.map((project) => (
                    <div key={project.id} className="flex items-center gap-3 p-2 border border-[#dddddd] hover:bg-[#f8f8f8]">
                      <div className="w-10 h-10 bg-[#999999] flex items-center justify-center text-white text-[10px] font-bold">
                        NDA
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
                Contact ServiceVision
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
                Our Stats
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
                Guestbook
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
                ServiceVision Web Ring
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

// Main Page Component with Era Toggle
export default function PortfolioPage() {
  return (
    <EraToggle beforeYear="2000" beforeLabel="Dot-Com Era" defaultModern={true}>
      {{
        before: <RetroPortfolio />,
        after: <ModernPortfolio />,
      }}
    </EraToggle>
  );
}
