'use client'

import { Reveal } from './Reveal'
import { ThemeShell, Countdown, Gallery, Venue, Envelope, Guestbook, MusicToggle, Footer, type Palette } from './ThemeKit'
import type { TemplateProps } from '@/lib/templates/types'
import './wedding.css'

// Tema 1: Tropis Botanik — hijau tua + krem, serif besar.
const TROPIS: Palette = {
  bg: '#f4efe2', ink: '#1f3a2a', soft: '#4f5f4f', accent: '#2d6a4f', card: '#fbf8ee', line: '#cfd8b8',
  btnInk: '#fbf8ee', display: 'font-display', accentFont: 'font-accent italic', body: 'font-body',
}

// Tema 2: Malam Berbintang — navy + emas pucat, resepsi malam.
const MALAM: Palette = {
  bg: '#0b1433', ink: '#f2ead3', soft: '#b9bfd6', accent: '#e3c98b', card: '#131f45', line: '#2b3c70',
  btnInk: '#0b1433', display: 'font-display', accentFont: 'font-accent italic', body: 'font-body',
}

// Tema 3: Vintage Polaroid — krem hangat, nostalgia.
const POLAROID: Palette = {
  bg: '#f1e6d0', ink: '#3b2f22', soft: '#6b5a44', accent: '#9a4f2c', card: '#fbf5e8', line: '#d8c6a4',
  btnInk: '#fbf5e8', display: 'font-display', accentFont: 'font-accent italic', body: 'font-body',
}

// Tema 4: Minimal Monokrom — hitam putih tegas, editorial.
const MONO: Palette = {
  bg: '#ffffff', ink: '#111111', soft: '#555555', accent: '#111111', card: '#f5f5f5', line: '#111111',
  btnInk: '#ffffff', display: 'font-display uppercase tracking-tight', accentFont: 'font-accent italic', body: 'font-body',
}

function Page({ invitation, p, title, pic }: TemplateProps & { p: Palette; title: string; pic?: string }) {
  const heroBg = invitation.cover_image_url || pic
  return (
    <ThemeShell invitation={invitation} p={p}>
      <MusicToggle src={invitation.music_url ?? ''} p={p} />
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {heroBg && <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${heroBg})` }} />}
        <Reveal className="relative z-10">
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: p.soft }}>{title}</p>
          <h1 className={`${p.display} mt-6 text-6xl md:text-8xl`}>{invitation.bride_name}</h1>
          <p className={`${p.accentFont} my-3 text-3xl`} style={{ color: p.accent }}>&amp;</p>
          <h1 className={`${p.display} text-6xl md:text-8xl`}>{invitation.groom_name}</h1>
          <p className="mt-8 text-sm tracking-[0.2em] uppercase" style={{ color: p.soft }}>{formatDate(invitation.event_date)}</p>
        </Reveal>
        <Reveal delay={2} className="relative z-10 mt-12">
          <Countdown target={invitation.event_date} p={p} />
        </Reveal>
      </section>

      {invitation.custom_message && (
        <Reveal className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className={`${p.accentFont} text-2xl leading-relaxed`}>“{invitation.custom_message}”</p>
        </Reveal>
      )}

      {invitation.story_text && (
        <Reveal className="mx-auto max-w-2xl px-6 py-16 text-center">
          <h2 className={`${p.display} text-3xl`}>Cerita Kami</h2>
          <p className="mt-6 whitespace-pre-line leading-loose" style={{ color: p.soft }}>{invitation.story_text}</p>
        </Reveal>
      )}

      <Reveal><Venue invitation={invitation} p={p} /></Reveal>
      <Reveal><Gallery images={invitation.gallery_images ?? []} p={p} /></Reveal>
      <Reveal><Envelope invitation={invitation} p={p} /></Reveal>
      <Reveal><Guestbook invitationId={invitation.id} p={p} /></Reveal>
      <Footer invitation={invitation} p={p} />
    </ThemeShell>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })
}

export function TropisTemplate(props: TemplateProps) {
  return <Page {...props} p={TROPIS} title="Undangan Pernikahan" pic="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80" />
}

export function MalamTemplate(props: TemplateProps) {
  return <Page {...props} p={MALAM} title="Resepsi Malam" pic="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80" />
}

export function PolaroidTemplate(props: TemplateProps) {
  return <Page {...props} p={POLAROID} title="Dengan penuh cinta" pic="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=80" />
}

export function MonoTemplate(props: TemplateProps) {
  return <Page {...props} p={MONO} title="Undangan" />
}
