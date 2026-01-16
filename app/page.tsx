"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import EraBanner from "@/components/EraBanner";
import dynamic from "next/dynamic";

// Lazy load the game to avoid SSR issues
const AsteroidsGame = dynamic(() => import("@/components/AsteroidsGame"), {
  ssr: false,
});

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

// Questions and their answers for the terminal and answer box
const questionsAndAnswers = [
  {
    q: "Where do I start?",
    a: "With a conversation. We'll listen to your challenges, understand your constraints, and give you an honest assessment—not a sales pitch."
  },
  {
    q: "How do I meet compliance?",
    a: "We build compliance in from day one. SOC 2, HIPAA, audit trails—we've done this for regulated industries and know what your auditors will ask."
  },
  {
    q: "Who will own my project?",
    a: "A named project lead who answers their phone. Not a rotating cast of contractors. Someone who knows your codebase and your business."
  },
  {
    q: "Can AI reduce my costs?",
    a: "Yes, but we'll be honest about where. We identify high-impact automation opportunities and build ROI models you can defend to your board."
  },
  {
    q: "How do I scale securely?",
    a: "Architecture that grows with you. We design for your next stage, not just today's problems. Security reviews at every milestone."
  },
  {
    q: "Who understands my industry?",
    a: "25 years across healthcare, finance, logistics, and enterprise. We speak your domain language and know the regulations that keep you up at night."
  },
  {
    q: "Will this pass an audit?",
    a: "We've been through dozens. Audit trails, explainable AI decisions, proper access controls—built in, not bolted on."
  },
  {
    q: "Who answers when I call?",
    a: "Your dedicated team lead. Direct line. 4-hour response SLA. We're not a help desk—we're your technical partners."
  },
  {
    q: "Can I trust the AI output?",
    a: "Human-in-the-loop design for critical decisions. Confidence scores, uncertainty flags, and review workflows where they matter."
  },
  {
    q: "Who treats this like theirs?",
    a: "We do. No lock-in contracts because we earn your business monthly. Your success is our reputation."
  },
];

const terminalQuestions = questionsAndAnswers.map(qa => qa.q);

// The "senior" question to land on - this is the one we want to emphasize
const seniorQuestion = "Who treats this like theirs?";

// Dot matrix intro lines - printed bidirectionally like old printers
const dotMatrixLines = [
  "Your dedicated team of advisors, developers, engineers,",
  "mentors, marketers, product managers, and consultants.",
  "Twenty-five years of enterprise expertise meets cutting-edge AI.",
  "Real value. No hype. Results you can audit.",
];

// WarGames response pool - tractor-fed wisdom
const gameResponsePool = [
  "We are all work, but we also find time to have fun. Please feel free to join in.",
  "Our team ships code by day and high scores by night. Balance is key.",
  "Fun fact: Our best architecture decisions came after intense Asteroids sessions.",
  "Every great developer needs a break. Even WOPR takes time to think.",
  "The only winning move is... to take a break and play a game.",
  "Shall we play a game? How about Global Thermonuclear War? Just kidding. Asteroids.",
  "Professor Falken would approve. Sometimes the best code comes after play.",
  "25 years of shipping software. 25 years of Easter eggs. It's tradition.",
  "AI can write code, but can it beat our Asteroids high score? Doubtful.",
  "Work hard, play hard. That's the ServiceVision way since 2001.",
  "Our Seattle office has a leaderboard. Just saying.",
  "Remember: A strange game. The only winning move is to play.",
  "Fine, don't play. But you're missing out on some quality procrastination.",
  "We've hidden games in enterprise software since before it was cool.",
  "Last chance. The asteroids aren't going to shoot themselves.",
  "Okay, we respect your dedication to work. But the offer stands.",
];

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Home() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showAsteroids, setShowAsteroids] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [landedOnFinal, setLandedOnFinal] = useState(false);

  // "We have the answers" reveal state - shows after 5 seconds
  const [showAnswers, setShowAnswers] = useState(false);
  const answersShown = useRef(false);

  // Dot matrix printer state
  const [printedLines, setPrintedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const printStarted = useRef(false);

  // WarGames "Do you want to play a game?" state
  const [showGamePrompt, setShowGamePrompt] = useState(false);
  const [gamePromptMessages, setGamePromptMessages] = useState<string[]>([]);
  const [gameResponseIndex, setGameResponseIndex] = useState(0);
  const gamePromptShown = useRef(false);
  const tractorFeedRef = useRef<HTMLDivElement>(null);

  // Answers scroll state
  const [hasScrolledAnswers, setHasScrolledAnswers] = useState(false);
  const [showQASection, setShowQASection] = useState(false);
  const [printingComplete, setPrintingComplete] = useState(false);
  const answersBoxRef = useRef<HTMLDivElement>(null);

  // Set up questions: shuffle a few, then end with the senior question
  useEffect(() => {
    // Get random questions (excluding the senior one), take 3-4 of them
    const otherQuestions = terminalQuestions.filter(q => q !== seniorQuestion);
    const randomOthers = shuffleArray(otherQuestions).slice(0, 4);
    // Add senior question at the end
    setQuestions([...randomOthers, seniorQuestion]);
    // Prevent auto-scroll - keep focus at top
    window.scrollTo(0, 0);
  }, []);

  // Show "We have the answers" after landing on the final question
  useEffect(() => {
    if (!landedOnFinal || answersShown.current) return;
    answersShown.current = true;

    const answersDelay = setTimeout(() => {
      setShowAnswers(true);
    }, 2000); // 2 seconds after landing on final question

    return () => clearTimeout(answersDelay);
  }, [landedOnFinal]);

  // Start dot matrix printing after answers are shown
  useEffect(() => {
    if (!showAnswers || printStarted.current) return;
    printStarted.current = true;

    const startDelay = setTimeout(() => {
      setIsPrinting(true);
    }, 500);

    return () => clearTimeout(startDelay);
  }, [showAnswers]);

  // Dot matrix printer effect - bidirectional like real dot matrix
  useEffect(() => {
    if (!isPrinting || currentLineIndex >= dotMatrixLines.length) {
      if (currentLineIndex >= dotMatrixLines.length && !printingComplete) {
        setIsPrinting(false);
        setPrintingComplete(true);
      }
      return;
    }

    const currentLine = dotMatrixLines[currentLineIndex];
    const isReverseDirection = currentLineIndex % 2 === 1; // Odd lines print right-to-left

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setPrintedLines(prev => {
          const newLines = [...prev];
          if (isReverseDirection) {
            // Right to left: build string from the end
            const charsToShow = currentCharIndex + 1;
            newLines[currentLineIndex] = currentLine.slice(currentLine.length - charsToShow);
          } else {
            // Left to right: build string from the start
            newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, 20 + Math.random() * 15); // Fast like dot matrix

      return () => clearTimeout(timeout);
    } else {
      // Line complete, move to next
      const lineDelay = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 100); // Brief pause between lines (carriage return)

      return () => clearTimeout(lineDelay);
    }
  }, [isPrinting, currentLineIndex, currentCharIndex]);

  // WarGames prompt - show 3 seconds after dot matrix printing completes
  useEffect(() => {
    if (!printingComplete || gamePromptShown.current) return;
    gamePromptShown.current = true;

    const promptDelay = setTimeout(() => {
      setShowGamePrompt(true);
    }, 3000);

    return () => clearTimeout(promptDelay);
  }, [printingComplete]);

  // Handle Yes response to game prompt
  const handleGameYes = () => {
    setShowAsteroids(true);
    setShowGamePrompt(false);
    setGamePromptMessages([]);
  };

  // Handle No response to game prompt
  const handleGameNo = () => {
    const response = gameResponsePool[gameResponseIndex % gameResponsePool.length];
    setGamePromptMessages(prev => [...prev, response]);
    setGameResponseIndex(prev => prev + 1);

    // Auto-scroll tractor feed to bottom after state update
    setTimeout(() => {
      if (tractorFeedRef.current) {
        tractorFeedRef.current.scrollTop = tractorFeedRef.current.scrollHeight;
      }
    }, 50);
  };

  // Reveal Q&A section helper
  const revealAndScrollQA = () => {
    if (!showQASection) {
      setShowQASection(true);
      setHasScrolledAnswers(true);
    } else if (answersBoxRef.current) {
      answersBoxRef.current.scrollBy({ top: 80, behavior: 'smooth' });
    }
  };

  // Easter egg: Type "play" anywhere OR Alt+Y/Alt+N for game prompt OR arrow keys for Q&A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Down arrow or Space to reveal/scroll Q&A (when answers are shown)
      if ((e.key === "ArrowDown" || e.key === " ") && showAnswers && printingComplete) {
        e.preventDefault();
        revealAndScrollQA();
        return;
      }

      // Alt+Y to accept game prompt
      if (e.altKey && e.key.toLowerCase() === "y" && showGamePrompt) {
        e.preventDefault();
        handleGameYes();
        return;
      }

      // Alt+N to decline game prompt
      if (e.altKey && e.key.toLowerCase() === "n" && showGamePrompt) {
        e.preventDefault();
        handleGameNo();
        return;
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      const newCode = (secretCode + e.key).slice(-4).toLowerCase();
      setSecretCode(newCode);

      if (newCode === "play") {
        setShowAsteroids(true);
        setSecretCode("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [secretCode, showGamePrompt, showAnswers, printingComplete, showQASection]);

  useEffect(() => {
    if (questions.length === 0) return;
    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isTyping) {
      if (displayedText.length < question.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(question.slice(0, displayedText.length + 1));
        }, 50 + Math.random() * 50);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing current question
        if (isLastQuestion) {
          // On the senior question - stay here, mark as landed
          setLandedOnFinal(true);
        } else {
          // Not the last question - pause then erase
          const timeout = setTimeout(() => {
            setIsTyping(false);
          }, 1500);
          return () => clearTimeout(timeout);
        }
      }
    } else {
      // Erasing mode
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        // Done erasing - move to next question
        setCurrentQuestion((prev) => prev + 1);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, currentQuestion, questions]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Easter Egg: Asteroids Game - Type "play" to activate */}
      {showAsteroids && (
        <AsteroidsGame onClose={() => setShowAsteroids(false)} />
      )}

      {/* Hero Section - Terminal Style */}
      <section className="relative min-h-screen flex items-center">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-terminal-grid opacity-50" />

        {/* Subtle glow effects */}
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-8 w-full">
          <div className="max-w-4xl">
            {/* Part 1: "You have the questions..." */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
              You have the questions...
            </h1>

            {/* Terminal Window - Shows rotating questions */}
            <div className="terminal-window animate-terminal-glow mb-8">
              <div className="terminal-header">
                <span className="text-xs text-emerald-400 font-mono">SERVICEVISION</span>
                <span className="text-xs text-gray-600 font-mono ml-auto">v1.0</span>
              </div>

              <div className="terminal-body">
                <div className="flex items-start gap-2">
                  <span className="phosphor-text text-2xl sm:text-3xl lg:text-4xl font-bold font-mono">&gt;</span>
                  <span className="phosphor-text text-2xl sm:text-3xl lg:text-4xl font-bold font-mono whitespace-nowrap">
                    {displayedText}
                    <span className="inline-block w-3 sm:w-4 h-7 sm:h-9 bg-emerald-400 ml-1 animate-blink" />
                  </span>
                </div>
              </div>
            </div>

            {/* Part 2: "We have the answers." - revealed after landing on final question */}
            {showAnswers && (
              <>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 animate-fade-in">
                  We have the answers.
                </h2>

                {/* Answer Box with Dot Matrix Intro + Scrollable Q&A */}
                <div className="bg-[#111] border border-[#333] rounded-lg p-6 mb-10 font-mono">
                  {/* Dot Matrix Intro - printed bidirectionally, only show lines that have content */}
                  <div className="space-y-1">
                    {dotMatrixLines.map((line, index) => {
                      const isReverse = index % 2 === 1;
                      const displayedLine = printedLines[index] || "";
                      const isCurrentLine = index === currentLineIndex && isPrinting;
                      const isComplete = index < currentLineIndex || (index === currentLineIndex && currentCharIndex >= line.length);

                      // Only render lines that have started printing
                      if (!displayedLine && !isCurrentLine) return null;

                      return (
                        <div
                          key={index}
                          className={`text-sm leading-relaxed tracking-wide ${
                            isReverse ? "text-right" : "text-left"
                          }`}
                        >
                          <span className={`${isComplete ? "text-amber-300" : "text-amber-400"}`}>
                            {displayedLine}
                          </span>
                          {isCurrentLine && (
                            <span className="inline-block w-2 h-4 bg-amber-400 ml-0.5 animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Reveal prompt - shows after printing completes, before Q&A revealed */}
                  {printingComplete && !showQASection && (
                    <div className="flex flex-col items-center pt-4 mt-4 border-t border-[#333]">
                      <button
                        onClick={revealAndScrollQA}
                        className="flex items-center gap-3 text-amber-400 hover:text-amber-300 text-sm font-mono cursor-pointer transition-colors group"
                      >
                        <span className="text-lg animate-bounce">↓</span>
                        <span className="border-b border-dashed border-amber-400/50 group-hover:border-amber-300">Read More Answers</span>
                        <span className="text-lg animate-bounce">↓</span>
                      </button>
                      <span className="text-gray-600 text-xs mt-2">Press ↓ or Space</span>
                    </div>
                  )}

                  {/* Scrollable Q&A content - only rendered when revealed */}
                  {showQASection && (
                    <div
                      ref={answersBoxRef}
                      className="max-h-[160px] overflow-y-auto pr-2 scroll-smooth pt-4 mt-4 border-t border-[#333] relative"
                      onScroll={(e) => {
                        if (!hasScrolledAnswers && e.currentTarget.scrollTop > 20) {
                          setHasScrolledAnswers(true);
                        }
                      }}
                      style={{
                        backgroundImage: `repeating-linear-gradient(
                          transparent,
                          transparent 31px,
                          rgba(251, 191, 36, 0.03) 31px,
                          rgba(251, 191, 36, 0.03) 32px
                        )`,
                        backgroundSize: '100% 32px',
                      }}
                    >
                      <div className="space-y-4">
                        {questionsAndAnswers.map((qa, index) => (
                          <div key={index} className="group">
                            <div className="flex items-start gap-2 mb-1">
                              <span className="text-gray-600 text-xs shrink-0">[{String(index + 1).padStart(2, '0')}]</span>
                              <span className="text-amber-400 text-sm font-semibold">{qa.q}</span>
                            </div>
                            <div className="pl-8 text-amber-300/80 text-sm leading-relaxed">
                              {qa.a}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Scroll indicator - fades after scrolling */}
                      <div
                        className={`sticky bottom-0 left-0 right-0 flex flex-col items-center pt-2 transition-opacity duration-500 ${
                          hasScrolledAnswers ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                      >
                        <div className="bg-gradient-to-t from-[#111] via-[#111]/90 to-transparent h-8 w-full absolute bottom-0 pointer-events-none" />
                        <span className="relative text-amber-400/60 text-xs animate-bounce">↓ scroll ↓</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* WarGames "Do you want to play a game?" prompt */}
                {showGamePrompt && (
                  <div className="bg-[#111] border border-[#333] rounded-lg p-6 font-mono">
                    {/* Tractor feed paper - scrollable message history */}
                    {gamePromptMessages.length > 0 && (
                      <div
                        ref={tractorFeedRef}
                        className="max-h-32 overflow-y-auto mb-4 scroll-smooth"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            transparent,
                            transparent 23px,
                            rgba(251, 191, 36, 0.05) 23px,
                            rgba(251, 191, 36, 0.05) 24px
                          )`,
                          backgroundSize: '100% 24px',
                        }}
                      >
                        {/* Tractor feed holes decoration */}
                        <div className="relative">
                          <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-start gap-[18px] pt-1 opacity-30">
                            {gamePromptMessages.map((_, idx) => (
                              <div key={idx} className="w-2 h-2 rounded-full border border-amber-600" />
                            ))}
                          </div>
                          <div className="absolute right-0 top-0 bottom-0 w-4 flex flex-col justify-start gap-[18px] pt-1 opacity-30">
                            {gamePromptMessages.map((_, idx) => (
                              <div key={idx} className="w-2 h-2 rounded-full border border-amber-600" />
                            ))}
                          </div>

                          {/* Messages */}
                          <div className="px-6 py-2 space-y-2">
                            {gamePromptMessages.map((msg, idx) => (
                              <div key={idx} className="text-amber-400/90 text-sm leading-6">
                                <span className="text-gray-600 text-xs mr-2">[{String(idx + 1).padStart(2, '0')}]</span>
                                {msg}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* The question */}
                    <div className="text-amber-400 text-sm sm:text-base mb-3">
                      <span className="text-gray-500">WOPR&gt; </span>
                      Do you want to play a game?
                      {gamePromptMessages.length > 0 && (
                        <span className="text-gray-600 text-xs ml-2">
                          (attempt #{gamePromptMessages.length + 1})
                        </span>
                      )}
                    </div>

                    {/* Yes/No options */}
                    <div className="flex items-center gap-6 text-sm sm:text-base">
                      <button
                        onClick={handleGameYes}
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 px-3 py-1 rounded transition-colors group"
                      >
                        [<span className="underline group-hover:font-bold">Y</span>]es
                      </button>
                      <button
                        onClick={handleGameNo}
                        className="text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 px-3 py-1 rounded transition-colors group"
                      >
                        [<span className="underline group-hover:font-bold">N</span>]o
                      </button>
                      <span className="text-gray-600 text-xs ml-auto hidden sm:inline">
                        Alt+Y / Alt+N
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* CTA Section */}
            <div>
              <div className="font-mono mb-6">
                <span className="text-gray-500">$ </span>
                <span className="text-emerald-400">servicevision</span>
                <span className="text-gray-500"> --start</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
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

      {/* Era Banner - Experience Through the Ages */}
      <EraBanner />

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
              <span className="text-xs text-amber-400 font-mono">CAPABILITIES.SH</span>
              <span className="text-xs text-gray-600 font-mono ml-auto">running...</span>
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
              <span className="text-xs text-emerald-400 font-mono">IMPACT.LOG</span>
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
