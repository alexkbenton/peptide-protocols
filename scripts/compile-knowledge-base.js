#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Simple YAML frontmatter parser
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: { compound: 'Unknown' },
      markdown: content,
    };
  }

  const [, frontmatterStr, markdown] = match;
  const frontmatter = { compound: 'Unknown' };

  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    if (!line.trim() || line.trim().startsWith('#')) continue;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        frontmatter[key] = JSON.parse(value);
      } catch {
        frontmatter[key] = value;
      }
    }
    // Parse numbers
    else if (!isNaN(Number(value)) && value !== '') {
      frontmatter[key] = Number(value);
    }
    // Parse booleans
    else if (value === 'true' || value === 'false') {
      frontmatter[key] = value === 'true';
    }
    // String values
    else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, markdown };
}

/**
 * Compile knowledge base from markdown files
 */
function compileKnowledgeBase() {
  const projectRoot = path.join(__dirname, '..');
  const kbDir = path.join(projectRoot, 'src', 'data', 'knowledge-base');

  if (!fs.existsSync(kbDir)) {
    console.error(`Knowledge base directory not found: ${kbDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(kbDir).filter((f) => f.endsWith('.md'));

  if (files.length === 0) {
    console.error('No markdown files found in knowledge base directory');
    process.exit(1);
  }

  const entries = [];

  for (const file of files) {
    try {
      const filePath = path.join(kbDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { frontmatter, markdown } = parseFrontmatter(fileContent);

      entries.push({
        compound: frontmatter.compound || file.replace('.md', ''),
        frontmatter,
        content: markdown,
      });
    } catch (error) {
      console.error(`Error loading knowledge base file ${file}:`, error.message);
    }
  }

  // Generate TypeScript file
  const outputPath = path.join(projectRoot, 'src', 'data', 'knowledge-base-compiled.ts');

  const tsContent = `// AUTO-GENERATED - Do not edit manually
// Run: node scripts/compile-knowledge-base.js to regenerate

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

export interface KnowledgeBaseEntry {
  compound: string
  frontmatter: KnowledgeBaseFrontmatter
  content: string
}

export const KNOWLEDGE_BASE_ENTRIES: KnowledgeBaseEntry[] = ${JSON.stringify(
    entries,
    null,
    2,
  )};
`;

  fs.writeFileSync(outputPath, tsContent);
  console.log(`✓ Compiled ${entries.length} knowledge base entries to ${outputPath}`);
}

compileKnowledgeBase();
