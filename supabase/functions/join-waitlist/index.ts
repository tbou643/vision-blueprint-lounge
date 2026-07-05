import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

type WaitlistPayload = {
  name?: unknown
  email?: unknown
  postal_code?: unknown
  property_type?: unknown
  monthly_bill?: unknown
  notes?: unknown
  source?: unknown
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  if (!trimmed) return null
  return trimmed.slice(0, max)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !serviceKey) {
    return new Response(JSON.stringify({ error: 'Server configuration error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let body: WaitlistPayload
  try {
    body = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const id = crypto.randomUUID()
  const created_at = new Date().toISOString()
  const name = text(body.name, 100)
  const email = text(body.email, 255)?.toLowerCase() ?? null
  const postal_code = text(body.postal_code, 10)
  const property_type = text(body.property_type, 50)
  const notes = text(body.notes, 500)
  const source = text(body.source, 80) ?? 'website'
  const monthly_bill =
    typeof body.monthly_bill === 'number' && Number.isFinite(body.monthly_bill)
      ? body.monthly_bill
      : typeof body.monthly_bill === 'string' && body.monthly_bill.trim()
        ? Number(body.monthly_bill)
        : null

  if (!name || !email || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: 'Please provide a valid name and email.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if (monthly_bill !== null && (!Number.isFinite(monthly_bill) || monthly_bill < 0)) {
    return new Response(JSON.stringify({ error: 'Monthly bill must be a valid number.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const supabase = createClient(supabaseUrl, serviceKey)
  const payload = {
    id,
    name,
    email,
    postal_code,
    property_type,
    monthly_bill,
    notes,
    source,
    created_at,
  }

  const { error } = await supabase.from('waitlist_signups').insert(payload)

  if (error) {
    console.error('Waitlist insert failed', { error })
    return new Response(JSON.stringify({ error: 'Could not save your signup. Please try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  EdgeRuntime.waitUntil(
    Promise.allSettled([
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'waitlist-internal',
          recipientEmail: 'hello@nullpunkt.ca',
          idempotencyKey: `waitlist-internal-${id}`,
          templateData: payload,
        },
      }),
      supabase.functions.invoke('send-transactional-email', {
        body: {
          templateName: 'waitlist-confirmation',
          recipientEmail: email,
          idempotencyKey: `waitlist-confirm-${id}`,
          templateData: { name },
        },
      }),
    ]),
  )

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 201,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})