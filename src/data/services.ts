import { Zap, Video, Bot, Brain, Mail } from 'lucide-react';

export const services = [
  {
    icon: Brain,
    title: "Full-Stack Agentic Application",
    shortDescription: "Autonomous AI apps with tools, memory, and UI",
    description: "We design and ship production agentic apps end-to-end — reasoning, tool use, memory, and a modern UI. We wire GPT‑4o with LangGraph/function calling, vector memory, and your APIs for safe autonomy.",
    tools: "GPT-4o, LangGraph, OpenAI Assistants, Supabase/pgvector, Zapier/N8N, React, Node",
    gradient: "from-violet-500 to-blue-500",
    useCases: "Ops copilots, research agents, lead enrichment, ticket triage & routing, internal automations",
    jobOutput: "Deployed web app, secure agent APIs, vector memory, logging & monitoring"
  },
  {
    icon: Zap,
    title: "AI Automations",
    shortDescription: "Automate repetitive workflows end‑to‑end",
    description: "We identify manual processes and automate them with reliable, observable pipelines. From data entry and CRM updates to alerts and approvals — shipped with run logs and error handling.",
    tools: "Zapier, Make, n8n, GPT‑4o, Google Workspace, Slack, Notion, HubSpot/Salesforce",
    gradient: "from-amber-500 to-orange-500",
    useCases: "CRM + inbox automation, lead routing, report generation, approvals, data sync",
    jobOutput: "Automated workflows, SLA-based alerts, weekly ops reports, audit logs"
  },
  {
    icon: Zap,
    title: "AI Voice Support Rep",
    shortDescription: "24/7 call handling with CRM sync",
    description: "Handles calls, books meetings, and qualifies leads automatically. Powered by Voiceflow, Vapi, ElevenLabs, and Whisper — with scripted flows, CRM updates, and post-call summaries.",
    tools: "Vapi, VoiceFlow, ElevenLabs, Whisper",
    gradient: "from-blue-500 to-cyan-500",
    useCases: "Customer support, Appointment booking, Lead qualification, Order tracking",
  },
  {
    icon: Bot,
    title: "AI Chat Rep",
    shortDescription: "Instant chat responses across all channels",
    description: "Responds to customer chats on web, WhatsApp, and Instagram — 24/7. Uses GPT-4o, Cursor, and LangChain to answer FAQs, capture leads, and route support queries instantly.",
    tools: "GPT-4o, Cursor, Gemini, LangChain, Meta",
    gradient: "from-blue-500 to-cyan-500",
    useCases: "Sales chats, FAQ bots, Lead capture, Internal HR/IT support",
    jobOutput: "Real-time chat responses, lead capture forms, FAQ automation, chat analytics dashboard"
  },
  {
    icon: Video,
    title: "AI Ops Assistant",
    shortDescription: "Automates workflows, no manual follow-ups",
    description: "Automates internal workflows like CRM updates, report generation, and task syncing. Built with N8N, Zapier, ReAct, and AutoGen — no manual follow-ups ever again.",
    tools: "N8N,Make, Zapier, ReAct, AutoGen",
    gradient: "from-blue-500 to-cyan-500",
    useCases: "Report generation, Email followups, CRM updates, Data syncing",
    jobOutput: "Automated daily reports, CRM data synchronization, email campaign management, workflow optimization"
  },
  {
    icon: Zap,
    title: "AI App Engineer",
    shortDescription: "Builds MVPs in 2 weeks, no dev team needed",
    description: "Builds custom web apps, tools, and GPT agents in under 2 weeks. Uses GPT-4o, Replit, and Zapier to turn product ideas into live MVPs with no dev team required.",
    tools: "GPT-4o, Replit, Zapier",
    gradient: "from-blue-500 to-cyan-500",
    useCases: "Customer support, Appointment booking, Lead qualification, Order tracking",
    jobOutput: "Custom web applications, interactive dashboards, API integrations, deployment automation"
  },
  {
    icon: Video,
    title: "AI Creative Producer",
    shortDescription: "Script-to-video in minutes",
    description: "Turns copy into short-form, high-converting videos for ads or social. Runs on Pika Labs, RunwayML, ElevenLabs, and Synthesia — script-to-video in minutes.",
    tools: "Pika Labs, RunwayML, ElevenLabs, Synthesia",
    gradient: "from-red-500 to-pink-500",
    useCases: "Facebook ads, TikTok campaigns, YouTube ads, Instagram stories",
    jobOutput: "High-converting video ads, social media content, brand videos, performance analytics"
  },
  {
    icon: Zap,
    title: "AI Lead Hunter",
    shortDescription: "Tireless SDR on autopilot",
    description: "Scrapes, qualifies, and delivers leads daily with full contact data. Built using Clay, Lusha, and PhantomBuster — works like a tireless SDR on autopilot.",
    tools: "Clay, Lusha, Phantombuster",
    gradient: "from-indigo-500 to-purple-500",
    useCases: "B2B prospecting, Email campaigns, LinkedIn outreach, Market research",
    jobOutput: "Qualified lead lists, automated outreach campaigns, CRM lead enrichment, conversion tracking"
  },
  {
    icon: Mail,
    title: "AI Sales Development Rep",
    shortDescription: "24/7 top-of-funnel handling",
    description: "Qualifies inbound leads, replies to queries, and books calls across email and chat. Uses GPT-4o, Slack API, and Gmail API to handle your top-of-funnel 24/7.",
    tools: "GPT-4o, Zapier, Slack API, HubSpot/Gmail API",
    gradient: "from-indigo-500 to-sky-500",
    useCases: "Lead qualification, Meeting scheduling, Query responses, CRM integration",
    jobOutput: "Meeting scheduling automation, CRM data updates, lead scoring, sales pipeline management"
  },
  {
    icon: Bot,
    title: "AI Content Writer",
    shortDescription: "Automated from idea to post",
    description: "Writes and publishes blogs, newsletters, and social content. Built on GPT-4o, Notion API, and WordPress — automated from idea to post.",
    tools: "GPT-4o, Notion API, WordPress API, Zapier, Buffer",
    gradient: "from-emerald-500 to-teal-500",
    useCases: "Blog posts, Social media, Email newsletters, Content calendars",
    jobOutput: "Daily blog posts, social media content, email newsletters, content performance reports"
  },
  {
    icon: Bot,
    title: "AI Social Media Manager",
    shortDescription: "Active social presence without lifting a finger",
    description: "Keeps your LinkedIn, Instagram, and content calendar active — without lifting a finger. Plans, writes, and schedules posts using GPT-4o, Notion API, and Buffer — optimized for trends, tone, and reach.",
    tools: "GPT-4o, Notion API, Buffer, Zapier",
    gradient: "from-pink-500 to-purple-500",
    useCases: "Social post creation, Scheduling, Brand voice alignment, Trend-based content",
    jobOutput: "Scheduled social posts, trend-optimized content, brand voice consistency, engagement analytics"
  }
]; 