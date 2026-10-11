import { NextResponse, type NextRequest } from 'next/server'
import { adminDb } from '@/lib/server/db'
import { clientIp } from '@/lib/server/security'
import { ucapanSchema } from '@/lib/validations/public-invitation'

const MAX_PER_HOUR = 10 // ucapan per IP per jam

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}

// GET /api/public/invitations/[id]/ucapan — daftar ucapan, hanya untuk undangan yang published
export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const { data, error } = await adminDb()
    .from('guestbook_messages')
    .select('id, guest_name, message, created_at')
    .eq('invitation_id', id)
    .order('created_at', { ascending: false })
    .limit(200)
  if (error) return json({ error: 'Gagal memuat ucapan' }, 500)
  const ucapan = (data ?? []).map((u) => {
    const m = /^\[hadir:(hadir|tidak|ragu)\]\s?/.exec(u.message)
    return { ...u, hadir: m ? m[1] : 'ragu', message: m ? u.message.slice(m[0].length) : u.message }
  })
  return json({ ucapan })
}

// POST /api/public/invitations/[id]/ucapan — tambah ucapan / RSVP
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const db = adminDb()

  let raw: unknown
  try {
    raw = await req.json()
  } catch {
    return json({ error: 'Body harus JSON' }, 400)
  }
  const parsed = ucapanSchema.safeParse(raw)
  if (!parsed.success) return json({ error: parsed.error.issues[0]?.message ?? 'Input tidak valid' }, 400)

  // Undangan harus ada dan published
  const { data: inv } = await db.from('invitations').select('id').eq('id', id).eq('published', true).maybeSingle()
  if (!inv) return json({ error: 'Undangan tidak ditemukan' }, 404)

  const { data: allowed, error: rlErr } = await db.rpc('rate_limit_hit', {
    p_key: `ucapan:${clientIp(req)}`,
    p_max: MAX_PER_HOUR,
    p_window_secs: 60 * 60,
  })
  if (rlErr) return json({ error: 'Gagal memeriksa rate limit' }, 500)
  if (!allowed) return json({ error: 'Terlalu sering mengirim ucapan. Coba lagi nanti.' }, 429)

  const { data: row, error } = await db
    .from('guestbook_messages')
    .insert({
      invitation_id: id,
      guest_name: parsed.data.nama,
      // Kolom hadir belum ada di tabel; disimpan sebagai prefiks agar tidak perlu migration.
      message: `[hadir:${parsed.data.hadir}] ${parsed.data.pesan}`,
    })
    .select('id, guest_name, message, created_at')
    .single()
  if (error || !row) return json({ error: 'Gagal menyimpan ucapan' }, 500)
  const m = /^\[hadir:(hadir|tidak|ragu)\]\s?/.exec(row.message)
  return json({ ucapan: { ...row, hadir: m ? m[1] : parsed.data.hadir, message: parsed.data.pesan } }, 201)
}
