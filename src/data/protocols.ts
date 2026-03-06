export interface Protocol {
  slug: string
  title: string
  category: string
  summary: string
  compounds?: string[]
}

export const protocols: Protocol[] = [
  {
    slug: 'gut-health-anti-inflammation',
    title: 'Gut Health & Anti-Inflammation Protocol',
    category: 'Gut Health',
    summary: 'A multi-tiered protocol targeting gut repair, barrier function, and anti-inflammatory pathways using BPC-157, KPV, TB-500, GHK-Cu, and Larazotide.',
    compounds: ['BPC-157', 'KPV', 'TB-500', 'GHK-Cu', 'Larazotide'],
  },
  {
    slug: 'optimal-fat-muscle-mito',
    title: 'Optimal Fat-Burning, Lean Muscle & Mitochondrial Health Protocol',
    category: 'Body Composition',
    summary: 'A comprehensive 11-compound protocol for fat loss, lean muscle building, and mitochondrial optimization using peptides and small molecules.',
    compounds: ['Retatrutide', 'CJC-1295/Ipamorelin', 'GLOW Blend', 'SS-31', 'MOTS-C', '5-Amino-1MQ', 'SLU-PP-332', 'NAD+', 'L-Carnitine', 'Creatine', 'Tadalafil'],
  },
  {
    slug: 'cellular-repair',
    title: 'Cellular Repair Protocol',
    category: 'Longevity',
    summary: 'A 12-week stacked protocol targeting mitochondrial repair, DNA/telomere protection, neuroprotection, and longevity signaling.',
    compounds: ['SS-31', 'Pinealon', 'Epithalon', 'NAD+', 'FOXO4-DRI'],
  },
]

export function getProtocolBySlug(slug: string): Protocol | undefined {
  return protocols.find((p) => p.slug === slug)
}

export function getAllProtocols(): Protocol[] {
  return protocols
}
