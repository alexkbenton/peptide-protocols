export interface Protocol {
  slug: string
  title: string
  category: string
  summary: string
  content: string // Markdown-style content for the protocol page
}

// Placeholder protocols — replace with your actual content
export const protocols: Protocol[] = [
  {
    slug: 'bpc-157-recovery',
    title: 'BPC-157 Recovery Protocol',
    category: 'Recovery',
    summary: 'A structured protocol for using BPC-157 to support tissue repair and recovery.',
    content: `
## Overview

This is a placeholder protocol. Replace this content with your actual BPC-157 recovery protocol.

## Dosage & Timing

*Content coming soon.*

## Duration

*Content coming soon.*

## Notes & Considerations

*Content coming soon.*

## References

*Content coming soon.*
    `.trim(),
  },
  {
    slug: 'thymosin-alpha-immune',
    title: 'Thymosin Alpha-1 Immune Protocol',
    category: 'Immune Support',
    summary: 'A protocol focused on immune system modulation using Thymosin Alpha-1.',
    content: `
## Overview

This is a placeholder protocol. Replace this content with your actual Thymosin Alpha-1 protocol.

## Dosage & Timing

*Content coming soon.*

## Duration

*Content coming soon.*

## Notes & Considerations

*Content coming soon.*

## References

*Content coming soon.*
    `.trim(),
  },
  {
    slug: 'cjc-ipamorelin-gh',
    title: 'CJC-1295 / Ipamorelin GH Protocol',
    category: 'Growth Hormone',
    summary: 'A combination protocol for growth hormone optimization using CJC-1295 and Ipamorelin.',
    content: `
## Overview

This is a placeholder protocol. Replace this content with your actual CJC-1295/Ipamorelin protocol.

## Dosage & Timing

*Content coming soon.*

## Duration

*Content coming soon.*

## Notes & Considerations

*Content coming soon.*

## References

*Content coming soon.*
    `.trim(),
  },
]

export function getProtocolBySlug(slug: string): Protocol | undefined {
  return protocols.find((p) => p.slug === slug)
}

export function getAllProtocols(): Protocol[] {
  return protocols
}
