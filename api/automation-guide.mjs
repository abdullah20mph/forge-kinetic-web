import OpenAI from 'openai'

// Serverless endpoint for Vercel: /api/automation-guide
export default async function handler(req, res) {
  // CORS for local tests and previews
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { industry, tasks, companySize, techStack } = req.body || {}
    if (!industry || !tasks) {
      return res.status(400).json({ error: 'industry and tasks are required' })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const systemPrompt = `You are an automation delivery consultant for our agency. Produce a concrete, delivery-focused plan that explains what WE will build, how long it will take, and the estimated cost. Do NOT instruct the user how to build it. Be industry-specific.

JSON schema:
{
  "industry": string,
  "pain_points": string[],
  "recommended_automations": [
    { "name": string, "what_it_does": string, "tools": string[], "integration_points": string[], "complexity": "low"|"medium"|"high", "estimated_setup_time_days": number }
  ],
  "metrics_to_track": string[],
  "risks_considerations": string[]
}

Constraints:
- At least 3 recommended_automations with concrete tools and integrations.
- Keep it delivery-focused and pragmatic. Return JSON only.`

    const userPrompt = `Industry: ${industry}
Manual tasks / pain points: ${tasks}
Company size: ${companySize || 'unspecified'}
Tech stack: ${techStack || 'unspecified'}
Return JSON only.`

    const call = async (messages) => {
      const r = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.4,
        max_tokens: 1200,
        response_format: { type: 'json_object' },
      })
      return r.choices?.[0]?.message?.content || ''
    }

    const start = Date.now()
    let content = await call([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ])

    const normalize = (g) => {
      const n = { ...g }
      n.pain_points = Array.isArray(g.pain_points) ? g.pain_points : []
      n.recommended_automations = Array.isArray(g.recommended_automations) ? g.recommended_automations : []
      n.metrics_to_track = Array.isArray(g.metrics_to_track) ? g.metrics_to_track : []
      n.risks_considerations = Array.isArray(g.risks_considerations) ? g.risks_considerations : []
      return n
    }

    let parsed
    try {
      parsed = JSON.parse(content)
    } catch (e) {
      // Try extraction fallback
      const s = content.indexOf('{');
      const eidx = content.lastIndexOf('}');
      if (s !== -1 && eidx !== -1 && eidx > s) parsed = JSON.parse(content.slice(s, eidx + 1))
    }

    if (!parsed) {
      return res.status(200).json({
        guide: {
          industry,
          pain_points: Array.isArray(tasks) ? tasks : [String(tasks)],
          recommended_automations: [],
          metrics_to_track: [],
          risks_considerations: [],
        },
        note: 'Model did not return valid JSON',
      })
    }

    let guide = normalize(parsed)
    if (!guide.recommended_automations || guide.recommended_automations.length < 3) {
      const refined = await call([
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
        { role: 'assistant', content: JSON.stringify(guide) },
        { role: 'user', content: 'Expand to include at least 3 recommended_automations. Return JSON only.' },
      ])
      try { guide = normalize(JSON.parse(refined)) } catch (_) {}
    }

    const ms = Date.now() - start
    return res.status(200).json({ guide, modelUsed: 'gpt-4o', responseTime: ms })
  } catch (err) {
    console.error('automation-guide vercel error:', err)
    return res.status(500).json({ error: 'Failed to generate automation guide' })
  }
}


