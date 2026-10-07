'use client'

import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate } from '@/lib/utils/invitation'
import { Reveal } from './Reveal'
import { useCountdown } from './useCountdown'
import './wedding.css'

const PHOTO = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'

export function RusticWoodTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const cd = useCountdown(invitation.event_date)
  const units = [
    { v: cd.days, l: 'Hari' },
    { v: cd.hours, l: 'Jam' },
    { v: cd.minutes, l: 'Menit' },
    { v: cd.seconds, l: 'Detik' },
  ]

  return (
    <div className="w-font-body min-h-screen bg-[#f7f1e6] text-[#4a3f30]">
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#4a3f30]/90 py-2 text-center text-xs text-amber-100 backdrop-blur-sm">
          Dibuat dengan ♥ di <span className="font-semibold">Undangkan Aja</span>
        </div>
      )}

      {/* ===== Cover ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${invitation.cover_image_url || PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f7f1e6] via-[#f7f1e6]/30 to-[#f7f1e6]" />
        <Reveal className="relative z-10">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-800">Undangan Pernikahan</p>
          <div className="mx-auto my-6 h-px w-24 bg-amber-700/40" />
          <h1 className="w-font-display text-5xl md:text-7xl text-[#3a3125] leading-tight">{invitation.bride_name}</h1>
          <p className="w-font-accent italic text-3xl md:text-4xl text-amber-700 my-4">&</p>
          <h1 className="w-font-display text-5xl md:text-7xl text-[#3a3125] leading-tight">{invitation.groom_name}</h1>
          <p className="mt-8 text-[#8a755a] tracking-[0.25em] uppercase text-sm">{formatEventDate(invitation.event_date)}</p>
          {guest && (
            <p className="mt-6 text-sm text-[#8a755a]">Kepada Yth.<br /><span className="text-lg text-[#3a3125] font-medium">{guest.name}</span></p>
          )}
        </Reveal>
        <Reveal delay={2} className="relative z-10 mt-10">
          <div className="flex gap-3 justify-center">
            {units.map((u) => (
              <div key={u.l} className="w-16 md:w-20 rounded-xl bg-white/70 border border-amber-200/60 py-3 backdrop-blur-sm">
                <p className="w-font-display text-2xl md:text-3xl text-amber-800">{u.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-[#8a755a]">{u.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Mempelai ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="w-font-accent italic text-amber-700 text-lg">Assalamu&apos;alaikum Wr. Wb.</p>
          <p className="mt-4 text-[#8a755a] leading-relaxed">Dengan memohon rahmat Allah SWT, kami bermaksud menyatukan putra-putri kami:</p>
          <div className="mt-10 space-y-6">
            {[
              { n: invitation.bride_name, r: 'Mempelai Wanita' },
              { n: invitation.groom_name, r: 'Mempelai Pria' },
            ].map((p) => (
              <div key={p.r} className="rounded-2xl bg-white/60 border border-amber-200/50 p-6 flex items-center gap-5 text-left">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-300/60 shrink-0">
                  <img src={PHOTO} alt={p.n} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div>
                  <h3 className="w-font-display text-2xl text-[#3a3125]">{p.n}</h3>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-700 mt-1">{p.r}</p>
                </div>
              </div>
            ))}
          </div>
          {invitation.custom_message && (
            <p className="mt-10 w-font-accent italic text-xl text-amber-700">“{invitation.custom_message}”</p>
          )}
        </Reveal>
      </section>

      {/* ===== Acara ===== */}
      <section className="px-6 py-20 bg-[#4a3f30] text-amber-50">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="w-font-display text-3xl md:text-4xl">Waktu &amp; Tempat</h2>
          <div className="mx-auto my-6 h-px w-24 bg-amber-400/50" />
          <p className="w-font-display text-2xl text-amber-200">{formatEventDate(invitation.event_date)}</p>
          <p className="mt-4 text-xl">{invitation.event_location}</p>
          {invitation.event_address && <p className="mt-2 text-sm text-amber-100/70">{invitation.event_address}</p>}
          {invitation.maps_url && (
            <a href={invitation.maps_url} target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full border border-amber-300 px-8 py-3 text-sm text-amber-200 hover:bg-amber-300 hover:text-[#4a3f30] transition">
              Buka Google Maps
            </a>
          )}
        </Reveal>
      </section>

      {/* ===== Galeri ===== */}
      {invitation.gallery_images && invitation.gallery_images.length > 0 && (
        <section className="px-6 py-20">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="w-font-display text-3xl text-center text-[#3a3125]">Galeri Momen</h2>
            <div className="mx-auto my-6 h-px w-24 bg-amber-700/40" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {invitation.gallery_images.map((src, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="overflow-hidden rounded-xl aspect-square border-4 border-white shadow-md">
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
        <section className="px-6 py-20 bg-white/50">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="w-font-display text-3xl text-[#3a3125]">Cerita Kami</h2>
            <div className="mx-auto my-6 h-px w-24 bg-amber-700/40" />
            <p className="whitespace-pre-line leading-loose text-[#6b5d48]">{invitation.story_text}</p>
          </Reveal>
        </section>
      )}

      {/* ===== Amplop ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="w-font-display text-3xl text-[#3a3125]">Amplop Digital</h2>
          <p className="mt-3 text-sm text-[#8a755a] leading-relaxed">
            Doa restu Anda adalah hadiah terindah. Namun jika berkenan memberi tanda kasih,
            kami sediakan dengan penuh syukur.
          </p>
          <div className="mx-auto my-6 h-px w-24 bg-amber-700/40" />
          <p className="text-[#8a755a] text-sm">Informasi rekening tersedia setelah konfirmasi kehadiran.</p>
        </Reveal>
      </section>

      <footer className="px-6 py-16 text-center border-t border-amber-200/50">
        <Reveal>
          <p className="text-[#8a755a] text-sm leading-relaxed max-w-xl mx-auto">
            Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir
            dan memberikan doa restu kepada kedua mempelai.
          </p>
          <p className="w-font-accent italic text-amber-700 text-xl mt-8">{invitation.bride_name} &amp; {invitation.groom_name}</p>
          <p className="text-xs text-[#a08c6d] mt-8">Dibuat dengan ♥ di Undangkan Aja</p>
        </Reveal>
      </footer>
    </div>
  )
}
