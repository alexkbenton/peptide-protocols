import { KNOWLEDGE_BASE_ENTRIES } from '@/data/knowledge-base-compiled'

interface KnowledgeBaseEntry {
  compound: string
  frontmatter: Record<string, any>
  content: string
}

export type { KnowledgeBaseEntry }

// Helper: safely join a value that might be a string instead of an array
function safeJoin(val: any, sep: string): string {
  if (Array.isArray(val)) return val.join(sep)
  if (typeof val === 'string') return val
  return String(val)
}

/**
 * Goal-to-compounds mapping
 * Keys must match what the frontend sends (e.g., "Fat Loss", "Muscle Growth")
 */
const GOAL_TO_COMPOUNDS: Record<string, string[]> = {
  'Fat Loss': ['Retatrutide', 'Tirzepatide', 'CJC-1295', 'Ipamorelin', 'Tesamorelin', '5-Amino-1MQ', 'MOTS-C', 'SLU-PP-332'],
  'Muscle Growth': ['CJC-1295', 'Ipamorelin', 'Tesamorelin', 'BPC-157', 'TB-500'],
  'Gut Health': ['BPC-157', 'KPV', 'Larazotide', 'GHK-Cu'],
  'Anti-Inflammation': ['BPC-157', 'KPV', 'GHK-Cu', 'TB-500', 'SS-31'],
  'Longevity/Anti-Aging': ['Epithalon', 'FOXO4-DRI', 'NAD+', 'SS-31', 'MOTS-C', 'Pinealon'],
  'Cognitive Performance': ['Pinealon', 'NAD+', 'SS-31', 'GHK-Cu'],
  'Sleep Quality': ['CJC-1295', 'Ipamorelin', 'Pinealon'],
  'Injury Recovery': ['BPC-157', 'TB-500', 'GHK-Cu'],
  'Hormone Optimization': ['CJC-1295', 'Ipamorelin', 'Tesamorelin', 'Tirzepatide', 'Tadalafil'],
  'Energy/Mitochondrial Health': ['SS-31', 'MOTS-C', 'NAD+', '5-Amino-1MQ'],
  'Skin/Hair': ['GHK-Cu', 'BPC-157', 'Epithalon'],
  'Immune Support': ['TB-500', 'KPV', 'BPC-157'],
}

/**
 * Get the full knowledge base formatted for a system prompt
 */
export function getKnowledgeBase(): string {
  const entries = KNOWLEDGE_BASE_ENTRIES

  if (entries.length === 0) {
    return 'Knowledge base not available. Please ensure markdown files exist in src/data/knowledge-base/'
  }

  let formatted = '# PEPTIDE COMPOUNDS KNOWLEDGE BASE\n\n'
  formatted += `Updated: ${new Date().toISOString()}\n`
  formatted += `Total Compounds: ${entries.length}\n\n`

  for (const entry of entries) {
    formatted += `## ${entry.compound}\n\n`

    // Add frontmatter summary
    if (entry.frontmatter.category) {
      formatted += `**Category:** ${entry.frontmatter.category}\n\n`
    }

    if (entry.frontmatter.aliases && entry.frontmatter.aliases.length > 0) {
      formatted += `**Also Known As:** ${safeJoin(entry.frontmatter.aliases, ', ')}\n\n`
    }

    if (entry.frontmatter.typical_dose_mcg) {
      formatted += `**Typical Dose:** ${entry.frontmatter.typical_dose_mcg} mcg\n`
    }
    if (entry.frontmatter.dose_range_mcg) {
      const [min, max] = entry.frontmatter.dose_range_mcg
      formatted += `**Dose Range:** ${min}-${max} mcg\n`
    }
    if (entry.frontmatter.routes && entry.frontmatter.routes.length > 0) {
      formatted += `**Routes:** ${safeJoin(entry.frontmatter.routes, ', ')}\n`
    }
    if (entry.frontmatter.cycle_weeks) {
      const [min, max] = entry.frontmatter.cycle_weeks
      formatted += `**Cycle Length:** ${min}-${max} weeks\n`
    }
    if (entry.frontmatter.evidence_level) {
      formatted += `**Evidence Level:** ${entry.frontmatter.evidence_level}\n`
    }

    if (entry.frontmatter.contraindications && entry.frontmatter.contraindications.length > 0) {
      formatted += `**Contraindications:** ${safeJoin(entry.frontmatter.contraindications, '; ')}\n`
    }

    if (entry.frontmatter.synergies && entry.frontmatter.synergies.length > 0) {
      formatted += `**Synergies:** Works well with ${safeJoin(entry.frontmatter.synergies, ', ')}\n`
    }

    formatted += '\n'
    formatted += entry.content
    formatted += '\n\n---\n\n'
  }

  return formatted
}

/**
 * Get relevant compounds for specified goals
 */
export function getCompoundsByGoals(goals: string[]): string[] {
  const compoundSet = new Set<string>()

  for (const goal of goals) {
    // Try exact match first
    let compounds = GOAL_TO_COMPOUNDS[goal]

    // Fallback: try lowercase slug format for backwards compatibility
    if (!compounds) {
      const normalized = goal.toLowerCase().replace(/\s+/g, '-')
      compounds = GOAL_TO_COMPOUNDS[normalized]
    }

    if (compounds) {
      for (const compound of compounds) {
        compoundSet.add(compound)
      }
    }
  }

  return Array.from(compoundSet).sort()
}

/**
 * Get knowledge base entries for specific compounds
 */
export function getCompoundDocs(compoundNames: string[]): KnowledgeBaseEntry[] {
  const normalized = new Set(compoundNames.map((n) => n.toLowerCase()))

  return KNOWLEDGE_BASE_ENTRIES.filter(
    (entry) =>
      normalized.has(entry.compound.toLowerCase()) ||
      (entry.frontmatter.aliases &&
        entry.frontmatter.aliases.some((alias: string) => normalized.has(alias.toLowerCase()))),
  )
}

/**
 * Get knowledge base entries as structured data
 */
export function getKnowledgeBaseEntries(): KnowledgeBaseEntry[] {
  return KNOWLEDGE_BASE_ENTRIES
}

/**
 * Format knowledge base for API context (condensed version)
 */
export function getKnowledgeBaseForContext(compoundNames?: string[]): string {
  const entries = compoundNames ? getCompoundDocs(compoundNames) : KNOWLEDGE_BASE_ENTRIES

  if (entries.length === 0) {
    return 'No knowledge base entries found.'
  }

  let formatted = '# RELEVANT COMPOUND INFORMATION\n\n'

  for (const entry of entries) {
    formatted += `## ${entry.compound}\n`
    formatted += `**Category:** ${entry.frontmatter.category || 'N/A'}\n`

    if (entry.frontmatter.typical_dose_mcg) {
      formatted += `**Typical Dose:** ${entry.frontmatter.typical_dose_mcg} mcg\n`
    }
    if (entry.frontmatter.dose_range_mcg) {
      const [min, max] = entry.frontmatter.dose_range_mcg
      formatted += `**Range:** ${min}-${max} mcg\n`
    }
    if (entry.frontmatter.routes) {
      formatted += `**Routes:** ${safeJoin(entry.frontmatter.routes, ', ')}\n`
    }
    if (entry.frontmatter.evidence_level) {
      formatted += `**Evidence:** ${entry.frontmatter.evidence_level}\n`
    }
    if (entry.frontmatter.contraindications && entry.frontmatter.contraindications.length > 0) {
      formatted += `**Cautions:** ${safeJoin(entry.frontmatter.contraindications, '; ')}\n`
    }

    // Include first 300 chars of content
    const contentPreview = entry.content.substring(0, 300).replace(/\n/g, ' ').trim()
    if (contentPreview) {
      formatted += `\n${contentPreview}...\n`
    }

    formatted += '\n'
  }

  return formatted
}
