import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CoupleDetailsForm } from '@/components/invitations/CoupleDetailsForm'

export const instant = false

export default async function EditInvitationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('id', id)
    .eq('user_id', session.user.id)
    .single()
  
  if (!invitation) {
    redirect('/dashboard/invitations')
  }
  
  // Format date for datetime-local input
  const formattedDate = invitation.event_date
    ? new Date(invitation.event_date).toISOString().slice(0, 16)
    : ''
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Edit Undangan</h1>
      <p className="mt-2 text-gray-600">
        Lengkapi detail acara pernikahan Anda
      </p>
      
      <div className="mt-8 rounded-lg border bg-white p-6">
        <CoupleDetailsForm
          invitationId={invitation.id}
          initialData={{
            bride_name: invitation.bride_name,
            groom_name: invitation.groom_name,
            event_date: formattedDate,
            event_location: invitation.event_location,
            event_address: invitation.event_address || '',
            story_text: invitation.story_text || '',
            custom_message: invitation.custom_message || ''
          }}
        />
      </div>
    </div>
  )
}
