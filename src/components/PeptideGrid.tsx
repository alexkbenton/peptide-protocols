'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Peptide, getCategories } from '@/data/peptides'

interface PeptideGridProps {
  peptides: Peptide[]
}

const evidenceLevelConfig = {
  approved: { color: 'bg-green-100 text-green-700', label: 'Approved' },
  emerging: { color: 'bg-blue-100 text-blue-700', label: 'Emerging' },
  preclinical: { color: 'bg-amber-100 text-amber-700', label: 'Preclinical' },
  'early-research': { color: 'bg-gray-100 text-gray-700', label: 'Early Research' },
}

export default function PeptideGrid({ peptides }: PeptideGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const categories = getCategories()

  const filteredPeptides = useMemo(() => {
    return peptides.filter((peptide) => {
      // Category filter
      if (selectedCategory !== 'All' && peptide.category !== selectedCategory) {
        return false
      }

      // Search filter (name, aliases, summary)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = peptide.name.toLowerCase().includes(query)
        const matchesAlias = peptide.aliases.some((alias) =>
          alias.toLowerCase().includes(query)
        )
        const matchesSummary = peptide.summary.toLowerCase().includes(query)

        return matchesName || matchesAlias || matchesSummary
      }

      return true
    })
  }, [peptides, selectedCategory, searchQuery])

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="space-y-6">
        {/* Category Filters */}
        <div>
          <p className="mb-4 text-sm font-semibold text-warm-800 uppercase tracking-wide">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedCategory === 'All'
                  ? 'bg-sage-600 text-white shadow-md'
                  : 'bg-warm-100 text-warm-800 hover:bg-warm-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-sage-600 text-white shadow-md'
                    : 'bg-warm-100 text-warm-800 hover:bg-warm-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div>
          <p className="mb-4 text-sm font-semibold text-warm-800 uppercase tracking-wide">
            Search
          </p>
          <input
            type="text"
            placeholder="Search by name, alias, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-sm placeholder-warm-600/50 transition-all focus:border-sage-500 focus:outline-none focus:ring-2 focus:ring-sage-200"
          />
        </div>

        {/* Result Count */}
        <div className="text-sm text-warm-800/60">
          Showing {filteredPeptides.length} of {peptides.length} peptides
        </div>
      </div>

      {/* Peptide Grid */}
      {filteredPeptides.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-warm-800/50">
            No peptides found matching your search. Try adjusting your filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPeptides.map((peptide, index) => (
            <Link
              key={peptide.slug}
              href={`/peptides/${peptide.slug}`}
              className="group animate-fade-in-up"
              style={{
                animationDelay: `${Math.min(index * 0.05, 0.3)}s`,
              }}
            >
              <div className="h-full rounded-2xl border border-warm-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sage-200 sm:p-8">
                {/* Header: Category Badge + Evidence Level */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${peptide.categoryColor}`}>
                    {peptide.category}
                  </span>
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${
                      evidenceLevelConfig[peptide.evidenceLevel].color
                    }`}
                  >
                    {evidenceLevelConfig[peptide.evidenceLevel].label}
                  </span>
                </div>

                {/* Peptide Name */}
                <h3 className="font-display text-xl font-medium text-warm-900 transition-colors group-hover:text-sage-600">
                  {peptide.name}
                </h3>

                {/* Summary */}
                <p className="mt-3 text-sm leading-relaxed text-warm-800/60 line-clamp-3">
                  {peptide.summary}
                </p>

                {/* Key Benefits */}
                {peptide.benefits.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {peptide.benefits.slice(0, 3).map((benefit) => (
                      <span
                        key={benefit}
                        className="rounded-full bg-warm-100 px-2.5 py-1 text-xs font-medium text-warm-700"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                )}

                {/* Routes */}
                {peptide.routes.length > 0 && (
                  <div className="mt-4 text-xs text-warm-700/70">
                    <span className="font-medium">Routes:</span> {peptide.routes.join(', ')}
                  </div>
                )}

                {/* Learn More Link */}
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-sage-600 transition-all group-hover:gap-2">
                  Learn more
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
