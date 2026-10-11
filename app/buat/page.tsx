import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PublicInvitationCreate } from '@/components/invitations/PublicInvitationCreate'

export const metadata: Metadata = {
  title: 'Buat Undangan — Undangkan Aja',
  description: 'Buat undangan pernikahan digital gratis tanpa daftar akun.',
}

export default function BuatPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#FDF9F3]" />}>
      <PublicInvitationCreate />
    </Suspense>
  )
}
