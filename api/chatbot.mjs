import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@supabase/supabase-js';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Fallback business knowledge base
const businessKnowledge = {
  services: [
    "MVP Launchpad",
    "AI Content Studio", 
    "Automation Suite",
    "Agentic AI Systems",
    "AI Ad Video Generator",
    "Lead Gen Automation",
    "AI Email & Chat Assistants",
    "AI Inbox & Lead Qualifier",
    "Automated Content Engine"
  ],
  pricing: "Our pricing varies based on project scope and requirements. We offer competitive rates and can provide custom quotes. Contact us for a detailed proposal.",
  process: "Our development process includes: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development, 4) Testing & Quality Assurance, 5) Deployment & Launch, 6) Maintenance & Support",
  timeline: "Project timelines typically range from 2-12 weeks depending on complexity. MVP Launchpad projects can be completed in 2 weeks or less.",
  contact: "You can reach us at contact@agentum.com or schedule a discovery call through our website.",
  portfolio: "We have a diverse portfolio including AI-powered web apps, GPT agents, automation systems, and content generation tools. Check out our portfolio page for examples.",
  technologies: "We work with modern AI technologies including GPT-4o, Replit, Zapier, OpenAgents, LangGraph, AutoGen, Pika Labs, RunwayML, ElevenLabs, Synthesia, Clay, Lusha, Phantombuster, and various APIs.",
  support: "We provide ongoing support and maintenance for all our projects. We offer different support packages to meet your needs."
};

function getFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Service-related questions
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
    return `We offer the following services: ${businessKnowledge.services.join(', ')}. Each service is tailored to meet your specific business needs.`;
  }
  
  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return businessKnowledge.pricing;
  }
  
  // Process questions
  if (lowerMessage.includes('process') || lowerMessage.includes('how do you work') || lowerMessage.includes('workflow')) {
    return businessKnowledge.process;
  }
  
  // Timeline questions
  if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
    return businessKnowledge.timeline;
  }
  
  // Contact questions
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return businessKnowledge.contact;
  }
  
  // Portfolio questions
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('examples') || lowerMessage.includes('projects')) {
    return businessKnowledge.portfolio;
  }
  
  // Technology questions
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('programming') || lowerMessage.includes('languages')) {
    return businessKnowledge.technologies;
  }
  
  // Support questions
  if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('after launch')) {
    return businessKnowledge.support;
  }
  
  // Greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm here to help you learn more about our services. You can ask me about our services, pricing, process, timeline, or anything else related to our business.";
  }
  
  // Default response
  return "I'm here to help with questions about our services, pricing, process, or any other business-related inquiries. Feel free to ask me anything specific!";
}

// Function to save conversation to database
async function saveConversation(sessionId, userMessage, botResponse, modelUsed, responseTime) {
  try {
    const { error } = await supabase
      .from('chatbot_conversations')
      .insert({
        session_id: sessionId,
        user_message: userMessage,
        bot_response: botResponse,
        model_used: modelUsed,
        response_time_ms: responseTime
      });

    if (error) {
      console.error('Error saving conversation:', error);
    } else {
      console.log('Conversation saved successfully');
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}

// Function to generate session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { message, sessionId } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Use provided sessionId or generate a new one
    const currentSessionId = sessionId || generateSessionId();
    const startTime = Date.now();

    // Try Gemini first
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const systemPrompt = `You are a helpful assistant for Agentum — an AI-powered digital agency that builds and automates modern products for founders and fast-moving teams.

Agentum offers specialized, productized services:

MVP Launchpad
Build web apps, GPT agents, or dashboards in 2 weeks or less.
Stack: GPT-4o, Replit, Zapier
AI Content Studio
Reels, memes, newsletters, and videos — AI-generated for IG, LinkedIn, YouTube.
Automation Suite
CRM cleanup, dashboard updates, internal bots — fully hands-free.
Custom workflows, API integrations
Agentic AI Systems
Deploy autonomous GPT agents that plan, execute, and report on tasks.
OpenAgents, LangGraph, AutoGen
AI Ad Video Generator
Generate scroll-stopping video ads — from script to voice to visuals.
Pika Labs, RunwayML, ElevenLabs, Synthesia
Lead Gen Automation
Scraping, email writing, CRM pushing — at scale.
Clay, Lusha, Phantombuster
AI Email & Chat Assistants
Auto-reply to inbound leads via GPT bots with context.
GPT-4o, Inbox APIs, Zapier
AI Inbox & Lead Qualifier
AI qualifies leads, replies to queries, books calls, and syncs with CRMs.
GPT-4o, Slack API, HubSpot/Gmail API
Automated Content Engine
Automate your entire content pipeline: ideation → writing → publishing.
GPT-4o, Notion API, WordPress API, Zapier, Buffer

Please answer questions about our services, pricing, process, timeline, or any other business-related inquiries. Keep responses helpful, professional, and focused on our business. Keep responses concise (under 200 words).`;

      const prompt = `${systemPrompt}\n\nUser question: ${message}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const reply = response.text();
      
      const responseTime = Date.now() - startTime;
      
      // Save conversation to database
      await saveConversation(currentSessionId, message, reply, 'gemini-1.5-flash', responseTime);
      
      return res.status(200).json({ 
        reply,
        sessionId: currentSessionId,
        modelUsed: 'gemini-1.5-flash',
        responseTime
      });
    } catch (geminiError) {
      console.log('Gemini failed, using fallback response:', geminiError);
      // Use fallback response if Gemini fails
      const fallbackReply = getFallbackResponse(message);
      const responseTime = Date.now() - startTime;
      
      // Save conversation to database
      await saveConversation(currentSessionId, message, fallbackReply, 'fallback', responseTime);
      
      return res.status(200).json({ 
        reply: fallbackReply,
        sessionId: currentSessionId,
        modelUsed: 'fallback',
        responseTime
      });
    }
  } catch (error) {
    console.error('Chatbot error:', error);
    return res.status(500).json({ 
      error: 'Failed to get response',
      details: error 
    });
  }
} 