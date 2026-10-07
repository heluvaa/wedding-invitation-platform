'use client'

import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate } from '@/lib/utils/invitation'
import { Reveal } from './Reveal'
import { useCountdown } from './useCountdown'
import './wedding.css'

const PHOTO = 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80'

export function IslamiTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const cd = useCountdown(invitation.event_date)
  const units = [
    { v: cd.days, l: 'Hari' },
    { v: cd.hours, l: 'Jam' },
    { v: cd.minutes, l: 'Menit' },
    { v: cd.seconds, l: 'Detik' },
  ]

  return (
    <div className="w-font-body min-h-screen bg-[#f4f8f5] text-emerald-950">
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-emerald-950/90 py-2 text-center text-xs text-amber-200 backdrop-blur-sm">
          Dibuat dengan ♥ di <span className="font-semibold">Undangkan Aja</span>
        </div>
      )}

      {/* ===== Cover ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${invitation.cover_image_url || PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8f5] via-emerald-950/20 to-[#f4f8f5]" />
        <Reveal className="relative z-10">
          <p className="text-emerald-100 text-sm tracking-[0.3em] uppercase bg-emerald-950/40 inline-block px-6 py-2 rounded-full backdrop-blur-sm">
            Undangan Pernikahan
          </p>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-amber-400">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <h1 className="w-font-display text-5xl md:text-7xl text-white leading-tight drop-shadow-lg">{invitation.bride_name}</h1>
          <p className="w-font-accent italic text-3xl md:text-4xl text-amber-300 my-4 drop-shadow">&</p>
          <h1 className="w-font-display text-5xl md:text-7xl text-white leading-tight drop-shadow-lg">{invitation.groom_name}</h1>
          <p className="mt-8 text-emerald-50 tracking-[0.25em] uppercase text-sm drop-shadow">{formatEventDate(invitation.event_date)}</p>
          {guest && (
            <p className="mt-6 text-sm text-emerald-50 drop-shadow">Kepada Yth.<br /><span className="text-lg text-white font-medium">{guest.name}</span></p>
          )}
        </Reveal>
        <Reveal delay={2} className="relative z-10 mt-10">
          <div className="flex gap-3 justify-center">
            {units.map((u) => (
              <div key={u.l} className="w-16 md:w-20 rounded-2xl bg-emerald-950/60 border border-amber-300/30 py-3 backdrop-blur-md">
                <p className="w-font-display text-2xl md:text-3xl text-amber-300">{u.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-emerald-100/70">{u.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Ayat & Mempelai ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="w-font-accent italic text-lg text-emerald-800 leading-relaxed">
            “Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu agar kamu merasa tenteram, dan Dia menjadikan di antaramu rasa kasih dan sayang.”
          </p>
          <p className="text-sm text-emerald-600 mt-3">— QS. Ar-Rūm: 21 —</p>
          <div className="flex items-center justify-center gap-3 my-10" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-300" />
            <span className="text-emerald-600">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-300" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { n: invitation.bride_name, r: 'Mempelai Wanita' },
              { n: invitation.groom_name, r: 'Mempelai Pria' },
            ].map((p) => (
              <div key={p.r} className="rounded-3xl bg-white border border-emerald-100 p-8 shadow-sm">
                <h3 className="w-font-display text-2xl text-emerald-950">{p.n}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 mt-2">{p.r}</p>
              </div>
            ))}
          </div>
          {invitation.custom_message && (
            <p className="mt-10 w-font-accent italic text-xl text-emerald-800">“{invitation.custom_message}”</p>
          )}
        </Reveal>
      </section>

      {/* ===== Acara ===== */}
      <section className="px-6 py-20 bg-emerald-950 text-emerald-50">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="w-font-display text-3xl md:text-4xl text-white">Waktu &amp; Tempat</h2>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
            <span className="text-amber-400">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
          </div>
          <div className="rounded-3xl border border-amber-300/25 bg-white/5 p-8 backdrop-blur-sm">
            <p className="w-font-display text-2xl text-amber-300">{formatEventDate(invitation.event_date)}</p>
            <p className="mt-4 text-xl text-white">{invitation.event_location}</p>
            {invitation.event_address && <p className="mt-2 text-sm text-emerald-100/70">{invitation.event_address}</p>}
            {invitation.maps_url && (
              <a href={invitation.maps_url} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-amber-400 px-8 py-3 text-sm font-medium text-emerald-950 hover:bg-amber-300 transition">
                Buka Google Maps
              </a>
            )}
          </div>
        </Reveal>
      </section>

      {/* ===== Galeri ===== */}
      {invitation.gallery_images && invitation.gallery_images.length > 0 && (
        <section className="px-6 py-20">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="w-font-display text-3xl text-center text-emerald-950">Galeri Momen</h2>
            <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-300" />
              <span className="text-emerald-600">✦</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-300" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {invitation.gallery_images.map((src, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="overflow-hidden rounded-2xl aspect-square">
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
        <section className="px-6 py-20 bg-white">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="w-font-display text-3xl text-emerald-950">Cerita Kami</h2>
            <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-300" />
              <span className="text-emerald-600">✦</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-300" />
            </div>
            <p className="whitespace-pre-line leading-loose text-emerald-900/80">{invitation.story_text}</p>
          </Reveal>
        </section>
      )}

      {/* ===== Amplop ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="w-font-display text-3xl text-emerald-950">Amplop Digital</h2>
          <p className="mt-3 text-sm text-emerald-900/70 leading-relaxed">
            Doa restu Anda adalah hadiah terindah. Namun jika berkenan memberi tanda kasih,
            kami sediakan dengan penuh syukur.
          </p>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-300" />
            <span className="text-emerald-600">✦</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-300" />
          </div>
          <p className="text-emerald-900/70 text-sm">Informasi rekening tersedia setelah konfirmasi kehadiran.</p>
        </Reveal>
      </section>

      <footer className="px-6 py-16 text-center bg-emerald-950 text-emerald-100/70">
        <Reveal>
          <p className="text-sm leading-relaxed max-w-xl mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
          <p className="w-font-accent italic text-amber-300 text-xl mt-8">{invitation.bride_name} &amp; {invitation.groom_name}</p>
          <p className="text-xs text-emerald-100/40 mt-8">Dibuat dengan ♥ di Undangkan Aja</p>
        </Reveal>
      </footer>
    </div>
  )
}
