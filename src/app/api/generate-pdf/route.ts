import { NextRequest, NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

// Brand colors
const SAGE = '#47684b'
const SAGE_LIGHT = '#5c8160'
const WARM_BG = '#faf8f5'
const TEXT_DARK = '#2a241c'
const TEXT_MED = '#555555'
const BORDER_LIGHT = '#e0d0bc'

/**
 * Strip basic HTML tags from content for clean PDF text
 */
function stripHtml(text: string): string {
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n\n')
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '$1')
    .replace(/<em>(.*?)<\/em>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/⚠️/g, '!')
    .trim()
}

/**
 * Check if we need a new page and add one if so
 */
function ensureSpace(doc: any, needed: number) {
  const pageHeight = doc.page.height
  const bottomMargin = 60
  if (doc.y + needed > pageHeight - bottomMargin) {
    doc.addPage()
  }
}

/**
 * Draw page footer
 */
function drawFooter(doc: any, pageNum: number) {
  const bottom = doc.page.height - 30
  doc
    .fontSize(8)
    .fillColor('#999999')
    .text(
      `Peptide Protocols • peptideprotocols.us • For educational purposes only • Page ${pageNum}`,
      50,
      bottom,
      { align: 'center', width: doc.page.width - 100 },
    )
}

/**
 * Generate PDF from protocol data
 */
function generatePDF(protocol: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'letter',
        margins: { top: 50, bottom: 60, left: 55, right: 55 },
        bufferPages: true,
        info: {
          Title: protocol.title || 'Peptide Protocol',
          Author: 'Peptide Protocols',
          Subject: 'Personalized Peptide Protocol',
          Creator: 'peptideprotocols.us',
        },
      })

      const chunks: Buffer[] = []
      doc.on('data', (chunk: Buffer) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const pageWidth = doc.page.width - 110 // margins

      // ============================================
      // HEADER
      // ============================================

      // Sage green header bar
      doc
        .rect(0, 0, doc.page.width, 4)
        .fill(SAGE)

      doc.moveDown(0.5)

      // Title
      doc
        .fontSize(24)
        .fillColor(SAGE)
        .text(protocol.title || 'Your Personalized Protocol', { align: 'left' })

      doc.moveDown(0.3)

      // Date and branding
      const generatedDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
      doc
        .fontSize(10)
        .fillColor(TEXT_MED)
        .text(`Generated on ${generatedDate}`, { continued: true })
        .text('  •  peptideprotocols.us', { link: 'https://peptideprotocols.us' })

      doc.moveDown(0.5)

      // Divider line
      doc
        .moveTo(55, doc.y)
        .lineTo(doc.page.width - 55, doc.y)
        .strokeColor(SAGE)
        .lineWidth(2)
        .stroke()

      doc.moveDown(1)

      // ============================================
      // OVERVIEW / SUMMARY
      // ============================================
      if (protocol.summary) {
        ensureSpace(doc, 100)

        const summaryText = stripHtml(protocol.summary)

        // Light background box for overview
        const summaryStartY = doc.y
        // First measure the text height
        doc.fontSize(11)
        const tempHeight = doc.heightOfString(summaryText, {
          width: pageWidth - 30,
        })

        doc
          .rect(55, summaryStartY - 5, pageWidth, tempHeight + 35)
          .fill(WARM_BG)

        // Left accent bar
        doc
          .rect(55, summaryStartY - 5, 4, tempHeight + 35)
          .fill(SAGE)

        doc
          .fontSize(14)
          .fillColor(SAGE)
          .text('Protocol Overview', 70, summaryStartY + 5, { width: pageWidth - 30 })

        doc.moveDown(0.3)

        doc
          .fontSize(11)
          .fillColor(TEXT_DARK)
          .text(summaryText, 70, doc.y, { width: pageWidth - 30, lineGap: 3 })

        doc.y = summaryStartY + tempHeight + 40
        doc.moveDown(0.8)
      }

      // ============================================
      // SECTIONS
      // ============================================
      if (protocol.sections && Array.isArray(protocol.sections)) {
        for (const section of protocol.sections) {
          ensureSpace(doc, 80)

          // Section heading with left bar
          const headingY = doc.y
          doc
            .rect(55, headingY, 4, 22)
            .fill(SAGE)

          doc
            .fontSize(16)
            .fillColor(SAGE)
            .text(section.heading, 68, headingY + 2, { width: pageWidth - 20 })

          doc.moveDown(0.5)

          // Section content
          if (section.content) {
            const contentText = stripHtml(section.content)
            if (contentText) {
              ensureSpace(doc, 40)
              doc
                .fontSize(10.5)
                .fillColor(TEXT_DARK)
                .text(contentText, 55, doc.y, { width: pageWidth, lineGap: 2.5 })
              doc.moveDown(0.5)
            }
          }

          // Subsections
          if (section.subsections && Array.isArray(section.subsections)) {
            for (const sub of section.subsections) {
              ensureSpace(doc, 60)

              // Subsection title
              doc
                .fontSize(12)
                .fillColor(SAGE_LIGHT)
                .text(stripHtml(sub.title), 62, doc.y, { width: pageWidth - 10 })

              doc.moveDown(0.2)

              // Subtle left border for subsection content
              const subStartY = doc.y
              const subText = stripHtml(sub.content)

              if (subText) {
                doc
                  .fontSize(10)
                  .fillColor(TEXT_DARK)
                  .text(subText, 70, doc.y, { width: pageWidth - 20, lineGap: 2 })
              }

              // Draw left border line
              const subEndY = doc.y
              doc
                .moveTo(62, subStartY)
                .lineTo(62, subEndY)
                .strokeColor(BORDER_LIGHT)
                .lineWidth(1.5)
                .stroke()

              doc.moveDown(0.6)
            }
          }

          doc.moveDown(0.4)
        }
      }

      // ============================================
      // DISCLAIMER
      // ============================================
      if (protocol.disclaimer) {
        ensureSpace(doc, 120)

        doc.moveDown(0.5)

        const disclaimerText = stripHtml(protocol.disclaimer)
        doc.fontSize(9)
        const disclaimerHeight = doc.heightOfString(disclaimerText, {
          width: pageWidth - 30,
        })

        const disclaimerStartY = doc.y

        // Gray background
        doc
          .rect(55, disclaimerStartY - 5, pageWidth, disclaimerHeight + 55)
          .fill('#f0f0f0')

        // Left accent
        doc
          .rect(55, disclaimerStartY - 5, 4, disclaimerHeight + 55)
          .fill('#6c757d')

        doc
          .fontSize(11)
          .fillColor('#6c757d')
          .text('Disclaimer', 70, disclaimerStartY + 5, { width: pageWidth - 30 })

        doc.moveDown(0.3)

        doc
          .fontSize(9)
          .fillColor('#555555')
          .text(disclaimerText, 70, doc.y, { width: pageWidth - 30, lineGap: 2 })

        doc.moveDown(0.3)

        doc
          .fontSize(8)
          .fillColor('#777777')
          .text(
            'All peptides mentioned are research chemicals or off-label uses. Always consult with a qualified healthcare provider before beginning any peptide protocol.',
            70,
            doc.y,
            { width: pageWidth - 30, oblique: true },
          )
      }

      // ============================================
      // ADD PAGE NUMBERS
      // ============================================
      const pages = doc.bufferedPageRange()
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i)
        drawFooter(doc, i + 1)
      }

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * POST handler for PDF generation
 */
export async function POST(req: NextRequest) {
  try {
    const protocol = await req.json()

    // Validate protocol data
    if (!protocol.title) {
      return NextResponse.json(
        { error: 'Invalid protocol data provided.' },
        { status: 400 },
      )
    }

    // Generate PDF
    const pdfBuffer = await generatePDF(protocol)

    // Return PDF as downloadable file
    const uint8Array = new Uint8Array(pdfBuffer)
    return new NextResponse(uint8Array, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="peptide-protocol-${Date.now()}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
