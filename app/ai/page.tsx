"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  type: "user" | "ai" | "system";
  content: string;
  typing?: boolean;
}

const aiTopics = [
  {
    question: "What is Machine Learning?",
    answer: "Machine Learning is the foundation of modern AI. It's how systems learn patterns from data without being explicitly programmed. We use ML for predictive models, classification, and pattern recognition. Think: predicting customer churn, fraud detection, or demand forecasting.",
    code: "ML",
  },
  {
    question: "How does NLP work?",
    answer: "Natural Language Processing lets computers understand human language. We build systems that extract meaning from documents, emails, and conversations. Applications include sentiment analysis, document summarization, and automated categorization of support tickets.",
    code: "NLP",
  },
  {
    question: "What is RAG?",
    answer: "Retrieval Augmented Generation combines LLMs with your knowledge base. Instead of hallucinating answers, the AI retrieves relevant documents and generates responses grounded in your actual data. Perfect for internal Q&A systems, documentation assistants, and customer support.",
    code: "RAG",
  },
  {
    question: "Tell me about Vector Databases",
    answer: "Vector databases store information as mathematical embeddings, enabling semantic search. Instead of keyword matching, you find content by meaning. We use Pinecone, Weaviate, and pgvector to build intelligent search and recommendation systems.",
    code: "VDB",
  },
  {
    question: "What are AI Agents?",
    answer: "AI Agents are autonomous systems that can plan, use tools, and take actions. They decompose complex tasks, call APIs, and make decisions with human oversight. We build agents for workflow automation, research assistants, and process optimization.",
    code: "AGENT",
  },
  {
    question: "How does Predictive Analytics help?",
    answer: "Predictive Analytics uses historical data to forecast future outcomes. We build models for demand prediction, risk scoring, anomaly detection, and trend analysis. The key is explainability—knowing why the model made a prediction, not just what it predicted.",
    code: "PRED",
  },
  {
    question: "What is AI Orchestration?",
    answer: "Orchestration ties everything together. Multiple AI models, data pipelines, and business logic working in harmony. We design systems with proper monitoring, fallbacks, and human-in-the-loop controls. It's how we turn individual AI capabilities into production-ready solutions.",
    code: "ORCH",
  },
  {
    question: "How do you ensure compliance?",
    answer: "Compliance is built in from day one. Audit trails for every AI decision. Explainable outputs for regulators. Human review checkpoints for critical paths. We've built for SOC 2, HIPAA, and financial services—your compliance team will thank you.",
    code: "COMP",
  },
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [pendingAnswer, setPendingAnswer] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 1,
      type: "ai",
      content: "Hello! I'm here to explain our AI capabilities. Click any topic below to learn more, or scroll through to explore what we can build together.",
    };
    setMessages([greeting]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentTypingText]);

  // Typing animation effect
  useEffect(() => {
    if (pendingAnswer && isTyping) {
      if (currentTypingText.length < pendingAnswer.length) {
        const timeout = setTimeout(() => {
          setCurrentTypingText(pendingAnswer.slice(0, currentTypingText.length + 3));
        }, 10);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing
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

  const handleTopicClick = (topic: typeof aiTopics[0]) => {
    if (isTyping) return;

    // Add user question
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), type: "user", content: topic.question },
    ]);

    // Start typing animation
    setIsTyping(true);
    setCurrentTypingText("");
    setPendingAnswer(topic.answer);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col">
      {/* Header */}
      <section className="pt-24 pb-4 border-b border-[#2a2a2a]">
        <div className="mx-auto max-w-4xl px-6">
          <div className="font-mono text-sm text-gray-500 mb-2">
            <span className="text-emerald-400">$</span> ./ai_assistant --interactive
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            AI <span className="gradient-text">Capabilities</span>
          </h1>
          <p className="text-gray-400 text-sm">
            Explore what we can build together
          </p>
        </div>
      </section>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 py-6">
        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-lg px-4 py-3 ${
                  message.type === "user"
                    ? "bg-emerald-400/20 border border-emerald-400/30 text-emerald-100"
                    : "bg-[#111] border border-[#2a2a2a] text-gray-300"
                }`}
              >
                {message.type === "ai" && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full" />
                    <span className="font-mono text-xs text-emerald-400">ServiceVision AI</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && currentTypingText && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg px-4 py-3 bg-[#111] border border-[#2a2a2a]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-emerald-400">ServiceVision AI</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-300">
                  {currentTypingText}
                  <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 animate-blink" />
                </p>
              </div>
            </div>
          )}

          {isTyping && !currentTypingText && (
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-3 bg-[#111] border border-[#2a2a2a]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="font-mono text-xs text-gray-500">typing...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Topic Buttons */}
        <div className="border-t border-[#2a2a2a] pt-6">
          <div className="font-mono text-xs text-gray-500 mb-4">
            // Select a topic to explore
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {aiTopics.map((topic) => (
              <button
                key={topic.code}
                onClick={() => handleTopicClick(topic)}
                disabled={isTyping}
                className={`terminal-card p-3 text-left transition-all group ${
                  isTyping ? "opacity-50 cursor-not-allowed" : "hover:border-emerald-400/50"
                }`}
              >
                <span className="font-mono text-xs text-emerald-400 block mb-1">
                  {topic.code}
                </span>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors line-clamp-2">
                  {topic.question}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-[#2a2a2a]">
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/services"
              className="font-mono text-sm text-gray-500 hover:text-emerald-400 transition-colors"
            >
              [View Services]
            </Link>
            <Link
              href="/contact"
              className="font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              [Start a Project]
            </Link>
            <Link
              href="/about"
              className="font-mono text-sm text-gray-500 hover:text-emerald-400 transition-colors"
            >
              [About Us]
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
