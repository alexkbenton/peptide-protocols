import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const API_KEY = process.env.MAILCHIMP_API_KEY
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us1'

    // If Mailchimp is not configured, still allow entry (dev mode)
    if (!API_KEY || !AUDIENCE_ID) {
      console.log(`[Dev Mode] Email captured: ${email}`)
      return NextResponse.json({ success: true, message: 'Email captured (Mailchimp not configured).' })
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
        tags: ['peptide-protocols-gate'],
      }),
    })

    const data = await response.json()

    // Member already exists is fine
    if (response.status === 400 && data.title === 'Member Exists') {
      return NextResponse.json({ success: true, message: 'Welcome back!' })
    }

    if (!response.ok) {
      console.error('Mailchimp error:', data)
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
