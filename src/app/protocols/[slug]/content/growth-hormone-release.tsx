import { Section, SubSection, P, Strong, Warning, Note, BulletList, DosingTable, OptionCard } from '@/components/ProtocolElements'

export default function GrowthHormoneReleaseContent() {
  return (
    <>
      <Section title="Overview">
        <P>
          This protocol is designed to maximize natural growth hormone (GH) release through a strategic combination of GH-releasing peptides and targeted supplements. It follows a 12-week cycle with a 5-days-on / 2-days-off peptide schedule to prevent receptor desensitization, while supplements continue daily for consistent support.
        </P>
        <P>
          GH peaks naturally at night, so evening dosing is ideal. This protocol works best when combined with resistance training 3&ndash;4&times;/week, 7&ndash;9 hours of sleep, and a calorie-controlled diet high in protein and low in processed sugars.
        </P>
        <Note>
          Get baseline bloodwork before starting and at weeks 4, 8, and 12. Track metrics like IGF-1 levels to gauge effectiveness. Women, older adults, or those with conditions like diabetes may need dose modifications.
        </Note>
      </Section>

      <Section title="Components">
        <SubSection title="Peptides">
          <P>
            <Strong>CJC-1295 no DAC + Ipamorelin:</Strong> CJC-1295 no DAC is a short-acting growth hormone-releasing hormone (GHRH) analog that amplifies GH pulses. Ipamorelin is a growth hormone secretagogue (GHS) that mimics ghrelin to stimulate GH release without significantly affecting cortisol or prolactin. They&apos;re often stacked for a potent, pulsatile GH boost.
          </P>
          <P>
            <Strong>Tesamorelin:</Strong> A GHRH analog primarily used for reducing visceral fat and boosting GH. It provides a steady GH release and complements the CJC/Ipamorelin stack.
          </P>
          <Warning>
            DO NOT TAKE CJC-1295/Ipamorelin, Tesamorelin, or ANY growth hormone secretagogues if you have a history of cancer.
          </Warning>
        </SubSection>

        <SubSection title="Supplements">
          <P>
            Supplements enhance natural GH pathways while peptides provide direct stimulation. They are taken daily (all 7 days), including off days from peptides.
          </P>
          <BulletList items={[
            <><Strong>Glutamine:</Strong> 5&ndash;10 g before bed. May enhance GH release during exercise or fasting; supports gut health and recovery.</>,
            <><Strong>Zinc:</Strong> 15&ndash;30 mg (gluconate or citrate form) with food. Essential for GH production and immune function; deficiency can impair GH secretion.</>,
            <><Strong>Vitamin D3 with K2:</Strong> 2,000&ndash;5,000 IU D3 + 100&ndash;200 mcg K2 (MK-7 form) with a fatty meal. Supports hormone regulation; K2 aids calcium metabolism.</>,
            <><Strong>Arginine:</Strong> 3&ndash;5 g before bed or pre-workout. Stimulates GH release; can combine with glutamine for synergy.</>,
          ]} />
        </SubSection>
      </Section>

      <Section title="12-Week Cycle Protocol">
        <P>
          Structure: 5 days on (Monday&ndash;Friday) with peptide injections plus daily supplements. 2 days off (Saturday&ndash;Sunday) from peptides to prevent desensitization. Supplements continue daily.
        </P>

        <SubSection title="Weekly Schedule">
          <P>
            <Strong>On Days (Mon&ndash;Fri):</Strong>
          </P>
          <BulletList items={[
            <>Morning: Supplements only (optional energy boost)</>,
            <>Evening (1&ndash;2 hours before bed, to align with natural GH pulses): Inject 100&ndash;200 mcg CJC-1295 no DAC + 100&ndash;200 mcg Ipamorelin (can be mixed in one syringe)</>,
            <>Inject 1&ndash;2 mg Tesamorelin (separate syringe; can dose every other day if sides occur)</>,
            <>Take oral supplements</>,
          ]} />
          <Note>
            Workout integration: If training in the evening, inject peptides 30&ndash;60 minutes pre-workout for an additional GH spike during exercise.
          </Note>
          <P>
            <Strong>Off Days (Sat&ndash;Sun):</Strong> No peptides. Continue all supplements daily. Focus on rest, light activity, and sleep.
          </P>
        </SubSection>

        <SubSection title="Weeks 1&ndash;4: Build-Up Phase">
          <P>
            Start at lower doses to assess tolerance.
          </P>
          <BulletList items={[
            <>Peptides: 100 mcg each of CJC-1295 no DAC + Ipamorelin; 1 mg Tesamorelin</>,
            <>Supplements: Start at lower end (5 g glutamine, 15 mg zinc, 2,000 IU D3, 3 g arginine)</>,
            <>Monitor for sides: fatigue, numbness in extremities from GH surge. Aim for 8+ hours sleep nightly.</>,
            <>Expected: Gradual increase in energy, recovery, and possibly fat loss/muscle gain</>,
          ]} />
        </SubSection>

        <SubSection title="Weeks 5&ndash;8: Optimization Phase">
          <P>
            Increase if no adverse effects.
          </P>
          <BulletList items={[
            <>Peptides: Bump to 150&ndash;200 mcg each of CJC-1295 no DAC + Ipamorelin; 1.5&ndash;2 mg Tesamorelin</>,
            <>Supplements: Mid-range doses (7&ndash;10 g glutamine, 20&ndash;30 mg zinc, 3,000&ndash;5,000 IU D3, 5 g arginine)</>,
            <>Incorporate HIIT or weightlifting 3&ndash;4&times;/week to amplify GH response. Track body composition via scale and photos.</>,
            <>Expected: Peak GH benefits &mdash; improved skin, sleep quality, and metabolism</>,
          ]} />
        </SubSection>

        <SubSection title="Weeks 9&ndash;12: Maintenance Phase">
          <P>
            Hold or slightly reduce to avoid burnout.
          </P>
          <BulletList items={[
            <>Peptides: Maintain 150&ndash;200 mcg CJC/Ipamorelin; reduce Tesamorelin to 1 mg if needed</>,
            <>Supplements: Maintain mid-range doses</>,
            <>Emphasize recovery. Add fasting windows (12&ndash;16 hours) 2&ndash;3&times;/week to boost GH naturally.</>,
            <>Expected: Sustained benefits. Prepare for post-cycle by planning bloodwork.</>,
          ]} />
        </SubSection>

        <SubSection title="Post-Cycle">
          <P>
            After week 12, take 4&ndash;6 weeks off peptides to reset natural GH production. Continue supplements if desired. Repeat cycle as needed based on bloodwork results.
          </P>
        </SubSection>
      </Section>

      <Section title="Estimated Supply Needs (12 Weeks)">
        <BulletList items={[
          <>CJC-1295 no DAC: ~30&ndash;60 mg (100&ndash;200 mcg/day &times; 5 days &times; 12 weeks)</>,
          <>Ipamorelin: ~30&ndash;60 mg (same calculation)</>,
          <>Tesamorelin: ~300&ndash;600 mg (1&ndash;2 mg/day &times; 5 days &times; 12 weeks)</>,
          <>Supplements: Stock enough for daily use (1&ndash;2 bottles each)</>,
        ]} />
      </Section>

      <Section title="Lifestyle Tips for Maximizing GH Release">
        <BulletList items={[
          <><Strong>Sleep:</Strong> Aim for 7&ndash;9 hours. GH releases most during deep sleep.</>,
          <><Strong>Exercise:</Strong> Resistance training or HIIT 3&ndash;4&times;/week, especially fasted or post-injection.</>,
          <><Strong>Diet:</Strong> High-protein (1.6&ndash;2.2 g/kg body weight), low-sugar. Include GH-boosting foods like nuts, eggs, and greens.</>,
          <><Strong>Hydration:</Strong> 3&ndash;4 liters of water daily.</>,
          <><Strong>Optional enhancements:</Strong> Consider melatonin (3&ndash;5 mg) for better sleep or GABA (500&ndash;750 mg) for relaxation, only if cleared by a doctor.</>,
        ]} />
      </Section>

      <Section title="Side Effect Management">
        <P>
          Common issues include carpal tunnel-like symptoms from GH-induced water retention or headaches. Reduce doses if needed. Stay hydrated and consider electrolytes.
        </P>
        <Note>
          Use a journal to track energy levels, sleep quality, and body measurements throughout the cycle. If GH isn&apos;t rising per bloodwork, adjust dosing or consult a healthcare provider.
        </Note>
      </Section>
    </>
  )
}
