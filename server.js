import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

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
    console.log('Attempting to save conversation:', {
      sessionId,
      userMessageLength: userMessage.length,
      botResponseLength: botResponse.length,
      modelUsed,
      responseTime
    });

    const { data, error } = await supabase
      .from('chatbot_conversations')
      .insert({
        session_id: sessionId,
        user_message: userMessage,
        bot_response: botResponse,
        model_used: modelUsed,
        response_time_ms: responseTime
      })
      .select();

    if (error) {
      console.error('Supabase error saving conversation:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    } else {
      console.log('Conversation saved successfully:', data);
    }
  } catch (error) {
    console.error('Error saving conversation:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error; // Re-throw to be handled by the calling function
  }
}

// Function to generate session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Chatbot API endpoint
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
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

We also offer AI Automations, Full-Stack Agentic Applications, and AI App Engineers.

We are a team of 2, based in Pakistan.

agentic applications are end to end applications that are built with GPT-4o, LangGraph, OpenAI Assistants, Supabase/pgvector, Zapier/N8N, React, Node.

AI Automations are automations that are built with Zapier, Make, n8n, GPT-4o, Google Workspace, Slack, Notion, HubSpot/Salesforce.

AI App Engineers are app engineers that are built with GPT-4o, Replit, APIs.




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
;

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
      try {
        await saveConversation(currentSessionId, message, reply, 'gpt-3.5-turbo', responseTime);
      } catch (saveError) {
        console.error('Failed to save conversation:', saveError);
        // Continue with response even if save fails
      }
      
      console.log(`✅ Chatbot request processed successfully! Model: gpt-3.5-turbo, Response time: ${responseTime}ms`);
      
      return res.status(200).json({ 
        reply,
        sessionId: currentSessionId,
        modelUsed: 'gpt-3.5-turbo',
        responseTime
      });
    } catch (openaiError) {
      console.log('OpenAI failed, using fallback response:', openaiError.message);
      // Use fallback response if OpenAI fails
      const fallbackReply = getFallbackResponse(message);
      const responseTime = Date.now() - startTime;
      
      // Save conversation to database
      try {
        await saveConversation(currentSessionId, message, fallbackReply, 'fallback', responseTime);
      } catch (saveError) {
        console.error('Failed to save conversation:', saveError);
        // Continue with response even if save fails
      }
      
      console.log(`✅ Chatbot fallback response sent! Response time: ${responseTime}ms`);
      
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
});

// Only enable static serving and catch-all in production!
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Chatbot API available at http://localhost:${PORT}/api/chatbot`);
  console.log('OpenAI integration: ✅ Active (with fallback)');
  console.log('Conversation storage: ✅ Active (Supabase)');
  console.log('🎉 Chatbot is now LIVE and ready to handle website requests!');
  console.log('📱 Website users can now interact with the AI assistant');
}); 

// Automation Guide API endpoint
app.post('/api/automation-guide', async (req, res) => {
  try {
    const { industry, tasks, companySize, techStack } = req.body || {};

    if (!industry || !tasks) {
      return res.status(400).json({ error: 'industry and tasks are required' });
    }

    const systemPrompt = `You are an automation delivery consultant for our agency. Produce a concrete, delivery-focused plan that explains what WE will build, how long it will take, and the estimated cost. Do NOT instruct the user how to build it. Be razor-sharp and industry-specific based on the user's inputs (especially regulations, data sources, and integrations common to that industry). Return ONLY strict JSON matching the schema below. No backticks, no extra text.

Schema:
{
  "industry": string,
  "pain_points": string[],
  "recommended_automations": [
    {
      "name": string,
      "what_it_does": string,
      "tools": string[],
      "integration_points": string[],
      "complexity": "low" | "medium" | "high",
      "estimated_setup_time_days": number
    }
  ],
  "delivery_summary": string,
  "implementation_phases": [
    {
      "phase": string,
      "activities": string[],
      "duration_days": number,
      "deliverables": string[]
    }
  ],
  "timeline_total_days": number,
  "estimated_cost_usd_range": { "min": number, "max": number },
  "tools_stack": string[],
  "roles_involved": string[],
  "metrics_to_track": string[],
  "risks_considerations": string[]
}

Hard constraints:
- Fill EVERY field; never use placeholders like "TBD" or zeros unless impossible.
- recommended_automations: at least 3 items, each with concrete tools and integration_points specific to the industry and the provided tech stack when available.
- implementation_phases: at least 3 phases. duration_days must be positive integers. timeline_total_days MUST equal the sum of phase durations.
- estimated_cost_usd_range: Provide a realistic delivery range (min < max). As a heuristic: low complexity 1–2k per item, medium 3–6k, high 7–15k. Adjust to companySize when provided.
- Include tools_stack and roles_involved relevant to the plan (e.g., Solutions Architect, Automation Engineer, QA, Compliance).
- If industry implies compliance (e.g., healthcare), reflect it in risks_considerations and integration choices (HIPAA, SOC2, PHI handling).

Keep lists concise and pragmatic. Prefer tools we can deliver: GPT-4o, Zapier, Make, n8n, Google Sheets, Notion, Slack, HubSpot/Salesforce/Shopify APIs, voice/chat APIs.`;

    const userPrompt = `Industry: ${industry}
Manual tasks / pain points: ${tasks}
Company size: ${companySize || 'unspecified'}
Tech stack: ${techStack || 'unspecified'}

Return JSON only.`;

    const startTime = Date.now();

    const callModel = async (msgs) => {
      const resp = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: msgs,
        temperature: 0.4,
        max_tokens: 1800,
        response_format: { type: 'json_object' },
      });
      return resp.choices?.[0]?.message?.content || '';
    };

    // First attempt
    let content = await callModel([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ]);

    // Try parsing JSON response; if it fails, wrap as text fallback
    try {
      const parsed = JSON.parse(content);
      // normalize/guard against missing or empty fields
      const normalize = (g) => {
        const normalized = { ...g };
        normalized.pain_points = Array.isArray(g.pain_points) ? g.pain_points : [];
        normalized.recommended_automations = Array.isArray(g.recommended_automations) ? g.recommended_automations : [];
        normalized.implementation_phases = Array.isArray(g.implementation_phases) ? g.implementation_phases : [];
        // timeline
        const sumPhases = normalized.implementation_phases.reduce((acc, p) => acc + (Number(p?.duration_days) || 0), 0);
        normalized.timeline_total_days = Number(normalized.timeline_total_days) || sumPhases || 7;
        // cost range
        const cost = g.estimated_cost_usd_range;
        if (!cost || typeof cost.min !== 'number' || typeof cost.max !== 'number' || cost.min >= cost.max) {
          const complexityWeights = { low: 1500, medium: 4000, high: 9000 };
          const est = normalized.recommended_automations.reduce((acc, a) => acc + (complexityWeights[a?.complexity] || 3000), 0);
          const min = Math.max(1500, Math.round(est * 0.8));
          const max = Math.round(est * 1.2) || min + 1500;
          normalized.estimated_cost_usd_range = { min, max };
        }
        // tools/roles arrays
        normalized.tools_stack = Array.isArray(g.tools_stack) ? g.tools_stack : [];
        normalized.roles_involved = Array.isArray(g.roles_involved) ? g.roles_involved : [];
        normalized.metrics_to_track = Array.isArray(g.metrics_to_track) ? g.metrics_to_track : [];
        normalized.risks_considerations = Array.isArray(g.risks_considerations) ? g.risks_considerations : [];
        return normalized;
      };
      let normalized = normalize(parsed);

      const needsRepair = (g) => {
        const hasThreeAutos = Array.isArray(g.recommended_automations) && g.recommended_automations.length >= 3;
        const hasThreePhases = Array.isArray(g.implementation_phases) && g.implementation_phases.length >= 3;
        const costOk = g.estimated_cost_usd_range && typeof g.estimated_cost_usd_range.min === 'number' && typeof g.estimated_cost_usd_range.max === 'number' && g.estimated_cost_usd_range.min < g.estimated_cost_usd_range.max;
        return !hasThreeAutos || !hasThreePhases || !costOk;
      };

      // If the plan is too thin, request a refined version once
      if (needsRepair(normalized)) {
        const repairPrompt = `Refine and expand the previous plan to fully satisfy all schema constraints. Ensure at least 3 recommended_automations and 3 implementation_phases with realistic durations and costs. Keep everything delivery-focused and industry-specific. Return JSON only.`;
        content = await callModel([
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
          { role: 'assistant', content: JSON.stringify(normalized) },
          { role: 'user', content: repairPrompt },
        ]);
        try {
          const repaired = JSON.parse(content);
          normalized = normalize(repaired);
        } catch (_) {
          // keep previous normalized
        }
      }
      const responseTime = Date.now() - startTime;
      return res.status(200).json({ guide: normalized, modelUsed: 'gpt-4o', responseTime });
    } catch (e) {
      // Attempt to extract JSON substring
      const startIdx = content.indexOf('{');
      const endIdx = content.lastIndexOf('}');
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        try {
          const parsed = JSON.parse(content.slice(startIdx, endIdx + 1));
          const responseTime = Date.now() - startTime;
          return res.status(200).json({ guide: parsed, modelUsed: 'gpt-4o', responseTime });
        } catch (_) {}
      }
      return res.status(200).json({
        guide: {
          industry,
          pain_points: Array.isArray(tasks) ? tasks : [String(tasks)],
          recommended_automations: [],
          delivery_summary: "We will scope, implement, and deploy automations tailored to your workflows.",
          implementation_phases: [],
          timeline_total_days: 0,
          estimated_cost_usd_range: { min: 0, max: 0 },
          tools_stack: [],
          roles_involved: [],
          metrics_to_track: [],
          risks_considerations: []
        },
        note: 'Model did not return valid JSON; provided minimal fallback',
      });
    }
  } catch (err) {
    console.error('automation-guide error:', err);
    return res.status(500).json({ error: 'Failed to generate automation guide' });
  }
});