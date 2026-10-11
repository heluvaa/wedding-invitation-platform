'use client'

import { useEffect, useState } from 'react'
import InvitationForm, { isoToLocalInput, type InvitationFormValues } from '@/components/invitations/PublicInvitationForm'

// Token edit diambil dari fragment (#t=...) supaya tidak terkirim ke server atau masuk log.
export function PublicInvitationEdit({ invitationId }: { invitationId: string }) {
  const [token, setToken] = useState<string | null>(null)
  const [initial, setInitial] = useState<InvitationFormValues | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const m = window.location.hash.match(/t=([^&]+)/)
    const t = m?.[1] ?? null
    setToken(t)
    if (!t) {
      setError('Link edit tidak lengkap. Gunakan link edit lengkap yang diberikan saat undangan dibuat.')
      return
    }
    fetch(`/api/public/invitations/${invitationId}`, { headers: { 'x-edit-token': t } })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Gagal memuat undangan')
        setInitial({
          template_id: data.template_id,
          bride_name: data.bride_name ?? '',
          groom_name: data.groom_name ?? '',
          event_date: data.event_date ? isoToLocalInput(data.event_date) : '',
          event_location: data.event_location ?? '',
          event_address: data.event_address ?? '',
          maps_url: data.maps_url ?? '',
          story_text: data.story_text ?? '',
          custom_message: data.custom_message ?? '',
          cover_image_url: data.cover_image_url ?? '',
          gallery_text: (data.gallery_images ?? []).join('\n'),
        })
      })
      .catch((e) => setError(e instanceof Error ? e.message : 'Gagal memuat'))
  }, [invitationId])

  if (error) return <Shell><p className="rounded-xl bg-rose-50 px-4 py-3 text-rose-700">{error}</p></Shell>
  if (!initial || !token) return <Shell><p className="text-stone-600">Memuat…</p></Shell>

  return (
    <Shell>
      <InvitationForm mode="edit" initial={initial} editToken={token} invitationId={invitationId} />
    </Shell>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#FDF9F3] px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl text-stone-900">Edit undangan</h1>
        <p className="mt-2 text-sm text-stone-600">
          Ubah data di bawah, lalu tekan <b>Simpan perubahan</b>. Link undangan yang sudah dibagikan
          ke tamu akan langsung menampilkan data terbaru. Tidak perlu kirim ulang.
        </p>
        <div className="mt-8">{children}</div>
      </div>
    </main>
  )
}
