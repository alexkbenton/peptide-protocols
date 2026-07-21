import { NextRequest, NextResponse } from 'next/server'

/**
 * Newsletter signup → Klaviyo.
 *
 * Uses the Bulk Subscribe Profiles endpoint, which creates the profile if it
 * doesn't exist and sets email marketing consent to SUBSCRIBED:
 * https://developers.klaviyo.com/en/reference/bulk_subscribe_profiles
 *
 * Single vs. double opt-in is controlled by the Klaviyo list's own setting
 * (or the account default if KLAVIYO_LIST_ID is unset) — not by this code.
 *
 * Required env vars:
 *   KLAVIYO_PRIVATE_API_KEY   pk_... private key with subscriptions:write,
 *                             profiles:write, lists:write scopes
 *   KLAVIYO_LIST_ID           optional; target list ID (e.g. Y6nRLr)
 *   KLAVIYO_API_REVISION      optional; defaults to 2026-07-15
 */

const KLAVIYO_ENDPOINT = 'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/'
const DEFAULT_REVISION = '2026-07-15'

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY
    const LIST_ID = process.env.KLAVIYO_LIST_ID
    const REVISION = process.env.KLAVIYO_API_REVISION || DEFAULT_REVISION

    // Not configured (local dev) — log and succeed so the UI stays testable.
    if (!API_KEY) {
      console.log(`[Dev Mode] Newsletter signup: ${email} (source: ${source || 'unknown'})`)
      return NextResponse.json({ success: true, message: 'Thanks for signing up.' })
    }

    const customSource =
      typeof source === 'string' && source
        ? `peptideprotocols.us — ${source}`
        : 'peptideprotocols.us'

    const payload: Record<string, unknown> = {
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          custom_source: customSource,
          profiles: {
            data: [
              {
                type: 'profile',
                attributes: {
                  email,
                  subscriptions: {
                    email: { marketing: { consent: 'SUBSCRIBED' } },
                  },
                },
              },
            ],
          },
        },
        ...(LIST_ID && {
          relationships: {
            list: { data: { type: 'list', id: LIST_ID } },
          },
        }),
      },
    }

    const response = await fetch(KLAVIYO_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${API_KEY}`,
        accept: 'application/vnd.api+json',
        'content-type': 'application/vnd.api+json',
        revision: REVISION,
      },
      body: JSON.stringify(payload),
    })

    // Klaviyo returns 202 Accepted on success with an empty body.
    if (response.status === 202) {
      return NextResponse.json({ success: true, message: 'Thanks for signing up.' })
    }

    const detail = await response.text()
    console.error(`Klaviyo subscribe failed (${response.status}):`, detail)

    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 502 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 })
  }
}
