'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Syringe,
  Thermometer,
  ShieldCheck,
  BookOpen,
  Droplets,
  AlertTriangle,
  ChevronRight,
  Play,
  Package,
  Clock,
  Zap,
  CheckCircle2,
} from 'lucide-react'

interface Section {
  id: string
  label: string
  icon: React.ReactNode
}

const sections: Section[] = [
  { id: 'supplies', label: 'Supplies', icon: <Package className="w-4 h-4" /> },
  { id: 'reconstitution', label: 'Reconstitution', icon: <Droplets className="w-4 h-4" /> },
  { id: 'injection', label: 'Injection', icon: <Syringe className="w-4 h-4" /> },
  { id: 'storage', label: 'Storage', icon: <Thermometer className="w-4 h-4" /> },
  { id: 'labels', label: 'Labels', icon: <BookOpen className="w-4 h-4" /> },
  { id: 'safety', label: 'Safety', icon: <ShieldCheck className="w-4 h-4" /> },
]

export default function PeptideGuide() {
  const [activeSection, setActiveSection] = useState('supplies')
  const [calcInputs, setCalcInputs] = useState({
    peptideMg: 10,
    bacWaterMl: 2,
    desiredDoseMcg: 100,
  })
  const [results, setResults] = useState({ concentration: 0, unitsToDraw: 0 })
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  // Calculate reconstitution
  useEffect(() => {
    if (calcInputs.peptideMg > 0 && calcInputs.bacWaterMl > 0) {
      // Concentration in mcg per mL
      const concentration = (calcInputs.peptideMg * 1000) / calcInputs.bacWaterMl
      // Units to draw on 100-unit syringe
      const unitsToDraw = (calcInputs.desiredDoseMcg / concentration) * 100
      setResults({ concentration, unitsToDraw })
    }
  }, [calcInputs])

  // Intersection Observer for section highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs.current[sectionId]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  return (
    <div className="bg-warm-50 py-20">
      {/* Section Navigation */}
      <div className="sticky top-20 z-40 border-b border-warm-200/60 bg-warm-50/80 backdrop-blur-lg">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-4 pt-4 sm:gap-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-sage-600 text-white shadow-md'
                    : 'bg-white text-warm-800/60 border border-warm-200 hover:border-sage-300 hover:text-sage-600'
                }`}
              >
                {section.icon}
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container-narrow space-y-20 py-16">
        {/* Section 1: Supplies */}
        <section
          ref={(el) => {
            if (el) sectionRefs.current['supplies'] = el
          }}
          id="supplies"
          className="animate-fade-in-up"
        >
          <h2 className="heading-section text-sage-600 mb-8">What You'll Need</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Bacteriostatic Water (BAC Water)',
                description:
                  'Sterile water with benzyl alcohol preservative. Essential for reconstitution. Look for USP-grade from medical suppliers.',
                icon: <Droplets className="w-8 h-8 text-sage-600" />,
              },
              {
                title: 'Insulin Syringes',
                description:
                  '29-31 gauge, 0.5mL or 1mL capacity. Smaller gauge = less pain. 1mL syringes offer better accuracy for doses.',
                icon: <Syringe className="w-8 h-8 text-sage-600" />,
              },
              {
                title: 'Alcohol Swabs',
                description:
                  '70% isopropyl alcohol swabs for cleaning vial tops and injection sites. Purchase sterile, individually wrapped.',
                icon: <CheckCircle2 className="w-8 h-8 text-sage-600" />,
              },
              {
                title: 'Peptide Vials',
                description:
                  'Pharmaceutical-grade glass vials. Ensure they arrive intact and sealed. Check for clarity and integrity.',
                icon: <Package className="w-8 h-8 text-sage-600" />,
              },
              {
                title: 'Sharps Container',
                description:
                  'Proper medical sharps disposal container. Do not reuse old containers. Essential for safe needle disposal.',
                icon: <AlertTriangle className="w-8 h-8 text-sage-600" />,
              },
              {
                title: 'Clean Workspace',
                description:
                  'Clean, flat surface. Alcohol-wipe the area before reconstitution. Keep away from dust, pets, and contamination.',
                icon: <Zap className="w-8 h-8 text-sage-600" />,
              },
            ].map((item, idx) => (
              <div key={idx} className="card hover:border-sage-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-display font-medium text-warm-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-warm-800/60">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Video Placeholder */}
          <div className="mt-12 border-2 border-dashed border-warm-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mb-4">
              <Play className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="font-display text-lg font-medium text-warm-900">
              Video: Setting Up Your Peptide Workspace
            </h3>
            <div className="mt-4 inline-flex rounded-full bg-sage-100 px-3 py-1.5 text-xs font-semibold text-sage-600 uppercase">
              Coming Soon
            </div>
          </div>
        </section>

        {/* Section 2: Reconstitution */}
        <section
          ref={(el) => {
            if (el) sectionRefs.current['reconstitution'] = el
          }}
          id="reconstitution"
          className="animate-fade-in-up"
        >
          <h2 className="heading-section text-sage-600 mb-8">Reconstitution</h2>

          <div className="max-w-2xl">
            <p className="text-body mb-6">
              Reconstitution is the process of mixing lyophilized (freeze-dried) peptide powder
              with bacteriostatic water to create an injectable solution. This is essential for
              accurate dosing and safe administration.
            </p>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display text-lg font-medium text-warm-900 mb-6">
                Step-by-Step Instructions
              </h3>
              <div className="space-y-4">
                {[
                  'Clean the rubber stopper on the peptide vial with an alcohol swab. Let it air dry.',
                  'Draw the appropriate amount of BAC water into your syringe (e.g., 2mL).',
                  'Insert the needle through the rubber stopper and inject the BAC water slowly into the vial.',
                  'Gently swirl the vial to mix. Never shake — this can denature the peptide.',
                  'If foamy, let the vial sit undisturbed for 5-10 minutes to allow bubbles to subside.',
                  'Once mixed, refrigerate immediately at 36-46°F.',
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 last:pb-0">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sage-100">
                      <span className="text-sm font-semibold text-sage-600">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-warm-800/80 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reconstitution Calculator */}
            <div className="bg-sage-600 rounded-2xl p-8 text-white mb-8">
              <h3 className="font-display text-lg font-medium mb-6">Reconstitution Calculator</h3>

              <div className="grid gap-6 md:grid-cols-3 mb-8">
                {/* Peptide Amount */}
                <div>
                  <label className="block text-sm font-medium text-sage-100 mb-2">
                    Peptide Amount (mg)
                  </label>
                  <input
                    type="number"
                    value={calcInputs.peptideMg}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, peptideMg: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg bg-sage-700 px-4 py-2 text-white placeholder-sage-300 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[5, 10, 15, 20, 30].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setCalcInputs({ ...calcInputs, peptideMg: preset })}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-sage-500 hover:bg-sage-400 transition-colors"
                      >
                        {preset}mg
                      </button>
                    ))}
                  </div>
                </div>

                {/* BAC Water */}
                <div>
                  <label className="block text-sm font-medium text-sage-100 mb-2">
                    BAC Water Added (mL)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={calcInputs.bacWaterMl}
                    onChange={(e) =>
                      setCalcInputs({ ...calcInputs, bacWaterMl: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg bg-sage-700 px-4 py-2 text-white placeholder-sage-300 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[1, 2, 3].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setCalcInputs({ ...calcInputs, bacWaterMl: preset })}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-sage-500 hover:bg-sage-400 transition-colors"
                      >
                        {preset}mL
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desired Dose */}
                <div>
                  <label className="block text-sm font-medium text-sage-100 mb-2">
                    Desired Dose (mcg)
                  </label>
                  <input
                    type="number"
                    step="10"
                    value={calcInputs.desiredDoseMcg}
                    onChange={(e) =>
                      setCalcInputs({
                        ...calcInputs,
                        desiredDoseMcg: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-lg bg-sage-700 px-4 py-2 text-white placeholder-sage-300 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {[50, 100, 150, 200].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setCalcInputs({ ...calcInputs, desiredDoseMcg: preset })}
                        className="text-xs px-2.5 py-1.5 rounded-full bg-sage-500 hover:bg-sage-400 transition-colors"
                      >
                        {preset}mcg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="grid gap-6 md:grid-cols-2 bg-sage-700/50 rounded-xl p-6">
                <div>
                  <p className="text-sage-200 text-sm mb-1">Concentration</p>
                  <p className="text-3xl font-display font-medium">
                    {results.concentration.toFixed(1)} mcg/mL
                  </p>
                  <p className="text-xs text-sage-300 mt-1">
                    {(results.concentration / 100).toFixed(2)} mcg per unit
                  </p>
                </div>
                <div>
                  <p className="text-sage-200 text-sm mb-1">Units to Draw</p>
                  <p className="text-3xl font-display font-medium">
                    {results.unitsToDraw.toFixed(1)} units
                  </p>
                  <p className="text-xs text-sage-300 mt-1">
                    On a 100-unit (1mL) syringe
                  </p>
                </div>
              </div>

              <p className="text-sage-200 text-xs mt-6 leading-relaxed">
                <strong>Formula:</strong> Units to draw = (Desired dose mcg ÷ Concentration mcg/mL) × 100
              </p>
            </div>

            {/* Video Placeholder */}
            <div className="border-2 border-dashed border-warm-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/50">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mb-4">
                <Play className="w-8 h-8 text-sage-600" />
              </div>
              <h3 className="font-display text-lg font-medium text-warm-900">
                Video: How to Reconstitute Peptides
              </h3>
              <div className="mt-4 inline-flex rounded-full bg-sage-100 px-3 py-1.5 text-xs font-semibold text-sage-600 uppercase">
                Coming Soon
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Injection Technique */}
        <section
          ref={(el) => {
            if (el) sectionRefs.current['injection'] = el
          }}
          id="injection"
          className="animate-fade-in-up"
        >
          <h2 className="heading-section text-sage-600 mb-8">Injection Technique</h2>

          <div className="max-w-2xl mb-8">
            <p className="text-body mb-6">
              Subcutaneous (SubQ) injection is the most common route for peptide administration.
              Proper technique minimizes pain, bruising, and infection risk.
            </p>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display text-lg font-medium text-warm-900 mb-6">
                Injection Steps
              </h3>
              <div className="space-y-4">
                {[
                  'Wash your hands thoroughly with soap and water.',
                  'Select an injection site and clean with an alcohol swab. Let air dry.',
                  'Gently pinch the skin to create a fold (about 1-2 inches of lifted skin).',
                  'Insert the needle at a 45° angle, approximately 1/4 inch into the fat layer.',
                  'Inject slowly and steadily. Rushing increases discomfort.',
                  'Remove the needle and apply light pressure with an alcohol swab for 5-10 seconds.',
                  'Dispose of the syringe immediately in your sharps container.',
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 pb-4 last:pb-0">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sage-100">
                      <span className="text-sm font-semibold text-sage-600">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-warm-800/80 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display text-lg font-medium text-warm-900 mb-6">
                Injection Site Rotation
              </h3>
              <p className="text-sm text-warm-800/80 leading-relaxed mb-6">
                Rotating injection sites prevents lipohypertrophy (localized fat thickening) and
                ensures consistent absorption. Use at least 6 different sites, spacing them at
                least 1 inch apart. Recommended sites include lower abdomen, outer thighs, and back
                of upper arms.
              </p>

              {/* Simple SVG Body Diagram */}
              <div className="bg-warm-100/50 rounded-xl p-6 flex justify-center">
                <svg
                  viewBox="0 0 200 400"
                  className="w-full max-w-sm"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head */}
                  <circle cx="100" cy="40" r="20" fill="none" stroke="#47684b" strokeWidth="2" />

                  {/* Body */}
                  <line x1="100" y1="60" x2="100" y2="120" stroke="#47684b" strokeWidth="2" />

                  {/* Abdomen */}
                  <rect x="75" y="120" width="50" height="60" fill="none" stroke="#47684b" strokeWidth="2" />

                  {/* Left arm */}
                  <line x1="75" y1="70" x2="40" y2="100" stroke="#47684b" strokeWidth="2" />

                  {/* Right arm */}
                  <line x1="125" y1="70" x2="160" y2="100" stroke="#47684b" strokeWidth="2" />

                  {/* Left leg */}
                  <line x1="85" y1="180" x2="80" y2="280" stroke="#47684b" strokeWidth="2" />

                  {/* Right leg */}
                  <line x1="115" y1="180" x2="120" y2="280" stroke="#47684b" strokeWidth="2" />

                  {/* Injection Sites */}
                  {/* Lower abdomen - 2 sites */}
                  <circle cx="85" cy="160" r="6" fill="#47684b" opacity="0.8" />
                  <circle cx="115" cy="160" r="6" fill="#47684b" opacity="0.8" />

                  {/* Outer thighs - 2 sites */}
                  <circle cx="70" cy="230" r="6" fill="#47684b" opacity="0.8" />
                  <circle cx="130" cy="230" r="6" fill="#47684b" opacity="0.8" />

                  {/* Back of arms - 2 sites */}
                  <circle cx="30" cy="100" r="6" fill="#47684b" opacity="0.8" />
                  <circle cx="170" cy="100" r="6" fill="#47684b" opacity="0.8" />
                </svg>
              </div>

              <p className="text-xs text-warm-800/60 mt-4 text-center">
                Green circles indicate recommended SubQ injection sites
              </p>
            </div>

            <div className="bg-sage-50 rounded-2xl p-6 border border-sage-200">
              <h3 className="font-display font-medium text-warm-900 mb-4">Injection Tips</h3>
              <ul className="space-y-3">
                {[
                  'Use a fresh needle every time — reusing dulls the needle and increases pain.',
                  'Smaller gauge (higher number) = thinner needle = less pain. 31G is ideal.',
                  'Room temperature peptide solutions inject more comfortably than cold ones.',
                  'Minor bruising is normal. Ice packs after injection can minimize it.',
                  'Inject at the same time each day for consistency.',
                  'If you experience pain during injection, you may have hit a nerve — stop and try a different site.',
                ].map((tip, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-warm-800/80">
                    <CheckCircle2 className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="border-2 border-dashed border-warm-300 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/50">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-100 mb-4">
              <Play className="w-8 h-8 text-sage-600" />
            </div>
            <h3 className="font-display text-lg font-medium text-warm-900">
              Video: Subcutaneous Injection Tutorial
            </h3>
            <div className="mt-4 inline-flex rounded-full bg-sage-100 px-3 py-1.5 text-xs font-semibold text-sage-600 uppercase">
              Coming Soon
            </div>
          </div>
        </section>

        {/* Section 4: Storage & Handling */}
        <section
          ref={(el) => {
            if (el) sectionRefs.current['storage'] = el
          }}
          id="storage"
          className="animate-fade-in-up"
        >
          <h2 className="heading-section text-sage-600 mb-8">Storage & Handling</h2>

          <div className="max-w-2xl">
            <div className="grid gap-6 mb-8">
              {/* Before Reconstitution */}
              <div className="bg-white rounded-2xl p-8 border border-warm-200">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-sage-600" />
                  <h3 className="font-display font-medium text-warm-900">Before Reconstitution</h3>
                </div>
                <ul className="space-y-3 text-sm text-warm-800/80">
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Temperature:</strong> Room temperature or refrigerated (2-8°C)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Storage:</strong> Away from direct sunlight, heat, and moisture
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Shelf life:</strong> Typically 2-3 years when stored properly
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Container:</strong> Keep in original vial until ready to use
                    </span>
                  </li>
                </ul>
              </div>

              {/* After Reconstitution */}
              <div className="bg-white rounded-2xl p-8 border border-warm-200">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer className="w-6 h-6 text-sage-600" />
                  <h3 className="font-display font-medium text-warm-900">After Reconstitution</h3>
                </div>
                <ul className="space-y-3 text-sm text-warm-800/80">
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Temperature:</strong> MUST be refrigerated at 36-46°F (2-8°C)
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Duration:</strong> Use within 4-6 weeks of reconstitution
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>NEVER freeze:</strong> Freezing denatures the peptide
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Label immediately:</strong> Write date mixed and expiration date
                    </span>
                  </li>
                </ul>
              </div>

              {/* BAC Water */}
              <div className="bg-white rounded-2xl p-8 border border-warm-200">
                <div className="flex items-center gap-3 mb-4">
                  <Droplets className="w-6 h-6 text-sage-600" />
                  <h3 className="font-display font-medium text-warm-900">Bacteriostatic Water</h3>
                </div>
                <ul className="space-y-3 text-sm text-warm-800/80">
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Temperature:</strong> Room temperature, away from light
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Expiration:</strong> Check expiration date before using
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-sage-600 font-semibold">•</span>
                    <span>
                      <strong>Container:</strong> Keep in original sealed bottle until use
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-sage-50 rounded-2xl p-8 border border-sage-200 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-sage-600" />
                <h3 className="font-display font-medium text-warm-900">Travel Tips</h3>
              </div>
              <ul className="space-y-3 text-sm text-warm-800/80">
                <li className="flex gap-3">
                  <span className="text-sage-600 font-semibold">•</span>
                  <span>Use an insulated cooler bag with ice packs to maintain temperature</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sage-600 font-semibold">•</span>
                  <span>Keep peptides away from extreme heat or freezing temperatures</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sage-600 font-semibold">•</span>
                  <span>
                    TSA allows medications (peptides) in carry-on luggage. Keep vials in original
                    labeling.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sage-600 font-semibold">•</span>
                  <span>International travel: verify local regulations before packing peptides</span>
                </li>
              </ul>
            </div>

            {/* Signs of Degradation */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-display font-medium text-warm-900">Signs of Degradation</h3>
              </div>
              <p className="text-sm text-warm-800/80 mb-4">Do not use if you observe:</p>
              <ul className="space-y-2 text-sm text-warm-800/80">
                <li className="flex gap-3">
                  <span className="text-red-600 font-semibold">•</span>
                  <span>Discoloration (should be clear)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-semibold">•</span>
                  <span>Particles or cloudiness</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-semibold">•</span>
                  <span>Unusual smell or odor</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-semibold">•</span>
                  <span>Vial or seal integrity compromised</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-red-600 font-semibold">•</span>
                  <span>Past expiration date</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: Reading Your Peptides */}
        <section
          ref={(el) => {
            if (el) sectionRefs.current['labels'] = el
          }}
          id="labels"
          className="animate-fade-in-up"
        >
          <h2 className="heading-section text-sage-600 mb-8">Reading Your Peptides</h2>

          <div className="max-w-2xl">
            <p className="text-body mb-8">
              Understanding vial labels and documentation ensures you know exactly what you're using
              and its quality.
            </p>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display font-medium text-warm-900 mb-6">What's on the Label</h3>
              <div className="space-y-6">
                {[
                  {
                    label: 'Peptide Name',
                    description: 'The official name of the peptide (e.g., BPC-157, TB-500)',
                  },
                  {
                    label: 'Amount (mg)',
                    description: 'Total milligrams of peptide in the vial. Example: 10mg',
                  },
                  {
                    label: 'Batch/Lot Number',
                    description: 'Identifies the specific production batch for traceability',
                  },
                  {
                    label: 'Expiration Date',
                    description: 'Date after which the peptide should not be used',
                  },
                  {
                    label: 'Storage Instructions',
                    description:
                      'Recommended storage temperature and conditions (usually 2-8°C)',
                  },
                  {
                    label: 'Supplier/Manufacturer',
                    description: 'Company that produced or distributed the peptide',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="pb-6 border-b border-warm-100 last:border-b-0 last:pb-0">
                    <h4 className="font-medium text-warm-900 mb-2">{item.label}</h4>
                    <p className="text-sm text-warm-800/60">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display font-medium text-warm-900 mb-6">
                Certificate of Analysis (CoA)
              </h3>
              <p className="text-sm text-warm-800/80 mb-6">
                A CoA is a document from the manufacturer confirming the quality and purity of the
                peptide. Always request this from your supplier.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: 'Purity',
                    detail: 'Should be >98%. This percentage indicates how pure the peptide is.',
                  },
                  {
                    title: 'HPLC Testing',
                    detail:
                      'High-Performance Liquid Chromatography. Confirms identity and purity.',
                  },
                  {
                    title: 'Mass Spectrometry',
                    detail: 'Confirms the exact molecular weight of the peptide.',
                  },
                  {
                    title: 'Testing Date',
                    detail: 'When the batch was tested. More recent is better.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sage-100">
                      <CheckCircle2 className="w-4 h-4 text-sage-600" />
                    </div>
                    <div>
                      <p className="font-medium text-warm-900 text-sm">{item.title}</p>
                      <p className="text-xs text-warm-800/60">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-warm-200">
              <h3 className="font-display font-medium text-warm-900 mb-6">Unit Conversions</h3>
              <div className="bg-warm-100/50 rounded-lg p-4 mb-4 text-center">
                <p className="text-lg font-display text-warm-900">
                  1 mg = 1,000 mcg (micrograms)
                </p>
              </div>
              <p className="text-sm text-warm-800/80 mb-4">
                Understanding these units is critical for accurate dosing:
              </p>
              <ul className="space-y-3 text-sm text-warm-800/80">
                <li className="flex gap-3">
                  <span className="text-sage-600 font-semibold">mg</span>
                  <span>
                    <strong>Milligram</strong> — larger unit, used to describe vial contents
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-sage-600 font-semibold">mcg</span>
                  <span>
                    <strong>Microgram</strong> — smaller unit, used for individual doses
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Safety & Troubleshooting */}
        <section
          ref={(el) => {
            if (el) sectionRefs.current['safety'] = el
          }}
          id="safety"
          className="animate-fade-in-up"
        >
          <h2 className="heading-section text-sage-600 mb-8">Safety & Troubleshooting</h2>

          <div className="max-w-2xl">
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-display font-medium text-warm-900">When NOT to Inject</h3>
              </div>
              <p className="text-sm text-warm-800/80 mb-6">
                Do NOT inject if any of the following apply:
              </p>
              <ul className="space-y-3">
                {[
                  'Vial appears cloudy or discolored after reconstitution',
                  'You see visible particles in the solution',
                  'The vial has an unusual smell or odor',
                  'Injection site is irritated, infected, or showing signs of rash',
                  'You have a fever or acute illness',
                  'The peptide has passed its expiration date',
                  'The vial seal or integrity is compromised',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-warm-800/80">
                    <span className="text-red-600 font-semibold text-lg leading-none">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display font-medium text-warm-900 mb-6">Common Side Effects</h3>
              <div className="space-y-4">
                {[
                  {
                    effect: 'Minor bruising',
                    normal: true,
                    note: 'Normal. Use ice packs post-injection to minimize.',
                  },
                  {
                    effect: 'Slight redness at injection site',
                    normal: true,
                    note: 'Usually resolves within a few hours. Keep area clean.',
                  },
                  {
                    effect: 'Mild discomfort during injection',
                    normal: true,
                    note: 'Use a fresh, sharp needle. Warmer solution helps.',
                  },
                  {
                    effect: 'Swelling or significant redness',
                    normal: false,
                    note: 'May indicate infection or allergic reaction. Seek care.',
                  },
                  {
                    effect: 'Severe pain or numbness',
                    normal: false,
                    note: 'You may have hit a nerve. Do not inject in that area again.',
                  },
                  {
                    effect: 'Signs of infection (pus, warmth, red streaks)',
                    normal: false,
                    note: 'Seek immediate medical attention.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      item.normal ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <p
                      className={`font-medium mb-1 ${
                        item.normal ? 'text-green-900' : 'text-red-900'
                      }`}
                    >
                      {item.effect}
                    </p>
                    <p
                      className={`text-sm ${
                        item.normal ? 'text-green-800/70' : 'text-red-800/70'
                      }`}
                    >
                      {item.normal ? '✓ NORMAL: ' : '⚠ CONCERNING: '}
                      {item.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display font-medium text-warm-900 mb-6">
                When to Seek Medical Attention
              </h3>
              <p className="text-sm text-warm-800/80 mb-6">
                Stop using the peptide and contact a healthcare provider if you experience:
              </p>
              <ul className="space-y-3 text-sm text-warm-800/80">
                {[
                  'Signs of infection (increased redness, warmth, pus, streaking)',
                  'Severe allergic reaction (difficulty breathing, swelling of face/throat)',
                  'Severe pain, numbness, or tingling',
                  'Unexplained fever or illness',
                  'Chest pain or shortness of breath',
                  'Any symptom that concerns you',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-warm-200 mb-8">
              <h3 className="font-display font-medium text-warm-900 mb-6">Sharps Disposal</h3>
              <p className="text-sm text-warm-800/80 mb-6">
                Proper needle and syringe disposal is critical for safety:
              </p>
              <div className="space-y-4">
                {[
                  'Use only FDA-approved sharps containers — never reuse old containers',
                  'Never throw needles in the regular trash',
                  'Never recap needles after use',
                  'Fill container only 3/4 full, then seal and mark as "Sharps Waste"',
                  'Take full containers to a local pharmacy or medical facility for disposal',
                  'Many pharmacies offer free sharps disposal',
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-sm text-warm-800/80">
                    <CheckCircle2 className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Disclaimer */}
            <div className="bg-sage-50 rounded-2xl p-8 border border-sage-200">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-sage-600" />
                <h3 className="font-display font-medium text-warm-900">Important Disclaimer</h3>
              </div>
              <p className="text-sm text-warm-800/80 leading-relaxed">
                This guide is for educational purposes only and does not constitute medical advice.
                Peptides may carry risks, and individual responses vary. Always consult with a
                qualified healthcare provider before starting any new protocol. You are responsible
                for following all applicable laws and regulations in your jurisdiction. Neither the
                author nor the site assumes liability for misuse or adverse outcomes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
