import { Section, SubSection, P, Strong, Note, BulletList, OptionCard } from '@/components/ProtocolElements'

export default function GutHealthContent() {
  return (
    <>
      <Section title="Overview">
        <P>
          The primary research peptides that are commercially available (via research chemical suppliers in vial or stabilized capsule form) and have been studied for gut repair, barrier function, anti-inflammatory effects, and related conditions (e.g., leaky gut, IBS, IBD models) are these five. These are the compounds consistently referenced across sources for these specific goals.
        </P>
      </Section>

      <Section title="The Five Key Peptides">
        <SubSection title="1. BPC-157 (Body Protection Compound-157)">
          <P>
            Derived from gastric juice; promotes gut lining repair, angiogenesis, and reduces inflammation. Strongest evidence for ulcers, leaky gut, and IBD-like models. Available as oral capsules (stable arginate salt) or injectable.
          </P>
        </SubSection>

        <SubSection title="2. KPV (Lys-Pro-Val, fragment of &alpha;-MSH)">
          <P>
            Potent anti-inflammatory tripeptide; calms NF-&kappa;B/cytokine pathways, supports intestinal mucus barrier and microbiome balance. Excellent for gut-specific inflammation. Available oral or injectable.
          </P>
        </SubSection>

        <SubSection title="3. TB-500 (Thymosin Beta-4 fragment)">
          <P>
            Enhances cell migration, actin regulation, and systemic tissue repair; reduces inflammation and scarring. Complements gut healing with broader recovery. Primarily injectable (not orally bioavailable).
          </P>
        </SubSection>

        <SubSection title="4. GHK-Cu (Glycyl-L-histidyl-L-lysine copper complex)">
          <P>
            Modulates inflammation, stimulates collagen/extracellular matrix repair, and supports antioxidant balance. Adds skin/gut regeneration benefits. Injectable or topical; copper can interact with other peptides if mixed long-term.
          </P>
        </SubSection>

        <SubSection title="5. Larazotide (Larazotide acetate)">
          <P>
            An 8-amino-acid synthetic peptide and tight-junction regulator (zonulin antagonist); specifically targets intestinal permeability (&ldquo;leaky gut&rdquo;). Studied in celiac and permeability models. Oral capsule form.
          </P>
        </SubSection>

        <Note>
          These are the peptides sold in research blends (e.g., BPC-157 + KPV + TB-500 + GHK-Cu &ldquo;Klow/Glow&rdquo; blends or oral gut capsules combining BPC-157 + KPV + Larazotide). Other peptides (e.g., Thymosin Alpha-1 for immune modulation) exist but are less directly tied to gut/inflammation repair in the literature.
        </Note>
      </Section>

      <Section title="Recommended Protocol Options">
        <P>
          Choose based on your goals and tolerance. <Strong>Gut-focused</Strong> protocols prioritize oral forms for direct intestinal delivery. Start low, monitor response, and use pharmaceutical-grade reconstitution (bacteriostatic water) for injectables. Typical cycle: 4&ndash;8 weeks on, followed by 2&ndash;4 weeks off. Pair with a clean anti-inflammatory diet, stress management, and probiotics.
        </P>

        <OptionCard title="Option 1: Minimal Effective Stack (2 Peptides) &mdash; Best starter for pure gut issues">
          <BulletList items={[
            <><Strong>BPC-157:</Strong> 250&ndash;500 mcg oral capsule once or twice daily (empty stomach).</>,
            <><Strong>KPV:</Strong> 200&ndash;500 mcg oral capsule daily (often combined with BPC-157 in one capsule for convenience).</>,
          ]} />
          <P><Strong>Why?</Strong> Synergistic gut-lining repair + inflammation control. Many oral &ldquo;gut inflammation&rdquo; blends use exactly this pair.</P>
          <P><Strong>Duration:</Strong> 4&ndash;6 weeks.</P>
        </OptionCard>

        <OptionCard title="Option 2: Balanced Healing Stack (3 Peptides) &mdash; Gut + mild systemic inflammation">
          <BulletList items={[
            <>Keep BPC-157 + KPV oral as above.</>,
            <><Strong>Add TB-500:</Strong> 2.5&ndash;5 mg subcutaneous injection, 2 times per week (e.g., Monday/Thursday).</>,
          ]} />
          <P><Strong>Why?</Strong> TB-500 amplifies tissue repair and reduces broader inflammation without daily injections.</P>
        </OptionCard>

        <OptionCard title="Option 3: Comprehensive Recovery Stack (4 Peptides) &mdash; Most common advanced option">
          <BulletList items={[
            <><Strong>BPC-157:</Strong> 250&ndash;500 mcg oral daily.</>,
            <><Strong>KPV:</Strong> 200&ndash;500 mcg oral daily.</>,
            <><Strong>TB-500:</Strong> 2.5&ndash;5 mg subQ, 2&times;/week.</>,
            <><Strong>GHK-Cu:</Strong> 1&ndash;2 mg subQ once daily (can be mixed with TB-500 or BPC-157 in the same syringe if fresh; some prefer separate to avoid copper degradation of other peptides).</>,
          ]} />
          <P><Strong>Why?</Strong> Full-spectrum: gut repair (BPC/KPV), systemic healing/anti-inflammatory (TB-500), plus collagen/antioxidant regeneration (GHK-Cu). Widely used in research recovery protocols.</P>
          <Note>
            <Strong>Administration note:</Strong> Oral peptides first thing in the morning; injectables in the evening or post-workout. Rotate injection sites (abdomen/thigh).
          </Note>
        </OptionCard>

        <OptionCard title="Option 4: Maximum Gut-Barrier Stack (5 Peptides) &mdash; For severe leaky gut/permeability focus">
          <P>
            Use the 4-peptide stack above + <Strong>Larazotide:</Strong> 0.5&ndash;1 mg oral capsule 1&ndash;3 times daily before meals.
          </P>
          <P><Strong>Why?</Strong> Larazotide directly tightens junctions while the others repair and calm inflammation. Some suppliers offer pre-made oral capsules with BPC-157 + KPV + Larazotide.</P>
        </OptionCard>
      </Section>

      <Section title="Additional Guidance">
        <BulletList items={[
          <><Strong>Reconstitution &amp; Storage</Strong> (injectables only): Follow vial instructions (typically 2&ndash;3 mL bac water for standard 5 mg vials). Refrigerate reconstituted peptides; use within 30 days.</>,
          <><Strong>Monitoring:</Strong> Track symptoms (bloating, stool quality, energy, inflammation markers if lab-tested). Discontinue if any adverse effects occur.</>,
          <><Strong>Synergies &amp; Enhancers:</Strong> These stack well with L-glutamine, zinc, or butyrate (non-peptide supports), but avoid NSAIDs/alcohol during use.</>,
          <><Strong>Sourcing Note:</Strong> Available only from licensed research peptide suppliers as research chemicals. Quality varies &mdash; third-party testing is essential.</>,
        ]} />
        <P>
          This protocol is flexible; adjust based on professional guidance. The 4-peptide stack (BPC-157 + KPV + TB-500 + GHK-Cu) is the most frequently referenced combination for balanced inflammation and gut health in available research contexts.
        </P>
      </Section>
    </>
  )
}
