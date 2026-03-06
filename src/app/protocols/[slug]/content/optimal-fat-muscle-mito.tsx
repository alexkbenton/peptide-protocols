import { Section, SubSection, P, Strong, Warning, Note, BulletList, DosingTable, OptionCard } from '@/components/ProtocolElements'

export default function OptimalFatMuscleContent() {
  return (
    <>
      <Section title="Overview">
        <P>
          This protocol outlines a comprehensive approach to optimizing fat burning, building lean muscle, and enhancing mitochondrial health through the use of various peptides and small molecules. It emphasizes the importance of a well-rounded lifestyle, including adequate sleep, nutrition, and exercise, alongside a detailed dosing regimen for each compound.
        </P>
        <Note>
          Start slowly with only one or two compounds to assess efficacy and side effects. Add until desired results are achieved based on predetermined goals. To maximize results this protocol must be accompanied by adequate sleep, optimized nutrition, resistance training 3&ndash;4&times;/week, and cardio training 2&ndash;3&times;/week.
        </Note>
      </Section>

      <Section title="Compounds in This Protocol">
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {[
            'Retatrutide', 'CJC-1295 no DAC / Ipamorelin', 'GLOW (GHK-Cu/BPC-157/TB-500)',
            'SS-31 (Elamipretide)', 'MOTS-C', '5-Amino-1MQ', 'SLU-PP-332',
            'NAD+ (or NMN or Niacin)', 'L-Carnitine', 'Creatine Monohydrate', 'Tadalafil', 'Protein'
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg bg-warm-50 px-4 py-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-semibold text-sage-700">{i + 1}</span>
              <span className="text-sm font-medium text-warm-900">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dosing Protocol Summary">
        <SubSection title="1. Retatrutide">
          <P>
            A triple agonist that activates GIP, GLP-1, and GCG receptors, aiding in appetite reduction, metabolism enhancement, and liver fat metabolism. Phase 2 trials reported up to 24.2% mean weight loss at 48 weeks.
          </P>
          <OptionCard title="Conservative Approach">
            <P>Start with 1 mg/week for four weeks, then increase 0.5 mg per week for 4 weeks up to effective dose. Example: weeks 1&ndash;4: 1 mg/week, weeks 5&ndash;8: 1.5 mg/week, weeks 9&ndash;12: 2 mg/week. Optimal dose: 2&ndash;8 mg/week.</P>
          </OptionCard>
          <OptionCard title="Aggressive Approach">
            <P>Start with 2 mg/week and increase each 4 weeks by 0.5&ndash;1 mg up to optimal dose of 4&ndash;12 mg/week.</P>
          </OptionCard>
        </SubSection>

        <SubSection title="2. CJC-1295 No DAC with Ipamorelin">
          <Warning>
            DO NOT TAKE CJC-1295/IPA, Tesamorelin, GHRP-6, GHRP-2, Sermorelin, IGF-LR3, HGH, or ANY growth hormone secretagogues if you have a history of cancer.
          </Warning>
          <P>
            This combination mimics the body&apos;s natural pulsatile growth hormone release. CJC-1295 acts as the &ldquo;accelerator&rdquo; signaling the pituitary to produce GH, while Ipamorelin acts as the &ldquo;key&rdquo; that inhibits somatostatin (the brake). Together they create a synergistic, non-linear GH pulse significantly larger than either alone.
          </P>
          <OptionCard title="Conservative">
            <P>300 mcg each evening for 8&ndash;12 weeks, with a 4&ndash;8 week off period. Must be fasted 2 hours prior and 30 minutes after injection.</P>
          </OptionCard>
          <OptionCard title="Focus: Fat Burning">
            <P>Split dosing: 150&ndash;200 mcg prior to cardio or strength workout + 150&ndash;200 mcg at night. Must be fasted 2 hours prior and 30 minutes post injection.</P>
          </OptionCard>
          <OptionCard title="Focus: Muscle Building">
            <P>Split dosing: 150&ndash;200 mcg after strength workout + 150&ndash;200 mcg at night. Must be fasted 2 hours prior and 30 minutes post injection.</P>
          </OptionCard>
          <Note>
            Alternative: May use Tesamorelin/Ipamorelin. If using Tesamorelin, do not refrigerate reconstituted solution. Once reconstituted, store at room temperature shielded from light and use within 7 days.
          </Note>
        </SubSection>

        <SubSection title="3. GLOW (GHK-Cu 50mg / BPC-157 10mg / TB-500 10mg Blend)">
          <P>
            A coordinated regenerative blend: <Strong>GHK-Cu</Strong> functions as a gene-regulatory peptide stimulating collagen and elastin synthesis. <Strong>BPC-157</Strong> acts as a cytoprotective tissue-repair agent. <Strong>TB-500</Strong> serves as a cytoskeletal and inflammation-regulating peptide.
          </P>
          <BulletList items={[
            <>Mild injury or maintenance: 500 mcg daily</>,
            <>Acute injury or wound healing: 1&ndash;2 mg daily</>,
            <>May cycle 12 weeks on / 4 weeks off, or may take daily</>,
          ]} />
        </SubSection>

        <SubSection title="4. SS-31 (Elamipretide)">
          <P>
            Targets mitochondrial health by selectively binding to cardiolipin in the inner mitochondrial membrane, stabilizing cristae structure and enhancing ATP production. SS-31 is considered the &ldquo;mechanic&rdquo; of the mitochondria &mdash; many researchers recommend starting this peptide first to repair structural damage before adding other mitochondrial compounds.
          </P>
          <BulletList items={[
            <>If older (&gt;40) or with metabolic syndrome: start at 500 mcg daily in the morning for 1 week</>,
            <>Then increase to 1 mg daily in the morning for total duration of 4&ndash;6 weeks</>,
          ]} />
        </SubSection>

        <SubSection title="5. MOTS-C">
          <P>
            A mitochondria-derived peptide that regulates metabolism and prevents muscle wasting through multiple signaling pathways including AMPK activation, enhanced glucose uptake, and fatty acid oxidation.
          </P>
          <BulletList items={[
            <>Weeks 1&ndash;2: 500 mcg daily</>,
            <>Weeks 3+: 1 mg daily</>,
            <>Alternative: 3&ndash;5 mg, 3&times;/week</>,
          ]} />
          <Note>
            Some people report slight allergic reaction at injection site. Start slowly and reconstitute with greater volume BAC water to minimize symptoms.
          </Note>
        </SubSection>

        <SubSection title="6. 5-Amino-1MQ">
          <P>
            Inhibits NNMT (nicotinamide N-methyltransferase) to increase NAD+ levels, promoting fat oxidation and muscle repair.
          </P>
          <BulletList items={[
            <>Weeks 1&ndash;4: 50 mg daily oral or subQ</>,
            <>Weeks 5&ndash;8: 100 mg daily oral or subQ</>,
            <>Weeks 8&ndash;12: maintain at 100 mg daily or increase to 100 mg twice daily</>,
            <>Cycle off for 4&ndash;6 weeks</>,
          ]} />
        </SubSection>

        <SubSection title="7. SLU-PP-332">
          <P>
            A novel compound that mimics exercise effects by activating ERRs (estrogen-related receptors), enhancing mitochondrial biogenesis and energy metabolism.
          </P>
          <BulletList items={[
            <>500 mcg daily for 12 weeks, cycle off 4&ndash;6 weeks</>,
          ]} />
          <Warning>
            This is the least studied compound with the least amount of animal and human data. Dosing protocol is primarily anecdotal and will require further study for firm recommendations.
          </Warning>
        </SubSection>

        <SubSection title="8. NAD+ (or NMN or Niacin)">
          <P>
            Essential cofactor for energy metabolism, cellular function, and longevity.
          </P>
          <OptionCard title="NAD+ (Injectable)">
            <P>50&ndash;100 mg IM over 1&ndash;3 weeks, then cycle off. Repeat 3&ndash;4 times per year. Not very orally bioavailable. B vitamins should be supplemented as cofactors.</P>
          </OptionCard>
          <OptionCard title="NMN (Oral Alternative)">
            <P>250&ndash;500 mg daily, ideally fasted or taken pre-workout.</P>
          </OptionCard>
          <OptionCard title="Niacin (Oral Alternative)">
            <P>750&ndash;1,000 mg per day based on clinical studies showing significant NAD+ boosts.</P>
          </OptionCard>
        </SubSection>

        <SubSection title="9. L-Carnitine">
          <P>
            Facilitates fatty acid transport into mitochondria for energy production, enhancing exercise performance.
          </P>
          <BulletList items={[
            <><Strong>Injectable:</Strong> 200&ndash;500 mg IM 3&times;/week pre-workout</>,
            <><Strong>Oral:</Strong> Poorly bioavailable (14&ndash;18%). If taken orally, recommend 2,000 mg daily with meals (carbohydrates enhance absorption)</>,
          ]} />
        </SubSection>

        <SubSection title="10. Creatine Monohydrate">
          <P>
            Increases phosphocreatine stores to support high-intensity exercise and muscle growth. 5&ndash;10 grams dissolved in water daily.
          </P>
        </SubSection>

        <SubSection title="11. Tadalafil">
          <P>
            Beyond erectile function, it improves vascular health, blood flow, and muscle performance through PDE5 inhibition. 5 mg oral daily.
          </P>
        </SubSection>

        <SubSection title="12. Protein">
          <P>
            1 g per pound of body weight per day.
          </P>
        </SubSection>
      </Section>
    </>
  )
}
