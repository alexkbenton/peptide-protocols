export interface Video {
  id: string
  title: string
  description: string
  vimeoId: string // Just the numeric Vimeo video ID
  category: string
}

// Placeholder videos — replace vimeoId with your actual Vimeo video IDs
export const videos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Peptide Science',
    description: 'A beginner-friendly overview of what peptides are and how they work in the body.',
    vimeoId: '76979871', // placeholder — replace with your actual Vimeo ID
    category: 'Fundamentals',
  },
  {
    id: '2',
    title: 'Understanding BPC-157',
    description: 'Deep dive into one of the most researched peptides for tissue repair and recovery.',
    vimeoId: '76979871', // placeholder
    category: 'Protocols',
  },
  {
    id: '3',
    title: 'Growth Hormone Secretagogues Explained',
    description: 'How CJC-1295, Ipamorelin, and other GH peptides work to optimize growth hormone levels.',
    vimeoId: '76979871', // placeholder
    category: 'Protocols',
  },
  {
    id: '4',
    title: 'Immune Peptides Overview',
    description: 'Exploring Thymosin Alpha-1, LL-37, and other immune-modulating peptides.',
    vimeoId: '76979871', // placeholder
    category: 'Immune',
  },
  {
    id: '5',
    title: 'Safety & Best Practices',
    description: 'Important considerations for anyone exploring peptide protocols.',
    vimeoId: '76979871', // placeholder
    category: 'Safety',
  },
  {
    id: '6',
    title: 'Q&A: Your Top Questions Answered',
    description: 'Addressing the most common questions about peptide use and protocols.',
    vimeoId: '76979871', // placeholder
    category: 'Q&A',
  },
]

export function getAllVideos(): Video[] {
  return videos
}
