"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function ServicesPage() {
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
      className="min-h-screen bg-[#008080] flex items-center justify-center p-4 pt-24 pb-16"
      onClick={handleDesktopClick}
    >
      {/* Windows 95 Wizard Window */}
      {!isMinimized && (
        <div className="win95-window w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
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
          <div className="flex">
            {/* Left Sidebar */}
            <div className="win95-wizard-sidebar hidden sm:block">
              <div className="win95-wizard-sidebar-title">
                ServiceVision
                <br />
                Services
                <br />
                Wizard
              </div>
              <div className="mt-8">
                {wizardSteps.map((s, i) => (
                  <div
                    key={s.id}
                    className={`text-xs py-1 ${
                      i === currentStep
                        ? "text-white font-bold"
                        : i < currentStep
                        ? "text-blue-200"
                        : "text-blue-300/60"
                    }`}
                  >
                    {i < currentStep ? "✓ " : ""}
                    {s.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 win95-content">
              {/* Step Content */}
              <div className="min-h-[280px]">
                <h2 className="win95-text-large font-bold mb-4">
                  {step.content.heading}
                </h2>

                <p className="win95-text mb-4 leading-relaxed">
                  {step.content.description}
                </p>

                {/* Features List */}
                <div className="win95-inset mt-4">
                  <div className="space-y-2">
                    {step.content.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-2 win95-text">
                        <span className="text-green-700">►</span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Link on Welcome */}
                {isFirstStep && (
                  <div className="mt-6 win95-groupbox">
                    <span className="win95-groupbox-title win95-text">
                      Explore AI Capabilities
                    </span>
                    <Link
                      href="/ai"
                      className="win95-text text-blue-800 underline hover:text-blue-600"
                    >
                      → Learn about our AI expertise in an interactive format
                    </Link>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="win95-divider" />

              {/* Progress */}
              <div className="mb-4">
                <div className="win95-text mb-2">
                  Step {currentStep + 1} of {wizardSteps.length}
                </div>
                <div className="win95-progress">
                  <div
                    className="win95-progress-bar transition-all duration-300"
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
