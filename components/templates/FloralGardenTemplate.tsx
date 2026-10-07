'use client'

import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate } from '@/lib/utils/invitation'
import { Reveal } from './Reveal'
import { useCountdown } from './useCountdown'
import './wedding.css'

const PHOTO = 'https://images.unsplash.com/photo-1469259943454-aa100abba749?auto=format&fit=crop&w=1000&q=80'

export function FloralGardenTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const cd = useCountdown(invitation.event_date)
  const units = [
    { v: cd.days, l: 'Hari' },
    { v: cd.hours, l: 'Jam' },
    { v: cd.minutes, l: 'Menit' },
    { v: cd.seconds, l: 'Detik' },
  ]

  return (
    <div className="w-font-body min-h-screen bg-[#fdf6f4] text-stone-800">
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 py-2 text-center text-xs text-rose-700 backdrop-blur-sm">
          Dibuat dengan ♥ di <span className="font-semibold">Undangkan Aja</span>
        </div>
      )}

      {/* ===== Cover ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: `url(${invitation.cover_image_url || PHOTO})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f4] via-[#fdf6f4]/40 to-[#fdf6f4]" />
        <Reveal className="relative z-10">
          <p className="w-font-accent italic text-rose-600 text-xl">Undangan Pernikahan</p>
          <div className="w-divider my-6"><span className="text-rose-400">❀</span></div>
          <h1 className="w-font-display text-5xl md:text-7xl text-stone-900 leading-tight">{invitation.bride_name}</h1>
          <p className="w-font-accent italic text-3xl md:text-4xl text-rose-500 my-4">&</p>
          <h1 className="w-font-display text-5xl md:text-7xl text-stone-900 leading-tight">{invitation.groom_name}</h1>
          <p className="mt-8 text-stone-500 tracking-[0.25em] uppercase text-sm">{formatEventDate(invitation.event_date)}</p>
          {guest && (
            <p className="mt-6 text-sm text-stone-500">Kepada Yth.<br /><span className="text-lg text-stone-800 font-medium">{guest.name}</span></p>
          )}
        </Reveal>
        <Reveal delay={2} className="relative z-10 mt-10">
          <div className="flex gap-3 justify-center">
            {units.map((u) => (
              <div key={u.l} className="w-16 md:w-20 rounded-2xl bg-white/80 border border-rose-100 py-3 backdrop-blur-sm shadow-sm">
                <p className="w-font-display text-2xl md:text-3xl text-rose-600">{u.v}</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-400">{u.l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== Mempelai ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="w-font-accent italic text-rose-600 text-lg">Assalamu&apos;alaikum Wr. Wb.</p>
          <p className="mt-4 text-stone-500 leading-relaxed">Dengan penuh syukur ke hadirat Allah SWT, kami bermaksud menyatukan putra-putri kami:</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {[
              { n: invitation.bride_name, r: 'Mempelai Wanita' },
              { n: invitation.groom_name, r: 'Mempelai Pria' },
            ].map((p) => (
              <div key={p.r} className="rounded-3xl bg-white border border-rose-100 p-8 shadow-sm">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-rose-200">
                  <img src={PHOTO} alt={p.n} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <h3 className="w-font-display text-2xl text-stone-900 mt-4">{p.n}</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-400 mt-1">{p.r}</p>
              </div>
            ))}
          </div>
          {invitation.custom_message && (
            <p className="mt-10 w-font-accent italic text-xl text-rose-600">“{invitation.custom_message}”</p>
          )}
        </Reveal>
      </section>

      {/* ===== Acara ===== */}
      <section className="px-6 py-20 bg-white">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="w-font-display text-3xl md:text-4xl text-stone-900">Waktu &amp; Tempat</h2>
          <div className="w-divider my-6"><span className="text-rose-400">❀</span></div>
          <div className="rounded-3xl border border-rose-100 bg-[#fdf6f4] p-8">
            <p className="w-font-display text-2xl text-rose-700">{formatEventDate(invitation.event_date)}</p>
            <p className="mt-4 text-xl text-stone-800">{invitation.event_location}</p>
            {invitation.event_address && <p className="mt-2 text-sm text-stone-500">{invitation.event_address}</p>}
            {invitation.maps_url && (
              <a href={invitation.maps_url} target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-rose-600 px-8 py-3 text-sm text-white hover:bg-rose-700 transition">
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
            <h2 className="w-font-display text-3xl text-center text-stone-900">Galeri Momen</h2>
            <div className="w-divider my-6"><span className="text-rose-400">❀</span></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {invitation.gallery_images.map((src, i) => (
                <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="overflow-hidden rounded-2xl aspect-square shadow-sm">
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
            <h2 className="w-font-display text-3xl text-stone-900">Cerita Kami</h2>
            <div className="w-divider my-6"><span className="text-rose-400">❀</span></div>
            <p className="whitespace-pre-line leading-loose text-stone-600">{invitation.story_text}</p>
          </Reveal>
        </section>
      )}

      {/* ===== Amplop ===== */}
      <section className="px-6 py-20">
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="w-font-display text-3xl text-stone-900">Amplop Digital</h2>
          <p className="mt-3 text-sm text-stone-500 leading-relaxed">
            Doa restu Anda adalah hadiah terindah. Namun jika berkenan memberi tanda kasih,
            kami sediakan dengan penuh syukur.
          </p>
          <div className="w-divider my-6"><span className="text-rose-400">❀</span></div>
          <p className="text-stone-500 text-sm">Informasi rekening tersedia setelah konfirmasi kehadiran.</p>
        </Reveal>
      </section>

      <footer className="px-6 py-16 text-center border-t border-rose-100 bg-white">
        <Reveal>
          <p className="text-stone-500 text-sm leading-relaxed max-w-xl mx-auto">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
          <p className="w-font-accent italic text-rose-600 text-xl mt-8">{invitation.bride_name} &amp; {invitation.groom_name}</p>
          <p className="text-xs text-stone-400 mt-8">Dibuat dengan ♥ di Undangkan Aja</p>
        </Reveal>
      </footer>
    </div>
  )
}
