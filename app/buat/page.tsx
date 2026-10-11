import type { Metadata } from 'next'
import { PublicInvitationCreate } from '@/components/invitations/PublicInvitationCreate'

export const metadata: Metadata = {
  title: 'Buat Undangan — Undangkan Aja',
  description: 'Buat undangan pernikahan digital gratis tanpa daftar akun.',
}

export default function BuatPage() {
  return <PublicInvitationCreate />
}
