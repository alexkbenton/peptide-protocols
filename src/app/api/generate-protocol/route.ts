import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { getKnowledgeBase, getCompoundsByGoals, getKnowledgeBaseForContext } from '@/lib/knowledge-base'

/**
 * Request body type
 */
interface ProtocolRequest {
  goals: string[]
  profile: {
    age: number
    weight: number
    sex: 'male' | 'female'
    experience: 'beginner' | 'intermediate' | 'advanced'
  }
  advancedData?: {
    medications: string[]
    conditions: string[]
    biomarkers?: Record<string, number>
  }
}

/**
 * Protocol compound entry
 */
interface ProtocolCompound {
  name: string
  purpose: string
  dose: string
  route: string
  frequency: string
  timing: string
  cycle: string
  evidenceLevel: string
  notes: string
}

/**
 * Generated protocol response
 */
export interface GeneratedProtocol {
  title: string
  overview: string
  compounds: ProtocolCompound[]
  weeklySchedule: string
  cyclingProtocol: string
  importantWarnings: string[]
  synergies: string
  monitoring: string
  disclaimer: string
}

/**
 * Validate request
 */
function validateRequest(body: any): body is ProtocolRequest {
  if (!body.goals || !Array.isArray(body.goals) || body.goals.length === 0) {
    return false
  }

  if (!body.profile) {
    return false
  }

  const { age, weight, sex, experience } = body.profile

  if (typeof age !== 'number' || age < 18 || age > 150) {
    return false
  }

  if (typeof weight !== 'number' || weight < 40 || weight > 500) {
    return false
  }

  if (sex !== 'male' && sex !== 'female') {
    return false
  }

  if (!['beginner', 'intermediate', 'advanced'].includes(experience)) {
    return false
  }

  return true
}

/**
 * System prompt for Claude
 */
function getSystemPrompt(
  userGoals: string[],
  relevantCompounds: string[],
  knowledgeBase: string,
  userProfile: any,
): string {
  return `You are an expert peptide protocol advisor with deep knowledge of peptide biochemistry, clinical pharmacology, and personalized protocol design. You have access to a comprehensive knowledge base of peptide compounds and their mechanisms of action.

## Your Role
You create personalized, evidence-based peptide protocols tailored to individual goals, profile characteristics, and health status. You prioritize safety, efficacy, and evidence levels in all recommendations.

## Important Context About User
- **Goals:** ${userGoals.join(', ')}
- **Age:** ${userProfile.age}
- **Weight:** ${userProfile.weight} lbs
- **Sex:** ${userProfile.sex}
- **Experience Level:** ${userProfile.experience}
${userProfile.advancedData?.medications?.length > 0 ? `- **Medications:** ${userProfile.advancedData.medications.join(', ')}` : ''}
${userProfile.advancedData?.conditions?.length > 0 ? `- **Medical Conditions:** ${userProfile.advancedData.conditions.join(', ')}` : ''}

## Knowledge Base Reference
The following compounds are particularly relevant to the user's goals:

${getKnowledgeBaseForContext(relevantCompounds)}

Full knowledge base available:
${knowledgeBase}

## Protocol Design Requirements

1. **Compound Selection:**
   - Select 3-6 compounds that synergize well for the stated goals
   - Prioritize compounds with higher evidence levels
   - Consider bioavailability, route of administration, and user experience level
   - Flag any potential interactions with stated medications

2. **Dosing Recommendations:**
   - Base doses on established research and clinical guidelines
   - Adjust for user characteristics (age, weight, sex)
   - Provide dose ranges with clear recommendations
   - Include frequency (daily, weekly, etc.) and timing

3. **Evidence & Citations:**
   - Rate each compound's evidence level (preclinical, animal model, pilot human study, clinical trial, approved pharmaceutical)
   - Explain the mechanism relevant to each goal
   - Note any important limitations in current evidence

4. **Safety & Monitoring:**
   - Identify contraindications relevant to user's medications/conditions
   - Recommend monitoring parameters (bloodwork, etc.)
   - Include clear warnings about off-label use and risks
   - For beginners: conservative doses and fewer compounds

5. **Cycling & Administration:**
   - Provide specific cycling protocols (on/off weeks)
   - Include suggested weekly schedule with exact timing
   - Consider compound interactions and spacing
   - Note any need for washout periods

6. **Synergies & Optimization:**
   - Explain how compounds work together
   - Note timing considerations for maximum synergy
   - Include spacing requirements between doses

## Output Format

Return ONLY valid JSON with this exact structure:

\`\`\`json
{
  "title": "Personalized Protocol for [Goals]",
  "overview": "Comprehensive explanation of protocol design, compounds selected, and expected outcomes (2-3 paragraphs)",
  "compounds": [
    {
      "name": "Compound Name",
      "purpose": "Why this compound for these goals",
      "dose": "X-Y mcg or mg per injection/dose",
      "route": "subcutaneous/intramuscular/oral/etc",
      "frequency": "Once daily/3x weekly/etc",
      "timing": "Morning/with food/between compounds/etc",
      "cycle": "X weeks on, Y weeks off OR continuous per protocol",
      "evidenceLevel": "preclinical/animal/pilot/clinical/approved",
      "notes": "Additional considerations (interactions, side effects, monitoring needed, etc)"
    }
  ],
  "weeklySchedule": "Detailed daily/weekly administration schedule as formatted text or table",
  "cyclingProtocol": "Explanation of on/off cycles, breaks, and long-term management",
  "importantWarnings": [
    "Warning 1: specific contraindication or serious risk",
    "Warning 2: interaction with stated medication",
    "etc"
  ],
  "synergies": "Explanation of how compounds work together and timing for maximum effect",
  "monitoring": "Recommended bloodwork, biomarkers, and timeline for monitoring",
  "disclaimer": "Legal disclaimer about off-label use, FDA status, and recommendation to work with healthcare provider"
}
\`\`\`

## Critical Safety Notes
- ALL peptides discussed are research chemicals or off-label uses (not FDA-approved for human use)
- User must obtain through qualified sources
- User should work with a knowledgeable healthcare provider
- Clearly flag any contraindications based on stated conditions/medications
- For women: note pregnancy/lactation considerations
- Include risk of adverse effects and monitoring parameters

## Tone
Professional, evidence-based, cautious about limitations of evidence. Avoid overpromising results. Be specific about what evidence exists vs. theoretical benefits.`
}

/**
 * POST handler for protocol generation
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate request
    if (!validateRequest(body)) {
      return NextResponse.json(
        { error: 'Invalid request. Please provide goals, age, weight, sex, and experience level.' },
        { status: 400 },
      )
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not configured')
      return NextResponse.json(
        {
          error: 'API configuration error. Please contact support. (Anthropic API key not configured)',
        },
        { status: 500 },
      )
    }

    // Initialize Anthropic client
    const client = new Anthropic({ apiKey })

    // Get relevant compounds and knowledge base
    const relevantCompounds = getCompoundsByGoals(body.goals)
    const knowledgeBase = getKnowledgeBase()

    // Build system prompt
    const systemPrompt = getSystemPrompt(body.goals, relevantCompounds, knowledgeBase, body)

    // Build user message
    const userMessage = `Please create a personalized peptide protocol for a ${body.profile.age}-year-old ${body.profile.sex} weighing ${body.profile.weight} lbs with ${body.profile.experience} experience level.

Goals: ${body.goals.join(', ')}

${
  (body.advancedData?.conditions?.length ?? 0) > 0
    ? `Medical conditions to consider: ${body.advancedData!.conditions.join(', ')}`
    : ''
}

${
  (body.advancedData?.medications?.length ?? 0) > 0
    ? `Current medications: ${body.advancedData!.medications.join(', ')}`
    : ''
}

${
  body.advancedData?.biomarkers ? `Current biomarkers: ${JSON.stringify(body.advancedData.biomarkers)}` : ''
}

Create a comprehensive, personalized protocol based on the knowledge base provided. Focus on safety, synergy, and evidence-based recommendations.`

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
      // Extract JSON from response (in case Claude wraps it)
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

    return NextResponse.json(protocol, { status: 200 })
  } catch (error) {
    console.error('Protocol generation error:', error)

    if (error instanceof Error) {
      if (error.message.includes('API')) {
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
