import { NextRequest, NextResponse } from 'next/server'

/**
 * Generate a print-optimized HTML version of the protocol
 * Accepts the ProtocolResult format from the wizard:
 * { title, summary, sections: [{ heading, content, subsections? }], disclaimer }
 */
function generateHTMLProtocol(protocol: any): string {
  const generatedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Build sections HTML
  const sectionsHTML = (protocol.sections || [])
    .map((section: any) => {
      let html = `
    <section>
      <h2>${escapeHtml(section.heading)}</h2>
      <div class="section-content">${formatContent(section.content)}</div>`

      if (section.subsections && section.subsections.length > 0) {
        for (const sub of section.subsections) {
          html += `
      <div class="subsection">
        <h3>${escapeHtml(sub.title)}</h3>
        <div class="section-content">${formatContent(sub.content)}</div>
      </div>`
        }
      }

      html += `
    </section>`
      return html
    })
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
      font-size: 2.2em;
      color: #47684b;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .generated-date {
      font-size: 0.9em;
      color: #666;
      font-style: italic;
    }

    .branding {
      font-size: 0.85em;
      color: #5c8160;
      margin-top: 5px;
    }

    section {
      margin-bottom: 35px;
      page-break-inside: avoid;
    }

    h2 {
      font-size: 1.5em;
      color: #47684b;
      margin-bottom: 15px;
      margin-top: 25px;
      border-left: 4px solid #5c8160;
      padding-left: 15px;
    }

    h3 {
      font-size: 1.15em;
      color: #5c8160;
      margin-bottom: 10px;
      margin-top: 15px;
    }

    p {
      margin-bottom: 12px;
      text-align: justify;
    }

    .overview {
      background: #faf8f5;
      padding: 20px;
      border-radius: 8px;
      border-left: 4px solid #5c8160;
      margin-bottom: 30px;
    }

    .overview p:last-child {
      margin-bottom: 0;
    }

    .section-content {
      margin-bottom: 15px;
    }

    .subsection {
      margin-left: 10px;
      padding-left: 15px;
      border-left: 2px solid #e0d0bc;
      margin-bottom: 15px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
      background: white;
      border: 1px solid #ddd;
    }

    table thead {
      background: #47684b;
      color: white;
    }

    table th {
      padding: 10px 12px;
      text-align: left;
      font-weight: 600;
      font-size: 0.9em;
    }

    table td {
      padding: 8px 12px;
      border-bottom: 1px solid #eee;
      font-size: 0.9em;
    }

    table tbody tr:nth-child(even) {
      background: #faf8f5;
    }

    ul, ol {
      margin-left: 20px;
      margin-bottom: 15px;
    }

    li {
      margin-bottom: 6px;
    }

    .disclaimer {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 6px;
      margin-top: 40px;
      border-left: 4px solid #6c757d;
      font-size: 0.85em;
      color: #555;
      line-height: 1.5;
    }

    .disclaimer h3 {
      color: #6c757d;
      margin-top: 0;
    }

    .footer-note {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      font-size: 0.8em;
      color: #999;
      text-align: center;
    }

    @media print {
      body { padding: 0; }
      .container { padding: 20px; max-width: 100%; }
      section { page-break-inside: avoid; }
      h2 { page-break-after: avoid; }
      table { page-break-inside: avoid; }
      .overview { page-break-inside: avoid; }
    }

    @media screen and (max-width: 768px) {
      .container { padding: 20px; }
      header h1 { font-size: 1.6em; }
      h2 { font-size: 1.3em; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${escapeHtml(protocol.title)}</h1>
      <p class="generated-date">Generated on ${generatedDate}</p>
      <p class="branding">Peptide Protocols &mdash; peptideprotocols.us</p>
    </header>

    <!-- Overview / Summary -->
    <section>
      <div class="overview">
        <h2 style="margin-top: 0; border: none; padding-left: 0;">Protocol Overview</h2>
        ${formatContent(protocol.summary || '')}
      </div>
    </section>

    <!-- Dynamic Sections -->
    ${sectionsHTML}

    <!-- Disclaimer -->
    <section>
      <div class="disclaimer">
        <h3>Disclaimer</h3>
        ${formatContent(protocol.disclaimer || 'This protocol is for educational purposes only and does not constitute medical advice.')}
        <p style="margin-top: 15px; font-style: italic;">
          All peptides mentioned are research chemicals or off-label uses. Always consult with a qualified
          healthcare provider before beginning any peptide protocol.
        </p>
      </div>
    </section>

    <div class="footer-note">
      <p>Generated by Peptide Protocols &bull; peptideprotocols.us &bull; For educational purposes only</p>
    </div>
  </div>
</body>
</html>`
}

/**
 * Format content text into HTML paragraphs
 * Handles newlines, basic markdown-style lists, etc.
 */
function formatContent(text: string): string {
  if (!text) return ''
  const escaped = escapeHtml(text)
  // Split on double newlines for paragraphs
  const paragraphs = escaped.split(/\n\n+/)
  return paragraphs
    .map((p) => {
      const trimmed = p.trim()
      if (!trimmed) return ''
      // Check if it looks like a list
      if (trimmed.match(/^[-•]\s/m)) {
        const items = trimmed.split(/\n/).filter(Boolean)
        return '<ul>' + items.map((i) => `<li>${i.replace(/^[-•]\s*/, '')}</li>`).join('') + '</ul>'
      }
      return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`
    })
    .join('')
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

    // Validate protocol data - only require title
    if (!protocol.title) {
      return NextResponse.json(
        { error: 'Invalid protocol data provided.' },
        { status: 400 },
      )
    }

    // Generate HTML
    const html = generateHTMLProtocol(protocol)

    // Return HTML as a downloadable file
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
