// Shared styling components for protocol content pages

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-display text-2xl font-medium text-warm-900">{title}</h2>
      {children}
    </section>
  )
}

export function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 font-display text-xl font-medium text-warm-900">{title}</h3>
      {children}
    </div>
  )
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-base leading-relaxed text-warm-800/80 sm:text-lg">{children}</p>
}

export function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-warm-900">{children}</strong>
}

export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-red-200 bg-red-50 p-5">
      <p className="text-sm font-medium leading-relaxed text-red-900/80">{children}</p>
    </div>
  )
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 rounded-xl border border-sage-200 bg-sage-50 p-5">
      <p className="text-sm leading-relaxed text-sage-900/80">{children}</p>
    </div>
  )
}

export function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mb-6 space-y-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-warm-800/80">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function DosingTable({ rows }: { rows: { compound: string; dose: string; frequency: string; cycle: string; notes?: string }[] }) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-warm-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-warm-200 bg-warm-50">
            <th className="px-4 py-3 text-left font-semibold text-warm-900">Peptide</th>
            <th className="px-4 py-3 text-left font-semibold text-warm-900">Dosage</th>
            <th className="px-4 py-3 text-left font-semibold text-warm-900">Frequency</th>
            <th className="px-4 py-3 text-left font-semibold text-warm-900">Cycle</th>
            {rows.some(r => r.notes) && (
              <th className="px-4 py-3 text-left font-semibold text-warm-900">Notes</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-warm-50/50'}>
              <td className="px-4 py-3 font-medium text-warm-900">{row.compound}</td>
              <td className="px-4 py-3 text-warm-800/80">{row.dose}</td>
              <td className="px-4 py-3 text-warm-800/80">{row.frequency}</td>
              <td className="px-4 py-3 text-warm-800/80">{row.cycle}</td>
              {rows.some(r => r.notes) && (
                <td className="px-4 py-3 text-warm-800/70 text-xs">{row.notes || '—'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function OptionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-warm-200 bg-warm-50/50 p-6">
      <h4 className="mb-3 font-display text-lg font-medium text-warm-900">{title}</h4>
      {children}
    </div>
  )
}
