'use client'

import { useSearchParams } from 'next/navigation'
import InvitationForm, { EMPTY_VALUES, TEMPLATE_OPTIONS } from '@/components/invitations/PublicInvitationForm'

export function PublicInvitationCreate() {
  const params = useSearchParams()
  const tema = params.get('tema')
  const valid = TEMPLATE_OPTIONS.some((t) => t.id === tema)
  const initial = valid ? { ...EMPTY_VALUES, template_id: tema! } : EMPTY_VALUES

  return (
    <main className="min-h-screen bg-[#FDF9F3] px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl text-stone-900">Buat undangan</h1>
        <p className="mt-2 text-stone-600">Tidak perlu daftar akun. Ikuti 3 langkah ini:</p>
        <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm text-stone-700">
          <li>Pilih tema, lalu isi nama mempelai, tanggal, dan lokasi acara.</li>
          <li>Tekan <b>Simpan &amp; Bagikan</b>. Kamu akan dapat dua link.</li>
          <li>Bagikan link undangan ke tamu lewat WhatsApp. Simpan link edit untuk mengubah data nanti.</li>
        </ol>
        <p className="mt-3 text-xs text-stone-500">Kolom bertanda (opsional) boleh dikosongkan. Foto cover dan galeri diisi dengan link gambar (URL).</p>
        <div className="mt-8">
          <InvitationForm mode="create" initial={initial} />
        </div>
      </div>
    </main>
  )
}
