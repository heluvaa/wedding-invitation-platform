'use client'

import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate } from '@/lib/utils/invitation'
import { Reveal } from './Reveal'
import { useCountdown } from './useCountdown'
import './wedding.css'

const PHOTO = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80'

export function JawaTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const cd = useCountdown(invitation.event_date)
  const units = [
    { v: cd.days, l: 'Dinten' },
    { v: cd.hours, l: 'Jam' },
    { v: cd.minutes, l: 'Menit' },
    { v: cd.seconds, l: 'Detik' },
  ]

  return (
    <div className="w-font-body min-h-screen bg-[#1d0f0c] text-[#f3e4c8]">
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 py-2 text-center text-xs text-amber-300 backdrop-blur-sm">
          Dibuat dengan ♥ di <span className="font-semibold">Undangkan Aja</span>
        </div>
      )}

      {/* ===== Cover ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${invitation.cover_image_url || PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1d0f0c] via-transparent to-[#1d0f0c]" />
        {/* batik-inspired top/bottom borders */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" aria-hidden="true" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700" aria-hidden="true" />
        <Reveal className="relative z-10">
          <p className="w-font-accent italic text-amber-300 text-xl">Sugeng Rawuh</p>
          <p className="text-[#c8a882] text-xs uppercase tracking-[0.3em] mt-2">Undangan Pernikahan</p>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-amber-400">❖</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <h1 className="w-font-display text-5xl md:text-7xl text-[#f7ead0] leading-tight">{invitation.bride_name}</h1>
          <p className="w-font-accent italic text-3xl md:text-4xl text-amber-400 my-4">lan</p>
          <h1 className="w-font-display text-5xl md:text-7xl text-[#f7ead0] leading-tight">{invitation.groom_name}</h1>
          <p className="mt-8 text-[#c8a882] tracking-[0.25em] uppercase text-sm">{formatEventDate(invitation.event_date)}</p>
          {guest && (
            <p className="mt-6 text-sm text-[#c8a882]">Dhumateng Panjenengan<br /><span className="text-lg text-[#f7ead0] font-medium">{guest.name}</span></p>
          )}
        </Reveal>
        <Reveal delay={2} className="relative z-10 mt-10">
          <div className="flex gap-3 justify-center">
            {units.map((u) => (
              <div key={u.l} className="w-16 md:w-20 rounded-xl bg-white/5 border border-amber-500/30 py-3 backdrop-blur-sm">
                <p className="w-font-display text-2xl md:text-3xl text-amber-300">{u.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#c8a882]">{u.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Mempelai ===== */}
      <section className="px-6 py-20 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" aria-hidden="true" />
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="w-font-accent italic text-amber-300 text-lg">Assalamu&apos;alaikum Wr. Wb.</p>
          <p className="mt-4 text-[#c8a882] leading-relaxed">
            Kanthi memuji syukur dhumateng Gusti Allah SWT, kawula bermaksud ngawontenaken
            resepsi pernikahan putra-putri kawula:
          </p>
          <div className="mt-10 space-y-6">
            {[
              { n: invitation.bride_name, r: 'Mempelai Putri' },
              { n: invitation.groom_name, r: 'Mempelai Kakung' },
            ].map((p) => (
              <div key={p.r} className="rounded-2xl border border-amber-500/25 bg-white/[0.04] p-8">
                <h3 className="w-font-display text-3xl text-[#f7ead0]">{p.n}</h3>
                <p className="text-xs uppercase tracking-[0.25em] text-amber-400 mt-2">{p.r}</p>
              </div>
            ))}
          </div>
          {invitation.custom_message && (
            <p className="mt-10 w-font-accent italic text-xl text-amber-300">“{invitation.custom_message}”</p>
          )}
        </Reveal>
      </section>

      {/* ===== Acara ===== */}
      <section className="px-6 py-20 bg-[#2a1510]">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="w-font-display text-3xl md:text-4xl text-[#f7ead0]">Wekdal &amp; Papan</h2>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-amber-400">❖</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <div className="rounded-2xl border border-amber-500/25 bg-white/[0.04] p-8">
            <p className="w-font-display text-2xl text-amber-300">{formatEventDate(invitation.event_date)}</p>
            <p className="mt-4 text-xl text-[#f7ead0]">{invitation.event_location}</p>
            {invitation.event_address && <p className="mt-2 text-sm text-[#c8a882]">{invitation.event_address}</p>}
            {invitation.maps_url && (
              <a href={invitation.maps_url} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-amber-500 px-8 py-3 text-sm font-medium text-[#1d0f0c] hover:bg-amber-400 transition">
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
            <h2 className="w-font-display text-3xl text-center text-[#f7ead0]">Galeri</h2>
            <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-400">❖</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {invitation.gallery_images.map((src, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="overflow-hidden rounded-xl aspect-square border border-amber-500/20">
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
        <section className="px-6 py-20 bg-[#2a1510]">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="w-font-display text-3xl text-[#f7ead0]">Cariyos Kawula</h2>
            <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
              <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-amber-400">❖</span>
              <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <p className="whitespace-pre-line leading-loose text-[#c8a882]">{invitation.story_text}</p>
          </Reveal>
        </section>
      )}

      {/* ===== Amplop ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="w-font-display text-3xl text-[#f7ead0]">Amplop Digital</h2>
          <p className="mt-3 text-sm text-[#c8a882] leading-relaxed">
            Donga restu panjenengan inggih menika bebungah ingkang paling endah.
            Menawi kepareng paring tandha sih, kawula aturaken matur nuwun.
          </p>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-amber-400">❖</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
          </div>
          <p className="text-[#c8a882] text-sm">Informasi rekening tersedia setelah konfirmasi kehadiran.</p>
        </Reveal>
      </section>

      <footer className="px-6 py-16 text-center border-t border-amber-500/20">
        <Reveal>
          <p className="text-[#c8a882] text-sm leading-relaxed max-w-xl mx-auto">
            Awit saking punika, keparenga kawula ngaturaken matur nuwun ingkang tanpa upami
            dhumateng rawuh panjenengan.
          </p>
          <p className="w-font-accent italic text-amber-300 text-xl mt-8">{invitation.bride_name} &amp; {invitation.groom_name}</p>
          <p className="text-xs text-[#8a6f4d] mt-8">Dibuat dengan ♥ di Undangkan Aja</p>
        </Reveal>
      </footer>
    </div>
  )
}
