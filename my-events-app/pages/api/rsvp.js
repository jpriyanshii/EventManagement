import { supabaseAdmin } from '../../lib/supabaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, event_id, status } = req.body
  if (!email || !event_id || !status) {
    return res.status(400).json({ error: 'Missing fields' })
  }

  try {
    //upsert user by email into Users table (created_at handled by DB default)
    const { data: user, error: upsertErr } = await supabaseAdmin
      .from('users')
      .upsert({ email }, { onConflict: 'email', returning: 'representation' })
      .select()
      .single()

    if (upsertErr) throw upsertErr

    //insert RSVP
    const { data: rsvp, error: rsvpErr } = await supabaseAdmin
      .from('rsvps')
      .insert({ user_id: user.id, event_id, status })
      .select()
      .single()

    if (rsvpErr) throw rsvpErr

    return res.status(200).json({ rsvp })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Server error' })
  }
}
