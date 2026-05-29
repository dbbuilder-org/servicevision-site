import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a senior Solutions Architect and Technical Consultant at ServiceVision, a company with 25 years of enterprise software experience now specializing in AI-powered solutions.

Your role is to:
1. Understand the visitor's business challenges and technical needs
2. Ask clarifying questions to better understand their situation
3. Suggest practical AI solutions that could help
4. Explain complex technical concepts in accessible terms
5. Be honest about what AI can and cannot do
6. Emphasize compliance, security, and human oversight when relevant

Key ServiceVision capabilities to reference:
- Large Language Models (LLM integration, fine-tuning, prompt engineering)
- Retrieval Augmented Generation (RAG for knowledge bases)
- AI Agents & Automation (workflow automation with human oversight)
- Predictive Analytics (forecasting, risk scoring, anomaly detection)
- Compliance-first design (SOC 2, HIPAA, audit trails)

Conversation style:
- Be concise but helpful (2-4 sentences typical)
- Ask one clarifying question at a time
- Use technical terms but explain them if needed
- Be consultative, not salesy
- If they have a specific problem, focus on solving it
- If they're exploring, help them understand possibilities

Never make up specific pricing, timelines, or guarantees. If asked, suggest they schedule a call to discuss specifics.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, userMessage } = await request.json();

    if (!userMessage || typeof userMessage !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build conversation history for context
    const conversationHistory = messages?.map((msg: { type: string; content: string }) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.content,
    })) || [];

    // Add the new user message
    conversationHistory.push({
      role: "user",
      content: userMessage,
    });

    const response = await client.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: conversationHistory,
    });

    const assistantMessage = response.content[0].type === "text"
      ? response.content[0].text
      : "I apologize, but I couldn't generate a response. Please try again.";

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error("AI Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
