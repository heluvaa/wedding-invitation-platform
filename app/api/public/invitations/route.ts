import { NextResponse, type NextRequest } from 'next/server'
import { adminDb } from '@/lib/server/db'
import { clientIp, hashToken, newEditToken } from '@/lib/server/security'
import { invitationInputSchema } from '@/lib/validations/public-invitation'
import { generateSlug } from '@/lib/utils/invitation'


const CREATE_MAX = 5 // undangan per IP
const CREATE_WINDOW_SECS = 60 * 60 // per jam

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: NextRequest) {
  // Validasi dulu. Request yang salah format tidak boleh menghabiskan kuota.
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

  // Kuota dihitung hanya untuk request yang sudah valid.
  const db = adminDb()
  const ip = clientIp(req)
  const { data: allowed, error: rlErr } = await db.rpc('rate_limit_hit', {
    p_key: `create:${ip}`,
    p_max: CREATE_MAX,
    p_window_secs: CREATE_WINDOW_SECS,
  })
  if (rlErr) return json({ error: 'Gagal memeriksa rate limit' }, 500)
  if (!allowed) return json({ error: 'Terlalu banyak undangan dibuat dari jaringan ini. Coba lagi nanti.' }, 429)

  const editToken = newEditToken()
  const slug = generateSlug(input.bride_name, input.groom_name)

  const { data: row, error } = await db
    .from('invitations')
    .insert({
      user_id: null,
      slug,
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
      published: true,
      published_at: new Date().toISOString(),
    })
    .select('id, slug')
    .single()

  if (error || !row) return json({ error: 'Gagal menyimpan undangan' }, 500)

  const { error: secErr } = await db
    .from('invitation_secrets')
    .insert({ invitation_id: row.id, edit_token_hash: hashToken(editToken) })

  if (secErr) {
    // Tanpa token, undangan tidak bisa diedit. Hapus supaya tidak jadi yatim.
    await db.from('invitations').delete().eq('id', row.id)
    return json({ error: 'Gagal membuat token edit' }, 500)
  }

  return json({ id: row.id, slug: row.slug, editToken }, 201)
}
