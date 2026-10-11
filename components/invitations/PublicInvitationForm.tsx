'use client'

import { useState, type FormEvent } from 'react'
import { ShareWhatsApp } from '@/components/invitations/ShareWhatsApp'

export const TEMPLATE_OPTIONS = [
  { id: 'elegant-simple', name: 'Elegant Simple' },
  { id: 'classic', name: 'Classic Rose' },
  { id: 'floral', name: 'Floral Garden' },
  { id: 'modern', name: 'Modern Minimalis' },
  { id: 'elegant', name: 'Luxury Gold' },
  { id: 'rustic', name: 'Rustic Wood' },
  { id: 'islami', name: 'Sakral Islami' },
  { id: 'jawa', name: 'Adat Jawa' },
]

export interface InvitationFormValues {
  template_id: string
  bride_name: string
  groom_name: string
  event_date: string // datetime-local: YYYY-MM-DDTHH:mm
  event_location: string
  event_address: string
  maps_url: string
  story_text: string
  custom_message: string
  cover_image_url: string
  gallery_text: string // satu URL per baris
}

export const EMPTY_VALUES: InvitationFormValues = {
  template_id: 'floral',
  bride_name: '',
  groom_name: '',
  event_date: '',
  event_location: '',
  event_address: '',
  maps_url: '',
  story_text: '',
  custom_message: '',
  cover_image_url: '',
  gallery_text: '',
}

// Helper untuk mengubah ISO dari server jadi nilai datetime-local (waktu lokal).
export function isoToLocalInput(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const p = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`
}

function toPayload(v: InvitationFormValues) {
  return {
    template_id: v.template_id,
    bride_name: v.bride_name,
    groom_name: v.groom_name,
    event_date: v.event_date ? new Date(v.event_date).toISOString() : '',
    event_location: v.event_location,
    event_address: v.event_address,
    maps_url: v.maps_url,
    story_text: v.story_text,
    custom_message: v.custom_message,
    cover_image_url: v.cover_image_url,
    gallery_images: v.gallery_text.split('\n').map((s) => s.trim()).filter(Boolean),
  }
}

interface Props {
  mode: 'create' | 'edit'
  initial: InvitationFormValues
  editToken?: string
  invitationId?: string
  onCreated?: (r: { id: string; slug: string; editToken: string }) => void
}

const field =
  'w-full rounded-xl border border-amber-200 bg-white px-4 py-2.5 text-stone-800 focus:border-amber-700 focus:outline-none'
const label = 'block text-sm font-medium text-stone-700 mb-1'

export default function InvitationForm({ mode, initial, editToken, invitationId, onCreated }: Props) {
  const [v, setV] = useState<InvitationFormValues>(initial)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ url: string; editUrl: string } | null>(null)

  const set = (k: keyof InvitationFormValues) => (e: { target: { value: string } }) =>
    setV((s) => ({ ...s, [k]: e.target.value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const body = JSON.stringify(toPayload(v))
      if (mode === 'create') {
        const res = await fetch('/api/public/invitations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal menyimpan')
        const origin = window.location.origin
        setDone({
          url: `${origin}/${data.slug}`,
          editUrl: `${origin}/edit/${data.id}#t=${data.editToken}`,
        })
        onCreated?.(data)
      } else {
        const res = await fetch(`/api/public/invitations/${invitationId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'x-edit-token': editToken ?? '' },
          body,
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal memperbarui')
        setError(null)
        alert('Perubahan tersimpan.')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setBusy(false)
    }
  }

  if (done) {
    return (
      <div className="space-y-5 rounded-2xl border border-amber-200 bg-white p-6">
        <h2 className="font-display text-2xl text-stone-900">Undangan siap dibagikan</h2>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-stone-700">
          <li>Tekan tombol hijau <b>Bagikan ke WhatsApp</b> untuk mengirim link ke tamu.</li>
          <li>Simpan <b>link edit rahasia</b> di bawah. Lewat link itu kamu bisa mengubah undangan kapan saja.</li>
          <li>Jangan bagikan link edit ke tamu. Hanya link undangan yang dikirim ke tamu.</li>
        </ol>
        <div>
          <p className={label}>Link undangan (bagikan ke tamu)</p>
          <input readOnly className={field} value={done.url} onFocus={(e) => e.target.select()} />
          <a href={done.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-amber-800 underline">Buka undangan</a>
        </div>
        <div>
          <ShareWhatsApp url={done.url} title="Mohon doa restu dan kehadirannya." />
        </div>
        <div>
          <p className={label}>Link edit rahasia (simpan, hanya ini yang bisa mengubah undangan)</p>
          <input readOnly className={field} value={done.editUrl} onFocus={(e) => e.target.select()} />
          <p className="mt-2 text-sm text-rose-700">Link edit tidak bisa dipulihkan kalau hilang.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-6 rounded-2xl border border-amber-200 bg-white p-6">
      <div>
        <p className={label}>Pilih tema</p>
        <select className={field} value={v.template_id} onChange={set('template_id')}>
          {TEMPLATE_OPTIONS.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="bride">Nama mempelai wanita</label>
          <input id="bride" required className={field} value={v.bride_name} onChange={set('bride_name')} />
        </div>
        <div>
          <label className={label} htmlFor="groom">Nama mempelai pria</label>
          <input id="groom" required className={field} value={v.groom_name} onChange={set('groom_name')} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="date">Tanggal & jam acara</label>
        <input id="date" type="datetime-local" required className={field} value={v.event_date} onChange={set('event_date')} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="loc">Nama lokasi</label>
          <input id="loc" required className={field} value={v.event_location} onChange={set('event_location')} />
        </div>
        <div>
          <label className={label} htmlFor="maps">Link Google Maps (opsional)</label>
          <input id="maps" className={field} placeholder="https://maps.google.com/..." value={v.maps_url} onChange={set('maps_url')} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="addr">Alamat lengkap (opsional)</label>
        <textarea id="addr" rows={2} className={field} value={v.event_address} onChange={set('event_address')} />
      </div>

      <div>
        <label className={label} htmlFor="story">Cerita singkat (opsional)</label>
        <textarea id="story" rows={3} className={field} value={v.story_text} onChange={set('story_text')} />
      </div>

      <div>
        <label className={label} htmlFor="msg">Pesan untuk tamu (opsional)</label>
        <textarea id="msg" rows={2} className={field} value={v.custom_message} onChange={set('custom_message')} />
      </div>

      <div>
        <label className={label} htmlFor="cover">Foto cover (URL gambar, opsional)</label>
        <input id="cover" className={field} placeholder="https://..." value={v.cover_image_url} onChange={set('cover_image_url')} />
      </div>

      <div>
        <label className={label} htmlFor="gallery">Galeri foto (URL gambar, satu per baris, maks 12)</label>
        <textarea id="gallery" rows={4} className={field} value={v.gallery_text} onChange={set('gallery_text')} />
      </div>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-amber-800 px-6 py-3 font-medium text-white hover:bg-amber-900 disabled:opacity-60"
      >
        {busy ? 'Menyimpan…' : mode === 'create' ? 'Simpan & Bagikan' : 'Simpan perubahan'}
      </button>
    </form>
  )
}
