"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const services = [
  {
    name: "saas_products",
    title: "SaaS Products",
    description: "From MVP to scale. Your dedicated team builds AI-powered applications with direct access to senior engineers.",
    status: "ACTIVE",
    tag: "POPULAR",
  },
  {
    name: "enterprise_ai",
    title: "Enterprise AI",
    description: "Custom AI solutions with enterprise-grade compliance. SOC 2, HIPAA, audit trails built in.",
    status: "ACTIVE",
    tag: "ENTERPRISE",
  },
  {
    name: "startup_partnership",
    title: "Startup Partnership",
    description: "More than a vendor—a technical partner. Weekly calls, rapid iteration, shared accountability.",
    status: "ACTIVE",
    tag: "STARTUPS",
  },
];

const capabilities = [
  { cmd: "llm_integration", desc: "Custom LLM integrations with human oversight" },
  { cmd: "compliance_automation", desc: "Compliant automation for regulated industries" },
  { cmd: "predictive_analytics", desc: "Predictive analytics with auditable results" },
  { cmd: "conversational_ai", desc: "Conversational AI reviewed by real engineers" },
  { cmd: "document_processing", desc: "Document processing with accuracy guarantees" },
  { cmd: "risk_assessment", desc: "AI features designed for your risk tolerance" },
];

const stats = [
  { label: "compliance_rate", value: "100%", desc: "Compliance Rate" },
  { label: "response_time", value: "4hr", desc: "Response Time" },
  { label: "support_model", value: "1:1", desc: "Dedicated Support" },
  { label: "availability", value: "24/7", desc: "Always Available" },
];

const terminalQuestions = [
  "Where do I even begin?",
  "How can I finish this project?",
  "Who can I trust to help me?",
  "How do I make this SOC 2 compliant?",
  "Can AI actually help my business?",
  "Who knows best practices best?",
  "How do I scale without breaking things?",
  "Where do I find engineers who care?",
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const question = terminalQuestions[currentQuestion];

    if (isTyping) {
      if (displayedText.length < question.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(question.slice(0, displayedText.length + 1));
        }, 50 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentQuestion((prev) => (prev + 1) % terminalQuestions.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentQuestion]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section - Terminal Style */}
      <section className="relative min-h-screen flex items-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-terminal-grid opacity-50" />

        {/* Subtle glow effects */}
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Terminal Window */}
            <div className="terminal-window animate-terminal-glow">
              <div className="terminal-header">
                <div className="flex gap-2">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <span className="ml-4 text-xs text-gray-500 font-mono">you@startup ~ </span>
              </div>

              <div className="terminal-body">
                <div className="text-gray-500 text-sm mb-4 font-mono">$ thinking about your next project...</div>
                <div className="flex items-start gap-2">
                  <span className="phosphor-text text-2xl sm:text-3xl lg:text-4xl font-bold font-mono">&gt;</span>
                  <span className="phosphor-text text-2xl sm:text-3xl lg:text-4xl font-bold font-mono">
                    {displayedText}
                    <span className="inline-block w-3 sm:w-4 h-7 sm:h-9 bg-emerald-400 ml-1 animate-blink" />
                  </span>
                </div>
              </div>
            </div>

            {/* Answer Section */}
            <div className="mt-12 space-y-6">
              <div className="font-mono">
                <span className="text-gray-500">$ </span>
                <span className="text-emerald-400">servicevision</span>
                <span className="text-gray-500"> --help</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                We have the answers.
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
                AI-powered development with engineers who actually pick up the phone.
                <span className="block mt-2 text-emerald-400 font-mono text-lg">
                  Compliance-first. High-touch service. Real accountability.
                </span>
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="btn-retro rounded-lg"
                >
                  Start Conversation
                </Link>
                <Link
                  href="/services"
                  className="btn-retro btn-retro-amber rounded-lg"
                >
                  View Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-8 border-y border-[#2a2a2a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-xs text-gray-500 mb-2">{stat.label}:</div>
                <div className="text-3xl font-bold phosphor-text font-mono">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-dot-matrix opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16">
            <div className="font-mono text-sm text-gray-500 mb-4">
              <span className="text-emerald-400">~/services</span> $ ls -la
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl">
              No ticket systems. No rotating contractors. Just a dedicated team that picks up when you call.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Link
                key={service.name}
                href={`/services#${service.name}`}
                className="terminal-card card-hover p-6 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-emerald-400 px-2 py-1 bg-emerald-400/10 rounded">
                    {service.tag}
                  </span>
                  <span className="font-mono text-xs text-gray-500">
                    [{service.status}]
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="font-mono text-xs text-gray-500 group-hover:text-emerald-400 transition-colors">
                  $ cd {service.name} <span className="animate-blink">_</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-24 border-y border-[#2a2a2a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <div className="font-mono text-sm text-gray-500 mb-4">
              <span className="text-amber-400">root@servicevision</span>:<span className="text-emerald-400">~</span># cat capabilities.txt
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              AI with <span className="gradient-text-amber">Guardrails</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cutting-edge AI with the compliance, security, and human oversight your stakeholders expect.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="terminal-window max-w-4xl mx-auto">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <span className="ml-4 text-xs text-gray-500 font-mono">capabilities.sh</span>
            </div>
            <div className="terminal-body space-y-3">
              {capabilities.map((cap, index) => (
                <div key={cap.cmd} className="flex items-start gap-4 group">
                  <span className="text-emerald-400 font-mono text-sm shrink-0">
                    [{String(index + 1).padStart(2, '0')}]
                  </span>
                  <div>
                    <span className="text-amber-400 font-mono text-sm">{cap.cmd}</span>
                    <span className="text-gray-500 font-mono text-sm"> - </span>
                    <span className="text-gray-300 text-sm">{cap.desc}</span>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-[#2a2a2a]">
                <span className="text-gray-500 font-mono text-sm">$ </span>
                <span className="text-emerald-400 font-mono text-sm">Ready to execute</span>
                <span className="animate-blink ml-1">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-terminal-grid opacity-30" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="terminal-window max-w-3xl mx-auto text-center">
            <div className="terminal-header justify-center">
              <span className="text-xs text-gray-500 font-mono">impact.log</span>
            </div>
            <div className="p-8 sm:p-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-emerald-400 mb-6">
                <span className="text-2xl font-bold phosphor-text font-mono">25%</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Building for <span className="gradient-text">Good</span>
              </h2>

              <p className="text-gray-400 leading-relaxed mb-6 max-w-xl mx-auto">
                We donate <span className="text-emerald-400 font-semibold">25% of our profits</span> to
                organizations using technology to make a positive impact.
              </p>

              <div className="font-mono text-sm">
                <span className="text-gray-500">[LOG] </span>
                <span className="text-emerald-400">profit_share: </span>
                <span className="text-white">tech_for_good_orgs</span>
              </div>

              <div className="mt-8">
                <Link
                  href="/about#impact"
                  className="inline-flex items-center gap-2 text-emerald-400 font-mono text-sm hover:text-emerald-300 transition-colors"
                >
                  Learn more about our impact
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-[#2a2a2a]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-mono text-sm text-gray-500 mb-6">
              <span className="text-emerald-400">$</span> ready_to_start --mode=conversation
            </div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready for AI that{" "}
              <span className="gradient-text">actually works?</span>
            </h2>

            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Skip the chatbot. Talk to a real engineer about your project.
              We&apos;ll give you an honest assessment—not a sales pitch.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="btn-retro rounded-lg text-lg px-8 py-4"
              >
                Start a Conversation
              </Link>
              <Link
                href="/services"
                className="btn-retro btn-retro-amber rounded-lg text-lg px-8 py-4"
              >
                View Services
              </Link>
            </div>

            <div className="mt-12 font-mono text-sm text-gray-500">
              <span className="text-emerald-400">status:</span> online |{" "}
              <span className="text-emerald-400">response_time:</span> 4hr |{" "}
              <span className="text-emerald-400">support:</span> 24/7
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
