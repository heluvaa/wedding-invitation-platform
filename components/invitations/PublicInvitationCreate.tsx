'use client'

import InvitationForm, { EMPTY_VALUES } from '@/components/invitations/PublicInvitationForm'

export function PublicInvitationCreate() {
  return (
    <main className="min-h-screen bg-[#FDF9F3] px-5 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl text-stone-900">Buat undangan</h1>
        <p className="mt-2 text-stone-600">Isi data, simpan, lalu bagikan link ke tamu. Tidak perlu daftar akun.</p>
        <div className="mt-8">
          <InvitationForm mode="create" initial={EMPTY_VALUES} />
        </div>
      </div>
    </main>
  )
}
