"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import EraToggle from "@/components/EraToggle";

const services = [
  {
    id: "saas",
    title: "SaaS Product Development",
    description: "Your dedicated engineering team builds AI-powered applications with the compliance and security your customers demand.",
    features: [
      "Named project lead with direct communication",
      "Compliance-first architecture design",
      "Weekly progress calls and demos",
      "Full documentation and knowledge transfer",
      "90-day post-launch support included",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
  },
  {
    id: "enterprise-ai",
    title: "Enterprise AI Solutions",
    description: "AI implementations built for regulated industries. We understand SOC 2, HIPAA, and the audits that come with them.",
    features: [
      "Dedicated compliance review process",
      "Human-in-the-loop AI design",
      "Audit trail and explainability built in",
      "Executive stakeholder communication",
      "On-call support with 4-hour response SLA",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
  },
  {
    id: "startup",
    title: "Startup Technical Partnership",
    description: "More than contractors - a technical partner invested in your success. We answer our phones and show up to your board meetings.",
    features: [
      "Weekly strategy calls with senior engineers",
      "Direct Slack/phone access to your team",
      "Investor deck and due diligence support",
      "Flexible engagement as you grow",
      "No lock-in - we earn your business monthly",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    id: "ai-integration",
    title: "AI Integration & Augmentation",
    description: "Add AI to your existing systems with guardrails and oversight. We make sure it works before your customers see it.",
    features: [
      "Thorough testing before any production deployment",
      "Human review of AI outputs in critical paths",
      "Rollback plans and monitoring dashboards",
      "Staff training and change management",
      "Ongoing optimization and support",
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
      </svg>
    ),
  },
];

const process = [
  { step: "01", title: "Listen", desc: "We learn your business and constraints" },
  { step: "02", title: "Plan", desc: "Collaborative design with your team" },
  { step: "03", title: "Build", desc: "Weekly demos, you always know status" },
  { step: "04", title: "Support", desc: "Real support post-launch, not a help desk" },
];

// Modern UI Version
function ModernServices() {
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Enterprise-grade solutions built by engineers who understand your constraints.
            No salespeople, no hand-offs - just senior talent working directly with you.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative bg-[#111] border rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                activeService === service.id
                  ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                  : "border-[#222] hover:border-[#333]"
              }`}
              onClick={() => setActiveService(activeService === service.id ? null : service.id)}
            >
              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg transition-colors ${
                  activeService === service.id
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-[#1a1a1a] text-gray-400 group-hover:text-emerald-400"
                }`}>
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                </div>
              </div>

              {/* Expanded Features */}
              <div className={`overflow-hidden transition-all duration-300 ${
                activeService === service.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="pt-4 border-t border-[#222]">
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="text-emerald-500 mt-0.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Expand indicator */}
              <div className="absolute bottom-4 right-4">
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    activeService === service.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">How We Work Together</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {process.map((item, i) => (
              <div key={item.step} className="relative">
                <div className="bg-[#111] border border-[#222] rounded-lg p-5 h-full">
                  <div className="text-3xl font-bold text-emerald-500/30 mb-2">{item.step}</div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-emerald-500/10 border border-emerald-500/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-6">
            Schedule a call with a senior engineer. No salespeople, no pressure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Start a Conversation
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Windows 95 Retro Version
const wizardSteps = [
  {
    id: 1,
    title: "Welcome",
    content: {
      heading: "Welcome to ServiceVision Setup Wizard",
      description: "This wizard will help you understand our services and find the right solution for your project.",
      details: [
        "Learn about our service offerings",
        "Understand our process",
        "See how we can help your business",
      ],
    },
  },
  {
    id: 2,
    title: "SaaS Products",
    content: {
      heading: "SaaS Product Development",
      description: "Your dedicated engineering team builds AI-powered applications with the compliance and security your customers demand.",
      details: [
        "Named project lead with direct communication",
        "Compliance-first architecture design",
        "Weekly progress calls and demos",
        "Full documentation and knowledge transfer",
        "90-day post-launch support included",
      ],
    },
  },
  {
    id: 3,
    title: "Enterprise AI",
    content: {
      heading: "Enterprise AI Solutions",
      description: "AI implementations built for regulated industries. We understand SOC 2, HIPAA, and the audits that come with them.",
      details: [
        "Dedicated compliance review process",
        "Human-in-the-loop AI design",
        "Audit trail and explainability built in",
        "Executive stakeholder communication",
        "On-call support with 4-hour response SLA",
      ],
    },
  },
  {
    id: 4,
    title: "Startup Partnership",
    content: {
      heading: "Startup Technical Partnership",
      description: "More than contractors—a technical partner invested in your success. We answer our phones and show up to your board meetings.",
      details: [
        "Weekly strategy calls with senior engineers",
        "Direct Slack/phone access to your team",
        "Investor deck and due diligence support",
        "Flexible engagement as you grow",
        "No lock-in—we earn your business monthly",
      ],
    },
  },
  {
    id: 5,
    title: "AI Integration",
    content: {
      heading: "AI Integration & Augmentation",
      description: "Add AI to your existing systems with guardrails and oversight. We make sure it works before your customers see it.",
      details: [
        "Thorough testing before any production deployment",
        "Human review of AI outputs in critical paths",
        "Rollback plans and monitoring dashboards",
        "Staff training and change management",
        "Ongoing optimization and support",
      ],
    },
  },
  {
    id: 6,
    title: "Our Process",
    content: {
      heading: "How We Work Together",
      description: "A collaborative, iterative approach that keeps you informed at every step.",
      details: [
        "01. Listen — We learn your business and constraints",
        "02. Plan — Collaborative design with your team",
        "03. Build — Weekly demos, you always know status",
        "04. Support — Real support post-launch, not a help desk",
      ],
    },
  },
  {
    id: 7,
    title: "Finish",
    content: {
      heading: "Ready to Get Started?",
      description: "Schedule a call with a senior engineer. No salespeople, no pressure—just an honest conversation about what you need.",
      details: [
        "Free consultation call",
        "No obligation to proceed",
        "Talk directly with engineers",
        "Get honest project assessment",
      ],
    },
  },
];

function RetroServices() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ message: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Easter egg states
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showClippy, setShowClippy] = useState(false);
  const [helpClicks, setHelpClicks] = useState(0);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showShutdown, setShowShutdown] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [showGame, setShowGame] = useState(false);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clippy appears after 3 help clicks
  useEffect(() => {
    if (helpClicks >= 3 && !showClippy) {
      setShowClippy(true);
    }
  }, [helpClicks, showClippy]);

  // ESC key to close game
  useEffect(() => {
    if (!showGame) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowGame(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showGame]);

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Services Wizard Inquiry",
          email: formData.email,
          message: `What can we help you deliver?\n\n${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleBarClose = () => {
    setShowErrorDialog(true);
  };

  const handleDesktopClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount > 0 && clickCount % 10 === 0) {
      setShowErrorDialog(true);
    }
    setShowStartMenu(false);
  };

  const step = wizardSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === wizardSteps.length - 1;

  return (
    <div
      className="min-h-screen bg-[#008080] flex items-center justify-center p-4 pt-20 pb-16"
      onClick={handleDesktopClick}
    >
      {/* Windows 95 Wizard Window */}
      {!isMinimized && (
        <div className="win95-window w-[80vw] h-[80vh] max-w-5xl flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Title Bar */}
          <div className="win95-titlebar">
            <span className="win95-titlebar-text">ServiceVision Services Wizard</span>
            <div className="win95-titlebar-buttons">
              <button
                className="win95-titlebar-btn"
                onClick={() => setIsMinimized(true)}
                title="Minimize"
              >
                _
              </button>
              <button
                className="win95-titlebar-btn"
                onClick={() => setHelpClicks(prev => prev + 1)}
                title="Help"
              >
                ?
              </button>
              <button
                className="win95-titlebar-btn"
                onClick={handleTitleBarClose}
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* Wizard Content */}
          <div className="flex flex-1 min-h-0">
            {/* Left Sidebar */}
            <div className="win95-wizard-sidebar hidden sm:flex sm:flex-col w-48">
              <div className="win95-wizard-sidebar-title text-lg">
                ServiceVision
                <br />
                Services
                <br />
                Wizard
              </div>
              <div className="mt-8 space-y-1">
                {wizardSteps.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStep(i)}
                    className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                      i === currentStep
                        ? "text-white font-bold bg-blue-800/50"
                        : i < currentStep
                        ? "text-blue-200 hover:bg-blue-800/30 cursor-pointer"
                        : "text-blue-300/60 hover:bg-blue-800/20 cursor-pointer"
                    }`}
                  >
                    {i < currentStep ? "✓ " : ""}
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 win95-content flex flex-col overflow-y-auto">
              {/* Step Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4 text-[#000080]" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
                  {step.content.heading}
                </h2>

                <p className="text-base mb-4 leading-relaxed text-[#333]" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
                  {step.content.description}
                </p>

                {/* Features List */}
                <div className="win95-inset mt-4">
                  <div className="space-y-3">
                    {step.content.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3 text-base text-[#333]" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
                        <span className="text-green-700">►</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Link on Welcome */}
                {isFirstStep && (
                  <div className="mt-6 win95-groupbox">
                    <span className="win95-groupbox-title text-base" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
                      Explore Our AI Capabilities
                    </span>
                    <Link
                      href="/ai"
                      className="text-base text-blue-800 underline hover:text-blue-600"
                      style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}
                    >
                      → Learn about our AI expertise in an interactive format
                    </Link>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="win95-divider mt-auto" />

              {/* Progress */}
              <div className="mb-4">
                <div className="text-sm mb-2 text-[#333]" style={{ fontFamily: 'MS Sans Serif, Arial, sans-serif' }}>
                  Step {currentStep + 1} of {wizardSteps.length}
                </div>
                <div className="win95-progress h-5">
                  <div
                    className="win95-progress-bar transition-all duration-300 h-full"
                    style={{
                      width: `${((currentStep + 1) / wizardSteps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center bg-[#c0c0c0] py-2">
                <button
                  onClick={handleBack}
                  disabled={isFirstStep}
                  className="win95-btn"
                  style={{ color: isFirstStep ? "#808080" : "#000000" }}
                >
                  &lt; Back
                </button>

                <div className="flex gap-2">
                  <Link href="/" className="win95-btn" style={{ color: "#000000" }}>
                    Cancel
                  </Link>

                  {isLastStep ? (
                    <button
                      onClick={handleFinish}
                      className="win95-btn win95-btn-primary"
                      style={{ color: "#000000", fontWeight: "bold" }}
                    >
                      Finish
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="win95-btn win95-btn-primary"
                      style={{ color: "#000000" }}
                    >
                      Next &gt;
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized state - show in taskbar */}
      {isMinimized && (
        <div className="text-center">
          <p className="text-white font-mono text-sm mb-4">Window minimized to taskbar</p>
          <p className="text-white/60 font-mono text-xs">Click the taskbar button to restore</p>
        </div>
      )}

      {/* Win95 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={(e) => e.stopPropagation()}>
          <div className="win95-window w-full max-w-md animate-fade-in">
            <div className="win95-titlebar">
              <span className="win95-titlebar-text">Get Started</span>
              <div className="win95-titlebar-buttons">
                <button
                  className="win95-titlebar-btn"
                  onClick={() => setShowModal(false)}
                >
                  ×
                </button>
              </div>
            </div>

            <div className="win95-content">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="win95-text-large font-bold mb-2">Message Sent!</h3>
                  <p className="win95-text mb-6">
                    We&apos;ll be in touch within 4 hours.
                  </p>
                  <button
                    onClick={() => setShowModal(false)}
                    className="win95-btn win95-btn-primary"
                    style={{ color: "#000000", fontWeight: "bold" }}
                  >
                    OK
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="win95-text font-bold block mb-2">
                      What can we help you deliver?
                    </label>
                    <div className="win95-inset">
                      <textarea
                        rows={4}
                        className="w-full bg-white border-0 p-2 win95-text resize-none focus:outline-none"
                        placeholder="Describe your project or challenge..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="win95-text font-bold block mb-2">
                      Your Email Address:
                    </label>
                    <div className="win95-inset">
                      <input
                        type="email"
                        className="w-full bg-white border-0 p-2 win95-text focus:outline-none"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="win95-divider" />

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      onClick={() => setShowModal(false)}
                      className="win95-btn"
                      style={{ color: "#000000" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.email || !formData.message}
                      className="win95-btn win95-btn-primary"
                      style={{
                        color: (!formData.email || !formData.message) ? "#808080" : "#000000",
                        fontWeight: "bold"
                      }}
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clippy Easter Egg */}
      {showClippy && (
        <div
          className="fixed bottom-20 right-8 z-50 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win95-window w-64">
            <div className="win95-titlebar py-1">
              <span className="win95-titlebar-text text-[10px]">Office Assistant</span>
              <button
                className="win95-titlebar-btn text-[8px]"
                onClick={() => setShowClippy(false)}
              >
                ×
              </button>
            </div>
            <div className="win95-content py-3 flex gap-3">
              <div className="text-4xl">📎</div>
              <div className="flex-1">
                <p className="win95-text text-[11px] mb-2">
                  It looks like you&apos;re trying to build enterprise software!
                </p>
                <p className="win95-text text-[10px] text-gray-600">
                  Would you like help with that?
                </p>
                <div className="mt-2 flex gap-1">
                  <Link href="/contact" className="win95-btn text-[10px] py-0.5 px-2">
                    Yes please!
                  </Link>
                  <button
                    className="win95-btn text-[10px] py-0.5 px-2"
                    onClick={() => setShowClippy(false)}
                  >
                    Go away
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Dialog Easter Egg */}
      {showErrorDialog && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win95-window w-80 animate-fade-in">
            <div className="win95-titlebar">
              <span className="win95-titlebar-text">ServiceVision</span>
            </div>
            <div className="win95-content">
              <div className="flex gap-4 mb-4">
                <div className="text-4xl">⚠️</div>
                <div className="flex-1">
                  <p className="win95-text mb-2">
                    Are you sure you want to leave without starting a project?
                  </p>
                  <p className="win95-text text-[10px] text-gray-600">
                    (Just kidding, you can explore all you want!)
                  </p>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                <button
                  className="win95-btn"
                  onClick={() => setShowErrorDialog(false)}
                >
                  Keep Exploring
                </button>
                <Link href="/contact" className="win95-btn win95-btn-primary">
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Drop Game */}
      {showGame && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="bg-[#c0c0c0] border-b-2 border-white px-2 py-1 flex items-center justify-between">
            <span className="win95-text text-sm font-bold">🎮 Block Drop - ServiceVision Games</span>
            <button
              onClick={() => setShowGame(false)}
              className="win95-btn py-0 px-2 text-sm"
            >
              × Close
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            <iframe
              src="/games/blocks.html"
              className="w-full h-full max-w-[600px] max-h-[700px] border-4 border-[#c0c0c0]"
              title="Block Drop"
            />
          </div>
        </div>
      )}

      {/* Shutdown Screen Easter Egg */}
      {showShutdown && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-[100]">
          <div className="text-center">
            <p className="text-[#ffcc00] font-mono text-xl mb-4">
              It&apos;s now safe to turn off your computer.
            </p>
            <p className="text-white/60 font-mono text-sm mb-8">
              Or you could start a project with ServiceVision...
            </p>
            <button
              className="text-white/40 font-mono text-xs underline"
              onClick={() => setShowShutdown(false)}
            >
              Click to restart
            </button>
          </div>
        </div>
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <div
          className="fixed bottom-10 left-2 z-50 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="win95-window w-56">
            <div className="flex">
              {/* Blue sidebar */}
              <div className="w-8 bg-gradient-to-b from-[#000080] to-[#1084d0] flex items-end pb-2">
                <span className="text-white text-[10px] font-bold transform -rotate-90 whitespace-nowrap origin-bottom-left translate-x-5">
                  ServiceVision 95
                </span>
              </div>
              {/* Menu items */}
              <div className="flex-1 py-1">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text"
                >
                  <span>🏠</span> Home
                </Link>
                <Link
                  href="/portfolio"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text"
                >
                  <span>📁</span> Portfolio
                </Link>
                <Link
                  href="/ai"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text"
                >
                  <span>🤖</span> AI Chat
                </Link>
                <Link
                  href="/about"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text"
                >
                  <span>ℹ️</span> About
                </Link>
                <div className="win95-divider mx-2 my-1" />
                <button
                  onClick={() => {
                    setShowStartMenu(false);
                    setShowGame(true);
                  }}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text w-full text-left"
                >
                  <span>🎮</span> Games
                </button>
                <Link
                  href="/contact"
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text"
                >
                  <span>📧</span> Contact Us
                </Link>
                <button
                  onClick={() => setShowShutdown(true)}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white win95-text w-full text-left"
                >
                  <span>🔌</span> Shut Down...
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Icons */}
      <div className="fixed bottom-16 left-8 hidden lg:flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
        <Link href="/" className="flex flex-col items-center group">
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            🏠
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            Home
          </span>
        </Link>
        <Link href="/ai" className="flex flex-col items-center group">
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            🤖
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            AI Chat
          </span>
        </Link>
        <Link href="/portfolio" className="flex flex-col items-center group">
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            📁
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            Portfolio
          </span>
        </Link>
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => setShowErrorDialog(true)}>
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            🗑️
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            Recycle Bin
          </span>
        </div>
        <div className="flex flex-col items-center group cursor-pointer" onClick={() => setShowGame(true)}>
          <div className="w-12 h-12 bg-[#c0c0c0] border border-white/50 flex items-center justify-center text-2xl">
            🎮
          </div>
          <span className="text-white text-xs mt-1 bg-[#008080] px-1 group-hover:bg-[#000080]">
            Games
          </span>
        </div>
      </div>

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white hidden lg:flex items-center px-2 z-40">
        <button
          className="win95-btn py-1 px-3 flex items-center gap-2"
          onClick={(e) => {
            e.stopPropagation();
            setShowStartMenu(!showStartMenu);
          }}
        >
          <span className="text-lg">🪟</span>
          <span className="win95-text font-bold">Start</span>
        </button>

        {/* Taskbar buttons */}
        {isMinimized && (
          <button
            className="win95-btn py-1 px-3 ml-2 flex items-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(false);
            }}
          >
            <span className="win95-text text-[11px]">📋 Services Wizard</span>
          </button>
        )}

        <div className="flex-1" />

        {/* System tray */}
        <div className="flex items-center gap-2">
          <span className="win95-text text-[10px]">🔊</span>
          <span className="win95-text text-[10px]">🔌</span>
          <div className="win95-inset px-3 py-0.5 win95-text text-[11px]">
            {currentTime}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Page Component with Era Toggle
export default function ServicesPage() {
  return (
    <EraToggle beforeYear="1995" beforeLabel="Windows 95 Era" defaultModern={true}>
      {{
        before: <RetroServices />,
        after: <ModernServices />,
      }}
    </EraToggle>
  );
}
