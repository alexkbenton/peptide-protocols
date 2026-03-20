export interface Video {
  id: string
  title: string
  description: string
  wistiaId: string // Wistia video hash ID (from your Wistia media URL)
  category: VideoCategory
  duration?: string // e.g. "12:34"
}

export type VideoCategory =
  | 'Peptide Basics'
  | 'Gut Health & Recovery'
  | 'Body Composition & Performance'
  | 'Cellular Repair & Longevity'
  | 'Administration & Safety'

export const categoryDescriptions: Record<VideoCategory, string> = {
  'Peptide Basics': 'Foundational knowledge — what peptides are, how they work, and what the research says.',
  'Gut Health & Recovery': 'Protocols and science behind BPC-157, KPV, and other gut-healing peptides.',
  'Body Composition & Performance': 'GH secretagogues, Retatrutide, and peptides for fat loss, muscle, and metabolism.',
  'Cellular Repair & Longevity': 'NAD+, Epithalon, SS-31, and the frontier of cellular optimization.',
  'Administration & Safety': 'Reconstitution, injection technique, dosing, storage, and safety essentials.',
}

export const categoryOrder: VideoCategory[] = [
  'Peptide Basics',
  'Gut Health & Recovery',
  'Body Composition & Performance',
  'Cellular Repair & Longevity',
  'Administration & Safety',
]

// ──────────────────────────────────────────────
// To add a video, just add an entry here.
// Set wistiaId to the hash from your Wistia media URL
// (e.g. https://fast.wistia.com/medias/abc123xyz → wistiaId: 'abc123xyz')
// ──────────────────────────────────────────────

export const videos: Video[] = [
  // ── Peptide Basics ──────────────────────────
  // {
  //   id: 'basics-1',
  //   title: 'Introduction to Peptide Science',
  //   description: 'What peptides are, how they signal in the body, and why they matter.',
  //   wistiaId: 'abc123xyz',
  //   category: 'Peptide Basics',
  //   duration: '10:00',
  // },

  // ── Gut Health & Recovery ───────────────────
  // {
  //   id: 'gut-1',
  //   title: 'BPC-157 Deep Dive',
  //   description: 'Mechanisms, dosing, and the research behind the most studied gut peptide.',
  //   wistiaId: 'abc123xyz',
  //   category: 'Gut Health & Recovery',
  //   duration: '15:00',
  // },

  // ── Body Composition & Performance ──────────
  // {
  //   id: 'body-1',
  //   title: 'GH Secretagogues Explained',
  //   description: 'How CJC-1295, Ipamorelin, and Tesamorelin optimize growth hormone.',
  //   wistiaId: 'abc123xyz',
  //   category: 'Body Composition & Performance',
  //   duration: '18:00',
  // },

  // ── Cellular Repair & Longevity ─────────────
  // {
  //   id: 'cell-1',
  //   title: 'NAD+ & Cellular Energy',
  //   description: 'The role of NAD+ in mitochondrial function and healthy aging.',
  //   wistiaId: 'abc123xyz',
  //   category: 'Cellular Repair & Longevity',
  //   duration: '14:00',
  // },

  // ── Administration & Safety ─────────────────
  // {
  //   id: 'safety-1',
  //   title: 'Reconstitution & Injection 101',
  //   description: 'Step-by-step guide to reconstituting and administering peptides safely.',
  //   wistiaId: 'abc123xyz',
  //   category: 'Administration & Safety',
  //   duration: '12:00',
  // },
]

export function getAllVideos(): Video[] {
  return videos
}

export function getVideosByCategory(category: VideoCategory): Video[] {
  return videos.filter((v) => v.category === category)
}

export function getCategoriesWithVideos(): VideoCategory[] {
  const populated = new Set(videos.map((v) => v.category))
  return categoryOrder.filter((c) => populated.has(c))
}
