import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const instant = false

export default async function InvitationsPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  const { data: invitations } = await supabase
    .from('invitations')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
  
  const canCreateNew = user?.tier !== 'free' || (invitations?.length || 0) < 1
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Undangan Saya</h1>
        
        {canCreateNew ? (
          <Link
            href="/dashboard/invitations/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Buat Undangan Baru
          </Link>
        ) : (
          <button
            disabled
            className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500 cursor-not-allowed"
            title="Anda sudah mencapai batas undangan (1) untuk tier gratis. Upgrade ke Premium untuk membuat lebih banyak"
          >
            Buat Undangan Baru
          </button>
        )}
      </div>
      
      {!canCreateNew && (
        <div className="mt-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800">
          Anda sudah mencapai batas undangan (1) untuk tier gratis.{' '}
          <Link href="/dashboard/upgrade" className="font-medium underline">
            Upgrade ke Premium
          </Link>{' '}
          untuk membuat lebih banyak undangan.
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {invitations?.map((invitation) => (
          <div
            key={invitation.id}
            className="rounded-lg border bg-white p-6 hover:shadow-lg transition-shadow"
          >
            {invitation.cover_image_url && (
              <img
                src={invitation.cover_image_url}
                alt="Cover"
                className="mb-4 h-32 w-full rounded object-cover"
              />
            )}
            
            <h3 className="text-lg font-semibold text-gray-900">
              {invitation.bride_name} & {invitation.groom_name}
            </h3>
            
            <p className="mt-1 text-sm text-gray-600">
              {new Date(invitation.event_date).toLocaleDateString('id-ID')}
            </p>
            
            <div className="mt-4 flex items-center space-x-2">
              <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                invitation.published
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {invitation.published ? 'Published' : 'Draft'}
              </span>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <Link
                href={`/dashboard/invitations/${invitation.id}/edit`}
                className="flex-1 rounded bg-blue-600 px-3 py-2 text-center text-sm text-white hover:bg-blue-700"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
        
        {invitations?.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">Belum ada undangan. Buat yang pertama!</p>
          </div>
        )}
      </div>
    </div>
  )
}
