'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useCountdown } from './useCountdown'
import { ShareWhatsApp } from '@/components/invitations/ShareWhatsApp'
import { formatEventDate } from '@/lib/utils/invitation'
import type { TemplateProps } from '@/lib/templates/types'

// Komponen bersama untuk 4 tema baru. Visual dibedakan lewat palet dan tipografi, bukan struktur.
export type Palette = {
  bg: string        // latar halaman
  ink: string       // teks utama
  soft: string      // teks sekunder (kontras >= 4.5:1 terhadap bg)
  accent: string    // aksen utama (tombol, garis)
  card: string      // latar kartu
  line: string      // garis pemisah
  btnInk: string    // teks di atas accent
  display: string   // class font display
  accentFont: string
  body: string
}

export function ThemeShell({ invitation, p, children }: { invitation: TemplateProps['invitation']; p: Palette; children?: React.ReactNode }) {
  return (
    <div className={`${p.body} min-h-screen`} style={{ background: p.bg, color: p.ink }}>
      {children}
    </div>
  )
}

export function Countdown({ target, p }: { target: string; p: Palette }) {
  const cd = useCountdown(target)
  const units = [
    { v: cd.days, l: 'Hari' },
    { v: cd.hours, l: 'Jam' },
    { v: cd.minutes, l: 'Menit' },
    { v: cd.seconds, l: 'Detik' },
  ]
  return (
    <div className="flex justify-center gap-3">
      {units.map((u) => (
        <div key={u.l} className="w-16 md:w-20 rounded-xl py-3" style={{ background: p.card, border: `1px solid ${p.line}` }}>
          <p className={`${p.display} text-2xl md:text-3xl`} style={{ color: p.accent }}>{u.v}</p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: p.soft }}>{u.l}</p>
        </div>
      ))}
    </div>
  )
}

export function Gallery({ images, p }: { images: string[]; p: Palette }) {
  if (!images.length) return null
  return (
    <section className="px-6 py-20">
      <h2 className={`${p.display} text-3xl text-center`}>Galeri</h2>
      <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Galeri ${i + 1}`} loading="lazy"
            className="aspect-square w-full rounded-lg object-cover transition duration-500 hover:scale-[1.03]" />
        ))}
      </div>
    </section>
  )
}

export function Venue({ invitation, p }: { invitation: TemplateProps['invitation']; p: Palette }) {
  return (
    <section className="px-6 py-20 text-center">
      <h2 className={`${p.display} text-3xl`}>Waktu &amp; Tempat</h2>
      <p className={`${p.accentFont} mt-4 text-2xl`}>{formatEventDate(invitation.event_date)}</p>
      <p className="mt-3 text-lg">{invitation.event_location}</p>
      {invitation.event_address && <p className="mt-1 text-sm" style={{ color: p.soft }}>{invitation.event_address}</p>}
      {invitation.maps_url && (
        <a href={invitation.maps_url} target="_blank" rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full px-8 py-3 text-sm font-medium transition hover:opacity-90"
          style={{ background: p.accent, color: p.btnInk }}>
          Buka Google Maps
        </a>
      )}
    </section>
  )
}

export function Envelope({ invitation, p }: { invitation: TemplateProps['invitation']; p: Palette }) {
  const accounts = (invitation.bank_accounts as unknown as { bank: string; noRek: string; atasNama: string }[]) ?? []
  if (!accounts.length) return null
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <h2 className={`${p.display} text-3xl`}>Amplop Digital</h2>
        <p className="mt-3 text-sm" style={{ color: p.soft }}>Tanda kasih bisa dikirim melalui rekening berikut.</p>
        <div className="mt-8 space-y-4">
          {accounts.map((a) => (
            <div key={a.noRek} className="rounded-xl p-5" style={{ background: p.card, border: `1px solid ${p.line}` }}>
              <p className="text-xs uppercase tracking-[0.25em]" style={{ color: p.soft }}>{a.bank}</p>
              <p className="mt-2 text-2xl tabular-nums tracking-widest">{a.noRek}</p>
              <p className="mt-1 text-sm" style={{ color: p.soft }}>a.n. {a.atasNama}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Guestbook({ invitationId, p }: { invitationId: string; p: Palette }) {
  const [items, setItems] = useState<{ id: string; guest_name: string; message: string; hadir: string }[]>([])
  const [nama, setNama] = useState('')
  const [pesan, setPesan] = useState('')
  const [hadir, setHadir] = useState('hadir')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/public/invitations/${invitationId}/ucapan`)
      .then((r) => r.json()).then((d) => setItems(d.ucapan ?? [])).catch(() => {})
  }, [invitationId])

  async function submit(e: FormEvent) {
    e.preventDefault()
    setBusy(true); setMsg(null)
    try {
      const res = await fetch(`/api/public/invitations/${invitationId}/ucapan`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, pesan, hadir }),
      })
      const d = await res.json()
      if (!res.ok) throw new Error(d.error || 'Gagal mengirim')
      setItems((prev) => [d.ucapan, ...prev])
      setNama(''); setPesan(''); setMsg('Terima kasih, ucapanmu sudah terkirim.')
    } catch (err) {
      setMsg(err instanceof Error ? err.message : 'Gagal mengirim')
    } finally { setBusy(false) }
  }

  const field = 'w-full rounded-lg px-4 py-3 outline-none'
  const fieldStyle = { background: p.card, border: `1px solid ${p.line}`, color: p.ink }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-md">
        <h2 className={`${p.display} text-center text-3xl`}>Konfirmasi &amp; Ucapan</h2>
        <form onSubmit={submit} className="mt-8 space-y-3">
          <input required minLength={2} maxLength={80} placeholder="Nama Anda" value={nama} onChange={(e) => setNama(e.target.value)} className={field} style={fieldStyle} />
          <select value={hadir} onChange={(e) => setHadir(e.target.value)} className={field} style={fieldStyle}>
            <option value="hadir">Hadir</option>
            <option value="tidak">Tidak hadir</option>
            <option value="ragu">Masih ragu</option>
          </select>
          <textarea required minLength={2} maxLength={500} rows={3} placeholder="Ucapan & doa" value={pesan} onChange={(e) => setPesan(e.target.value)} className={field} style={fieldStyle} />
          <button type="submit" disabled={busy} className="w-full rounded-full px-6 py-3 font-medium disabled:opacity-60" style={{ background: p.accent, color: p.btnInk }}>
            {busy ? 'Mengirim…' : 'Kirim'}
          </button>
          {msg && <p className="text-sm" style={{ color: p.soft }}>{msg}</p>}
        </form>
        <div className="mt-10 space-y-3">
          {items.map((u) => (
            <div key={u.id} className="rounded-lg p-4" style={{ background: p.card, border: `1px solid ${p.line}` }}>
              <p className="text-sm font-medium">{u.guest_name} <span style={{ color: p.soft }}>· {u.hadir === 'hadir' ? 'Hadir' : u.hadir === 'tidak' ? 'Tidak hadir' : 'Masih ragu'}</span></p>
              <p className="mt-1 text-sm" style={{ color: p.soft }}>{u.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function MusicToggle({ src, p }: { src: string; p: Palette }) {
  const [playing, setPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  useEffect(() => {
    if (!src) return
    const a = new Audio(src)
    a.loop = true
    setAudio(a)
    return () => { a.pause() }
  }, [src])
  if (!audio) return null
  function toggle() {
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else { audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false)) }
  }
  return (
    <button onClick={toggle} aria-label={playing ? 'Jeda musik' : 'Putar musik'}
      className="fixed right-4 top-4 z-[60] rounded-full px-4 py-2 text-sm shadow-md"
      style={{ background: p.card, color: p.accent, border: `1px solid ${p.line}` }}>
      {playing ? 'Jeda musik' : 'Putar musik'}
    </button>
  )
}

export function Footer({ invitation, p }: { invitation: TemplateProps['invitation']; p: Palette }) {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://wedding-invitation-platform-heluvaa.vercel.app'
  const url = `${base}/${invitation.slug}`
  const title = `${invitation.bride_name} & ${invitation.groom_name}`
  return (
    <footer className="px-6 py-16 text-center" style={{ borderTop: `1px solid ${p.line}` }}>
      <p className={`${p.accentFont} text-2xl`} style={{ color: p.accent }}>{title}</p>
      <div className="mt-8"><ShareWhatsApp url={url} title={title} /></div>
    </footer>
  )
}
