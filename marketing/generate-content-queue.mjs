#!/usr/bin/env node
/**
 * Content Queue Generator — Peptide Protocols
 * --------------------------------------------
 * Reads your protocol library and produces a ready-to-post content queue:
 * one row per short-form video idea, with hook, script, on-screen text,
 * caption, hashtags, and CTA — all compliance-safe by construction.
 *
 * Run it once for a seed batch; re-run anytime to reshuffle for fresh variety.
 *
 *   node marketing/generate-content-queue.mjs > marketing/content-queue.csv
 *
 * No API keys, no network. It's deterministic given the same data, but it
 * rotates angles across compounds so you get a large, varied queue from a
 * small topic list. Feed the output to your auto-posting tool.
 */

// --- Your library (kept in sync with src/data/protocols.ts) -----------------
const protocols = [
  {
    title: 'Gut Health & Anti-Inflammation Protocol',
    slug: 'gut-health-anti-inflammation',
    area: 'gut health and inflammation',
    compounds: ['BPC-157', 'KPV', 'TB-500', 'GHK-Cu', 'Larazotide'],
  },
  {
    title: 'Optimal Fat-Burning, Lean Muscle & Mitochondrial Health Protocol',
    slug: 'optimal-fat-muscle-mito',
    area: 'body composition and mitochondrial health',
    compounds: ['Retatrutide', 'CJC-1295/Ipamorelin', 'SS-31', 'MOTS-C', '5-Amino-1MQ', 'SLU-PP-332', 'NAD+', 'L-Carnitine', 'Creatine'],
  },
  {
    title: 'Maximizing Growth Hormone Release Protocol',
    slug: 'growth-hormone-release',
    area: 'natural growth hormone release',
    compounds: ['CJC-1295 no DAC', 'Ipamorelin', 'Tesamorelin', 'Glutamine', 'Zinc', 'Arginine'],
  },
  {
    title: 'Cellular Repair Protocol',
    slug: 'cellular-repair',
    area: 'cellular repair and longevity',
    compounds: ['SS-31', 'Pinealon', 'Epithalon', 'NAD+', 'FOXO4-DRI'],
  },
];

const SITE = 'peptideprotocols.us';

// --- Angle templates --------------------------------------------------------
// Each returns {hook, script, onscreen, caption}. Copy is education-framed and
// avoids cure/dosing/sales claims by design.
const angles = [
  {
    id: 'what-is',
    label: 'What is it',
    build: (c, p) => ({
      hook: `What actually is ${c}?`,
      script: `${c} is one of the compounds people research in the context of ${p.area}. ` +
        `It comes up a lot online, but most explanations skip the basics. ` +
        `Here's the short, factual version: what it is, what category it falls into, and why researchers find it interesting — ` +
        `without the hype. The full breakdown, including the cautions, is on the site.`,
      onscreen: [`${c}, explained`, `No hype. Just the basics.`, `What it is + why it's studied`, `Full breakdown → link in bio`],
      caption: `A plain-English look at ${c} — what it is and why it shows up in ${p.area} research.`,
    }),
  },
  {
    id: 'myth',
    label: 'Myth vs research',
    build: (c, p) => ({
      hook: `The biggest myth about ${c}`,
      script: `There's a popular claim about ${c} floating around, and it's mostly overstated. ` +
        `Here's what early research actually suggests versus what the internet promises. ` +
        `The honest answer is more nuanced than a 10-second clip — which is exactly why we wrote up the full picture, sources and caveats included.`,
      onscreen: [`Myth: ${c} is a magic bullet`, `Research: it's more nuanced`, `Here's the honest version`, `Full picture → link in bio`],
      caption: `Separating hype from what research actually says about ${c}.`,
    }),
  },
  {
    id: 'mechanism',
    label: 'How it works',
    build: (c, p) => ({
      hook: `How ${c} is thought to work`,
      script: `Ever wonder how ${c} is believed to act in the body? ` +
        `In simple terms, researchers are exploring its role in pathways tied to ${p.area}. ` +
        `We kept this high-level on purpose — the mechanism, the open questions, and what's still unknown are all laid out in the full protocol.`,
      onscreen: [`How ${c} is thought to work`, `Simplified mechanism`, `What's known + what isn't`, `Details → link in bio`],
      caption: `A simplified look at the mechanism researchers are investigating for ${c}.`,
    }),
  },
  {
    id: 'before-you-research',
    label: 'Things to understand',
    build: (c, p) => ({
      hook: `3 things to understand before you research ${c}`,
      script: `Before you go down the ${c} rabbit hole, three things worth knowing. ` +
        `One: what research stage it's actually at. Two: why context and the rest of a protocol matter. ` +
        `Three: the cautions people skip. This is educational only — not medical advice — and the full safety-forward writeup is on the site.`,
      onscreen: [`Before researching ${c}`, `1. The research stage`, `2. Context matters`, `3. The cautions people skip`, `Read first → link in bio`],
      caption: `Three things to understand before researching ${c}. Educational only — not medical advice.`,
    }),
  },
  {
    id: 'why-in-stack',
    label: 'Why in protocol',
    build: (c, p) => ({
      hook: `Why ${c} shows up in ${p.area} protocols`,
      script: `${c} keeps appearing in conversations about ${p.area}. Why? ` +
        `It's usually about how compounds are thought to complement each other, not any single one doing the work. ` +
        `We mapped out how the full protocol fits together — and where the evidence is strong versus still emerging.`,
      onscreen: [`Why ${c} is in the protocol`, `It's about the combination`, `Not one magic compound`, `See the full stack → link in bio`],
      caption: `Why ${c} appears in ${p.area} research — and how the pieces fit together.`,
    }),
  },
];

// Protocol-level angles (not tied to a single compound)
const protocolAngles = [
  {
    id: 'stack-overview',
    label: 'Protocol overview',
    build: (p) => ({
      hook: `The ${p.title.replace(' Protocol', '')} protocol, in 30 seconds`,
      script: `People ask what a ${p.area} protocol actually involves. ` +
        `At a high level it combines several researched compounds, each playing a different role. ` +
        `We broke down the whole thing — what's in it, the reasoning, and the cautions — in one free writeup. No signup wall beyond confirming you're 18+.`,
      onscreen: [`${p.area} protocol`, `What's actually in it`, `The reasoning + the cautions`, `Free breakdown → link in bio`],
      caption: `A high-level look at what a ${p.area} protocol involves. Full breakdown free on the site.`,
    }),
  },
  {
    id: 'questions',
    label: 'Safety questions',
    build: (p) => ({
      hook: `Questions to ask before any ${p.area} protocol`,
      script: `Before considering anything related to ${p.area}, there are smart questions to ask first. ` +
        `What's the evidence quality? What are the unknowns? Who shouldn't consider it? ` +
        `We put together a safety-forward guide so you can research like a skeptic. Educational only — not medical advice.`,
      onscreen: [`Ask these first`, `What's the evidence?`, `What are the unknowns?`, `Research like a skeptic → link in bio`],
      caption: `Smart, safety-forward questions to ask before researching ${p.area}. Not medical advice.`,
    }),
  },
];

// --- Hashtag builder --------------------------------------------------------
function hashtags(compound, area) {
  const base = ['#peptides', '#biohacking', '#longevity', '#wellness'];
  const tag = '#' + compound.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const areaTag = '#' + area.split(' ')[0].toLowerCase();
  return [...base.slice(0, 3), tag, areaTag].join(' ');
}

// --- CSV helpers ------------------------------------------------------------
function csvField(s) {
  const v = String(s).replace(/"/g, '""');
  return `"${v}"`;
}

const rows = [];
let id = 1;

// Compound-level posts: rotate angle by index so variety is spread out
let angleIdx = 0;
for (const p of protocols) {
  for (const c of p.compounds) {
    const angle = angles[angleIdx % angles.length];
    angleIdx++;
    const out = angle.build(c, p);
    rows.push({
      id: id++,
      protocol: p.title,
      topic: c,
      angle: angle.label,
      format: 'AI voiceover short',
      hook: out.hook,
      script: out.script,
      onscreen: out.onscreen.join(' | '),
      caption: out.caption + ' Full protocol — free at the link in bio.',
      hashtags: hashtags(c, p.area),
      cta: 'Full protocol — free at the link in bio',
      url: `https://${SITE}/protocols/${p.slug}`,
    });
  }
}

// Add a SECOND pass with a different angle per compound for more volume
angleIdx = 2;
for (const p of protocols) {
  for (const c of p.compounds) {
    const angle = angles[angleIdx % angles.length];
    angleIdx++;
    const out = angle.build(c, p);
    rows.push({
      id: id++,
      protocol: p.title,
      topic: c,
      angle: angle.label,
      format: 'AI voiceover short',
      hook: out.hook,
      script: out.script,
      onscreen: out.onscreen.join(' | '),
      caption: out.caption + ' Full protocol — free at the link in bio.',
      hashtags: hashtags(c, p.area),
      cta: 'Full protocol — free at the link in bio',
      url: `https://${SITE}/protocols/${p.slug}`,
    });
  }
}

// Protocol-level posts
for (const p of protocols) {
  for (const angle of protocolAngles) {
    const out = angle.build(p);
    rows.push({
      id: id++,
      protocol: p.title,
      topic: p.area,
      angle: angle.label,
      format: 'Carousel or AI voiceover short',
      hook: out.hook,
      script: out.script,
      onscreen: out.onscreen.join(' | '),
      caption: out.caption,
      hashtags: hashtags(p.area.split(' ')[0], p.area),
      cta: 'Full protocol — free at the link in bio',
      url: `https://${SITE}/protocols/${p.slug}`,
    });
  }
}

// --- Emit CSV ---------------------------------------------------------------
const headers = ['id', 'protocol', 'topic', 'angle', 'format', 'hook', 'script', 'onscreen', 'caption', 'hashtags', 'cta', 'url'];
const lines = [headers.join(',')];
for (const r of rows) {
  lines.push(headers.map((h) => csvField(r[h])).join(','));
}

process.stdout.write(lines.join('\n') + '\n');
process.stderr.write(`Generated ${rows.length} posts across ${protocols.length} protocols.\n`);
