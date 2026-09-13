import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getCompoundsByGoals, getDetailedDocs, getCompoundIndex } from '@/lib/knowledge-base'

// Comprehensive protocols (many goals, large stacks) can take 80s+ to generate.
// Without this, Vercel cuts the function off at its short default.
export const maxDuration = 300

/**
 * Generated protocol response — used by generate-pdf
 */
export interface GeneratedProtocol {
  title: string
  overview: string
  compounds: Array<{
    name: string
    purpose: string
    dose: string
    route: string
    frequency: string
    timing: string
    cycle: string
    evidenceLevel: string
    notes: string
  }>
  weeklySchedule: string
  cyclingProtocol: string
  importantWarnings: string[]
  synergies: string
  monitoring: string
  disclaimer: string
}

/**
 * Build the system prompt with knowledge base and user context
 */
function getSystemPrompt(formData: any, relevantCompounds: string[]): string {
  // Build user context section
  const contextLines: string[] = []
  contextLines.push(`- **Goals:** ${formData.goals.join(', ')}`)

  if (formData.topPriorities?.length > 0) {
    contextLines.push(`- **Top Priorities:** ${formData.topPriorities.join(', ')}`)
  }
  if (formData.age) contextLines.push(`- **Age:** ${formData.age}`)
  if (formData.biologicalSex) contextLines.push(`- **Biological Sex:** ${formData.biologicalSex}`)
  if (formData.weight) contextLines.push(`- **Weight:** ${formData.weight} ${formData.weightUnit || 'lbs'}`)
  if (formData.activityLevel) contextLines.push(`- **Activity Level:** ${formData.activityLevel}`)
  if (formData.peptideExperience) contextLines.push(`- **Peptide Experience:** ${formData.peptideExperience}`)
  if (formData.preferredRoutes?.length > 0) {
    contextLines.push(`- **Preferred Routes:** ${formData.preferredRoutes.join(', ')}`)
  }
  if (formData.timeCommitment) contextLines.push(`- **Time Commitment:** ${formData.timeCommitment}`)
  if (formData.previousPeptides) contextLines.push(`- **Previous Peptide Experience:** ${formData.previousPeptides}`)
  if (formData.sleepQuality) contextLines.push(`- **Sleep Quality:** ${formData.sleepQuality}`)
  if (formData.stressLevel) contextLines.push(`- **Stress Level:** ${formData.stressLevel}`)
  if (formData.dietType) contextLines.push(`- **Diet Type:** ${formData.dietType}`)
  if (formData.conditions) contextLines.push(`- **Medications/Conditions:** ${formData.conditions}`)
  if (formData.supplements) contextLines.push(`- **Current Supplements/Peptides:** ${formData.supplements}`)
  if (formData.geneticVariants) contextLines.push(`- **Known Genetic Variants:** ${formData.geneticVariants}`)
  if (formData.healthHistory) contextLines.push(`- **Health History:** ${formData.healthHistory}`)

  // Build bloodwork section
  const bloodworkEntries = Object.entries(formData.bloodwork || {}).filter(([, v]) => v !== undefined && v !== null)
  if (bloodworkEntries.length > 0) {
    contextLines.push(`- **Bloodwork:**`)
    for (const [key, value] of bloodworkEntries) {
      contextLines.push(`  - ${key}: ${value}`)
    }
  }

  return `You are an expert peptide protocol advisor with deep knowledge of peptide biochemistry, clinical pharmacology, and personalized protocol design. You have access to a comprehensive knowledge base of peptide compounds.

## Your Role
You create personalized, evidence-based peptide protocols tailored to individual goals, profile characteristics, and health status. You prioritize safety, efficacy, and evidence levels in all recommendations.

## User Profile
${contextLines.join('\n')}

## Knowledge Base
${getDetailedDocs(relevantCompounds)}
${getCompoundIndex(relevantCompounds)}

## Protocol Design Requirements

1. **Compound Selection:**
   - Select compounds that synergize well for the stated goals
   - If time commitment is "minimal", limit to 1-2 compounds; "moderate" = 3-5; "comprehensive" = full optimized stack
   - Respect preferred administration routes when possible
   - If user is a beginner ("never" or "some" experience), prioritize well-studied compounds with better safety profiles and use conservative doses
   - For advanced users, can include more experimental compounds with appropriate caveats
   - Include both FDA-approved AND emerging compounds — do not exclude compounds solely because they are in clinical trials. Many users specifically seek cutting-edge options.
   - Flag any potential interactions with stated medications/conditions

   **GLP Receptor Agonists for Fat Loss:** When fat loss is a goal, feature Tirzepatide as the primary recommendation. Tirzepatide is an FDA-approved dual GIP/GLP-1 agonist with the highest weight loss efficacy of any approved anti-obesity medication (up to 22.5% body weight in clinical trials). It should be featured prominently for fat loss goals as the top-tier, clinically validated option. Do NOT stack it with other GLP-1 agonists.

2. **Dosing Recommendations:**
   - Base doses on established research and clinical guidelines
   - Adjust for user characteristics (age, weight, sex) when available
   - If bloodwork is provided, factor in relevant biomarker values
   - Provide dose ranges with clear recommendations
   - Include frequency and timing

3. **Lifestyle Integration:**
   - If sleep quality is poor, consider compounds that may support sleep
   - If stress is high, consider cortisol/adrenal support
   - Adjust timing recommendations based on diet type (e.g., fasted protocols for IF users)
   - Factor activity level into recovery and dosing recommendations

4. **Evidence & Citations:**
   - Rate each compound's evidence level
   - Explain the mechanism relevant to each goal
   - Note limitations in current evidence

5. **Safety & Monitoring:**
   - Identify contraindications based on stated conditions/medications
   - Recommend monitoring parameters
   - Include clear warnings about off-label use

6. **Cycling & Administration:**
   - Provide specific cycling protocols
   - Include suggested weekly schedule
   - Note compound interactions and spacing

## Output Format

Return ONLY valid JSON with this exact structure (no markdown code blocks, just the raw JSON):

{
  "title": "Personalized Protocol for [Goals]",
  "overview": "Comprehensive explanation (2-3 paragraphs) of protocol design rationale, expected outcomes, and how it's tailored to this specific user",
  "compounds": [
    {
      "name": "Compound Name",
      "purpose": "Why this compound for these goals and this user",
      "dose": "X-Y mcg or mg per dose",
      "route": "subcutaneous/oral/nasal/topical/etc",
      "frequency": "Once daily/3x weekly/etc",
      "timing": "Morning/evening/with food/etc",
      "cycle": "X weeks on, Y weeks off",
      "evidenceLevel": "preclinical/animal/pilot/clinical/approved",
      "notes": "Side effects, monitoring needed, interactions"
    }
  ],
  "weeklySchedule": "Detailed daily/weekly administration schedule",
  "cyclingProtocol": "On/off cycles, breaks, long-term management",
  "importantWarnings": ["Warning 1", "Warning 2"],
  "synergies": "How compounds work together and timing for max effect",
  "monitoring": "Recommended bloodwork and timeline for monitoring",
  "disclaimer": "This protocol is for educational purposes only. All compounds discussed are research chemicals or used off-label. Consult a qualified healthcare provider before implementing any protocol. This does not constitute medical advice."
}

## Critical Safety Notes
- ALL peptides discussed are research chemicals or off-label uses
- User should work with a knowledgeable healthcare provider
- Clearly flag contraindications based on stated conditions/medications
- For women: note pregnancy/lactation considerations
- Include risk of adverse effects and monitoring parameters

## Tone
Professional, evidence-based, cautious about limitations. Avoid overpromising. Be specific about evidence vs. theoretical benefits.`
}

/**
 * Pull whatever is readable out of a partially-streamed JSON response.
 * Tolerant by design: the buffer is almost always mid-token.
 */
function extractPartial(buf: string): {
  title?: string
  overview?: string
  compounds: Array<Record<string, string>>
  stages: string[]
} {
  const str = (key: string): string | undefined => {
    // Match a complete "key": "value" pair, allowing escaped quotes.
    const m = buf.match(new RegExp(`"${key}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`))
    if (!m) return undefined
    try {
      return JSON.parse(`"${m[1]}"`)
    } catch {
      return undefined
    }
  }

  // Walk the compounds array and collect objects that have closed.
  const compounds: Array<Record<string, string>> = []
  const arrStart = buf.search(/"compounds"\s*:\s*\[/)
  if (arrStart !== -1) {
    let i = buf.indexOf('[', arrStart)
    let depth = 0
    let objStart = -1
    let inStr = false
    let esc = false
    for (i = i + 1; i < buf.length; i++) {
      const ch = buf[i]
      if (esc) { esc = false; continue }
      if (ch === '\\') { esc = true; continue }
      if (ch === '"') { inStr = !inStr; continue }
      if (inStr) continue
      if (ch === '{') { if (depth === 0) objStart = i; depth++ }
      else if (ch === '}') {
        depth--
        if (depth === 0 && objStart !== -1) {
          try { compounds.push(JSON.parse(buf.slice(objStart, i + 1))) } catch { /* mid-write */ }
          objStart = -1
        }
      } else if (ch === ']' && depth === 0) break
    }
  }

  // Which named sections the model has started emitting — drives real progress.
  const stages: string[] = []
  if (str('title')) stages.push('title')
  if (str('overview')) stages.push('overview')
  if (compounds.length > 0) stages.push('compounds')
  for (const key of ['weeklySchedule', 'cyclingProtocol', 'synergies', 'monitoring']) {
    if (new RegExp(`"${key}"\\s*:`).test(buf)) stages.push(key)
  }

  return { title: str('title'), overview: str('overview'), compounds, stages }
}

/**
 * Shape a validated protocol into what the wizard renders.
 * Missing optional fields degrade to "section omitted", never an exception.
 */
function toFrontendProtocol(protocol: GeneratedProtocol) {
  const html = (v: unknown): string =>
    typeof v === 'string' && v.trim().length > 0 ? v.replace(/\n/g, '<br/>') : ''

  const optionalSection = (heading: string, value: unknown) => {
    const content = html(value)
    return content ? [{ heading, content }] : []
  }

  const warnings = Array.isArray(protocol.importantWarnings) ? protocol.importantWarnings : []
  const compounds = Array.isArray(protocol.compounds) ? protocol.compounds : []

  return {
    title: protocol.title,
    summary: typeof protocol.overview === 'string' ? protocol.overview : '',
    sections: [
      ...(compounds.length > 0 ? [{
        heading: 'Recommended Compounds',
        content: '',
        subsections: compounds.map(c => ({
          title: `${c.name}${c.purpose ? ` — ${c.purpose}` : ''}`,
          content: `<p><strong>Dose:</strong> ${c.dose} (${c.route})</p>
<p><strong>Frequency:</strong> ${c.frequency} — ${c.timing}</p>
<p><strong>Cycle:</strong> ${c.cycle}</p>
<p><strong>Evidence Level:</strong> ${c.evidenceLevel}</p>
${c.notes ? `<p><strong>Notes:</strong> ${c.notes}</p>` : ''}`
        }))
      }] : []),
      ...optionalSection('Weekly Schedule', protocol.weeklySchedule),
      ...optionalSection('Cycling Protocol', protocol.cyclingProtocol),
      ...optionalSection('Synergies', protocol.synergies),
      ...optionalSection('Monitoring', protocol.monitoring),
      ...(warnings.length > 0 ? [{
        heading: 'Important Warnings',
        content: warnings.map(w => `<p>⚠️ ${w}</p>`).join('')
      }] : []),
    ],
    disclaimer:
      typeof protocol.disclaimer === 'string' && protocol.disclaimer.trim()
        ? protocol.disclaimer
        : 'This protocol is for educational purposes only and does not constitute medical advice. Consult a qualified healthcare provider before implementing any protocol.',
  }
}

/**
 * POST handler for protocol generation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Basic validation — only goals are required
    if (!body.goals || !Array.isArray(body.goals) || body.goals.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one goal.' },
        { status: 400 },
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured')
      return NextResponse.json(
        { error: 'API configuration error. The Anthropic API key is not configured. Please contact support.' },
        { status: 500 },
      )
    }

    // Initialize Anthropic client
    const client = new Anthropic({ apiKey })

    // Only the compounds this request actually needs get full detail; the rest
    // are a one-line index. Sending the whole library every time cost ~70k
    // tokens per request and pushed generation past the connection timeout.
    const relevantCompounds = getCompoundsByGoals(body.goals)

    // Build system prompt
    const systemPrompt = getSystemPrompt(body, relevantCompounds)

    // Build user message
    const userParts: string[] = []
    userParts.push(`Please create a personalized peptide protocol.`)
    userParts.push(`\nGoals: ${body.goals.join(', ')}`)

    if (body.topPriorities?.length > 0) {
      userParts.push(`Top priorities: ${body.topPriorities.join(', ')}`)
    }
    if (body.age) userParts.push(`Age: ${body.age}`)
    if (body.biologicalSex) userParts.push(`Sex: ${body.biologicalSex}`)
    if (body.weight) userParts.push(`Weight: ${body.weight} ${body.weightUnit || 'lbs'}`)
    if (body.peptideExperience) userParts.push(`Experience: ${body.peptideExperience}`)
    if (body.timeCommitment) userParts.push(`Time commitment: ${body.timeCommitment}`)

    userParts.push(`\nCreate a comprehensive, personalized protocol based on the knowledge base provided. Focus on safety, synergy, and evidence-based recommendations. Return ONLY the JSON object, no markdown.`)

    const userMessage = userParts.join('\n')

    const requestParams = {
      // Model ID is configurable so a model retirement is a Vercel env change,
      // not a code change. claude-sonnet-4-20250514 was retired 2026-06-15.
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5',
      // Comprehensive stacks (5+ goals) need real room; truncation is handled
      // explicitly below, but the budget should rarely be the binding constraint.
      max_tokens: 16000,
      system: systemPrompt,
      messages: [{ role: 'user' as const, content: userMessage }],
    }

    // ── Streaming path ────────────────────────────────────────────────
    // Bytes must keep flowing: a silent 2-minute request was being dropped at
    // ~113s. Streaming also lets the wizard show real progress instead of a
    // spinner, which is the difference between waiting and abandoning.
    if (body.stream) {
      const encoder = new TextEncoder()

      const readable = new ReadableStream({
        async start(controller) {
          let closed = false
          const send = (event: string, data: unknown) => {
            if (closed) return
            controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))
          }

          // Comment frames keep intermediaries from buffering or timing us out
          // during the long stretch before the model emits anything useful.
          const heartbeat = setInterval(() => {
            if (!closed) controller.enqueue(encoder.encode(': keepalive\n\n'))
          }, 5000)

          try {
            send('status', { stage: 'connected' })

            const stream = client.messages.stream(requestParams)
            let buf = ''
            let lastSignature = ''

            for await (const event of stream) {
              if (
                event.type === 'content_block_delta' &&
                'delta' in event &&
                event.delta.type === 'text_delta'
              ) {
                buf += event.delta.text

                const partial = extractPartial(buf)
                // Only push when something visible actually changed.
                const signature = `${partial.title ?? ''}|${(partial.overview ?? '').length}|${partial.compounds.length}|${partial.stages.join(',')}`
                if (signature !== lastSignature) {
                  lastSignature = signature
                  send('partial', partial)
                }
              }
            }

            const finalMessage = await stream.finalMessage()

            if (finalMessage.stop_reason === 'max_tokens') {
              console.error('Protocol generation hit max_tokens (stream)', {
                goals: body.goals,
                timeCommitment: body.timeCommitment,
                outputTokens: finalMessage.usage?.output_tokens,
              })
              send('error', {
                error:
                  'That protocol was too large to finish generating. Try selecting fewer goals, or a lighter time commitment.',
              })
              return
            }

            const jsonMatch = buf.match(/\{[\s\S]*\}/)
            if (!jsonMatch) throw new Error('No JSON found in streamed response')

            const parsed: GeneratedProtocol = JSON.parse(jsonMatch[0])
            if (!parsed.title || !Array.isArray(parsed.compounds)) {
              throw new Error('Invalid protocol structure')
            }

            send('protocol', toFrontendProtocol(parsed))
          } catch (err) {
            console.error('Protocol generation error (stream):', err)
            send('error', {
              error: 'We could not generate your protocol right now. Please try again in a moment.',
            })
          } finally {
            clearInterval(heartbeat)
            closed = true
            controller.close()
          }
        },
      })

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          // Stops proxies from buffering the stream into one lump at the end.
          'X-Accel-Buffering': 'no',
        },
      })
    }

    // Call Claude API
    // Streaming keeps the connection alive. A non-streaming call for a large
    // comprehensive protocol was timing out at ~115s with no usable error.
    const message = await client.messages.stream(requestParams).finalMessage()

    // Extract content
    const responseContent = message.content[0]
    if (responseContent.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // A truncated response yields malformed JSON further down, which is a
    // confusing way to discover you simply ran out of output budget.
    if (message.stop_reason === 'max_tokens') {
      console.error('Protocol generation hit max_tokens', {
        goals: body.goals,
        timeCommitment: body.timeCommitment,
        outputTokens: message.usage?.output_tokens,
      })
      return NextResponse.json(
        {
          error:
            'That protocol was too large to finish generating. Try selecting fewer goals, or a lighter time commitment.',
        },
        { status: 502 },
      )
    }

    // Parse JSON response
    let protocol: GeneratedProtocol
    try {
      // Extract JSON from response (in case Claude wraps it in markdown)
      const jsonMatch = responseContent.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No JSON found in response')
      }
      protocol = JSON.parse(jsonMatch[0])
    } catch (parseError) {
      console.error('Error parsing Claude response:', responseContent.text)
      return NextResponse.json(
        {
          error: 'Failed to parse protocol response. Please try again.',
          debug: process.env.NODE_ENV === 'development' ? responseContent.text : undefined,
        },
        { status: 500 },
      )
    }

    // Validate protocol structure
    if (!protocol.title || !protocol.compounds || !Array.isArray(protocol.compounds)) {
      return NextResponse.json(
        { error: 'Invalid protocol structure received. Please try again.' },
        { status: 500 },
      )
    }

    const frontendProtocol = toFrontendProtocol(protocol)

    return NextResponse.json(frontendProtocol, { status: 200 })
  } catch (error) {
    console.error('Protocol generation error:', error)

    // Never surface raw upstream API errors to the browser — they leak model IDs,
    // request ids and internal detail. Log the detail, return something readable
    // plus a coarse code so failures can be told apart without reading logs.
    if (error instanceof Error) {
      const status = (error as unknown as { status?: unknown }).status
      const code =
        typeof status === 'number'
          ? `upstream_${status}`
          : error.name === 'TypeError'
            ? 'malformed_protocol'
            : 'unknown'
      return NextResponse.json(
        {
          error: 'We could not generate your protocol right now. Please try again in a moment.',
          code,
        },
        { status: 503 },
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
