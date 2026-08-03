'use client'

import { useEffect, useMemo, useState } from 'react'
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
type DoseUnit = 'mcg' | 'mg'

const toMcg = (value: number, unit: DoseUnit) => (unit === 'mg' ? value * 1000 : value)

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

const newComponent = (slug = '', mg = 5): BlendComponent => ({
  id: Math.random().toString(36).slice(2, 9),
  slug,
  mg,
})

interface BlendPreset {
  id: string
  name: string
  description: string
  components: { slug: string; mg: number }[]
}

const BLEND_PRESETS: BlendPreset[] = [
  {
    id: 'wolverine',
    name: 'Wolverine',
    description: 'BPC-157 + TB-500 — systemic healing & repair',
    components: [
      { slug: 'bpc-157', mg: 5 },
      { slug: 'tb-500', mg: 5 },
    ],
  },
  {
    id: 'cjc-ipa',
    name: 'CJC / IPA',
    description: 'CJC-1295 + Ipamorelin — GH pulse',
    components: [
      { slug: 'cjc-1295', mg: 2 },
      { slug: 'ipamorelin', mg: 2 },
    ],
  },
  {
    id: 'glow',
    name: 'Glow',
    description: 'GHK-Cu + BPC-157 + TB-500 — skin & collagen',
    components: [
      { slug: 'ghk-cu', mg: 50 },
      { slug: 'bpc-157', mg: 10 },
      { slug: 'tb-500', mg: 10 },
    ],
  },
  {
    id: 'klow',
    name: 'Klow',
    description: 'KPV + GHK-Cu + BPC-157 + TB-500 — gut & systemic',
    components: [
      { slug: 'kpv', mg: 10 },
      { slug: 'ghk-cu', mg: 50 },
      { slug: 'bpc-157', mg: 10 },
      { slug: 'tb-500', mg: 10 },
    ],
  },
]

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
  const [doseValue, setDoseValue] = useState<number>(100)
  const [doseUnit, setDoseUnit] = useState<DoseUnit>('mcg')
  const [syringeId, setSyringeId] = useState<string>(SYRINGE_OPTIONS[0].id)

  // Blend inputs
  const [components, setComponents] = useState<BlendComponent[]>([
    { ...newComponent('cjc-1295'), mg: 5 },
    { ...newComponent('ipamorelin'), mg: 5 },
  ])
  const [blendBacMl, setBlendBacMl] = useState<number>(2)
  const [blendTargetIdx, setBlendTargetIdx] = useState<number>(0)
  const [blendTargetDoseValue, setBlendTargetDoseValue] = useState<number>(100)
  const [blendTargetDoseUnit, setBlendTargetDoseUnit] = useState<DoseUnit>('mcg')
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
    const doseMcg = toMcg(Number(doseValue) || 0, doseUnit)
    if (mg <= 0 || ml <= 0 || doseMcg <= 0) return null
    const concentrationMcgPerMl = (mg * 1000) / ml
    const volumePerDoseMl = doseMcg / concentrationMcgPerMl
    const unitsToDraw = volumePerDoseMl * 100 // U-100: 100 units = 1 mL
    const dosesPerVial = (mg * 1000) / doseMcg
    return {
      concentrationMcgPerMl,
      volumePerDoseMl,
      unitsToDraw,
      dosesPerVial,
      doseMcg,
      overflow: volumePerDoseMl > syringe.capacityMl,
    }
  }, [singleMg, bacMl, doseValue, doseUnit, syringe])

  const blendResults = useMemo(() => {
    const ml = Number(blendBacMl) || 0
    const target = components[blendTargetIdx]
    const targetMg = Number(target?.mg) || 0
    const blendTargetDoseMcg = toMcg(Number(blendTargetDoseValue) || 0, blendTargetDoseUnit)
    if (!target || ml <= 0 || targetMg <= 0 || blendTargetDoseMcg <= 0) return null
    const targetConcentration = (targetMg * 1000) / ml
    const volumePerDoseMl = blendTargetDoseMcg / targetConcentration
    const unitsToDraw = volumePerDoseMl * 100
    const breakdown = components.map((c) => {
      const cMg = Number(c.mg) || 0
      const concentration = (cMg * 1000) / ml
      const deliveredMcg = concentration * volumePerDoseMl
      const dosesPerVial = (cMg * 1000) / deliveredMcg
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
      blendTargetDoseMcg,
      overflow: volumePerDoseMl > syringe.capacityMl,
    }
  }, [components, blendBacMl, blendTargetIdx, blendTargetDoseValue, blendTargetDoseUnit, syringe])

  // Peptides hidden from the calculator dropdown (e.g. oral-only compounds
  // that aren't reconstituted from lyophilized powder)
  const EXCLUDED_SLUGS = useMemo(() => new Set(['tadalafil']), [])

  const peptideOptions = useMemo(
    () =>
      peptides
        .filter((p) => !EXCLUDED_SLUGS.has(p.slug))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [EXCLUDED_SLUGS]
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

  const [activePresetId, setActivePresetId] = useState<string | null>(null)

  const applyPreset = (preset: BlendPreset) => {
    setComponents(preset.components.map((c) => newComponent(c.slug, c.mg)))
    setBlendTargetIdx(0)
    setActivePresetId(preset.id)
  }

  // Clear active preset if user edits any component or count diverges
  const onComponentChange = (id: string, patch: Partial<BlendComponent>) => {
    setActivePresetId(null)
    updateComponent(id, patch)
  }
  const onAddComponent = () => {
    setActivePresetId(null)
    addComponent()
  }
  const onRemoveComponent = (id: string) => {
    setActivePresetId(null)
    removeComponent(id)
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
                doseValue={doseValue}
                setDoseValue={setDoseValue}
                doseUnit={doseUnit}
                setDoseUnit={setDoseUnit}
                syringeId={syringeId}
                setSyringeId={setSyringeId}
              />
            ) : (
              <BlendInputs
                peptideOptions={peptideOptions}
                components={components}
                addComponent={onAddComponent}
                removeComponent={onRemoveComponent}
                updateComponent={onComponentChange}
                bacMl={blendBacMl}
                setBacMl={setBlendBacMl}
                targetIdx={blendTargetIdx}
                setTargetIdx={setBlendTargetIdx}
                targetDoseValue={blendTargetDoseValue}
                setTargetDoseValue={setBlendTargetDoseValue}
                targetDoseUnit={blendTargetDoseUnit}
                setTargetDoseUnit={setBlendTargetDoseUnit}
                syringeId={blendSyringeId}
                setSyringeId={setBlendSyringeId}
                activePresetId={activePresetId}
                applyPreset={applyPreset}
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
                doseValue={doseValue}
                doseUnit={doseUnit}
              />
            ) : (
              <BlendResults
                results={blendResults}
                syringe={syringe}
                targetIdx={blendTargetIdx}
                targetDoseValue={blendTargetDoseValue}
                targetDoseUnit={blendTargetDoseUnit}
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

/**
 * Text-backed numeric input.
 *
 * Storing only a number and doing `parseFloat(x) || 0` on every keystroke means
 * an empty field snaps back to "0", so the next digits typed end up appended to
 * it ("040"), and a trailing decimal point ("0.") gets eaten before you can type
 * the fraction. Keeping the raw text locally while editing avoids both. The
 * number is still what flows out via onChange (NaN when the field is empty), and
 * the text is re-normalized from the number on blur.
 */
const numToText = (n: number) => (Number.isFinite(n) ? String(n) : '')

function NumericInput({
  value,
  onChange,
  min = 0,
  className,
  ariaLabel,
}: {
  value: number
  onChange: (v: number) => void
  min?: number
  className?: string
  ariaLabel?: string
}) {
  const [text, setText] = useState(() => numToText(value))
  const [editing, setEditing] = useState(false)

  // Reflect external changes (presets, mode switches) unless the user is typing
  useEffect(() => {
    if (!editing) setText(numToText(value))
  }, [value, editing])

  return (
    <input
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      value={text}
      onFocus={() => setEditing(true)}
      onBlur={() => {
        setEditing(false)
        setText(numToText(value))
      }}
      onChange={(e) => {
        const raw = e.target.value
        // Allow digits, a single decimal point, and an empty field
        if (raw !== '' && !/^\d*\.?\d*$/.test(raw)) return
        setText(raw)
        const parsed = parseFloat(raw)
        if (!Number.isFinite(parsed)) onChange(NaN)
        else onChange(Math.max(min, parsed))
      }}
      className={className}
    />
  )
}

function NumberField({
  label,
  value,
  onChange,
  unit,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  unit: string
  min?: number
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-800/60">
        {label}
      </label>
      <div className="relative">
        <NumericInput
          value={value}
          onChange={onChange}
          min={min}
          ariaLabel={label}
          className="w-full rounded-lg border border-warm-200 bg-white px-3 py-2.5 pr-12 text-sm text-warm-900 focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs font-medium text-warm-800/50">
          {unit}
        </span>
      </div>
    </div>
  )
}

function DoseField({
  label,
  value,
  onChange,
  unit,
  setUnit,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  unit: DoseUnit
  setUnit: (u: DoseUnit) => void
  min?: number
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <label className="block text-xs font-medium uppercase tracking-wide text-warm-800/60">
          {label}
        </label>
        <div className="inline-flex rounded-full border border-warm-200 bg-warm-100 p-0.5">
          {(['mcg', 'mg'] as DoseUnit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => setUnit(u)}
              aria-pressed={unit === u}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-all ${
                unit === u
                  ? 'bg-sage-600 text-white shadow-sm'
                  : 'text-warm-800/60 hover:text-warm-900'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>
      <div className="relative">
        <NumericInput
          value={value}
          onChange={onChange}
          min={min}
          ariaLabel={`${label} in ${unit}`}
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
  doseValue,
  setDoseValue,
  doseUnit,
  setDoseUnit,
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
  doseValue: number
  setDoseValue: (v: number) => void
  doseUnit: DoseUnit
  setDoseUnit: (u: DoseUnit) => void
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
        <NumberField label="Amount in vial (COA)" value={mg} onChange={setMg} unit="mg" />
        <NumberField label="BAC water added" value={bacMl} onChange={setBacMl} unit="mL" />
        <DoseField
          label="Desired dose"
          value={doseValue}
          onChange={setDoseValue}
          unit={doseUnit}
          setUnit={setDoseUnit}
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
  targetDoseValue,
  setTargetDoseValue,
  targetDoseUnit,
  setTargetDoseUnit,
  syringeId,
  setSyringeId,
  activePresetId,
  applyPreset,
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
  targetDoseValue: number
  setTargetDoseValue: (v: number) => void
  targetDoseUnit: DoseUnit
  setTargetDoseUnit: (u: DoseUnit) => void
  syringeId: string
  setSyringeId: (v: string) => void
  activePresetId: string | null
  applyPreset: (preset: BlendPreset) => void
}) {
  return (
    <div className="space-y-5">
      {/* Common Blend Presets */}
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-warm-800/60">
          Common blends
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {BLEND_PRESETS.map((preset) => {
            const active = activePresetId === preset.id
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                title={preset.description}
                className={`rounded-lg border px-3 py-2 text-left transition-all ${
                  active
                    ? 'border-sage-600 bg-sage-50 shadow-sm'
                    : 'border-warm-200 bg-white hover:border-sage-300 hover:bg-warm-50'
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    active ? 'text-sage-700' : 'text-warm-900'
                  }`}
                >
                  {preset.name}
                </p>
                <p className="mt-0.5 truncate text-[10px] text-warm-800/50">
                  {preset.components
                    .map((c) => `${c.mg}mg ${peptideOptions.find((p) => p.slug === c.slug)?.name ?? c.slug}`)
                    .join(' + ')}
                </p>
              </button>
            )
          })}
        </div>
      </div>

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
                  <NumericInput
                    key={c.id}
                    value={c.mg}
                    onChange={(mg) => updateComponent(c.id, { mg })}
                    ariaLabel="Amount in vial in mg"
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
        <NumberField label="BAC water added" value={bacMl} onChange={setBacMl} unit="mL" />
        <DoseField
          label="Target dose"
          value={targetDoseValue}
          onChange={setTargetDoseValue}
          unit={targetDoseUnit}
          setUnit={setTargetDoseUnit}
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
  doseValue,
  doseUnit,
}: {
  results:
    | {
        concentrationMcgPerMl: number
        volumePerDoseMl: number
        unitsToDraw: number
        dosesPerVial: number
        doseMcg: number
        overflow: boolean
      }
    | null
  syringe: SyringeOption
  doseValue: number
  doseUnit: DoseUnit
}) {
  // Concentration: show in mg/mL when very large numbers in mcg get unwieldy
  const concentrationDisplay = results
    ? results.concentrationMcgPerMl >= 10000
      ? { val: results.concentrationMcgPerMl / 1000, hint: 'mg/mL' }
      : { val: results.concentrationMcgPerMl, hint: 'mcg/mL' }
    : null

  return (
    <ResultShell
      unitsToDraw={results?.unitsToDraw ?? null}
      volumePerDoseMl={results?.volumePerDoseMl ?? null}
      syringe={syringe}
      overflow={!!results?.overflow}
    >
      <StatRow
        label="Concentration"
        value={concentrationDisplay ? fmt(concentrationDisplay.val, 2) : '—'}
        hint={concentrationDisplay?.hint}
      />
      <StatRow
        label="Volume / dose"
        value={results ? `${fmt(results.volumePerDoseMl, 3)}` : '—'}
        hint="mL"
      />
      <StatRow
        label="Doses / vial"
        value={results ? `${fmt(results.dosesPerVial, 1)}` : '—'}
        hint={results ? `at ${fmt(doseValue, 2)} ${doseUnit}` : ''}
      />
    </ResultShell>
  )
}

function BlendResults({
  results,
  syringe,
  targetIdx,
  targetDoseValue,
  targetDoseUnit,
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
        blendTargetDoseMcg: number
        overflow: boolean
      }
    | null
  syringe: SyringeOption
  targetIdx: number
  targetDoseValue: number
  targetDoseUnit: DoseUnit
  peptideOptions: PeptideOpt[]
}) {
  const nameFor = (slug: string) =>
    peptideOptions.find((o) => o.slug === slug)?.name ?? 'Custom'

  const formatDelivered = (mcg: number) => {
    if (targetDoseUnit === 'mg') return { value: fmt(mcg / 1000, 3), unit: 'mg' }
    return { value: fmt(mcg, 1), unit: 'mcg' }
  }

  return (
    <ResultShell
      unitsToDraw={results?.unitsToDraw ?? null}
      volumePerDoseMl={results?.volumePerDoseMl ?? null}
      syringe={syringe}
      overflow={!!results?.overflow}
      bigSubtitle={
        results
          ? `${fmt(results.volumePerDoseMl, 3)} mL delivers ${fmt(
              targetDoseValue,
              targetDoseUnit === 'mg' ? 2 : 0
            )} ${targetDoseUnit} of ${nameFor(results.breakdown[targetIdx]?.slug ?? '')}`
          : undefined
      }
    >
      {results ? (
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-sage-200">
            Per-dose breakdown
          </p>
          {results.breakdown.map((b, idx) => {
            const d = formatDelivered(b.deliveredMcg)
            return (
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
                  <span className="font-display text-base font-medium">{d.value}</span>
                  <span className="ml-1 text-xs text-sage-200">{d.unit}</span>
                </span>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-xs text-sage-200">Awaiting inputs…</p>
      )}
    </ResultShell>
  )
}
