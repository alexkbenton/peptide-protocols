import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

/**
 * Frontmatter type for knowledge base files
 */
export interface KnowledgeBaseFrontmatter {
  compound: string
  aliases?: string[]
  category?: string
  routes?: string[]
  dose_range_mcg?: [number, number]
  typical_dose_mcg?: number
  cycle_weeks?: [number, number]
  contraindications?: string[]
  synergies?: string[]
  evidence_level?: string
  last_updated?: string
  [key: string]: any
}

/**
 * Parsed knowledge base entry
 */
export interface KnowledgeBaseEntry {
  compound: string
  frontmatter: KnowledgeBaseFrontmatter
  content: string
}

/**
 * Goal-to-compounds mapping
 */
const GOAL_TO_COMPOUNDS: Record<string, string[]> = {
  'fat-loss': ['Retatrutide', 'CJC-1295', 'Ipamorelin', 'Tesamorelin', '5-Amino-1MQ', 'MOTS-C', 'SLU-PP-332', 'L-Carnitine'],
  'muscle-growth': ['CJC-1295', 'Ipamorelin', 'Tesamorelin', 'BPC-157', 'TB-500'],
  'gut-health': ['BPC-157', 'KPV', 'Larazotide', 'GHK-Cu'],
  'anti-inflammation': ['BPC-157', 'KPV', 'GHK-Cu', 'TB-500', 'SS-31'],
  'longevity': ['Epithalon', 'FOXO4-DRI', 'NAD+', 'SS-31', 'MOTS-C', 'Pinealon'],
  'cognitive': ['Pinealon', 'NAD+', 'SS-31', 'GHK-Cu'],
  'sleep': ['CJC-1295', 'Ipamorelin', 'Pinealon'],
  'injury-recovery': ['BPC-157', 'TB-500', 'GHK-Cu'],
  'hormone-optimization': ['CJC-1295', 'Ipamorelin', 'Tesamorelin', 'Tadalafil'],
  'energy': ['SS-31', 'MOTS-C', 'NAD+', '5-Amino-1MQ', 'Creatine'],
  'skin-hair': ['GHK-Cu', 'BPC-157', 'Epithalon'],
  'immune-support': ['TB-500', 'KPV', 'BPC-157'],
}

/**
 * Parse YAML/JSON frontmatter from markdown file
 */
function parseFrontmatter(content: string): {
  frontmatter: KnowledgeBaseFrontmatter
  markdown: string
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { frontmatter: { compound: 'Unknown' }, markdown: content }
  }

  const [, frontmatterStr, markdown] = match
  const frontmatter: KnowledgeBaseFrontmatter = { compound: 'Unknown' }

  // Simple YAML parser for our format
  const lines = frontmatterStr.split('\n')
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue

    const [key, ...valueParts] = line.split(':')
    const cleanKey = key.trim()
    let value = valueParts.join(':').trim()

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        frontmatter[cleanKey] = JSON.parse(value)
      } catch {
        frontmatter[cleanKey] = value
      }
    }
    // Parse numbers
    else if (!isNaN(Number(value)) && value !== '') {
      frontmatter[cleanKey] = Number(value)
    }
    // Parse booleans
    else if (value === 'true' || value === 'false') {
      frontmatter[cleanKey] = value === 'true'
    }
    // String values
    else {
      frontmatter[cleanKey] = value
    }
  }

  return { frontmatter, markdown }
}

/**
 * Load all knowledge base entries from disk
 */
function loadAllEntries(): KnowledgeBaseEntry[] {
  const kbDir = join(process.cwd(), 'src', 'data', 'knowledge-base')

  try {
    const files = readdirSync(kbDir).filter((f) => f.endsWith('.md'))
    const entries: KnowledgeBaseEntry[] = []

    for (const file of files) {
      try {
        const filePath = join(kbDir, file)
        const fileContent = readFileSync(filePath, 'utf-8')
        const { frontmatter, markdown } = parseFrontmatter(fileContent)

        entries.push({
          compound: frontmatter.compound || file.replace('.md', ''),
          frontmatter,
          content: markdown,
        })
      } catch (error) {
        console.error(`Error loading knowledge base file ${file}:`, error)
      }
    }

    return entries
  } catch (error) {
    console.error('Error loading knowledge base directory:', error)
    return []
  }
}

/**
 * Get the full knowledge base formatted for a system prompt
 */
export function getKnowledgeBase(): string {
  const entries = loadAllEntries()

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
      formatted += `**Also Known As:** ${entry.frontmatter.aliases.join(', ')}\n\n`
    }

    if (entry.frontmatter.typical_dose_mcg) {
      formatted += `**Typical Dose:** ${entry.frontmatter.typical_dose_mcg} mcg\n`
    }
    if (entry.frontmatter.dose_range_mcg) {
      const [min, max] = entry.frontmatter.dose_range_mcg
      formatted += `**Dose Range:** ${min}-${max} mcg\n`
    }
    if (entry.frontmatter.routes && entry.frontmatter.routes.length > 0) {
      formatted += `**Routes:** ${entry.frontmatter.routes.join(', ')}\n`
    }
    if (entry.frontmatter.cycle_weeks) {
      const [min, max] = entry.frontmatter.cycle_weeks
      formatted += `**Cycle Length:** ${min}-${max} weeks\n`
    }
    if (entry.frontmatter.evidence_level) {
      formatted += `**Evidence Level:** ${entry.frontmatter.evidence_level}\n`
    }

    if (entry.frontmatter.contraindications && entry.frontmatter.contraindications.length > 0) {
      formatted += `**Contraindications:** ${entry.frontmatter.contraindications.join('; ')}\n`
    }

    if (entry.frontmatter.synergies && entry.frontmatter.synergies.length > 0) {
      formatted += `**Synergies:** Works well with ${entry.frontmatter.synergies.join(', ')}\n`
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
    const normalized = goal.toLowerCase().replace(/\s+/g, '-')
    const compounds = GOAL_TO_COMPOUNDS[normalized] || []

    for (const compound of compounds) {
      compoundSet.add(compound)
    }
  }

  return Array.from(compoundSet).sort()
}

/**
 * Get knowledge base entries for specific compounds
 */
export function getCompoundDocs(compoundNames: string[]): KnowledgeBaseEntry[] {
  const entries = loadAllEntries()
  const normalized = new Set(compoundNames.map((n) => n.toLowerCase()))

  return entries.filter(
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
  return loadAllEntries()
}

/**
 * Format knowledge base for API context (condensed version)
 */
export function getKnowledgeBaseForContext(compoundNames?: string[]): string {
  const entries = compoundNames ? getCompoundDocs(compoundNames) : loadAllEntries()

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
      formatted += `**Routes:** ${entry.frontmatter.routes.join(', ')}\n`
    }
    if (entry.frontmatter.evidence_level) {
      formatted += `**Evidence:** ${entry.frontmatter.evidence_level}\n`
    }
    if (entry.frontmatter.contraindications && entry.frontmatter.contraindications.length > 0) {
      formatted += `**Cautions:** ${entry.frontmatter.contraindications.join('; ')}\n`
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
