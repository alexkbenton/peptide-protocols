import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1'

    const tag = typeof source === 'string' && source ? source : 'newsletter'

    // Mailchimp not configured (local dev) — log and succeed so the UI is testable.
    if (!API_KEY || !AUDIENCE_ID) {
      console.log(`[Dev Mode] Newsletter signup: ${email} (source: ${tag})`)
      return NextResponse.json({
        success: true,
        message: 'You are on the list.',
      })
    }

    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['peptide-protocols', tag],
      }),
    })

    const data = await response.json()

    // Already subscribed is a success from the visitor's point of view.
    if (response.status === 400 && data.title === 'Member Exists') {
      return NextResponse.json({ success: true, message: 'You are already on the list.' })
    }

    if (!response.ok) {
      console.error('Mailchimp error:', data)
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'You are on the list.' })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
