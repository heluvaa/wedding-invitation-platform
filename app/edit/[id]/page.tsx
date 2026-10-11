import { connection } from 'next/server'
import type { Metadata } from 'next'
import { PublicInvitationEdit } from '@/components/invitations/PublicInvitationEdit'

export const instant = false

export const metadata: Metadata = {
  title: 'Edit Undangan — Undangkan Aja',
  robots: { index: false, follow: false },
}

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  await connection()
  const { id } = await params
  return <PublicInvitationEdit invitationId={id} />
}
