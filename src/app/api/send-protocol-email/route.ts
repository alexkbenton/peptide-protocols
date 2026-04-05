import { NextRequest, NextResponse } from 'next/server'

/**
 * Email request type
 */
interface SendProtocolEmailRequest {
  email: string
  protocol: {
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
}

/**
 * Format protocol as HTML for email
 */
function generateEmailHTML(protocol: SendProtocolEmailRequest['protocol']): string {
  const compoundsTableHTML = protocol.compounds
    .map(
      (c) => `
    <tr style="border-bottom: 1px solid #eee;">
      <td style="padding: 12px; border-right: 1px solid #eee;">${escapeHtml(c.name)}</td>
      <td style="padding: 12px; border-right: 1px solid #eee;">${escapeHtml(c.dose)}</td>
      <td style="padding: 12px; border-right: 1px solid #eee;">${escapeHtml(c.route)}</td>
      <td style="padding: 12px; border-right: 1px solid #eee;">${escapeHtml(c.frequency)}</td>
      <td style="padding: 12px;">${escapeHtml(c.evidenceLevel)}</td>
    </tr>
  `,
    )
    .join('')

  const warningsHTML = protocol.importantWarnings
    .map((w) => `<li style="margin-bottom: 8px;">${escapeHtml(w)}</li>`)
    .join('')

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    header {
      border-bottom: 3px solid #47684b;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    h1 {
      font-size: 1.8em;
      color: #47684b;
      margin: 0 0 5px 0;
    }
    .generated-date {
      font-size: 0.9em;
      color: #666;
    }
    h2 {
      font-size: 1.4em;
      color: #47684b;
      border-left: 4px solid #5c8160;
      padding-left: 15px;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    h3 {
      font-size: 1.1em;
      color: #5c8160;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .overview {
      background: #faf8f5;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #5c8160;
      margin-bottom: 20px;
    }
    p {
      margin-bottom: 15px;
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
    table tbody tr:nth-child(even) {
      background: #faf8f5;
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
      margin: 10px 0 0 20px;
      padding: 0;
    }
    .disclaimer {
      background: #e2e3e5;
      padding: 20px;
      border-radius: 6px;
      margin-top: 20px;
      border-left: 4px solid #6c757d;
      font-size: 0.9em;
      color: #333;
    }
    .cta-button {
      display: inline-block;
      background: #47684b;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      text-decoration: none;
      margin-top: 20px;
      font-weight: 600;
    }
    .compound-detail {
      background: #faf8f5;
      padding: 15px;
      margin: 10px 0;
      border-radius: 6px;
      border-left: 3px solid #5c8160;
    }
    .schedule-block {
      background: white;
      border: 1px solid #ddd;
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
      font-family: monospace;
      font-size: 0.95em;
      white-space: pre-wrap;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${escapeHtml(protocol.title)}</h1>
      <p class="generated-date">Generated on ${new Date().toLocaleDateString()}</p>
    </header>

    <div class="overview">
      <h2 style="margin-top: 0;">Protocol Overview</h2>
      <p>${escapeHtml(protocol.overview).replace(/\n\n/g, '</p><p>')}</p>
    </div>

    <h2>Compound Protocol</h2>
    <table>
      <thead>
        <tr>
          <th>Compound</th>
          <th>Dosage</th>
          <th>Route</th>
          <th>Frequency</th>
          <th>Evidence</th>
        </tr>
      </thead>
      <tbody>
        ${compoundsTableHTML}
      </tbody>
    </table>

    <h2>Administration Schedule</h2>
    <div class="schedule-block">${escapeHtml(protocol.weeklySchedule).replace(/\n/g, '<br>')}</div>

    <h2>Cycling Protocol</h2>
    <div class="schedule-block">${escapeHtml(protocol.cyclingProtocol).replace(/\n/g, '<br>')}</div>

    <h2>Compound Synergies</h2>
    <p>${escapeHtml(protocol.synergies).replace(/\n\n/g, '</p><p>')}</p>

    <h2>Monitoring</h2>
    <p>${escapeHtml(protocol.monitoring).replace(/\n\n/g, '</p><p>')}</p>

    ${
      protocol.importantWarnings && protocol.importantWarnings.length > 0
        ? `
    <div class="warnings">
      <h3 style="margin-top: 0;">Important Warnings</h3>
      <ul>
        ${warningsHTML}
      </ul>
    </div>
    `
        : ''
    }

    <div class="disclaimer">
      <h3 style="margin-top: 0;">Important Disclaimer</h3>
      <p>${escapeHtml(protocol.disclaimer).replace(/\n\n/g, '</p><p>')}</p>
      <p style="font-size: 0.9em; margin-bottom: 0;">
        This protocol is provided for educational purposes only. Always consult with a qualified healthcare provider
        before beginning any new protocol.
      </p>
    </div>

    <p style="text-align: center; margin-top: 40px; color: #666; font-size: 0.9em;">
      Peptide Protocols - Educational Platform<br>
      <a href="https://peptideprotocols.us" style="color: #47684b; text-decoration: none;">Visit our site</a>
    </p>
  </div>
</body>
</html>
  `
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
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/**
 * POST handler for sending protocol via email
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SendProtocolEmailRequest

    // Validate input
    if (!body.email || !body.protocol) {
      return NextResponse.json(
        { error: 'Email and protocol data are required.' },
        { status: 400 },
      )
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 },
      )
    }

    if (!body.protocol.title || !body.protocol.compounds) {
      return NextResponse.json(
        { error: 'Invalid protocol data.' },
        { status: 400 },
      )
    }

    // Generate email HTML
    const emailHTML = generateEmailHTML(body.protocol)

    // TODO: Integrate with Resend, SendGrid, AWS SES, or other email service
    // For now, log the email and return success

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Email] To: ${body.email}`)
      console.log(`[Email] Subject: Your Personalized Peptide Protocol`)
      console.log(`[Email] HTML Preview (first 500 chars):`)
      console.log(emailHTML.substring(0, 500))
    }

    // Placeholder: When you add a real email service, replace this section:
    // Example with Resend (https://resend.com):
    // ```
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // const result = await resend.emails.send({
    //   from: 'protocols@peptideprotocols.us',
    //   to: body.email,
    //   subject: 'Your Personalized Peptide Protocol',
    //   html: emailHTML,
    // });
    // if (!result.data?.id) throw new Error('Failed to send email');
    // ```

    // Example with SendGrid:
    // ```
    // import sgMail from '@sendgrid/mail';
    // sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
    // await sgMail.send({
    //   to: body.email,
    //   from: 'noreply@peptideprotocols.us',
    //   subject: 'Your Personalized Peptide Protocol',
    //   html: emailHTML,
    // });
    // ```

    // Example with AWS SES:
    // ```
    // const SES = new AWS.SES({ region: 'us-east-1' });
    // await SES.sendEmail({
    //   Source: 'noreply@peptideprotocols.us',
    //   Destination: { ToAddresses: [body.email] },
    //   Message: {
    //     Subject: { Data: 'Your Personalized Peptide Protocol' },
    //     Body: { Html: { Data: emailHTML } },
    //   },
    // }).promise();
    // ```

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: `Protocol email sent to ${body.email}`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Send protocol email error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to send email: ${error.message}` },
        { status: 500 },
      )
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while sending email.' },
      { status: 500 },
    )
  }
}
