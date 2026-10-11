import { NextResponse, type NextRequest } from 'next/server'
import { adminDb } from '@/lib/server/db'
import { hashToken } from '@/lib/server/security'
import { invitationInputSchema } from '@/lib/validations/public-invitation'


function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

// Ambil invitation_id dari token. Token salah → null.
async function resolveByToken(token: string, invitationId: string): Promise<boolean> {
  const db = adminDb()
  const { data } = await db
    .from('invitation_secrets')
    .select('invitation_id')
    .eq('invitation_id', invitationId)
    .eq('edit_token_hash', hashToken(token))
    .maybeSingle()
  return !!data
}

// PUT /api/public/invitations/[id] — update, wajib header x-edit-token
export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const token = req.headers.get('x-edit-token') ?? ''
  if (!token || !(await resolveByToken(token, id))) {
    return json({ error: 'Token edit tidak valid' }, 401)
  }

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return json({ error: 'Body harus JSON' }, 400)
  }
  const parsed = invitationInputSchema.safeParse(raw)
  if (!parsed.success) {
    return json({ error: parsed.error.issues[0]?.message ?? 'Input tidak valid' }, 400)
  }
  const input = parsed.data

  const { error } = await adminDb()
    .from('invitations')
    .update({
      template_id: input.template_id,
      bride_name: input.bride_name,
      groom_name: input.groom_name,
      event_date: new Date(input.event_date).toISOString(),
      event_location: input.event_location,
      event_address: input.event_address || null,
      maps_url: input.maps_url || null,
      story_text: input.story_text || null,
      custom_message: input.custom_message || null,
      cover_image_url: input.cover_image_url || null,
      gallery_images: input.gallery_images,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) return json({ error: 'Gagal memperbarui undangan' }, 500)
  return json({ ok: true })
}

// GET /api/public/invitations/[id] — data untuk form edit, wajib header x-edit-token
export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const token = req.headers.get('x-edit-token') ?? ''
  if (!token || !(await resolveByToken(token, id))) {
    return json({ error: 'Token edit tidak valid' }, 401)
  }
  const { data, error } = await adminDb()
    .from('invitations')
    .select('id, slug, template_id, bride_name, groom_name, event_date, event_location, event_address, maps_url, story_text, custom_message, cover_image_url, gallery_images')
    .eq('id', id)
    .single()
  if (error || !data) return json({ error: 'Undangan tidak ditemukan' }, 404)
  return json(data)
}
