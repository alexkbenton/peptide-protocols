'use client'

import { useState, useReducer, ReactNode } from 'react'
import { ChevronLeft, ChevronRight, Download, RotateCcw, Sparkles, Beaker, FlaskConical, Microscope, AlertCircle, CheckCircle } from 'lucide-react'
import NewsletterSignup from '@/components/NewsletterSignup'

// Types
interface FormData {
  // Step 2: Goals
  goals: string[]
  topPriorities: string[]

  // Step 4: Experience & Preferences
  peptideExperience: '' | 'never' | 'some' | 'experienced' | 'advanced'
  preferredRoutes: string[]
  timeCommitment: '' | 'minimal' | 'moderate' | 'comprehensive'
  previousPeptides: string

  // Step 5: Lifestyle
  sleepQuality: '' | 'poor' | 'fair' | 'good' | 'excellent'
  stressLevel: '' | 'low' | 'moderate' | 'high' | 'very-high'
  dietType: '' | 'standard' | 'keto' | 'carnivore' | 'plant-based' | 'mediterranean' | 'intermittent-fasting' | 'other'

  // Step 6: Basic Profile
  age?: number
  biologicalSex?: string
  weight?: number
  weightUnit: 'lbs' | 'kg'
  activityLevel?: string
  conditions?: string

  // Step 7: Advanced Health Data
  bloodwork: Record<string, number | undefined>
  supplements?: string
  geneticVariants?: string
  healthHistory?: string

}

interface ProtocolResult {
  title: string
  summary: string
  sections: Array<{
    heading: string
    content: string
    subsections?: Array<{
      title: string
      content: string
    }>
  }>
  disclaimer: string
}

type WizardStep = 'disclaimer' | 'goals' | 'priority' | 'experience' | 'lifestyle' | 'profile' | 'advanced' | 'review' | 'loading' | 'results'

interface WizardState {
  currentStep: WizardStep
  formData: FormData
  protocol?: ProtocolResult
  error?: string
  disclaimerAccepted: boolean
}

type WizardAction =
  | { type: 'SET_STEP'; payload: WizardStep }
  | { type: 'UPDATE_FORM'; payload: Partial<FormData> }
  | { type: 'SET_PROTOCOL'; payload: ProtocolResult }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_DISCLAIMER_ACCEPTED'; payload: boolean }
  | { type: 'RESET' }

const initialState: WizardState = {
  currentStep: 'disclaimer',
  formData: {
    goals: [],
    topPriorities: [],
    peptideExperience: '',
    preferredRoutes: [],
    timeCommitment: '',
    previousPeptides: '',
    sleepQuality: '',
    stressLevel: '',
    dietType: '',
    weightUnit: 'lbs',
    bloodwork: {},
  },
  disclaimerAccepted: false,
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload, error: undefined }
    case 'UPDATE_FORM':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      }
    case 'SET_PROTOCOL':
      return { ...state, protocol: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    case 'SET_DISCLAIMER_ACCEPTED':
      return { ...state, disclaimerAccepted: action.payload }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const GOAL_OPTIONS = [
  'Fat Loss',
  'Muscle Growth',
  'Gut Health',
  'Anti-Inflammation',
  'Longevity/Anti-Aging',
  'Cognitive Performance',
  'Sleep Quality',
  'Injury Recovery',
  'Hormone Optimization',
  'Energy/Mitochondrial Health',
  'Skin/Hair',
  'Immune Support',
]

const BLOODWORK_MARKERS = [
  { key: 'fastingInsulin', label: 'Fasting Insulin', unit: 'μIU/mL', placeholder: '3.2' },
  { key: 'igf1', label: 'IGF-1', unit: 'ng/mL', placeholder: '220' },
  { key: 'crp', label: 'CRP/hs-CRP', unit: 'mg/L', placeholder: '0.8' },
  { key: 'testosteroneTotal', label: 'Testosterone Total', unit: 'ng/dL', placeholder: '650' },
  { key: 'freeTestosterone', label: 'Free Testosterone', unit: 'pg/mL', placeholder: '15.5' },
  { key: 'estradiol', label: 'Estradiol', unit: 'pg/mL', placeholder: '25' },
  { key: 'shbg', label: 'SHBG', unit: 'nmol/L', placeholder: '40' },
  { key: 'dheas', label: 'DHEA-S', unit: 'μg/dL', placeholder: '300' },
  { key: 'freeT3', label: 'Free T3', unit: 'pg/mL', placeholder: '3.4' },
  { key: 'freeT4', label: 'Free T4', unit: 'ng/dL', placeholder: '1.2' },
  { key: 'tsh', label: 'TSH', unit: 'mIU/L', placeholder: '1.5' },
  { key: 'fastingGlucose', label: 'Fasting Glucose', unit: 'mg/dL', placeholder: '92' },
  { key: 'hba1c', label: 'HbA1c', unit: '%', placeholder: '5.1' },
  { key: 'vitaminD', label: 'Vitamin D', unit: 'ng/mL', placeholder: '55' },
  { key: 'ferritin', label: 'Ferritin', unit: 'ng/mL', placeholder: '80' },
  { key: 'homocysteine', label: 'Homocysteine', unit: 'μmol/L', placeholder: '8' },
  { key: 'alt', label: 'ALT', unit: 'U/L', placeholder: '22' },
  { key: 'ast', label: 'AST', unit: 'U/L', placeholder: '20' },
  { key: 'gfr', label: 'GFR', unit: 'mL/min', placeholder: '90' },
  { key: 'totalCholesterol', label: 'Total Cholesterol', unit: 'mg/dL', placeholder: '190' },
  { key: 'ldl', label: 'LDL', unit: 'mg/dL', placeholder: '110' },
  { key: 'hdl', label: 'HDL', unit: 'mg/dL', placeholder: '55' },
  { key: 'triglycerides', label: 'Triglycerides', unit: 'mg/dL', placeholder: '100' },
  { key: 'cortisolAM', label: 'Cortisol AM', unit: 'μg/dL', placeholder: '15' },
  { key: 'progesterone', label: 'Progesterone', unit: 'ng/mL', placeholder: '1.0' },
  { key: 'prolactin', label: 'Prolactin', unit: 'ng/mL', placeholder: '10' },
]

const GOAL_MARKER_MAP: Record<string, string[]> = {
  'Fat Loss': ['fastingInsulin', 'fastingGlucose', 'hba1c', 'triglycerides', 'freeT3', 'tsh', 'cortisolAM', 'dheas'],
  'Muscle Growth': ['testosteroneTotal', 'freeTestosterone', 'igf1', 'shbg', 'dheas', 'estradiol'],
  'Gut Health': ['crp', 'homocysteine', 'ferritin', 'vitaminD', 'alt', 'ast'],
  'Anti-Inflammation': ['crp', 'homocysteine', 'ferritin', 'vitaminD', 'cortisolAM', 'fastingInsulin'],
  'Longevity/Anti-Aging': ['fastingInsulin', 'hba1c', 'crp', 'homocysteine', 'vitaminD', 'igf1', 'gfr', 'hdl', 'triglycerides'],
  'Cognitive Performance': ['homocysteine', 'vitaminD', 'freeT3', 'tsh', 'crp', 'cortisolAM', 'fastingGlucose'],
  'Sleep Quality': ['cortisolAM', 'tsh', 'freeT3', 'vitaminD', 'progesterone'],
  'Injury Recovery': ['crp', 'vitaminD', 'ferritin', 'igf1', 'testosteroneTotal'],
  'Hormone Optimization': ['testosteroneTotal', 'freeTestosterone', 'estradiol', 'shbg', 'dheas', 'progesterone', 'prolactin', 'tsh', 'freeT3', 'freeT4'],
  'Energy/Mitochondrial Health': ['ferritin', 'vitaminD', 'freeT3', 'tsh', 'fastingInsulin', 'hba1c', 'crp', 'cortisolAM'],
  'Skin/Hair': ['ferritin', 'vitaminD', 'freeT3', 'tsh', 'estradiol', 'dheas', 'testosteroneTotal'],
  'Immune Support': ['vitaminD', 'crp', 'ferritin', 'totalCholesterol', 'gfr'],
}

function getRecommendedMarkers(goals: string[]): string[] {
  const recommended = new Set<string>()
  goals.forEach(goal => {
    const markers = GOAL_MARKER_MAP[goal] || []
    markers.forEach(m => recommended.add(m))
  })
  return Array.from(recommended)
}

export default function ProtocolWizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState)
  const [showAllMarkers, setShowAllMarkers] = useState(false)

  const currentStepIndex = (['disclaimer', 'goals', 'priority', 'experience', 'lifestyle', 'profile', 'advanced', 'review', 'loading', 'results'] as const).indexOf(state.currentStep as any)

  // Determine if we should skip the priority step
  const shouldShowPriorityStep = state.formData.goals.length >= 3

  const getNextStep = (current: WizardStep): WizardStep => {
    const steps: WizardStep[] = ['disclaimer', 'goals', 'experience', 'lifestyle', 'profile', 'advanced', 'review', 'loading', 'results']
    if (shouldShowPriorityStep && current === 'goals') {
      return 'priority'
    }
    if (current === 'priority') {
      return 'experience'
    }
    const currentIdx = steps.indexOf(current)
    return steps[currentIdx + 1] || current
  }

  const getPrevStep = (current: WizardStep): WizardStep => {
    if (current === 'experience' && shouldShowPriorityStep) {
      return 'priority'
    }
    const steps: WizardStep[] = ['disclaimer', 'goals', 'priority', 'experience', 'lifestyle', 'profile', 'advanced', 'review', 'loading', 'results']
    const currentIdx = steps.indexOf(current)
    return steps[currentIdx - 1] || current
  }

  const handleGoalToggle = (goal: string) => {
    const updated = state.formData.goals.includes(goal)
      ? state.formData.goals.filter(g => g !== goal)
      : [...state.formData.goals, goal]
    dispatch({ type: 'UPDATE_FORM', payload: { goals: updated } })
  }

  const handlePriorityToggle = (priority: string) => {
    const updated = state.formData.topPriorities.includes(priority)
      ? state.formData.topPriorities.filter(p => p !== priority)
      : [...state.formData.topPriorities, priority]
    const limited = updated.slice(0, 2)
    dispatch({ type: 'UPDATE_FORM', payload: { topPriorities: limited } })
  }

  const handleRouteToggle = (route: string) => {
    const updated = state.formData.preferredRoutes.includes(route)
      ? state.formData.preferredRoutes.filter(r => r !== route)
      : [...state.formData.preferredRoutes, route]
    dispatch({ type: 'UPDATE_FORM', payload: { preferredRoutes: updated } })
  }

  const handleGenerateProtocol = async () => {
    dispatch({ type: 'SET_STEP', payload: 'loading' })
    dispatch({ type: 'SET_ERROR', payload: '' })
    try {
      const response = await fetch('/api/generate-protocol', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.formData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate protocol')
      }
      dispatch({ type: 'SET_PROTOCOL', payload: data })
      dispatch({ type: 'SET_STEP', payload: 'results' })
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate protocol'
      dispatch({ type: 'SET_ERROR', payload: msg })
      dispatch({ type: 'SET_STEP', payload: 'review' })
    }
  }

  const handleDownloadPDF = async () => {
    if (!state.protocol) return
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state.protocol),
      })
      if (!response.ok) throw new Error('Failed to generate PDF')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'my-peptide-protocol.pdf'
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to download PDF. Please try again.' })
    }
  }

  const handleReset = () => {
    dispatch({ type: 'RESET' })
  }

  const handleStepChange = (step: WizardStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const handleNext = () => {
    const next = getNextStep(state.currentStep)
    handleStepChange(next)
  }

  const handlePrev = () => {
    const prev = getPrevStep(state.currentStep)
    handleStepChange(prev)
  }

  const canProceed = (): boolean => {
    switch (state.currentStep) {
      case 'disclaimer':
        return state.disclaimerAccepted
      case 'goals':
        return state.formData.goals.length > 0
      case 'priority':
        return state.formData.topPriorities.length > 0
      case 'experience':
        return state.formData.peptideExperience !== ''
      case 'lifestyle':
        return true
      case 'profile':
        return true
      case 'advanced':
        return true
      case 'review':
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 via-white to-sand-50 py-12 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Progress Bar */}
        {state.currentStep !== 'loading' && state.currentStep !== 'results' && (
          <div className="mb-12">
            <div className="h-1 w-full bg-sage-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sage-600 to-sage-500 transition-all duration-300"
                style={{
                  width: `${((currentStepIndex) / 8) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Error Message */}
        {state.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 animate-fade-in-up">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700">{state.error}</p>
          </div>
        )}

        {/* Step 1: Disclaimer */}
        {state.currentStep === 'disclaimer' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-6">Important Disclaimer</h1>
            <div className="card bg-white p-8 mb-8">
              <p className="text-body text-gray-700 mb-4">
                This protocol wizard is designed to provide personalized peptide recommendations based on your health profile, goals, and experience level. However, <strong>these recommendations are not medical advice</strong>.
              </p>
              <p className="text-body text-gray-700 mb-4">
                Peptides are research compounds that may carry risks. Before using any peptide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-body text-gray-700 mb-4">
                <li>Consult with a qualified healthcare provider</li>
                <li>Verify the legal status in your jurisdiction</li>
                <li>Research potential side effects and interactions</li>
                <li>Source products only from reputable suppliers</li>
                <li>Do not use if pregnant, nursing, or under 18</li>
              </ul>
              <p className="text-body text-gray-700 mb-6">
                By proceeding, you acknowledge that you understand these risks and take full responsibility for your health decisions.
              </p>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.disclaimerAccepted}
                  onChange={(e) => dispatch({ type: 'SET_DISCLAIMER_ACCEPTED', payload: e.target.checked })}
                  className="w-5 h-5 mt-1 text-sage-600"
                />
                <span className="text-body text-gray-700">
                  I understand the risks and take full responsibility for my health decisions. I will consult with a healthcare provider before using any peptides.
                </span>
              </label>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                I Agree, Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Goals */}
        {state.currentStep === 'goals' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">What are your health goals?</h1>
            <p className="text-body text-gray-600 mb-8">Select all that apply. You can prioritize them next.</p>

            <div className="card bg-white p-8 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GOAL_OPTIONS.map(goal => (
                  <button
                    key={goal}
                    onClick={() => handleGoalToggle(goal)}
                    className={`px-4 py-3 rounded-full font-sans font-medium transition-all text-sm ${
                      state.formData.goals.includes(goal)
                        ? 'bg-sage-600 text-white shadow-md'
                        : 'bg-sage-50 text-sage-700 border border-sage-200 hover:border-sage-400'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
              {state.formData.goals.length === 0 && (
                <p className="text-body text-gray-500 text-center mt-6">Please select at least one goal</p>
              )}
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Priority Ranking */}
        {state.currentStep === 'priority' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">What are your top priorities?</h1>
            <p className="text-body text-gray-600 mb-8">Select your top 1-2 goals. We'll tailor recommendations accordingly.</p>

            <div className="card bg-white p-8 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {state.formData.goals.map((goal, idx) => (
                  <button
                    key={goal}
                    onClick={() => handlePriorityToggle(goal)}
                    className={`px-4 py-3 rounded-full font-sans font-medium transition-all text-sm flex items-center gap-2 ${
                      state.formData.topPriorities.includes(goal)
                        ? 'bg-sage-600 text-white shadow-md'
                        : 'bg-sage-50 text-sage-700 border border-sage-200 hover:border-sage-400'
                    }`}
                  >
                    {state.formData.topPriorities.includes(goal) && (
                      <span className="font-bold">
                        {state.formData.topPriorities.indexOf(goal) + 1}.
                      </span>
                    )}
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Experience & Preferences */}
        {state.currentStep === 'experience' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">Experience & Preferences</h1>
            <p className="text-body text-gray-600 mb-8">Tell us about your peptide background and preferences.</p>

            <div className="space-y-8">
              {/* Peptide Experience */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-6">Peptide Experience Level</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { value: 'never', label: 'Never Used', desc: "I'm completely new to peptides", icon: Sparkles },
                    { value: 'some', label: 'Some Experience', desc: "I've tried 1-2 peptides before", icon: Beaker },
                    { value: 'experienced', label: 'Experienced', desc: "I've run multiple protocols", icon: FlaskConical },
                    { value: 'advanced', label: 'Advanced', desc: "I'm very knowledgeable about peptides", icon: Microscope },
                  ].map(({ value, label, desc, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => dispatch({ type: 'UPDATE_FORM', payload: { peptideExperience: value as any } })}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        state.formData.peptideExperience === value
                          ? 'border-sage-600 bg-sage-50'
                          : 'border-sage-200 hover:border-sage-400 bg-white'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-5 h-5 text-sage-600 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-sans font-semibold text-gray-900">{label}</p>
                          <p className="text-sm text-gray-600 mt-1">{desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Routes */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-6">Preferred Administration Routes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Oral', 'Subcutaneous Injection', 'Nasal Spray', 'Topical/Cream', 'No Preference'].map(route => (
                    <button
                      key={route}
                      onClick={() => handleRouteToggle(route)}
                      className={`px-4 py-3 rounded-full font-sans font-medium transition-all text-sm ${
                        state.formData.preferredRoutes.includes(route)
                          ? 'bg-sage-600 text-white shadow-md'
                          : 'bg-sage-50 text-sage-700 border border-sage-200 hover:border-sage-400'
                      }`}
                    >
                      {route}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Commitment */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-6">Time Commitment</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { value: 'minimal', label: 'Minimal', desc: '1-2 compounds, simple schedule' },
                    { value: 'moderate', label: 'Moderate', desc: '3-5 compounds, structured protocol' },
                    { value: 'comprehensive', label: 'Comprehensive', desc: 'Full stack, optimized timing' },
                  ].map(({ value, label, desc }) => (
                    <button
                      key={value}
                      onClick={() => dispatch({ type: 'UPDATE_FORM', payload: { timeCommitment: value as any } })}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        state.formData.timeCommitment === value
                          ? 'border-sage-600 bg-sage-50'
                          : 'border-sage-200 hover:border-sage-400 bg-white'
                      }`}
                    >
                      <p className="font-sans font-semibold text-gray-900">{label}</p>
                      <p className="text-sm text-gray-600 mt-2">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Previous Peptides */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-4">Previous Peptide Experience</h2>
                <p className="text-body text-gray-600 mb-4">Optional. List any peptides you've used before and your experience with them.</p>
                <textarea
                  value={state.formData.previousPeptides}
                  onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { previousPeptides: e.target.value } })}
                  placeholder="e.g., BPC-157 (good recovery), Ipamorelin (minor appetite increase)"
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 resize-none"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Lifestyle */}
        {state.currentStep === 'lifestyle' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">Lifestyle & Current Status</h1>
            <p className="text-body text-gray-600 mb-8">This helps us tailor recommendations to your current state.</p>

            <div className="space-y-8">
              {/* Sleep Quality */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-6">How would you rate your sleep?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Poor', 'Fair', 'Good', 'Excellent'].map(quality => (
                    <button
                      key={quality}
                      onClick={() => dispatch({ type: 'UPDATE_FORM', payload: { sleepQuality: quality.toLowerCase() as any } })}
                      className={`px-4 py-3 rounded-lg font-sans font-medium transition-all text-sm ${
                        state.formData.sleepQuality === quality.toLowerCase()
                          ? 'bg-sage-600 text-white shadow-md'
                          : 'bg-sage-50 text-sage-700 border border-sage-200 hover:border-sage-400'
                      }`}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Level */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-6">Current stress level?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Low', 'Moderate', 'High', 'Very High'].map(level => (
                    <button
                      key={level}
                      onClick={() => {
                        const value = level === 'Very High' ? 'very-high' : level.toLowerCase()
                        dispatch({ type: 'UPDATE_FORM', payload: { stressLevel: value as any } })
                      }}
                      className={`px-4 py-3 rounded-lg font-sans font-medium transition-all text-sm ${
                        state.formData.stressLevel === (level === 'Very High' ? 'very-high' : level.toLowerCase())
                          ? 'bg-sage-600 text-white shadow-md'
                          : 'bg-sage-50 text-sage-700 border border-sage-200 hover:border-sage-400'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Diet Type */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-6">Diet approach?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { value: 'standard', label: 'Standard' },
                    { value: 'keto', label: 'Keto/Low-Carb' },
                    { value: 'carnivore', label: 'Carnivore' },
                    { value: 'plant-based', label: 'Plant-Based' },
                    { value: 'mediterranean', label: 'Mediterranean' },
                    { value: 'intermittent-fasting', label: 'Intermittent Fasting' },
                    { value: 'other', label: 'Other' },
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => dispatch({ type: 'UPDATE_FORM', payload: { dietType: value as any } })}
                      className={`px-4 py-3 rounded-lg font-sans font-medium transition-all text-sm ${
                        state.formData.dietType === value
                          ? 'bg-sage-600 text-white shadow-md'
                          : 'bg-sage-50 text-sage-700 border border-sage-200 hover:border-sage-400'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleNext}
                className="btn-primary flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Basic Profile */}
        {state.currentStep === 'profile' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">Basic Profile</h1>
            <p className="text-body text-gray-600 mb-8">Optional. This helps us give you more personalized recommendations.</p>

            <div className="card bg-white p-8 mb-8">
              <div className="space-y-6">
                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Age</label>
                  <input
                    type="number"
                    value={state.formData.age || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { age: e.target.value ? parseInt(e.target.value) : undefined } })}
                    placeholder="e.g., 35"
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                  />
                </div>

                {/* Sex */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Biological Sex</label>
                  <select
                    value={state.formData.biologicalSex || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { biologicalSex: e.target.value || undefined } })}
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                  >
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Weight</label>
                    <input
                      type="number"
                      value={state.formData.weight || ''}
                      onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { weight: e.target.value ? parseFloat(e.target.value) : undefined } })}
                      placeholder="e.g., 180"
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Unit</label>
                    <select
                      value={state.formData.weightUnit}
                      onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { weightUnit: e.target.value as any } })}
                      className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Activity Level</label>
                  <select
                    value={state.formData.activityLevel || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { activityLevel: e.target.value || undefined } })}
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                  >
                    <option value="">Select...</option>
                    <option value="sedentary">Sedentary</option>
                    <option value="lightly-active">Lightly Active</option>
                    <option value="moderately-active">Moderately Active</option>
                    <option value="very-active">Very Active</option>
                    <option value="extremely-active">Extremely Active</option>
                  </select>
                </div>

                {/* Conditions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Health Conditions</label>
                  <p className="text-body text-gray-600 mb-3">Optional. List any relevant conditions (e.g., diabetes, autoimmune disorders).</p>
                  <textarea
                    value={state.formData.conditions || ''}
                    onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { conditions: e.target.value || undefined } })}
                    placeholder="e.g., Type 2 Diabetes, GERD"
                    className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 resize-none"
                    rows={4}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex gap-4">
                <button
                  onClick={handleNext}
                  className="btn-secondary"
                >
                  Skip This Step
                </button>
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Advanced Health Data */}
        {state.currentStep === 'advanced' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">Advanced Health Data</h1>
            <p className="text-body text-gray-600 mb-8">Optional. Bloodwork markers help us fine-tune recommendations.</p>

            <div className="space-y-8">
              {/* Recommended Markers */}
              {getRecommendedMarkers(state.formData.goals).length > 0 && (
                <div className="card bg-white p-8 border-l-4 border-sage-600">
                  <h2 className="heading-section mb-6">Recommended for your goals</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BLOODWORK_MARKERS.filter(m => getRecommendedMarkers(state.formData.goals).includes(m.key)).map(marker => (
                      <div key={marker.key}>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                          {marker.label} <span className="text-gray-500">({marker.unit})</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={state.formData.bloodwork[marker.key] || ''}
                          onChange={(e) => dispatch({
                            type: 'UPDATE_FORM',
                            payload: {
                              bloodwork: {
                                ...state.formData.bloodwork,
                                [marker.key]: e.target.value ? parseFloat(e.target.value) : undefined,
                              },
                            },
                          })}
                          placeholder={marker.placeholder}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg font-sans text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Markers - Collapsible */}
              <div className="card bg-white p-8">
                <button
                  onClick={() => setShowAllMarkers(!showAllMarkers)}
                  className="flex items-center gap-2 text-sage-600 hover:text-sage-700 font-semibold mb-6"
                >
                  {showAllMarkers ? '▼' : '▶'} Show all markers
                </button>

                {showAllMarkers && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {BLOODWORK_MARKERS.map(marker => (
                      <div key={marker.key}>
                        <label className="block text-sm font-semibold text-gray-900 mb-1">
                          {marker.label} <span className="text-gray-500">({marker.unit})</span>
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={state.formData.bloodwork[marker.key] || ''}
                          onChange={(e) => dispatch({
                            type: 'UPDATE_FORM',
                            payload: {
                              bloodwork: {
                                ...state.formData.bloodwork,
                                [marker.key]: e.target.value ? parseFloat(e.target.value) : undefined,
                              },
                            },
                          })}
                          placeholder={marker.placeholder}
                          className="w-full px-3 py-2 border border-sage-200 rounded-lg font-sans text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Supplements */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-4">Current Supplements</h2>
                <p className="text-body text-gray-600 mb-4">Optional. List any supplements you're taking.</p>
                <textarea
                  value={state.formData.supplements || ''}
                  onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { supplements: e.target.value || undefined } })}
                  placeholder="e.g., Vitamin D (4000 IU), Omega-3 (2g), Creatine (5g)"
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 resize-none"
                  rows={4}
                />
              </div>

              {/* Genetic Variants */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-4">Known Genetic Variants</h2>
                <p className="text-body text-gray-600 mb-4">Optional. If you've done genetic testing (23andMe, etc.).</p>
                <textarea
                  value={state.formData.geneticVariants || ''}
                  onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { geneticVariants: e.target.value || undefined } })}
                  placeholder="e.g., MTHFR C677T, ApoE4"
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 resize-none"
                  rows={4}
                />
              </div>

              {/* Health History */}
              <div className="card bg-white p-8">
                <h2 className="heading-section mb-4">Health History</h2>
                <p className="text-body text-gray-600 mb-4">Optional. Any relevant medical history or family history.</p>
                <textarea
                  value={state.formData.healthHistory || ''}
                  onChange={(e) => dispatch({ type: 'UPDATE_FORM', payload: { healthHistory: e.target.value || undefined } })}
                  placeholder="e.g., Family history of heart disease, Previous thyroid issues"
                  className="w-full px-4 py-3 border border-sage-200 rounded-lg font-sans text-gray-700 placeholder-gray-400 focus:outline-none focus:border-sage-600 focus:ring-1 focus:ring-sage-600 resize-none"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <div className="flex gap-4">
                <button
                  onClick={handleNext}
                  className="btn-secondary"
                >
                  Skip This Step
                </button>
                <button
                  onClick={handleNext}
                  className="btn-primary flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Review & Generate */}
        {state.currentStep === 'review' && (
          <div className="animate-fade-in-up">
            <h1 className="font-display text-4xl text-sage-900 mb-2">Ready to Generate</h1>
            <p className="text-body text-gray-600 mb-8">Here&apos;s a summary of what you&apos;ve told us. Hit generate when you&apos;re ready!</p>

            <div className="space-y-8">
              {/* Summary */}
              <div className="card bg-white p-8 space-y-4 text-body text-gray-700">
                <div>
                  <p className="font-semibold text-warm-900">Goals:</p>
                  <p>{state.formData.goals.join(', ')}</p>
                </div>
                {state.formData.topPriorities.length > 0 && (
                  <div>
                    <p className="font-semibold text-warm-900">Top Priorities:</p>
                    <p>{state.formData.topPriorities.join(', ')}</p>
                  </div>
                )}
                {state.formData.peptideExperience && (
                  <div>
                    <p className="font-semibold text-warm-900">Experience:</p>
                    <p>{state.formData.peptideExperience}</p>
                  </div>
                )}
                {state.formData.preferredRoutes.length > 0 && (
                  <div>
                    <p className="font-semibold text-warm-900">Preferred Routes:</p>
                    <p>{state.formData.preferredRoutes.join(', ')}</p>
                  </div>
                )}
                {state.formData.timeCommitment && (
                  <div>
                    <p className="font-semibold text-warm-900">Time Commitment:</p>
                    <p>{state.formData.timeCommitment}</p>
                  </div>
                )}
                {(state.formData.sleepQuality || state.formData.stressLevel || state.formData.dietType) && (
                  <div>
                    <p className="font-semibold text-warm-900">Lifestyle:</p>
                    <p>
                      {[
                        state.formData.sleepQuality && `Sleep: ${state.formData.sleepQuality}`,
                        state.formData.stressLevel && `Stress: ${state.formData.stressLevel}`,
                        state.formData.dietType && `Diet: ${state.formData.dietType}`,
                      ].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                )}
                {(state.formData.age || state.formData.biologicalSex || state.formData.weight) && (
                  <div>
                    <p className="font-semibold text-warm-900">Profile:</p>
                    <p>
                      {[
                        state.formData.age && `Age ${state.formData.age}`,
                        state.formData.biologicalSex,
                        state.formData.weight && `${state.formData.weight} ${state.formData.weightUnit}`,
                        state.formData.activityLevel,
                      ].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                )}
                {Object.values(state.formData.bloodwork).some(v => v !== undefined) && (
                  <div>
                    <p className="font-semibold text-warm-900">Bloodwork:</p>
                    <p>{Object.entries(state.formData.bloodwork).filter(([,v]) => v !== undefined).length} markers provided</p>
                  </div>
                )}
              </div>

              {/* Privacy Note */}
              <div className="bg-sage-50 border border-sage-200 rounded-lg p-6 flex gap-4">
                <CheckCircle className="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" />
                <p className="text-body text-gray-700">
                  <strong>Privacy:</strong> Your data is processed in real-time and never stored. All information is used solely to generate your protocol.
                </p>
              </div>

              {state.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700 text-body">
                  {state.error}
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between gap-4">
              <button
                onClick={handlePrev}
                className="btn-secondary flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={handleGenerateProtocol}
                className="btn-primary text-lg px-10 py-4 flex items-center gap-2"
              >
                Generate My Protocol
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 9: Loading */}
        {state.currentStep === 'loading' && (
          <div className="animate-fade-in-up text-center py-16">
            <h1 className="font-display text-4xl text-sage-900 mb-6">Generating Your Protocol</h1>
            <p className="text-body text-gray-600 mb-12">Please wait while we analyze your data...</p>

            <div className="flex justify-center gap-2 mb-12">
              <div className="w-3 h-3 bg-sage-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-3 h-3 bg-sage-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-3 h-3 bg-sage-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>

            <div className="max-w-md mx-auto space-y-3 text-left">
              {['Analyzing your goals', 'Evaluating experience level', 'Selecting compounds', 'Building schedule', 'Compiling protocol'].map((step, idx) => (
                <div key={step} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-sage-600" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 10: Results */}
        {state.currentStep === 'results' && state.protocol && (
          <div className="animate-fade-in-up">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-4">
                <CheckCircle className="w-8 h-8 text-sage-600" />
              </div>
              <h1 className="font-display text-4xl text-sage-900 mb-2">Your Protocol is Ready</h1>
            </div>

            <div className="card bg-white p-8 mb-8">
              <h2 className="font-display text-2xl text-sage-900 mb-2">{state.protocol.title}</h2>
              <p className="text-body text-gray-600 mb-6">{state.protocol.summary}</p>

              {state.protocol.sections.map((section, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <h3 className="heading-section mb-4 border-b border-warm-200 pb-2">{section.heading}</h3>
                  {section.content && (
                    <div className="text-body text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: section.content }} />
                  )}
                  {section.subsections && (
                    <div className="space-y-4">
                      {section.subsections.map((sub, subIdx) => (
                        <div key={subIdx} className="bg-sage-50 border-l-4 border-sage-400 p-5 rounded-r-lg">
                          <h4 className="font-semibold text-warm-900 mb-2">{sub.title}</h4>
                          <div className="text-sm text-warm-800 space-y-1" dangerouslySetInnerHTML={{ __html: sub.content }} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="bg-sand-50 border border-sand-200 rounded-lg p-6 mt-8">
                <p className="font-semibold text-warm-900 mb-1">Important Disclaimer</p>
                <p className="text-sm text-warm-700">{state.protocol.disclaimer}</p>
              </div>
            </div>

            {/* Primary Action: Download */}
            <div className="flex flex-col gap-4 mb-8">
              <button
                onClick={handleDownloadPDF}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
              >
                <Download className="w-5 h-5" />
                Download Protocol
              </button>
            </div>

            {/* Newsletter opt-in — shown after protocol */}
            <div className="card bg-white p-6 mb-8">
              <h3 className="font-semibold text-warm-900 mb-1">
                Get notified when we release new protocols
              </h3>
              <p className="text-sm text-warm-800/60 mb-4">
                We publish new evidence-based protocols and research breakdowns regularly.
              </p>
              <NewsletterSignup source="protocol-wizard" />
            </div>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
