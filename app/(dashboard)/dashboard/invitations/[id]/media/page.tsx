import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { MediaUploader } from '@/components/invitations/MediaUploader'

export const instant = false

export default async function MediaUploadPage({
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
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Upload Media</h1>
      <p className="mt-2 text-gray-600">
        Upload foto cover dan galeri untuk undangan Anda
      </p>
      
      <div className="mt-8 space-y-8">
        <MediaUploader
          invitationId={invitation.id}
          userId={session.user.id}
          currentCoverImage={invitation.cover_image_url}
          currentGalleryImages={invitation.gallery_images}
        />
      </div>
    </div>
  )
}
