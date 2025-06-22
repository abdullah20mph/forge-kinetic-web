import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Business knowledge base
const businessKnowledge = {
  services: [
    "Web Development",
    "Mobile App Development", 
    "UI/UX Design",
    "Digital Marketing",
    "SEO Optimization",
    "E-commerce Solutions",
    "Custom Software Development"
  ],
  pricing: "Our pricing varies based on project scope and requirements. We offer competitive rates and can provide custom quotes. Contact us for a detailed proposal.",
  process: "Our development process includes: 1) Discovery & Planning, 2) Design & Prototyping, 3) Development, 4) Testing & Quality Assurance, 5) Deployment & Launch, 6) Maintenance & Support",
  timeline: "Project timelines typically range from 4-12 weeks depending on complexity. We'll provide a detailed timeline during the planning phase.",
  contact: "You can reach us at contact@forgekinetic.com or schedule a discovery call through our website.",
  portfolio: "We have a diverse portfolio including e-commerce platforms, mobile apps, and custom web applications. Check out our portfolio page for examples.",
  technologies: "We work with modern technologies including React, Node.js, Python, Flutter, and various cloud platforms like AWS and Google Cloud.",
  support: "We provide ongoing support and maintenance for all our projects. We offer different support packages to meet your needs."
}

function getResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Service-related questions
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
    return `We offer the following services: ${businessKnowledge.services.join(', ')}. Each service is tailored to meet your specific business needs.`
  }
  
  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much')) {
    return businessKnowledge.pricing
  }
  
  // Process questions
  if (lowerMessage.includes('process') || lowerMessage.includes('how do you work') || lowerMessage.includes('workflow')) {
    return businessKnowledge.process
  }
  
  // Timeline questions
  if (lowerMessage.includes('time') || lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
    return businessKnowledge.timeline
  }
  
  // Contact questions
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
    return businessKnowledge.contact
  }
  
  // Portfolio questions
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('examples') || lowerMessage.includes('projects')) {
    return businessKnowledge.portfolio
  }
  
  // Technology questions
  if (lowerMessage.includes('technology') || lowerMessage.includes('tech stack') || lowerMessage.includes('programming') || lowerMessage.includes('languages')) {
    return businessKnowledge.technologies
  }
  
  // Support questions
  if (lowerMessage.includes('support') || lowerMessage.includes('maintenance') || lowerMessage.includes('after launch')) {
    return businessKnowledge.support
  }
  
  // Greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! I'm here to help you learn more about our services. You can ask me about our services, pricing, process, timeline, or anything else related to our business."
  }
  
  // Default response
  return "I'm here to help with questions about our services, pricing, process, or any other business-related inquiries. Feel free to ask me anything specific!"
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const reply = getResponse(message)
    
    return new Response(
      JSON.stringify({ reply }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}) 