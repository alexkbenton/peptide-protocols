import { NextRequest, NextResponse } from 'next/server'
interface GeneratedProtocol {
  title: string
  overview: string
  compounds: Array<{
    name: string
    purpose: string
    dose: string
    route: string
    frequency: string
    timing: string
    cycle: string
    evidenceLevel: string
    notes: string
  }>
  weeklySchedule: string
  cyclingProtocol: string
  importantWarnings: string[]
  synergies: string
  monitoring: string
  disclaimer: string
}

/**
 * Generate a print-optimized HTML version of the protocol
 */
function generateHTMLProtocol(protocol: any): string {
  const generatedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const compoundsTableHTML = protocol.compounds
    .map(
      (c: any) => `
    <tr>
      <td class="table-cell"><strong>${c.name}</strong></td>
      <td class="table-cell">${c.dose}</td>
      <td class="table-cell">${c.route}</td>
      <td class="table-cell">${c.frequency}</td>
      <td class="table-cell">${c.cycle}</td>
      <td class="table-cell">${c.evidenceLevel}</td>
    </tr>
  `,
    )
    .join('')

  const warningsHTML = protocol.importantWarnings
    .map((w: string) => `<li>${escapeHtml(w)}</li>`)
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(protocol.title)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: white;
      padding: 0;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px;
      background: white;
    }

    header {
      border-bottom: 3px solid #47684b;
      padding-bottom: 30px;
      margin-bottom: 40px;
    }

    header h1 {
      font-size: 2.5em;
      color: #47684b;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .generated-date {
      font-size: 0.9em;
      color: #666;
      font-style: italic;
    }

    section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }

    h2 {
      font-size: 1.8em;
      color: #47684b;
      margin-bottom: 15px;
      margin-top: 30px;
      border-left: 4px solid #5c8160;
      padding-left: 15px;
    }

    h3 {
      font-size: 1.2em;
      color: #5c8160;
      margin-bottom: 10px;
      margin-top: 15px;
    }

    p {
      margin-bottom: 15px;
      text-align: justify;
    }

    .overview {
      background: #faf8f5;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #5c8160;
      margin-bottom: 30px;
    }

    .overview p {
      margin-bottom: 10px;
    }

    .overview p:last-child {
      margin-bottom: 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: white;
      border: 1px solid #ddd;
    }

    table thead {
      background: #47684b;
      color: white;
    }

    table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 0.95em;
    }

    .table-cell {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
      font-size: 0.9em;
    }

    table tbody tr:nth-child(even) {
      background: #faf8f5;
    }

    table tbody tr:hover {
      background: #f0ebe3;
    }

    .warnings {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 6px;
      padding: 20px;
      margin: 20px 0;
    }

    .warnings h3 {
      color: #856404;
      margin-top: 0;
    }

    .warnings ul {
      margin-left: 20px;
    }

    .warnings li {
      margin-bottom: 8px;
      color: #333;
    }

    .disclaimer {
      background: #e2e3e5;
      padding: 20px;
      border-radius: 6px;
      margin-top: 40px;
      border-left: 4px solid #6c757d;
      font-size: 0.9em;
      color: #333;
      line-height: 1.5;
    }

    .compound-detail {
      background: #faf8f5;
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      border-left: 3px solid #5c8160;
    }

    .compound-detail strong {
      color: #47684b;
    }

    .compound-detail p {
      margin-bottom: 5px;
    }

    .schedule-block {
      background: white;
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }

    ul, ol {
      margin-left: 20px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 8px;
    }

    .page-break {
      page-break-after: always;
    }

    @media print {
      body {
        padding: 0;
      }

      .container {
        padding: 20px;
        max-width: 100%;
      }

      section {
        page-break-inside: avoid;
      }

      h2 {
        page-break-after: avoid;
      }

      table {
        page-break-inside: avoid;
      }

      .warnings {
        page-break-inside: avoid;
      }

      .overview {
        page-break-inside: avoid;
      }
    }

    @media screen and (max-width: 768px) {
      .container {
        padding: 20px;
      }

      header h1 {
        font-size: 1.8em;
      }

      h2 {
        font-size: 1.4em;
      }

      table {
        font-size: 0.85em;
      }

      .table-cell {
        padding: 8px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header>
      <h1>${escapeHtml(protocol.title)}</h1>
      <p class="generated-date">Generated on ${generatedDate}</p>
    </header>

    <!-- Overview Section -->
    <section>
      <div class="overview">
        <h2 style="margin-top: 0;">Protocol Overview</h2>
        <p>${escapeHtml(protocol.overview).replace(/\n\n/g, '</p><p>')}</p>
      </div>
    </section>

    <!-- Compounds Section -->
    <section>
      <h2>Compound Protocol</h2>
      <table>
        <thead>
          <tr>
            <th>Compound</th>
            <th>Dosage</th>
            <th>Route</th>
            <th>Frequency</th>
            <th>Cycle</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          ${compoundsTableHTML}
        </tbody>
      </table>

      <h3>Detailed Compound Information</h3>
      ${protocol.compounds
        .map(
          (c: any) => `
        <div class="compound-detail">
          <p><strong>${escapeHtml(c.name)}</strong></p>
          <p><strong>Purpose:</strong> ${escapeHtml(c.purpose)}</p>
          <p><strong>Dose:</strong> ${escapeHtml(c.dose)}</p>
          <p><strong>Route:</strong> ${escapeHtml(c.route)}</p>
          <p><strong>Frequency:</strong> ${escapeHtml(c.frequency)}</p>
          <p><strong>Timing:</strong> ${escapeHtml(c.timing)}</p>
          <p><strong>Cycle:</strong> ${escapeHtml(c.cycle)}</p>
          <p><strong>Evidence Level:</strong> ${escapeHtml(c.evidenceLevel)}</p>
          <p><strong>Notes:</strong> ${escapeHtml(c.notes)}</p>
        </div>
      `,
        )
        .join('')}
    </section>

    <!-- Weekly Schedule -->
    <section>
      <h2>Weekly Administration Schedule</h2>
      <div class="schedule-block">
        ${escapeHtml(protocol.weeklySchedule).replace(/\n/g, '<br>')}
      </div>
    </section>

    <!-- Cycling Protocol -->
    <section>
      <h2>Cycling & Long-Term Management</h2>
      <div class="schedule-block">
        ${escapeHtml(protocol.cyclingProtocol).replace(/\n/g, '<br>')}
      </div>
    </section>

    <!-- Synergies -->
    <section>
      <h2>Compound Synergies</h2>
      <p>${escapeHtml(protocol.synergies).replace(/\n\n/g, '</p><p>')}</p>
    </section>

    <!-- Monitoring -->
    <section>
      <h2>Health Monitoring</h2>
      <p>${escapeHtml(protocol.monitoring).replace(/\n\n/g, '</p><p>')}</p>
    </section>

    <!-- Warnings -->
    ${
      protocol.importantWarnings && protocol.importantWarnings.length > 0
        ? `
    <section>
      <div class="warnings">
        <h3>Important Warnings & Contraindications</h3>
        <ul>
          ${warningsHTML}
        </ul>
      </div>
    </section>
    `
        : ''
    }

    <!-- Disclaimer -->
    <section>
      <div class="disclaimer">
        <h3 style="margin-top: 0;">Disclaimer</h3>
        <p>${escapeHtml(protocol.disclaimer).replace(/\n\n/g, '</p><p>')}</p>
        <p style="margin-top: 20px; font-size: 0.85em; font-style: italic;">
          This protocol is provided for educational purposes only and does not constitute medical advice.
          All peptides mentioned are research chemicals or off-label uses. Always consult with a qualified
          healthcare provider before beginning any peptide protocol. This information is subject to change
          as new research becomes available.
        </p>
      </div>
    </section>
  </div>
</body>
</html>`
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

/**
 * POST handler for PDF generation
 */
export async function POST(req: NextRequest) {
  try {
    const protocol = await req.json()

    // Validate protocol data
    if (!protocol.title || !protocol.compounds) {
      return NextResponse.json(
        { error: 'Invalid protocol data provided.' },
        { status: 400 },
      )
    }

    // Generate HTML
    const html = generateHTMLProtocol(protocol)

    // Return HTML as a downloadable file
    // Client can save this as HTML or print to PDF
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Disposition': `attachment; filename="peptide-protocol-${Date.now()}.html"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('PDF generation error:', error)

    return NextResponse.json(
      { error: 'Failed to generate PDF. Please try again.' },
      { status: 500 },
    )
  }
}
