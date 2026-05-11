'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { peptides } from '@/data/peptides'
import {
  Beaker,
  Calculator,
  Droplets,
  ExternalLink,
  Info,
  Plus,
  Syringe,
  Trash2,
} from 'lucide-react'

type Mode = 'single' | 'blend'

interface SyringeOption {
  id: string
  label: string
  capacityMl: number
  units: number
}

const SYRINGE_OPTIONS: SyringeOption[] = [
  { id: 'u100-1ml', label: 'U-100, 1 mL (100 units)', capacityMl: 1, units: 100 },
  { id: 'u100-0.5ml', label: 'U-100, ½ mL (50 units)', capacityMl: 0.5, units: 50 },
  { id: 'u100-0.3ml', label: 'U-100, ⅓ mL (30 units)', capacityMl: 0.3, units: 30 },
]

interface BlendComponent {
  id: string
  slug: string
  mg: number
}

const newComponent = (slug = ''): BlendComponent => ({
  id: Math.random().toString(36).slice(2, 9),
  slug,
  mg: 5,
})

const fmt = (n: number, digits = 2) => {
  if (!isFinite(n) || isNaN(n)) return '—'
  return n.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  })
}

export default function PeptideCalculator() {
  const [mode, setMode] = useState<Mode>('single')

  // Single-peptide inputs
  const [singleSlug, setSingleSlug] = useState<string>('tesamorelin')
  const [singleMg, setSingleMg] = useState<number>(10)
  const [bacMl, setBacMl] = useState<number>(2)
  const [doseMcg, setDoseMcg] = useState<number>(100)
  const [syringeId, setSyringeId] = useState<string>(SYRINGE_OPTIONS[0].id)

  // Blend inputs
  const [components, setComponents] = useState<BlendComponent[]>([
    { ...newComponent('cjc-1295'), mg: 5 },
    { ...newComponent('ipamorelin'), mg: 5 },
  ])
  const [blendBacMl, setBlendBacMl] = useState<number>(2)
  const [blendTargetIdx, setBlendTargetIdx] = useState<number>(0)
  const [blendTargetDoseMcg, setBlendTargetDoseMcg] = useState<number>(100)
  const [blendSyringeId, setBlendSyringeId] = useState<string>(SYRINGE_OPTIONS[0].id)

  const syringe = useMemo(
    () =>
      SYRINGE_OPTIONS.find((s) =>
        mode === 'single' ? s.id === syringeId : s.id === blendSyringeId
      ) ?? SYRINGE_OPTIONS[0],
    [mode, syringeId, blendSyringeId]
  )

  const singleResults = useMemo(() => {
    const mg = Number(singleMg) || 0
    const ml = Number(bacMl) || 0
    const dose = Number(doseMcg) || 0
    if (mg <= 0 || ml <= 0 || dose <= 0) return null
    const concentrationMcgPerMl = (mg * 1000) / ml
    const volumePerDoseMl = dose / concentrationMcgPerMl
    const unitsToDraw = volumePerDoseMl * 100 // U-100: 100 units = 1 mL
    const dosesPerVial = (mg * 1000) / dose
    return {
      concentrationMcgPerMl,
      volumePerDoseMl,
      unitsToDraw,
      dosesPerVial,
      overflow: volumePerDoseMl > syringe.capacityMl,
    }
  }, [singleMg, bacMl, doseMcg, syringe])

  const blendResults = useMemo(() => {
    const ml = Number(blendBacMl) || 0
    const target = components[blendTargetIdx]
    if (!target || ml <= 0 || target.mg <= 0 || blendTargetDoseMcg <= 0) return null
    const targetConcentration = (target.mg * 1000) / ml
    const volumePerDoseMl = blendTargetDoseMcg / targetConcentration
    const unitsToDraw = volumePerDoseMl * 100
    const breakdown = components.map((c) => {
      const concentration = (Number(c.mg) * 1000) / ml
      const deliveredMcg = concentration * volumePerDoseMl
      const dosesPerVial = (Number(c.mg) * 1000) / deliveredMcg
      return {
        ...c,
        concentration,
        deliveredMcg,
        dosesPerVial,
      }
    })
    return {
      volumePerDoseMl,
      unitsToDraw,
      breakdown,
      overflow: volumePerDoseMl > syringe.capacityMl,
    }
  }, [components, blendBacMl, blendTargetIdx, blendTargetDoseMcg, syringe])

  const peptideOptions = useMemo(
    () =>
      [...peptides].sort((a, b) => a.name.localeCompare(b.name)),
    []
  )

  const selectedSinglePeptide = useMemo(
    () => peptideOptions.find((p) => p.slug === singleSlug),
    [peptideOptions, singleSlug]
  )

  const addComponent = () => {
    if (components.length >= 5) return
    setComponents([...components, newComponent()])
  }

  const removeComponent = (id: string) => {
    if (components.length <= 1) return
    setComponents((prev) => {
      const idx = prev.findIndex((c) => c.id === id)
      const next = prev.filter((c) => c.id !== id)
      // Keep target index in range
      if (blendTargetIdx >= next.length) setBlendTargetIdx(Math.max(0, next.length - 1))
      else if (idx <= blendTargetIdx && blendTargetIdx > 0) setBlendTargetIdx(blendTargetIdx - 1)
      return next
    })
  }

  const updateComponent = (id: string, patch: Partial<BlendComponent>) => {
    setComponents((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)))
  }

  return (
    <div className="container-narrow py-16">
      {/* Mode Toggle */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex rounded-full border border-warm-200 bg-white p-1 shadow-sm">
          {(['single', 'blend'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-all duration-200 ${
                mode === m
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'text-warm-800/60 hover:text-warm-900'
              }`}
            >
              {m === 'single' ? (
                <Beaker className="h-4 w-4" />
              ) : (
                <Droplets className="h-4 w-4" />
              )}
              {m === 'single' ? 'Single Peptide' : 'Blend'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Inputs */}
        <div className="lg:col-span-3">
          <div className="card">
            <div className="mb-6 flex items-center gap-3">
              <Calculator className="h-5 w-5 text-sage-600" />
              <h2 className="font-display text-xl font-medium text-warm-900">Inputs</h2>
            </div>

            {mode === 'single' ? (
              <SingleInputs
                peptideOptions={peptideOptions}
                slug={singleSlug}
                setSlug={setSingleSlug}
                mg={singleMg}
                setMg={setSingleMg}
                bacMl={bacMl}
                setBacMl={setBacMl}
                doseMcg={doseMcg}
                setDoseMcg={setDoseMcg}
                syringeId={syringeId}
                setSyringeId={setSyringeId}
              />
            ) : (
              <BlendInputs
                peptideOptions={peptideOptions}
                components={components}
                addComponent={addComponent}
                removeComponent={removeComponent}
                updateComponent={updateComponent}
                bacMl={blendBacMl}
                setBacMl={setBlendBacMl}
                targetIdx={blendTargetIdx}
                setTargetIdx={setBlendTargetIdx}
                targetDoseMcg={blendTargetDoseMcg}
                setTargetDoseMcg={setBlendTargetDoseMcg}
                syringeId={blendSyringeId}
                setSyringeId={setBlendSyringeId}
              />
            )}
          </div>

          {/* Forge Amino CTA */}
          <div className="mt-6 rounded-2xl border border-sage-200 bg-sage-50 p-5">
            <p className="text-sm text-warm-800/80">
              Need peptides?{' '}
              <strong className="text-warm-900">Source from Forge Amino.</strong>{' '}
              <a
                href="https://www.forgeamino.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-sage-700 underline-offset-4 hover:underline"
              >
                forgeamino.com <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </p>
            {mode === 'single' && selectedSinglePeptide && (
              <p className="mt-2 text-sm text-warm-800/70">
                Dosing details for <strong>{selectedSinglePeptide.name}</strong>?{' '}
                <Link
                  href={`/peptides/${selectedSinglePeptide.slug}`}
                  className="font-medium text-sage-700 underline-offset-4 hover:underline"
                >
                  Research dosing guidelines →
                </Link>
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2">
          <div className="sticky top-24">
            {mode === 'single' ? (
              <SingleResults
                results={singleResults}
                syringe={syringe}
                doseMcg={doseMcg}
              />
            ) : (
              <BlendResults
                results={blendResults}
                syringe={syringe}
                targetIdx={blendTargetIdx}
                targetDoseMcg={blendTargetDoseMcg}
                peptideOptions={peptideOptions}
              />
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 rounded-2xl border border-warm-200 bg-warm-100/60 p-6">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-warm-800/60" />
          <div>
            <p className="text-sm font-semibold text-warm-900">Disclaimer.</p>
            <p className="mt-1 text-sm leading-relaxed text-warm-800/70">
              Educational and research-oriented tool only. Not medical advice. Verify every
              calculation against your supplier&apos;s labeling and a clinician&apos;s guidance
              before use. Many of these compounds are prescription-only or research chemicals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Sub-components                                                    */
/* ---------------------------------------------------------------- */

interface PeptideOpt {
  slug: string
  name: string
}

function PeptideSelect({
  value,
  onChange,
  options,
  allowCustom = true,
}: {
  value: string
  onChange: (slug: string) => void
  options: PeptideOpt[]
  allowCustom?: boolean
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 text-sm text-warm-900 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200"
    >
      {allowCustom && <option value="">— Custom / unlisted —</option>}
      {options.map((o) => (
        <option key={o.slug} value={o.slug}>
          {o.name}
        </option>
      ))}
    </select>
  )
}

function NumberField({
  label,
  value,
  onChange,
  unit,
  step = 0.1,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  unit: string
  step?: number
  min?: number
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-800/60">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ''}
          step={step}
          min={min}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 pr-12 text-sm text-warm-900 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-warm-800/50">
          {unit}
        </span>
      </div>
    </div>
  )
}

function SyringeRadio({
  value,
  onChange,
}: {
  value: string
  onChange: (id: string) => void
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-warm-800/60">
        Syringe
      </label>
      <div className="grid gap-2 sm:grid-cols-3">
        {SYRINGE_OPTIONS.map((o) => {
          const active = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-xs transition-all ${
                active
                  ? 'border-sage-600 bg-sage-50 text-sage-800 shadow-sm'
                  : 'border-warm-200 bg-white text-warm-800/70 hover:border-sage-300'
              }`}
            >
              <Syringe className={`h-4 w-4 ${active ? 'text-sage-600' : 'text-warm-800/40'}`} />
              <span className="font-medium leading-tight">{o.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function SingleInputs({
  peptideOptions,
  slug,
  setSlug,
  mg,
  setMg,
  bacMl,
  setBacMl,
  doseMcg,
  setDoseMcg,
  syringeId,
  setSyringeId,
}: {
  peptideOptions: PeptideOpt[]
  slug: string
  setSlug: (v: string) => void
  mg: number
  setMg: (v: number) => void
  bacMl: number
  setBacMl: (v: number) => void
  doseMcg: number
  setDoseMcg: (v: number) => void
  syringeId: string
  setSyringeId: (v: string) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-800/60">
          Peptide
        </label>
        <PeptideSelect value={slug} onChange={setSlug} options={peptideOptions} />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField
          label="Amount in vial (COA)"
          value={mg}
          onChange={setMg}
          unit="mg"
          step={0.5}
        />
        <NumberField
          label="BAC water added"
          value={bacMl}
          onChange={setBacMl}
          unit="mL"
          step={0.1}
        />
        <NumberField
          label="Desired dose"
          value={doseMcg}
          onChange={setDoseMcg}
          unit="mcg"
          step={10}
        />
      </div>
      <SyringeRadio value={syringeId} onChange={setSyringeId} />
    </div>
  )
}

function BlendInputs({
  peptideOptions,
  components,
  addComponent,
  removeComponent,
  updateComponent,
  bacMl,
  setBacMl,
  targetIdx,
  setTargetIdx,
  targetDoseMcg,
  setTargetDoseMcg,
  syringeId,
  setSyringeId,
}: {
  peptideOptions: PeptideOpt[]
  components: BlendComponent[]
  addComponent: () => void
  removeComponent: (id: string) => void
  updateComponent: (id: string, patch: Partial<BlendComponent>) => void
  bacMl: number
  setBacMl: (v: number) => void
  targetIdx: number
  setTargetIdx: (v: number) => void
  targetDoseMcg: number
  setTargetDoseMcg: (v: number) => void
  syringeId: string
  setSyringeId: (v: string) => void
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-xs font-medium uppercase tracking-wide text-warm-800/60">
            Peptides in vial
          </label>
          <button
            type="button"
            onClick={addComponent}
            disabled={components.length >= 5}
            className="inline-flex items-center gap-1 rounded-full bg-sage-100 px-3 py-1 text-xs font-medium text-sage-700 transition-colors hover:bg-sage-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-3 w-3" /> Add peptide
          </button>
        </div>
        <div className="space-y-2">
          {components.map((c, idx) => (
            <div
              key={c.id}
              className={`flex items-center gap-2 rounded-lg border p-2 transition-colors ${
                idx === targetIdx
                  ? 'border-sage-500 bg-sage-50'
                  : 'border-warm-200 bg-white'
              }`}
            >
              <button
                type="button"
                onClick={() => setTargetIdx(idx)}
                aria-label="Set as target peptide"
                className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  idx === targetIdx
                    ? 'border-sage-600 bg-sage-600'
                    : 'border-warm-300 bg-white hover:border-sage-400'
                }`}
              >
                {idx === targetIdx && <span className="h-2 w-2 rounded-full bg-white" />}
              </button>
              <div className="flex-1">
                <PeptideSelect
                  value={c.slug}
                  onChange={(slug) => updateComponent(c.id, { slug })}
                  options={peptideOptions}
                />
              </div>
              <div className="w-24">
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={c.mg}
                    step={0.5}
                    min={0}
                    onChange={(e) =>
                      updateComponent(c.id, { mg: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 pr-8 text-sm text-warm-900 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-xs text-warm-800/50">
                    mg
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeComponent(c.id)}
                disabled={components.length <= 1}
                aria-label="Remove peptide"
                className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-warm-800/40 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-warm-800/40"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <p className="mt-2 text-xs text-warm-800/50">
          Select the circle to choose the peptide you&apos;re dosing by.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField
          label="BAC water added"
          value={bacMl}
          onChange={setBacMl}
          unit="mL"
          step={0.1}
        />
        <NumberField
          label="Target dose"
          value={targetDoseMcg}
          onChange={setTargetDoseMcg}
          unit="mcg"
          step={10}
        />
      </div>

      <SyringeRadio value={syringeId} onChange={setSyringeId} />
    </div>
  )
}

/* ---------------------------------------------------------------- */
/* Results panels                                                    */
/* ---------------------------------------------------------------- */

function ResultShell({
  unitsToDraw,
  volumePerDoseMl,
  syringe,
  overflow,
  children,
  bigSubtitle,
}: {
  unitsToDraw: number | null
  volumePerDoseMl: number | null
  syringe: SyringeOption
  overflow: boolean
  children: React.ReactNode
  bigSubtitle?: string
}) {
  const ready = unitsToDraw !== null && volumePerDoseMl !== null
  return (
    <div className="overflow-hidden rounded-2xl bg-sage-600 text-white shadow-lg">
      <div className="p-8 text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-sage-200">
          Draw on syringe
        </p>
        <p className="font-display text-5xl font-medium leading-none">
          {ready ? fmt(unitsToDraw!, 1) : '—'}
          <span className="ml-1 text-2xl text-sage-200">units</span>
        </p>
        {ready ? (
          <p className="mt-3 text-xs text-sage-200">
            {bigSubtitle ?? `${fmt(volumePerDoseMl!, 3)} mL per dose · ${syringe.label}`}
          </p>
        ) : (
          <p className="mt-3 text-xs text-sage-200">Enter your inputs to the left</p>
        )}
        {overflow && (
          <p className="mt-3 inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-100">
            ⚠ Volume exceeds {syringe.capacityMl} mL syringe capacity
          </p>
        )}
      </div>
      <div className="border-t border-sage-500/40 bg-sage-700/40 p-6">{children}</div>
    </div>
  )
}

function StatRow({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-sage-500/30 py-2.5 last:border-b-0">
      <span className="text-xs uppercase tracking-wide text-sage-200">{label}</span>
      <span className="text-right">
        <span className="font-display text-lg font-medium">{value}</span>
        {hint && <span className="ml-1 text-xs text-sage-200">{hint}</span>}
      </span>
    </div>
  )
}

function SingleResults({
  results,
  syringe,
  doseMcg,
}: {
  results:
    | {
        concentrationMcgPerMl: number
        volumePerDoseMl: number
        unitsToDraw: number
        dosesPerVial: number
        overflow: boolean
      }
    | null
  syringe: SyringeOption
  doseMcg: number
}) {
  return (
    <ResultShell
      unitsToDraw={results?.unitsToDraw ?? null}
      volumePerDoseMl={results?.volumePerDoseMl ?? null}
      syringe={syringe}
      overflow={!!results?.overflow}
    >
      <StatRow
        label="Concentration"
        value={results ? `${fmt(results.concentrationMcgPerMl, 1)}` : '—'}
        hint="mcg/mL"
      />
      <StatRow
        label="Volume / dose"
        value={results ? `${fmt(results.volumePerDoseMl, 3)}` : '—'}
        hint="mL"
      />
      <StatRow
        label="Doses / vial"
        value={results ? `${fmt(results.dosesPerVial, 1)}` : '—'}
        hint={results ? `at ${fmt(doseMcg, 0)} mcg` : ''}
      />
    </ResultShell>
  )
}

function BlendResults({
  results,
  syringe,
  targetIdx,
  targetDoseMcg,
  peptideOptions,
}: {
  results:
    | {
        volumePerDoseMl: number
        unitsToDraw: number
        breakdown: {
          id: string
          slug: string
          mg: number
          concentration: number
          deliveredMcg: number
          dosesPerVial: number
        }[]
        overflow: boolean
      }
    | null
  syringe: SyringeOption
  targetIdx: number
  targetDoseMcg: number
  peptideOptions: PeptideOpt[]
}) {
  const nameFor = (slug: string) =>
    peptideOptions.find((o) => o.slug === slug)?.name ?? 'Custom'

  return (
    <ResultShell
      unitsToDraw={results?.unitsToDraw ?? null}
      volumePerDoseMl={results?.volumePerDoseMl ?? null}
      syringe={syringe}
      overflow={!!results?.overflow}
      bigSubtitle={
        results
          ? `${fmt(results.volumePerDoseMl, 3)} mL delivers ${fmt(targetDoseMcg, 0)} mcg of ${nameFor(
              results.breakdown[targetIdx]?.slug ?? ''
            )}`
          : undefined
      }
    >
      {results ? (
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-sage-200">
            Per-dose breakdown
          </p>
          {results.breakdown.map((b, idx) => (
            <div
              key={b.id}
              className={`flex items-baseline justify-between gap-3 border-b border-sage-500/30 py-2.5 last:border-b-0 ${
                idx === targetIdx ? 'text-white' : 'text-sage-100'
              }`}
            >
              <span className="text-xs">
                {nameFor(b.slug)}
                {idx === targetIdx && (
                  <span className="ml-1.5 rounded-full bg-white/15 px-1.5 py-0.5 text-[10px] uppercase">
                    target
                  </span>
                )}
              </span>
              <span className="text-right">
                <span className="font-display text-base font-medium">
                  {fmt(b.deliveredMcg, 1)}
                </span>
                <span className="ml-1 text-xs text-sage-200">mcg</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xs text-sage-200">Awaiting inputs…</p>
      )}
    </ResultShell>
  )
}
