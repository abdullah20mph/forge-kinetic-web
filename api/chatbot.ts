import type { VercelRequest, VercelResponse } from '@vercel/node'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Create a system prompt that provides context about your business
    const systemPrompt = `You are a helpful assistant for Forge Kinetic, a web development and digital services company. 

Our services include:
- Web Development
- Mobile App Development
- UI/UX Design
- Digital Marketing
- SEO Optimization
- E-commerce Solutions
- Custom Software Development

Our development process includes: Discovery & Planning, Design & Prototyping, Development, Testing & Quality Assurance, Deployment & Launch, and Maintenance & Support.

Project timelines typically range from 4-12 weeks depending on complexity.

We work with modern technologies including React, Node.js, Python, Flutter, and various cloud platforms like AWS and Google Cloud.

Contact us at contact@forgekinetic.com or schedule a discovery call through our website.

Please answer questions about our services, pricing, process, timeline, or any other business-related inquiries. Keep responses helpful, professional, and focused on our business.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    
    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Chatbot error:', error)
    return res.status(500).json({ 
      error: 'Failed to get response from OpenAI',
      details: error 
    })
  }
} 