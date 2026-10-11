'use client'

import { useEffect, useState } from 'react'
import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate } from '@/lib/utils/invitation'
import { Reveal } from './Reveal'
import { MusicToggle, Guestbook } from './ThemeKit'
import './wedding.css'

function useCountdown(target: string) {
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  useEffect(() => {
    const tick = () => {
      const d = new Date(target).getTime() - Date.now()
      const abs = Math.max(0, d)
      setT({
        days: Math.floor(abs / 86400000),
        hours: Math.floor((abs % 86400000) / 3600000),
        minutes: Math.floor((abs % 3600000) / 60000),
        seconds: Math.floor((abs % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

export function ElegantTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const cd = useCountdown(invitation.event_date)
  const units = [
    { v: cd.days, l: 'Hari' },
    { v: cd.hours, l: 'Jam' },
    { v: cd.minutes, l: 'Menit' },
    { v: cd.seconds, l: 'Detik' },
  ]

  return (
    <div className="w-font-body min-h-screen bg-[#141210] text-[#ece5d8]">
    <MusicToggle src={invitation.music_url ?? ''} p={{ bg: '#141210', ink: '#ece5d8', soft: '#b8ab8e', accent: '#d4af37', card: '#1c1917', line: '#3a3228', btnInk: '#ffffff', display: '', accentFont: '', body: '' }} />
      {/* Watermark free tier */}
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 py-2 text-center text-xs text-[#d4af37] backdrop-blur-sm">
          Dibuat dengan ♥ di <span className="font-semibold">Undangkan Aja</span>
        </div>
      )}

      {/* ===== Cover ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: invitation.cover_image_url ? `url(${invitation.cover_image_url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141210] via-transparent to-[#141210]" />

        <Reveal className="relative z-10">
          <p className="w-font-accent italic text-[#d4af37] text-xl tracking-wide">Undangan Pernikahan</p>
          <div className="w-divider my-6"><span className="text-[#d4af37] text-lg">✦</span></div>
          <h1 className="w-font-display text-5xl md:text-7xl font-semibold leading-tight">
            {invitation.bride_name}
          </h1>
          <p className="w-font-accent italic text-3xl md:text-4xl text-[#d4af37] my-4">&</p>
          <h1 className="w-font-display text-5xl md:text-7xl font-semibold leading-tight">
            {invitation.groom_name}
          </h1>
          <p className="mt-8 text-[#b8ab8e] tracking-[0.25em] uppercase text-sm">
            {formatEventDate(invitation.event_date)}
          </p>
          {guest && (
            <p className="mt-6 text-sm text-[#b8ab8e]">
              Kepada Yth.<br />
              <span className="text-lg text-[#ece5d8] font-medium">{guest.name}</span>
            </p>
          )}
        </Reveal>

        <Reveal delay={2} className="relative z-10 mt-12">
          <div className="flex gap-3 justify-center">
            {units.map((u) => (
              <div key={u.l} className="w-16 md:w-20 rounded-xl border border-[#d4af37]/30 bg-white/5 py-3 backdrop-blur-sm">
                <p className="w-font-display text-2xl md:text-3xl text-[#d4af37]">{u.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#b8ab8e]">{u.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Mempelai ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="w-font-accent italic text-[#d4af37] text-lg">Assalamu&apos;alaikum Wr. Wb.</p>
          <p className="mt-4 text-[#b8ab8e] leading-relaxed">
            Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyelenggarakan
            pernikahan putra-putri kami:
          </p>
          <div className="mt-10 space-y-8">
            <div>
              <h3 className="w-font-display text-3xl text-[#ece5d8]">{invitation.bride_name}</h3>
              <p className="text-sm text-[#b8ab8e] mt-1">Mempelai Wanita</p>
            </div>
            <div className="w-divider"><span className="text-[#d4af37]">&</span></div>
            <div>
              <h3 className="w-font-display text-3xl text-[#ece5d8]">{invitation.groom_name}</h3>
              <p className="text-sm text-[#b8ab8e] mt-1">Mempelai Pria</p>
            </div>
          </div>
          {invitation.custom_message && (
            <p className="mt-10 w-font-accent italic text-lg text-[#d4af37]">“{invitation.custom_message}”</p>
          )}
        </Reveal>
      </section>

      {/* ===== Acara ===== */}
      <section className="px-6 py-20 bg-[#1c1917]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="w-font-display text-3xl md:text-4xl text-[#ece5d8]">Waktu &amp; Tempat</h2>
          <div className="w-divider my-6"><span className="text-[#d4af37] text-lg">✦</span></div>
          <div className="rounded-2xl border border-[#d4af37]/25 bg-white/[0.03] p-8">
            <p className="w-font-display text-2xl text-[#d4af37]">{formatEventDate(invitation.event_date)}</p>
            <p className="mt-4 text-xl text-[#ece5d8]">{invitation.event_location}</p>
            {invitation.event_address && (
              <p className="mt-2 text-sm text-[#b8ab8e]">{invitation.event_address}</p>
            )}
            {invitation.maps_url && (
              <a
                href={invitation.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full border border-[#d4af37] px-8 py-3 text-sm tracking-wide text-[#d4af37] hover:bg-[#d4af37] hover:text-[#141210] transition"
              >
                BUKA GOOGLE MAPS
              </a>
            )}
          </div>
        </Reveal>
      </section>

      {/* ===== Galeri ===== */}
      {invitation.gallery_images && invitation.gallery_images.length > 0 && (
        <section className="px-6 py-20">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="w-font-display text-3xl md:text-4xl text-center text-[#ece5d8]">Galeri Momen</h2>
            <div className="w-divider my-6"><span className="text-[#d4af37] text-lg">✦</span></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {invitation.gallery_images.map((src, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="overflow-hidden rounded-xl aspect-square">
                    <img src={src} alt={`Galeri ${i + 1}`} className="h-full w-full object-cover hover:scale-105 transition duration-500" loading="lazy" />
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ===== Cerita ===== */}
      {invitation.story_text && (
        <section className="px-6 py-20 bg-[#1c1917]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="w-font-display text-3xl text-[#ece5d8]">Cerita Kami</h2>
            <div className="w-divider my-6"><span className="text-[#d4af37] text-lg">✦</span></div>
            <p className="whitespace-pre-line leading-relaxed text-[#b8ab8e]">{invitation.story_text}</p>
          </Reveal>
        </section>
      )}

      {/* ===== Amplop Digital ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="w-font-display text-3xl text-[#ece5d8]">Amplop Digital</h2>
          <p className="mt-3 text-sm text-[#b8ab8e]">
            Doa restu Anda adalah hadiah terindah. Namun jika ingin memberi tanda kasih,
            kami sediakan dengan penuh syukur.
          </p>
          <div className="w-divider my-6"><span className="text-[#d4af37] text-lg">✦</span></div>
          {((invitation.bank_accounts as unknown as { bank: string; noRek: string; atasNama: string }[]) ?? []).length > 0 ? (
            <div className="mt-6 space-y-3">
              {((invitation.bank_accounts as unknown as { bank: string; noRek: string; atasNama: string }[]) ?? []).map((a) => (
                <div key={a.noRek} className="rounded-xl border border-current/20 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] opacity-70">{a.bank}</p>
                  <p className="mt-1 text-xl tabular-nums tracking-widest">{a.noRek}</p>
                  <p className="mt-1 text-sm opacity-70">a.n. {a.atasNama}</p>
                </div>
              ))}
            </div>
          ) : null}
        </Reveal>
      </section>

      {/* ===== Penutup ===== */}
      <footer className="px-6 py-16 text-center border-t border-[#d4af37]/20">
        <Reveal>
          <p className="text-[#b8ab8e] text-sm leading-relaxed max-w-xl mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
          <p className="w-font-accent italic text-[#d4af37] text-xl mt-8">
            {invitation.bride_name} &amp; {invitation.groom_name}
          </p>
          <p className="text-xs text-[#6b6259] mt-8">Dibuat dengan ♥ di Undangkan Aja</p>
        </Reveal>
            <section className="px-6 py-20">
        <Guestbook invitationId={invitation.id} p={{ bg: '#141210', ink: '#ece5d8', soft: '#b8ab8e', accent: '#d4af37', card: '#1c1917', line: '#3a3228', btnInk: '#ffffff', display: '', accentFont: '', body: '' }} />
      </section>
</footer>
    </div>
  )
}
