import { Section, SubSection, P, Strong, Note, BulletList, DosingTable } from '@/components/ProtocolElements'

export default function CellularRepairContent() {
  return (
    <>
      <Section title="Protocol Overview">
        <P>
          This 12-week stacked protocol targets <Strong>mitochondrial repair</Strong> (SS-31, NAD+), <Strong>DNA/telomere protection</Strong> (Epithalon), <Strong>neuroprotection</Strong> (Pinealon), and <Strong>longevity signaling</Strong> (FOXO4-DRI). Administer subcutaneously (subQ) daily except where noted. Cycle: 8 weeks on, 4 weeks off. Monitor via bloodwork (liver/kidney function, inflammation markers). Hydrate well; combine with exercise/fasting for synergy.
        </P>
      </Section>

      <Section title="Dosing Summary">
        <DosingTable rows={[
          { compound: 'SS-31', dose: '1–5 mg (start low)', frequency: 'Daily subQ', cycle: '8 weeks on / 4 off', notes: 'Reconstitute 10mg vial with 2ml BAC water; inject 0.1–0.4ml' },
          { compound: 'Pinealon', dose: '100–200 mcg', frequency: 'Daily subQ (PM)', cycle: '10–20 days on / 1–2 months off', notes: 'Short cycles; brain repair focus. 20mg vial in 2ml water' },
          { compound: 'Epithalon', dose: '5–10 mg', frequency: 'Daily subQ for 10–20 days', cycle: '10–20 days on / 4–6 months off', notes: 'Telomere extension; repeat 2–3×/year. 10mg vial in 1ml water' },
          { compound: 'NAD+', dose: '100–300 mg', frequency: 'Load: 100mg/day × 5–7 days, then 50–100mg 3×/week', cycle: '4–8 weeks on / 4 off', notes: 'Energy boost; nasal/sublingual alt. Liposomal for subQ' },
          { compound: 'FOXO4-DRI', dose: '5–10 mg', frequency: '3×/week', cycle: '1–2 weeks, 3×/year', notes: 'Senolytic; use 3 days/week to avoid tolerance. 10mg vial' },
        ]} />
      </Section>

      <Section title="Stack Schedule Example (Weeks 1–8)">
        <BulletList items={[
          <><Strong>AM:</Strong> SS-31 + NAD+</>,
          <><Strong>PM:</Strong> Pinealon (first 20 days) + Epithalon (first 20 days) + FOXO4-DRI (Mon/Wed/Fri)</>,
        ]} />
        <P>Rotate off individually post-cycle to assess tolerance.</P>
      </Section>

      <Section title="Peptide Details">
        <SubSection title="1. SS-31 (Elamipretide)">
          <P>
            SS-31 is a cell-permeable tetrapeptide (D-Arg-Dmt-Lys-Phe-NH2) that selectively partitions into the inner mitochondrial membrane with ~5000-fold enrichment via high-affinity electrostatic binding to cardiolipin (CL), an anionic diphospholipid essential for cristae structure and electron transport chain (ETC) function.
          </P>
          <P>Key effects:</P>
          <BulletList items={[
            <>Stabilizes CL against peroxidation by inhibiting cytochrome c peroxidase and scavenging H2O2/ROS</>,
            <>Optimizes ETC supercomplexes (enhances CI–CIV coupling for ATP production)</>,
            <>Prevents mPTP opening and mitochondrial fragmentation by balancing OPA1 isoforms</>,
            <>Re-energizes ATP flux, reduces ROS, protects cristae integrity in ischemia, aging, and disease</>,
          ]} />
        </SubSection>

        <SubSection title="2. Pinealon">
          <P>
            Pinealon (Glu-Asp-Arg tripeptide) modulates pineal gland activity, upregulating neurotrophic factors like BDNF/NGF to promote neuronal survival, synaptic plasticity, and DNA repair in brain cells under oxidative/traumatic stress. It reduces neuroinflammation and enhances cognitive recovery via gene expression changes favoring neuroprotection.
          </P>
        </SubSection>

        <SubSection title="3. Epithalon (Epitalon)">
          <P>
            Epithalon (Ala-Glu-Asp-Gly tetrapeptide) induces telomerase activity (hTERT upregulation), elongating telomeres and stabilizing chromosomes against replicative senescence. It normalizes pineal melatonin synthesis, suppresses oxidative damage/p53-mediated apoptosis, and reprograms epigenetics for anti-aging effects like immune modulation and lifespan extension.
          </P>
        </SubSection>

        <SubSection title="4. NAD+ (Nicotinamide Adenine Dinucleotide)">
          <P>
            NAD+ acts as a critical cofactor for sirtuins (SIRT1/3/6), PARPs, and mitochondrial dehydrogenases. It fuels deacetylation of histones/peroxisome proteins for DNA repair, autophagy, and circadian regulation; restores depleted mitochondrial NAD pools to boost ETC efficiency (complex I activity), ATP synthesis, and ROS detoxification via redox shuttling.
          </P>
        </SubSection>

        <SubSection title="5. FOXO4-DRI">
          <P>
            FOXO4-DRI (D-retro-inverso peptide) selectively disrupts the FOXO4-p53 nuclear interaction in senescent cells, displacing p53 from DNA-binding sites. This triggers caspase-mediated apoptosis in irreparably damaged (senescent) cells while sparing healthy ones, reducing senescence-associated secretory phenotype (SASP) inflammation and promoting tissue rejuvenation and stem cell niches.
          </P>
        </SubSection>
      </Section>
    </>
  )
}
