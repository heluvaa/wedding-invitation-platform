'use client'

import { useEffect, useState } from 'react'
import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate } from '@/lib/utils/invitation'
import { Reveal } from './Reveal'
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

export function ModernTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const cd = useCountdown(invitation.event_date)

  return (
    <div className="w-font-body min-h-screen bg-white text-stone-800 antialiased">
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/90 py-2 text-center text-xs text-white backdrop-blur-sm">
          Dibuat dengan ♥ di <span className="font-semibold">Undangkan Aja</span>
        </div>
      )}

      {/* ===== Hero ===== */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-6 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: invitation.cover_image_url ? `url(${invitation.cover_image_url})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Reveal className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-stone-400">
            The Wedding Of
          </p>
          <h1 className="w-font-display mt-6 text-5xl md:text-7xl font-medium text-stone-900 leading-[1.05]">
            {invitation.bride_name}
            <span className="w-font-accent italic block text-3xl md:text-4xl text-stone-400 font-normal my-2">&</span>
            {invitation.groom_name}
          </h1>
          <div className="mx-auto mt-8 h-px w-24 bg-stone-300" />
          <p className="mt-6 text-sm uppercase tracking-[0.25em] text-stone-500">
            {formatEventDate(invitation.event_date)}
          </p>
          {guest && (
            <div className="mt-8 inline-block rounded-full bg-stone-100 px-6 py-3">
              <p className="text-xs text-stone-500">Kepada Yth.</p>
              <p className="font-medium text-stone-800">{guest.name}</p>
            </div>
          )}
        </Reveal>
      </section>

      {/* ===== Countdown strip ===== */}
      <section className="border-y border-stone-100 bg-stone-50">
        <Reveal className="mx-auto flex max-w-xl justify-center gap-6 md:gap-10 px-6 py-10">
          {[
            { v: cd.days, l: 'Hari' },
            { v: cd.hours, l: 'Jam' },
            { v: cd.minutes, l: 'Menit' },
            { v: cd.seconds, l: 'Detik' },
          ].map((u) => (
            <div key={u.l} className="text-center">
              <p className="w-font-display text-4xl md:text-5xl text-stone-900 tabular-nums">{u.v}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-stone-400">{u.l}</p>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ===== Mempelai ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Assalamu&apos;alaikum Wr. Wb.</p>
          <p className="mt-4 text-stone-500 leading-relaxed text-[15px]">
            Dengan memohon rahmat dan ridha Allah SWT, kami bermaksud menyatukan
            putra-putri kami dalam ikatan suci pernikahan:
          </p>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl bg-stone-50 p-8">
              <h3 className="w-font-display text-2xl text-stone-900">{invitation.bride_name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">Mempelai Wanita</p>
            </div>
            <div className="rounded-3xl bg-stone-50 p-8">
              <h3 className="w-font-display text-2xl text-stone-900">{invitation.groom_name}</h3>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-stone-400">Mempelai Pria</p>
            </div>
          </div>
          {invitation.custom_message && (
            <p className="w-font-accent italic mt-10 text-xl text-stone-600">“{invitation.custom_message}”</p>
          )}
        </Reveal>
      </section>

      {/* ===== Acara ===== */}
      <section className="px-6 py-20 bg-stone-900 text-white">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Save The Date</p>
          <h2 className="w-font-display mt-4 text-3xl md:text-4xl">Waktu &amp; Tempat</h2>
          <div className="mx-auto mt-8 h-px w-24 bg-stone-700" />
          <p className="w-font-display mt-8 text-2xl">{formatEventDate(invitation.event_date)}</p>
          <p className="mt-4 text-lg text-stone-200">{invitation.event_location}</p>
          {invitation.event_address && (
            <p className="mt-2 text-sm text-stone-400">{invitation.event_address}</p>
          )}
          {invitation.maps_url && (
            <a
              href={invitation.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-stone-900 hover:bg-stone-200 transition"
            >
              Lihat Lokasi
            </a>
          )}
        </Reveal>
      </section>

      {/* ===== Galeri ===== */}
      {invitation.gallery_images && invitation.gallery_images.length > 0 && (
        <section className="px-6 py-20">
          <Reveal className="mx-auto max-w-4xl">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400 text-center">Galeri</p>
            <h2 className="w-font-display mt-4 text-3xl text-center text-stone-900">Momen Bahagia</h2>
            <div className="mt-10 columns-2 md:columns-3 gap-3 [&>div]:mb-3">
              {invitation.gallery_images.map((src, i) => (
                <div key={i} className="overflow-hidden rounded-2xl break-inside-avoid">
                  <img src={src} alt={`Galeri ${i + 1}`} className="w-full object-cover hover:scale-105 transition duration-500" loading="lazy" />
                </div>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ===== Cerita ===== */}
      {invitation.story_text && (
        <section className="px-6 py-20 bg-stone-50">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Our Story</p>
            <h2 className="w-font-display mt-4 text-3xl text-stone-900">Cerita Kami</h2>
            <p className="mt-8 whitespace-pre-line leading-loose text-stone-600">{invitation.story_text}</p>
          </Reveal>
        </section>
      )}

      {/* ===== Penutup ===== */}
      <footer className="px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-xl">
          <p className="text-sm leading-relaxed text-stone-500">
            Kehadiran dan doa restu Bapak/Ibu/Saudara/i merupakan kehormatan
            besar bagi kami dan keluarga.
          </p>
          <p className="w-font-display mt-8 text-2xl text-stone-900">
            {invitation.bride_name} &amp; {invitation.groom_name}
          </p>
          <p className="mt-8 text-xs text-stone-400">Dibuat dengan ♥ di Undangkan Aja</p>
        </Reveal>
      </footer>
    </div>
  )
}
