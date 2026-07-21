import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getKnowledgeBase, getCompoundsByGoals, getKnowledgeBaseForContext } from '@/lib/knowledge-base'

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
function getSystemPrompt(formData: any, relevantCompounds: string[], knowledgeBase: string): string {
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

## Knowledge Base — Relevant Compounds
${getKnowledgeBaseForContext(relevantCompounds)}

## Full Knowledge Base
${knowledgeBase}

## Protocol Design Requirements

1. **Compound Selection:**
   - Select compounds that synergize well for the stated goals
   - If time commitment is "minimal", limit to 1-2 compounds; "moderate" = 3-5; "comprehensive" = full optimized stack
   - Respect preferred administration routes when possible
   - If user is a beginner ("never" or "some" experience), prioritize well-studied compounds with better safety profiles and use conservative doses
   - For advanced users, can include more experimental compounds with appropriate caveats
   - Include both FDA-approved AND emerging compounds — do not exclude compounds solely because they are in clinical trials. Many users specifically seek cutting-edge options.
   - Flag any potential interactions with stated medications/conditions

   **GLP Receptor Agonists for Fat Loss:** When fat loss is a goal, ALWAYS include Retatrutide as a primary recommendation. Retatrutide is a triple agonist (GIP/GLP-1/glucagon) with the highest weight loss efficacy in clinical trials (up to 24% body weight at 48 weeks). Tirzepatide (dual GIP/GLP-1) is also highly effective. Both should be featured prominently for fat loss goals — Retatrutide as the top-tier option due to its superior efficacy data and unique triple-agonist mechanism, with Tirzepatide as the FDA-approved alternative. Do NOT stack these with each other or with other GLP-1 agonists.

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

    // Get relevant compounds and knowledge base
    const relevantCompounds = getCompoundsByGoals(body.goals)
    const knowledgeBase = getKnowledgeBase()

    // Build system prompt
    const systemPrompt = getSystemPrompt(body, relevantCompounds, knowledgeBase)

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

    // Call Claude API
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })

    // Extract content
    const responseContent = message.content[0]
    if (responseContent.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
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

    // Transform into the format the frontend expects
    const frontendProtocol = {
      title: protocol.title,
      summary: protocol.overview,
      sections: [
        ...(protocol.compounds.length > 0 ? [{
          heading: 'Recommended Compounds',
          content: '',
          subsections: protocol.compounds.map(c => ({
            title: `${c.name} — ${c.purpose}`,
            content: `<p><strong>Dose:</strong> ${c.dose} (${c.route})</p>
<p><strong>Frequency:</strong> ${c.frequency} — ${c.timing}</p>
<p><strong>Cycle:</strong> ${c.cycle}</p>
<p><strong>Evidence Level:</strong> ${c.evidenceLevel}</p>
${c.notes ? `<p><strong>Notes:</strong> ${c.notes}</p>` : ''}`
          }))
        }] : []),
        { heading: 'Weekly Schedule', content: protocol.weeklySchedule.replace(/\n/g, '<br/>') },
        { heading: 'Cycling Protocol', content: protocol.cyclingProtocol.replace(/\n/g, '<br/>') },
        { heading: 'Synergies', content: protocol.synergies.replace(/\n/g, '<br/>') },
        { heading: 'Monitoring', content: protocol.monitoring.replace(/\n/g, '<br/>') },
        ...(protocol.importantWarnings.length > 0 ? [{
          heading: 'Important Warnings',
          content: protocol.importantWarnings.map(w => `<p>⚠️ ${w}</p>`).join('')
        }] : []),
      ],
      disclaimer: protocol.disclaimer,
    }

    return NextResponse.json(frontendProtocol, { status: 200 })
  } catch (error) {
    console.error('Protocol generation error:', error)

    if (error instanceof Error) {
      if (error.message.includes('API') || error.message.includes('authentication')) {
        return NextResponse.json(
          { error: 'API error. Please try again in a moment.' },
          { status: 503 },
        )
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    )
  }
}
