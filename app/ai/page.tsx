"use client";

import Link from "next/link";
import { useState, useEffect, useRef, DragEvent } from "react";

interface Message {
  id: number;
  type: "user" | "ai" | "system";
  content: string;
  typing?: boolean;
}

interface BuildingBlock {
  id: string;
  code: string;
  title: string;
  prompt: string;
  category: "capability" | "problem" | "compliance" | "guided";
}

const guidedPrompts: BuildingBlock[] = [
  {
    id: "think-problem",
    code: "THINK",
    title: "Think through a problem",
    prompt: "I have a business challenge I'd like to work through. Can you help me think through it step by step and identify where AI might help?",
    category: "guided",
  },
  {
    id: "work-idea",
    code: "IDEA",
    title: "Work through an idea",
    prompt: "I have an idea for using AI in my business. Can you help me evaluate it and think through the implementation?",
    category: "guided",
  },
  {
    id: "assess-ready",
    code: "READY",
    title: "Am I ready for AI?",
    prompt: "How do I know if my organization is ready for AI? What prerequisites should I have in place?",
    category: "guided",
  },
  {
    id: "build-buy",
    code: "BUILD",
    title: "Build vs Buy",
    prompt: "Should we build custom AI solutions or buy off-the-shelf products? What are the tradeoffs and when does each approach make sense?",
    category: "guided",
  },
  {
    id: "start-pilot",
    code: "MVP",
    title: "Start with a pilot (MVP)",
    prompt: "We want to start small with AI. How do we scope a good pilot project that proves value without too much risk?",
    category: "guided",
  },
  {
    id: "roi-calc",
    code: "ROI",
    title: "Calculate ROI",
    prompt: "Help me think through the ROI of an AI investment. What factors should I consider and how do I build a business case?",
    category: "guided",
  },
];

const capabilityBlocks: BuildingBlock[] = [
  {
    id: "llm",
    code: "LLM",
    title: "Large Language Models (LLM)",
    prompt: "I want to learn about implementing Large Language Models. What are the key considerations for enterprise LLM deployment?",
    category: "capability",
  },
  {
    id: "rag",
    code: "RAG",
    title: "Retrieval Augmented Generation (RAG)",
    prompt: "Tell me about RAG systems. How can I ground AI responses in my company's actual data to prevent hallucinations?",
    category: "capability",
  },
  {
    id: "agent",
    code: "AGENT",
    title: "AI Agents (AGENT)",
    prompt: "I'm interested in AI agents for workflow automation. How do you ensure proper human oversight with autonomous systems?",
    category: "capability",
  },
  {
    id: "nlp",
    code: "NLP",
    title: "Natural Language Processing (NLP)",
    prompt: "How can NLP help us extract meaning from documents, emails, and customer communications? What are the practical applications?",
    category: "capability",
  },
  {
    id: "ml",
    code: "ML",
    title: "Machine Learning (ML)",
    prompt: "What kinds of problems can machine learning solve for us? How do we know if ML is the right approach for our use case?",
    category: "capability",
  },
  {
    id: "pred",
    code: "PRED",
    title: "Predictive Analytics",
    prompt: "How can predictive analytics help my business? I need forecasting that's explainable and auditable.",
    category: "capability",
  },
];

const engineeringBlocks: BuildingBlock[] = [
  {
    id: "requirements",
    code: "REQ",
    title: "Requirements-Centric",
    prompt: "How do you approach requirements gathering? We struggle to get clear requirements from stakeholders before development starts.",
    category: "capability",
  },
  {
    id: "system-design",
    code: "DESIGN",
    title: "System Design",
    prompt: "We need help with system architecture and design. How do you approach designing scalable, maintainable systems?",
    category: "capability",
  },
  {
    id: "prototype",
    code: "MVP",
    title: "Prototype → Product",
    prompt: "We want to go from prototype to production. How do you help take an MVP to a production-ready Product 1.0?",
    category: "capability",
  },
  {
    id: "tdd",
    code: "TDD",
    title: "Test Driven Development",
    prompt: "We want to adopt TDD. How do you implement test-driven development and what's the real-world impact on code quality?",
    category: "capability",
  },
  {
    id: "legacy",
    code: "LEGACY",
    title: "Legacy Modernization",
    prompt: "We have legacy systems that need modernizing. How do you approach strangler fig migrations and incremental rewrites?",
    category: "capability",
  },
  {
    id: "integration",
    code: "INTEG",
    title: "Systems Integration",
    prompt: "We need to integrate multiple systems—ERPs, CRMs, APIs. How do you connect enterprise systems without creating new silos?",
    category: "capability",
  },
  {
    id: "scale",
    code: "SCALE",
    title: "Scale-up & Scale-out",
    prompt: "We need to scale our systems. How do you approach vertical optimization vs horizontal scaling? When do you use each?",
    category: "capability",
  },
  {
    id: "compliance-first",
    code: "COMPLY",
    title: "Compliance-First",
    prompt: "We need to build with compliance in mind from day one—SOC 2, HIPAA, PCI-DSS. How do you architect for compliance?",
    category: "capability",
  },
  {
    id: "ai-accelerated",
    code: "AI+",
    title: "AI-Accelerated",
    prompt: "How can AI accelerate our software development? We want to use AI to build better software faster.",
    category: "capability",
  },
];

const useCaseBlocks: BuildingBlock[] = [
  {
    id: "doc-processing",
    code: "DOCS",
    title: "Document Processing",
    prompt: "We process thousands of documents manually. How could AI help automate document classification, extraction, and routing?",
    category: "problem",
  },
  {
    id: "customer-support",
    code: "SUPPORT",
    title: "Customer Support",
    prompt: "Our support team is overwhelmed. How can AI help with ticket routing, response suggestions, or self-service options?",
    category: "problem",
  },
  {
    id: "knowledge-base",
    code: "KB",
    title: "Knowledge Base",
    prompt: "Our employees can't find information they need. How could AI-powered search help unlock our institutional knowledge?",
    category: "problem",
  },
  {
    id: "data-analysis",
    code: "ANALYZE",
    title: "Data Analysis",
    prompt: "We have lots of data but struggle to get insights. How can AI help with analysis, reporting, and decision support?",
    category: "problem",
  },
  {
    id: "code-assist",
    code: "CODE",
    title: "Dev Velocity",
    prompt: "Our dev team wants to move faster. How can AI coding assistants help while maintaining code quality and security?",
    category: "problem",
  },
  {
    id: "code-review",
    code: "REVIEW",
    title: "Code Review",
    prompt: "Code reviews are a bottleneck. How can AI help automate code review, catch bugs, and enforce standards without slowing us down?",
    category: "problem",
  },
  {
    id: "compliance-check",
    code: "COMPLY",
    title: "Compliance Check",
    prompt: "We need to maintain compliance but it's resource-intensive. How can AI help with monitoring, documentation, and audit prep?",
    category: "problem",
  },
  {
    id: "marketing",
    code: "MARKET",
    title: "Marketing Content",
    prompt: "We need to produce more marketing content faster. How can AI help with copywriting, personalization, and campaign optimization?",
    category: "problem",
  },
  {
    id: "project-planning",
    code: "PLAN",
    title: "Project Planning",
    prompt: "Project planning and estimation is inconsistent. How can AI help with scoping, resource allocation, and risk identification?",
    category: "problem",
  },
  {
    id: "system-architecture",
    code: "ARCH",
    title: "System Architecture",
    prompt: "We're designing new systems and want to make good architectural decisions. How can AI help with architecture review and recommendations?",
    category: "problem",
  },
  {
    id: "scalability",
    code: "SCALE",
    title: "Scalability Design",
    prompt: "We need to scale our systems but aren't sure where the bottlenecks are. How can AI help with performance analysis and scalability planning?",
    category: "problem",
  },
  {
    id: "process-automation",
    code: "AUTO",
    title: "Process Automation",
    prompt: "We have repetitive manual processes that waste time. How can AI identify and automate workflows while maintaining quality?",
    category: "problem",
  },
  {
    id: "data-viz",
    code: "VIZ",
    title: "Data Visualization",
    prompt: "We need better ways to visualize our data. How can AI help create dynamic visualizations and surface insights automatically?",
    category: "problem",
  },
  {
    id: "dashboards",
    code: "DASH",
    title: "Dashboards & BI",
    prompt: "We want smarter dashboards that highlight what matters. How can AI enhance our business intelligence and reporting?",
    category: "problem",
  },
  {
    id: "integrations",
    code: "INTEG",
    title: "Enterprise Integrations",
    prompt: "We need to connect AI with our existing enterprise systems (ERP, CRM, HR). What are the best integration patterns?",
    category: "problem",
  },
];

const techStackBlocks: BuildingBlock[] = [
  // Frontend
  {
    id: "react",
    code: "REACT",
    title: "React",
    prompt: "We're building with React. How can AI enhance our React applications and what integration patterns work best?",
    category: "capability",
  },
  {
    id: "vue",
    code: "VUE",
    title: "Vue.js",
    prompt: "We use Vue.js for our frontend. How can we integrate AI capabilities into our Vue applications?",
    category: "capability",
  },
  {
    id: "nextjs",
    code: "NEXT",
    title: "Next.js",
    prompt: "We're using Next.js. What's the best way to add AI features with server components, API routes, and edge functions?",
    category: "capability",
  },
  // Backend
  {
    id: "python",
    code: "PY",
    title: "Python",
    prompt: "We have Python backend services. How do we integrate AI/ML models and what frameworks work best?",
    category: "capability",
  },
  {
    id: "aspnet",
    code: ".NET",
    title: "ASP.NET Core",
    prompt: "We're a .NET shop using ASP.NET Core. How do we integrate AI capabilities into our existing enterprise stack?",
    category: "capability",
  },
  {
    id: "node",
    code: "NODE",
    title: "Node.js",
    prompt: "We use Node.js for our backend. What's the best approach for adding AI features to our Node services?",
    category: "capability",
  },
  // Databases
  {
    id: "postgres",
    code: "PG",
    title: "PostgreSQL",
    prompt: "We use PostgreSQL. How can we leverage pgvector for embeddings and build AI-powered search?",
    category: "capability",
  },
  {
    id: "sqlserver",
    code: "MSSQL",
    title: "SQL Server",
    prompt: "We're on SQL Server. How do we integrate AI with our existing data and what are the options for vector search?",
    category: "capability",
  },
  {
    id: "oracle",
    code: "ORA",
    title: "Oracle",
    prompt: "We have Oracle databases. How can we add AI capabilities while working with our existing Oracle infrastructure?",
    category: "capability",
  },
  {
    id: "mysql",
    code: "MySQL",
    title: "MySQL",
    prompt: "We use MySQL. What are our options for adding AI features and vector search to our MySQL-based applications?",
    category: "capability",
  },
  // Vector Databases
  {
    id: "pgvector",
    code: "PGVEC",
    title: "pgvector",
    prompt: "We want to use pgvector for embeddings and semantic search. How do we set it up and what are the best practices?",
    category: "capability",
  },
  {
    id: "weaviate",
    code: "WEAV",
    title: "Weaviate",
    prompt: "We're considering Weaviate for vector search. How does it compare to other options and when should we use it?",
    category: "capability",
  },
  {
    id: "pinecone",
    code: "PINE",
    title: "Pinecone",
    prompt: "We're looking at Pinecone for managed vector search. What are the tradeoffs vs self-hosted options?",
    category: "capability",
  },
  // Document Databases
  {
    id: "mongodb",
    code: "MONGO",
    title: "MongoDB",
    prompt: "We use MongoDB. How can we integrate AI features and what are the options for vector search with MongoDB Atlas?",
    category: "capability",
  },
  {
    id: "elasticsearch",
    code: "ELASTIC",
    title: "Elasticsearch",
    prompt: "We use Elasticsearch for search. How can we enhance it with AI for semantic search and better relevance?",
    category: "capability",
  },
  {
    id: "redis",
    code: "REDIS",
    title: "Redis",
    prompt: "We use Redis for caching and real-time data. How can we leverage Redis for AI features like vector similarity and session management?",
    category: "capability",
  },
  // Cloud Platforms
  {
    id: "azure",
    code: "AZURE",
    title: "Azure",
    prompt: "We're on Azure. How do we leverage Azure OpenAI, Cognitive Services, and other Azure AI capabilities?",
    category: "capability",
  },
  {
    id: "aws",
    code: "AWS",
    title: "AWS",
    prompt: "We use AWS. How do we integrate Bedrock, SageMaker, and other AWS AI services into our applications?",
    category: "capability",
  },
  {
    id: "gcp",
    code: "GCP",
    title: "Google Cloud",
    prompt: "We're on Google Cloud. How do we use Vertex AI, Gemini, and other GCP AI services?",
    category: "capability",
  },
  {
    id: "vercel",
    code: "VERCEL",
    title: "Vercel",
    prompt: "We deploy on Vercel. How do we add AI features using edge functions, AI SDK, and serverless architecture?",
    category: "capability",
  },
  {
    id: "render",
    code: "RENDER",
    title: "Render",
    prompt: "We use Render for deployment. What's the best way to deploy AI-powered applications on Render?",
    category: "capability",
  },
];

const integrationBlocks: BuildingBlock[] = [
  // Hosting & Deployment
  {
    id: "vercel",
    code: "VERCEL",
    title: "Vercel",
    prompt: "We want to use Vercel for deployment. How do we leverage Vercel's AI SDK, edge functions, and serverless architecture?",
    category: "capability",
  },
  {
    id: "render",
    code: "RENDER",
    title: "Render",
    prompt: "We're considering Render for backend services. How does it work for AI-powered APIs and background workers?",
    category: "capability",
  },
  {
    id: "cloudflare",
    code: "CF",
    title: "Cloudflare",
    prompt: "We want to use Cloudflare for edge computing and security. How do we leverage Workers, R2, and AI Gateway?",
    category: "capability",
  },
  // Auth
  {
    id: "clerk",
    code: "CLERK",
    title: "Clerk",
    prompt: "We want to use Clerk for authentication. How do we integrate it with AI features and secure API access?",
    category: "capability",
  },
  {
    id: "supabase",
    code: "SUPA",
    title: "Supabase",
    prompt: "We're using Supabase. How can we combine its auth, database, and realtime features with AI capabilities?",
    category: "capability",
  },
  {
    id: "entra",
    code: "ENTRA",
    title: "Azure Entra ID",
    prompt: "We use Azure AD/B2C for enterprise identity. How do we integrate AI features with Azure Entra ID authentication?",
    category: "capability",
  },
  // Email & Communications
  {
    id: "resend",
    code: "RESEND",
    title: "Resend",
    prompt: "We want to use Resend for transactional email. How do we integrate AI-generated content into email workflows?",
    category: "capability",
  },
  // Payments
  {
    id: "stripe",
    code: "STRIPE",
    title: "Stripe",
    prompt: "We use Stripe for payments. How can AI help with fraud detection, pricing optimization, or subscription management?",
    category: "capability",
  },
  // Monitoring
  {
    id: "sentry",
    code: "SENTRY",
    title: "Sentry",
    prompt: "We want to use Sentry for monitoring. How do we track AI model performance, errors, and user feedback?",
    category: "capability",
  },
  {
    id: "ga4",
    code: "GA4",
    title: "Google Analytics",
    prompt: "We use Google Analytics. How do we track AI feature adoption and measure the impact of AI on user behavior?",
    category: "capability",
  },
  // Mobile
  {
    id: "expo",
    code: "EXPO",
    title: "Expo / EAS",
    prompt: "We're building with Expo. How do we add AI features to our React Native app and handle on-device vs cloud processing?",
    category: "capability",
  },
  // AI Providers
  {
    id: "openai",
    code: "OPENAI",
    title: "OpenAI",
    prompt: "We want to use OpenAI's APIs. What are the best practices for GPT-4, embeddings, and DALL-E integration?",
    category: "capability",
  },
  {
    id: "anthropic",
    code: "CLAUDE",
    title: "Anthropic Claude",
    prompt: "We're interested in Claude for complex reasoning tasks. How does it compare to GPT-4 and when should we use it?",
    category: "capability",
  },
  {
    id: "gemini",
    code: "GEMINI",
    title: "Google Gemini",
    prompt: "We're considering Google Gemini. How does it compare to other LLMs and what are the integration options?",
    category: "capability",
  },
  // AI Frameworks
  {
    id: "langchain",
    code: "LCHAIN",
    title: "LangChain",
    prompt: "We want to use LangChain for building AI applications. What are the best patterns for chains, agents, and memory?",
    category: "capability",
  },
  {
    id: "langgraph",
    code: "LGRAPH",
    title: "LangGraph",
    prompt: "We're building complex AI workflows. How can LangGraph help us orchestrate multi-step agent interactions?",
    category: "capability",
  },
  // Data
  {
    id: "deepgram",
    code: "DEEP",
    title: "Deepgram",
    prompt: "We need speech-to-text capabilities. How do we integrate Deepgram for transcription and voice AI features?",
    category: "capability",
  },
];

const complianceBlocks: BuildingBlock[] = [
  {
    id: "soc2",
    code: "SOC2",
    title: "SOC 2 Ready",
    prompt: "We need SOC 2 compliance for our AI systems. What controls and documentation do we need?",
    category: "compliance",
  },
  {
    id: "hipaa",
    code: "HIPAA",
    title: "HIPAA Compliant",
    prompt: "We're in healthcare. How do we implement AI while maintaining HIPAA compliance?",
    category: "compliance",
  },
  {
    id: "ferpa",
    code: "FERPA",
    title: "FERPA Compliant",
    prompt: "We're in education. How do we implement AI while protecting student data under FERPA?",
    category: "compliance",
  },
  {
    id: "gdpr",
    code: "GDPR",
    title: "GDPR Compliant",
    prompt: "We have EU customers. How do we build AI systems that comply with GDPR requirements for data protection and privacy?",
    category: "compliance",
  },
  {
    id: "pci-dss",
    code: "PCI",
    title: "PCI-DSS Ready",
    prompt: "We process payments. How do we implement AI while maintaining PCI-DSS compliance for cardholder data?",
    category: "compliance",
  },
  {
    id: "ccpa",
    code: "CCPA",
    title: "California Privacy",
    prompt: "We have California customers. How do we ensure our AI systems comply with CCPA/CPRA privacy requirements?",
    category: "compliance",
  },
  {
    id: "audit",
    code: "AUDIT",
    title: "Audit Trails",
    prompt: "Our auditors need to understand AI decisions. How do you build explainability and audit trails into AI systems?",
    category: "compliance",
  },
  {
    id: "oversight",
    code: "HUMAN",
    title: "Human Oversight",
    prompt: "How do we maintain appropriate human oversight of AI decisions, especially for critical business processes?",
    category: "compliance",
  },
  {
    id: "blockchain",
    code: "CHAIN",
    title: "Blockchain Tamper-Proofing",
    prompt: "How can blockchain provide immutable audit trails and tamper-proof records for compliance and data integrity?",
    category: "compliance",
  },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null);
  const [showAdventure, setShowAdventure] = useState(false);
  const [secretCode, setSecretCode] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 1,
      type: "ai",
      content: "Hi! I'm here to help you explore AI solutions. Pick a guided conversation above, drag any topic from the page, or just ask me a question.",
    };
    setMessages([greeting]);
  }, []);

  // Secret code "zork" or "adventure" to trigger game
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const newCode = (secretCode + e.key).slice(-9).toLowerCase();
      setSecretCode(newCode);

      if (newCode.includes("zork") || newCode.includes("adventure")) {
        setShowAdventure(true);
        setSecretCode("");
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [secretCode]);

  // ESC key to close game
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showAdventure) {
        setShowAdventure(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showAdventure]);

  useEffect(() => {
    if (hasInteracted && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, currentTypingText, hasInteracted]);

  useEffect(() => {
    if (pendingAnswer && isTyping) {
      if (currentTypingText.length < pendingAnswer.length) {
        const timeout = setTimeout(() => {
          setCurrentTypingText(pendingAnswer.slice(0, currentTypingText.length + 3));
        }, 10);
        return () => clearTimeout(timeout);
      } else {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), type: "ai", content: pendingAnswer },
        ]);
        setCurrentTypingText("");
        setPendingAnswer(null);
        setIsTyping(false);
      }
    }
  }, [currentTypingText, pendingAnswer, isTyping]);

  const sendToAI = async (message: string) => {
    setIsTyping(true);
    setCurrentTypingText("");

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.filter(m => m.type !== "system"),
          userMessage: message,
        }),
      });

      if (!response.ok) throw new Error("Failed to get AI response");

      const data = await response.json();
      setPendingAnswer(data.message);
    } catch {
      setPendingAnswer("I apologize, but I'm having trouble connecting right now. Please try again or contact us directly at info@servicevision.io.");
    }
  };

  const handleBlockClick = (block: BuildingBlock) => {
    if (isTyping) return;

    setSidebarOpen(true);
    setSidebarCollapsed(false);
    setHasInteracted(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", content: block.prompt },
    ]);

    sendToAI(block.prompt);
  };

  const handleDragStart = (e: DragEvent, block: BuildingBlock) => {
    e.dataTransfer.setData("application/json", JSON.stringify(block));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    try {
      const data = e.dataTransfer.getData("application/json");
      const block: BuildingBlock = JSON.parse(data);
      handleBlockClick(block);
    } catch {
      // Invalid drop data
    }
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const message = userInput.trim();
    setUserInput("");
    setHasInteracted(true);

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", content: message },
    ]);

    sendToAI(message);
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      type: "ai",
      content: "Chat cleared! Pick a topic above or drag any block from the page to start fresh.",
    }]);
    setHasInteracted(false);
  };

  const InlineBlock = ({ block }: { block: BuildingBlock }) => (
    <span
      draggable
      onDragStart={(e) => handleDragStart(e, block)}
      onClick={() => handleBlockClick(block)}
      title={`Click to discuss: ${block.prompt.slice(0, 80)}...`}
      className="text-purple-400 underline decoration-purple-500/50 underline-offset-2 cursor-pointer hover:text-purple-300 hover:decoration-purple-400 transition-all"
    >
      {block.title}
    </span>
  );

  const CompactBlock = ({ block }: { block: BuildingBlock }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, block)}
      onClick={() => handleBlockClick(block)}
      title={`Click to discuss: ${block.prompt.slice(0, 80)}...`}
      className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#2a2a2a] rounded-lg cursor-grab active:cursor-grabbing hover:border-purple-500/50 transition-all select-none group"
    >
      <span className="font-mono text-[10px] text-purple-400 px-1.5 py-0.5 bg-purple-400/10 rounded shrink-0">
        {block.code}
      </span>
      <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
        {block.title}
      </span>
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <div className="flex">
        {/* Main Content Area */}
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen && !sidebarCollapsed ? "lg:mr-[380px]" : ""}`}>

          {/* Hero Section */}
          <section className="pt-24 pb-12 border-b border-[#2a2a2a]">
            <div className="mx-auto max-w-4xl px-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                <span className="gradient-text-purple">AI</span> That Actually{" "}
                <span className="gradient-text">Works</span>
              </h1>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed max-w-2xl">
                Not demos. Production-ready AI with compliance, security, and human oversight.
                Explore our capabilities by dragging topics to the AI assistant.
              </p>

              <button
                onClick={() => toggleSection('capabilities')}
                className="text-purple-400 hover:text-purple-300 text-sm font-mono mb-4 flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${expandedSections['capabilities'] ? 'rotate-90' : ''}`}>▶</span>
                {expandedSections['capabilities'] ? 'Hide capabilities' : 'Explore key AI competencies'}
              </button>

              {expandedSections['capabilities'] && (
                <div className="flex flex-wrap gap-2 animate-in fade-in duration-200">
                  {capabilityBlocks.map((block) => (
                    <CompactBlock key={block.id} block={block} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* What We Build */}
          <section className="py-12 border-b border-[#2a2a2a]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="font-mono text-xs text-gray-600 mb-2">
                <span className="text-purple-400">~/capabilities</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                What We Build
              </h2>

              <p className="text-gray-400 mb-4">
                Full-lifecycle software engineering from first whiteboard sketch to production at scale—180+ projects over 25 years.
              </p>

              <div className="flex flex-wrap gap-x-1 gap-y-1 text-sm mb-4">
                {engineeringBlocks.map((block) => (
                  <span
                    key={block.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block)}
                    onClick={() => handleBlockClick(block)}
                    title={`Click to discuss: ${block.prompt.slice(0, 80)}...`}
                    className="text-gray-300 hover:text-purple-300 cursor-pointer transition-colors px-2 py-0.5 hover:bg-purple-500/10 rounded"
                  >
                    • {block.title}
                  </span>
                ))}
              </div>

              <button
                onClick={() => toggleSection('whatWeBuild')}
                className="text-purple-400 hover:text-purple-300 text-sm font-mono mb-4 flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${expandedSections['whatWeBuild'] ? 'rotate-90' : ''}`}>▶</span>
                {expandedSections['whatWeBuild'] ? 'Hide details' : 'See how we work'}
              </button>

              {expandedSections['whatWeBuild'] && (
                <div className="space-y-6 text-gray-400 animate-in fade-in duration-200">
                  <p>
                    <span className="text-white font-medium">System design through Product 1.0.</span> From
                    architecture to prototype to production—we've done it 180+ times.
                    We build solutions that work today and scale tomorrow.
                  </p>

                  <p>
                    <span className="text-white font-medium">Legacy modernization.</span> Strangler fig
                    migrations, incremental rewrites, API veneers over aging systems. We've rescued
                    codebases from COBOL to Classic ASP to jQuery spaghetti. Your business logic
                    survives; your technical debt doesn't.
                  </p>

                  <p>
                    <span className="text-white font-medium">Systems integration.</span> ERPs, CRMs,
                    payment processors, identity providers, third-party APIs—we connect them without
                    creating new silos. Event-driven architectures, message queues, and proper
                    observability so you can actually debug production.
                  </p>

                  <p>
                    <span className="text-white font-medium">Scale-up. Scale-out.</span> Vertical
                    optimization when you need performance. Horizontal scaling when you need capacity.
                    Database sharding, read replicas, CDN strategies, edge computing—we right-size
                    your infrastructure for your actual traffic patterns.
                  </p>

                  <p>
                    <span className="text-white font-medium">Compliance by design.</span> SOC 2, HIPAA,
                    FERPA, PCI-DSS—we build audit trails, access controls, and data governance into
                    the architecture from day one. Not bolted on after the auditors call.
                  </p>

                  <p>
                    <span className="text-white font-medium">AI-accelerated.</span> Now we bring{" "}
                    <InlineBlock block={capabilityBlocks[0]} />, <InlineBlock block={capabilityBlocks[1]} />,
                    and <InlineBlock block={capabilityBlocks[2]} /> to every engagement. Our{" "}
                    <InlineBlock block={capabilityBlocks[3]} /> extracts meaning from your data.{" "}
                    <InlineBlock block={capabilityBlocks[4]} /> finds patterns humans miss. And{" "}
                    <InlineBlock block={capabilityBlocks[5]} /> gives you forecasting you can actually explain to the board.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Common Challenges */}
          <section className="py-12 border-b border-[#2a2a2a]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="font-mono text-xs text-gray-600 mb-2">
                <span className="text-purple-400">~/use_cases</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Challenges We Solve
              </h2>

              <p className="text-gray-400 mb-4">
                From document processing to enterprise integrations, we help organizations
                apply AI to real business problems. Our solutions focus on measurable outcomes,
                not just impressive demos.
              </p>

              <button
                onClick={() => toggleSection('challenges')}
                className="text-purple-400 hover:text-purple-300 text-sm font-mono mb-4 flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${expandedSections['challenges'] ? 'rotate-90' : ''}`}>▶</span>
                {expandedSections['challenges'] ? 'Hide options' : 'Explore specific challenges'}
              </button>

              {expandedSections['challenges'] && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Operations & Support</div>
                    <div className="flex flex-wrap gap-2">
                      {useCaseBlocks.slice(0, 4).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Development & Architecture</div>
                    <div className="flex flex-wrap gap-2">
                      {useCaseBlocks.slice(4, 8).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Business Intelligence</div>
                    <div className="flex flex-wrap gap-2">
                      {useCaseBlocks.slice(8, 12).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Data & Integrations</div>
                    <div className="flex flex-wrap gap-2">
                      {useCaseBlocks.slice(12).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Tech Stack */}
          <section className="py-12 border-b border-[#2a2a2a]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="font-mono text-xs text-gray-600 mb-2">
                <span className="text-purple-400">~/stack</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Your <span className="gradient-text-purple">Tech Stack</span>, Our Expertise
              </h2>

              <p className="text-gray-400 mb-4">
                We integrate AI into your existing infrastructure—whether you're on React or Vue,
                Python or .NET, PostgreSQL or MongoDB. No rip-and-replace required.
              </p>

              <button
                onClick={() => toggleSection('stack')}
                className="text-purple-400 hover:text-purple-300 text-sm font-mono mb-4 flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${expandedSections['stack'] ? 'rotate-90' : ''}`}>▶</span>
                {expandedSections['stack'] ? 'Hide technologies' : 'See supported technologies'}
              </button>

              {expandedSections['stack'] && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Frontend</div>
                    <div className="flex flex-wrap gap-2">
                      {techStackBlocks.slice(0, 3).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Backend</div>
                    <div className="flex flex-wrap gap-2">
                      {techStackBlocks.slice(3, 6).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Relational Databases</div>
                    <div className="flex flex-wrap gap-2">
                      {techStackBlocks.slice(6, 10).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Vector Databases</div>
                    <div className="flex flex-wrap gap-2">
                      {techStackBlocks.slice(10, 13).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Document & Cache</div>
                    <div className="flex flex-wrap gap-2">
                      {techStackBlocks.slice(13, 16).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Cloud Platforms</div>
                    <div className="flex flex-wrap gap-2">
                      {techStackBlocks.slice(16, 21).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Best of Breed Integrations */}
          <section className="py-12 border-b border-[#2a2a2a]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="font-mono text-xs text-gray-600 mb-2">
                <span className="text-purple-400">~/integrations</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Best of Breed <span className="gradient-text-purple">Integrations</span>
              </h2>

              <p className="text-gray-400 mb-4">
                We partner with industry-leading platforms to build production-ready solutions.
                These are the tools we recommend and have deep expertise with—battle-tested across 180+ projects.
              </p>

              <button
                onClick={() => toggleSection('integrations')}
                className="text-purple-400 hover:text-purple-300 text-sm font-mono mb-4 flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${expandedSections['integrations'] ? 'rotate-90' : ''}`}>▶</span>
                {expandedSections['integrations'] ? 'Hide integrations' : 'See preferred integrations'}
              </button>

              {expandedSections['integrations'] && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Hosting & Edge</div>
                    <div className="flex flex-wrap gap-2">
                      {integrationBlocks.slice(0, 3).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Auth & Identity</div>
                    <div className="flex flex-wrap gap-2">
                      {integrationBlocks.slice(3, 6).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Email & Payments</div>
                    <div className="flex flex-wrap gap-2">
                      {integrationBlocks.slice(6, 8).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Monitoring & Analytics</div>
                    <div className="flex flex-wrap gap-2">
                      {integrationBlocks.slice(8, 10).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// AI Providers</div>
                    <div className="flex flex-wrap gap-2">
                      {integrationBlocks.slice(11, 14).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// AI Frameworks & Mobile</div>
                    <div className="flex flex-wrap gap-2">
                      {integrationBlocks.slice(10, 11).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                      {integrationBlocks.slice(14, 17).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Compliance */}
          <section className="py-12 border-b border-[#2a2a2a]">
            <div className="mx-auto max-w-4xl px-6">
              <div className="font-mono text-xs text-gray-600 mb-2">
                <span className="text-emerald-400">~/compliance</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Built for <span className="gradient-text">Compliance</span>
              </h2>

              <p className="text-gray-400 mb-4">
                Your compliance team will thank you. We build AI systems with audit trails,
                explainability, and human oversight from day one—not bolted on as an afterthought.
              </p>

              <button
                onClick={() => toggleSection('compliance')}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-mono mb-4 flex items-center gap-2 transition-colors"
              >
                <span className={`transition-transform ${expandedSections['compliance'] ? 'rotate-90' : ''}`}>▶</span>
                {expandedSections['compliance'] ? 'Hide frameworks' : 'See compliance frameworks'}
              </button>

              {expandedSections['compliance'] && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Industry Standards</div>
                    <div className="flex flex-wrap gap-2">
                      {complianceBlocks.slice(0, 4).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// Privacy Regulations</div>
                    <div className="flex flex-wrap gap-2">
                      {complianceBlocks.slice(4, 6).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-mono mb-2">// AI Governance</div>
                    <div className="flex flex-wrap gap-2">
                      {complianceBlocks.slice(6, 9).map((block) => (
                        <CompactBlock key={block.id} block={block} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="py-12">
            <div className="mx-auto max-w-4xl px-6">
              <div className="bg-gradient-to-r from-purple-900/20 to-emerald-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-2">Ready to get started?</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Use the AI assistant to explore your options, or schedule a call to discuss specifics.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/contact"
                    className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-medium px-5 py-2.5 rounded-lg transition-all text-sm"
                  >
                    Schedule a Call
                  </Link>
                  <Link
                    href="/services"
                    className="border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 font-medium px-5 py-2.5 rounded-lg transition-all text-sm"
                  >
                    View Services
                  </Link>
                </div>
              </div>

              {/* Easter egg */}
              <div className="mt-8 text-center relative z-50">
                <button
                  onClick={() => setShowAdventure(true)}
                  title="Launch The Silicon Frontier - a text adventure game"
                  className="text-amber-400 hover:text-amber-300 text-sm font-mono transition-colors"
                >
                  Do you want to play a game?
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* AI Sidebar */}
        <div
          className={`fixed top-16 right-0 h-[calc(100vh-4rem)] bg-[#0d0d0d] border-l border-[#2a2a2a] transition-all duration-300 z-40 ${
            sidebarOpen
              ? sidebarCollapsed
                ? "w-12"
                : "w-full lg:w-[380px]"
              : "w-0 overflow-hidden"
          }`}
        >
          {/* Sidebar Header */}
          <div className="h-10 border-b border-[#2a2a2a] flex items-center justify-between px-3 bg-[#111]">
            {!sidebarCollapsed && (
              <>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-purple-400">AI Assistant</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearChat}
                    className="text-gray-500 hover:text-white p-1 rounded transition-colors text-[10px] font-mono"
                    title="Clear chat"
                  >
                    [CLR]
                  </button>
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    className="text-gray-500 hover:text-white p-1 rounded transition-colors lg:block hidden"
                    title="Collapse"
                  >
                    <span className="text-sm">›</span>
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="text-gray-500 hover:text-white p-1 rounded transition-colors lg:hidden"
                    title="Close"
                  >
                    ×
                  </button>
                </div>
              </>
            )}
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="w-full h-full flex items-center justify-center text-gray-500 hover:text-purple-400 transition-colors"
                title="Expand"
              >
                <span className="text-sm">‹</span>
              </button>
            )}
          </div>

          {!sidebarCollapsed && (
            <>
              {/* Guided Prompts at top of sidebar */}
              <div className="p-3 border-b border-[#2a2a2a] bg-[#0a0a0a]">
                <div className="text-[10px] text-gray-500 font-mono mb-2">Start a conversation:</div>
                <div className="grid grid-cols-2 gap-1">
                  {guidedPrompts.map((block) => (
                    <button
                      key={block.id}
                      onClick={() => handleBlockClick(block)}
                      disabled={isTyping}
                      title={block.prompt}
                      className="text-left px-2 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded text-[10px] text-purple-300 hover:bg-purple-500/20 hover:border-purple-400/50 transition-all disabled:opacity-50 leading-tight"
                    >
                      {block.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drop Zone & Messages */}
              <div
                className={`flex flex-col h-[calc(100%-8.5rem)] transition-colors ${
                  dragOver ? "bg-purple-500/10" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {/* Drop indicator */}
                {dragOver && (
                  <div className="absolute inset-x-0 top-[8.5rem] bottom-0 flex items-center justify-center bg-purple-500/5 border-2 border-dashed border-purple-500/50 rounded-lg m-2 pointer-events-none z-10">
                    <div className="text-center">
                      <div className="text-purple-400 text-xl mb-1">⊕</div>
                      <div className="text-purple-400 font-mono text-xs">Drop to chat</div>
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[90%] rounded-lg px-3 py-2 ${
                          message.type === "user"
                            ? "bg-purple-400/20 border border-purple-400/30 text-purple-100"
                            : "bg-[#151515] border border-[#2a2a2a] text-gray-300"
                        }`}
                      >
                        {message.type === "ai" && (
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                            <span className="font-mono text-[9px] text-purple-400">AI</span>
                          </div>
                        )}
                        <p className="text-xs leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && currentTypingText && (
                    <div className="flex justify-start">
                      <div className="max-w-[90%] rounded-lg px-3 py-2 bg-[#151515] border border-[#2a2a2a]">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                          <span className="font-mono text-[9px] text-purple-400">AI</span>
                        </div>
                        <p className="text-xs leading-relaxed text-gray-300">
                          {currentTypingText}
                          <span className="inline-block w-1 h-3 bg-purple-400 ml-0.5 animate-blink" />
                        </p>
                      </div>
                    </div>
                  )}

                  {isTyping && !currentTypingText && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-3 py-2 bg-[#151515] border border-[#2a2a2a]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                          <span className="font-mono text-[9px] text-gray-500">thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleUserSubmit} className="p-3 border-t border-[#2a2a2a] bg-[#111]">
                  <div className="flex gap-2">
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder="Ask anything..."
                      disabled={isTyping}
                      className="flex-1 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isTyping || !userInput.trim()}
                      className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-3 py-2 rounded transition-all text-xs"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {/* Mobile Sidebar Toggle */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-lg shadow-purple-500/30 transition-all lg:hidden"
          >
            <span className="text-xl">💬</span>
          </button>
        )}

        {/* Desktop Sidebar Toggle when closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed top-20 right-4 z-50 bg-[#111] border border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-3 py-2 rounded-lg transition-all hidden lg:flex items-center gap-2 text-xs font-mono"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            Open AI Chat
          </button>
        )}
      </div>

      {/* Text Adventure Game */}
      {showAdventure && (
        <div className="fixed inset-0 z-[9999] bg-black flex flex-col">
          <div className="bg-[#111] border-b border-[#333] px-4 py-2 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-mono text-sm">SERVICEVISION ARCADE</span>
              <span className="text-gray-600 font-mono text-xs">// The Silicon Frontier</span>
            </div>
            <button
              onClick={() => setShowAdventure(false)}
              className="text-gray-400 hover:text-white transition-colors font-mono text-sm flex items-center gap-2"
            >
              <span className="text-xs text-gray-600">[ESC]</span>
              Close
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 min-h-0">
            <iframe
              src="/games/adventure.html"
              className="w-full h-full max-w-[900px] max-h-[700px] border-0 rounded-lg"
              title="The Silicon Frontier"
            />
          </div>
          <div className="bg-[#111] border-t border-[#333] px-4 py-2 text-center shrink-0">
            <span className="text-gray-500 font-mono text-xs">
              Type commands like LOOK, GO NORTH, TAKE item, TALK person • ESC to exit
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
