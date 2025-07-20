import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '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',
});

// Initialize Supabase client with fallback values
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "https://gymsiiymqometjnfqsxy.supabase.co";
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bXNpaXltcW9tZXRqbmZxc3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMTgzOTQsImV4cCI6MjA2NTU5NDM5NH0.SLJZP8Il9Y9u_nEkUwoSSIMHj4ayfQZ1EYqozQcqtpI";

const supabase = createClient(supabaseUrl, supabaseKey);

// Fallback business knowledge base
const businessKnowledge = {
  services: [
    "AI Voice Support Rep",
    "AI Chat Support Rep",
    "AI Inbox Assistant",
    "AI Lead Hunter",
    "AI Sales Development Rep",
    "AI Content Writer",
    "AI Social Media Manager",
    "AI Creative Producer",
    "AI Ops Assistant",
    "Autonomous AI Strategist",
    "AI App Engineer"
  ],
  pricing: "Pricing is based on the number and complexity of AI employees you hire. Starter roles begin at $1250, with full-time AI teams available via custom quotes. Explore packages or contact us for a detailed estimate.",
  process: "Our process is simple: 1) Discovery Call to define the AI role, 2) Role Setup with tools and workflows, 3) AI Deployment in under 2 weeks, 4) Launch & Support with ongoing performance tuning.",
  timeline: "Most AI employee deployments go live in 7–14 days. Complex multi-role setups or advanced automations may take longer, but we always move fast.",
  contact: "You can reach us at contact@agentumai.tech or on Instagram @agentumai. You can also schedule a discovery call through our website.",
  portfolio: "Our AI employees are active across support, sales, content, and operations — powering startups, creators, and lean teams. Browse our Roles & Use Cases page to see them in action.",
  technologies: "We deploy AI employees using GPT-4o, Zapier, Replit, LangGraph, AutoGen, ElevenLabs, Synthesia, Pika Labs, RunwayML, Clay, Lusha, Phantombuster, and other modern AI frameworks.",
  support: "Every AI employee comes with post-launch support. We offer performance tuning, logic updates, and optional care packages depending on your needs."
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
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('instagram') || lowerMessage.includes('@agentumai')) {
    return "You can reach us at contact@agentumai.tech or on Instagram @agentumai. You can also schedule a discovery call through our website.";
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

    // Try OpenAI first
    try {
      const systemPrompt = `You are a helpful assistant for Agentum — a next-gen AI staffing platform that helps startups and creators hire AI employees, not just tools.

CONTACT INFORMATION:
- Email: contact@agentumai.tech
- Instagram: @agentumai
- Website: agentum.ai

AGENTUM SERVICES - AI EMPLOYEES:

AI Voice Support Rep  
Handles calls, books meetings, qualifies leads using Voiceflow, Vapi, Whisper.

AI Chat Support Rep  
Responds to DMs and chats across WhatsApp, Instagram, and web. Built on GPT-4o, Cursor, LangChain.

AI Inbox Assistant  
Replies to emails and leads, books calls, and syncs CRMs. Powered by GPT-4o + Inbox APIs.

AI Lead Hunter  
Scrapes and qualifies leads using Clay, Lusha, and Phantombuster.

AI Sales Development Rep  
Engages, qualifies, and books inbound leads via chat and email.

AI Content Writer  
Writes and publishes newsletters, blogs, and social posts using GPT-4o, Notion API, WordPress, Buffer.

AI Social Media Manager  
Plans, writes, and schedules platform-native content — trend-aware and brand-aligned.

AI Creative Producer  
Creates short-form video content (ads, reels, explainers) using Pika Labs, RunwayML, ElevenLabs, Synthesia.

AI Ops Assistant  
Automates CRM updates, reports, internal tasks using Zapier, N8N, AutoGen, ReAct.

AI App Engineer  
Builds AI-powered MVPs, GPT agents, and dashboards with GPT-4o, Replit, APIs.

WEBSITE INFORMATION:
- Homepage: Features AI employees, hero section, testimonials, and CTA
- Services: Detailed AI employee roles with use cases and job outputs
- About: Company story and mission
- Portfolio: Case studies and success stories
- Careers: Job opportunities at Agentum
- Blog: Industry insights and AI trends
- Contact: Discovery call booking and contact form

PRICING & PROCESS:
- Starter roles begin at $1250
- Deployment in 7-14 days
- Custom quotes for full AI teams
- Discovery call → Role setup → Deployment → Support

TECHNOLOGIES:
GPT-4o, Zapier, Replit, LangGraph, AutoGen, ElevenLabs, Synthesia, Pika Labs, RunwayML, Clay, Lusha, Phantombuster, Voiceflow, Vapi, Whisper, Cursor, LangChain, Notion API, WordPress, Buffer.

Please answer questions about our AI employees, hiring process, pricing, tech stack, timelines, contact info, or website content. Keep responses helpful, confident, and concise (under 100 words). Always provide accurate contact information when asked.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
      });

      const reply = completion.choices[0].message.content;
      const responseTime = Date.now() - startTime;
      
      // Save conversation to database
      await saveConversation(currentSessionId, message, reply, 'gpt-3.5-turbo', responseTime);
      
      return res.status(200).json({ 
        reply,
        sessionId: currentSessionId,
        modelUsed: 'gpt-3.5-turbo',
        responseTime
      });
    } catch (openaiError) {
      console.log('OpenAI failed, using fallback response:', openaiError);
      // Use fallback response if OpenAI fails
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