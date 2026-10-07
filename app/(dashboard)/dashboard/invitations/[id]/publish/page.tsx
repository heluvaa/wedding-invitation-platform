import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const instant = false

export default async function PublishPage({
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
  
  // Validate completeness
  const isComplete = 
    invitation.bride_name &&
    invitation.groom_name &&
    invitation.event_date &&
    invitation.event_location
  
  const publicUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/${invitation.slug}`
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Publish Undangan</h1>
      
      <div className="mt-8 space-y-6">
        {/* Status */}
        <div className="rounded-lg border bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Status Undangan</h2>
          
          <div className="mt-4 space-y-3">
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${invitation.bride_name && invitation.groom_name ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="ml-3 text-sm text-gray-700">
                Nama pengantin lengkap
              </span>
            </div>
            
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${invitation.event_date ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="ml-3 text-sm text-gray-700">
                Tanggal acara diisi
              </span>
            </div>
            
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${invitation.event_location ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="ml-3 text-sm text-gray-700">
                Lokasi acara diisi
              </span>
            </div>
            
            <div className="flex items-center">
              <div className={`h-3 w-3 rounded-full ${invitation.cover_image_url ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <span className="ml-3 text-sm text-gray-700">
                Foto cover (opsional)
              </span>
            </div>
          </div>
        </div>
        
        {/* Publish Actions */}
        {isComplete ? (
          <div className="rounded-lg border bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {invitation.published ? 'Undangan Sudah Dipublikasikan' : 'Siap Dipublikasi'}
            </h2>
            
            {invitation.published ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-gray-600">
                  Undangan Anda sudah live dan dapat diakses melalui link berikut:
                </p>
                
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-mono text-gray-700">{publicUrl}</p>
                </div>
                
                <div className="flex space-x-4">
                  <Link
                    href={`/${invitation.slug}`}
                    target="_blank"
                    className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                  >
                    Lihat Undangan
                  </Link>
                  
                  <button
                    onClick={() => navigator.clipboard.writeText(publicUrl)}
                    className="rounded-lg bg-gray-600 px-6 py-2 text-white hover:bg-gray-700"
                  >
                    Salin Link
                  </button>
                </div>
              </div>
            ) : (
              <form action={`/api/invitations/${id}/publish`} method="POST" className="mt-4">
                <button
                  type="submit"
                  className="rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
                >
                  Publikasikan Sekarang
                </button>
              </form>
            )}
          </div>
        ) : (
          <div className="rounded-lg bg-yellow-50 p-6">
            <h2 className="text-lg font-semibold text-yellow-900">
              Undangan Belum Lengkap
            </h2>
            <p className="mt-2 text-sm text-yellow-800">
              Lengkapi data wajib sebelum publikasi
            </p>
            
            <Link
              href={`/dashboard/invitations/${id}/edit`}
              className="mt-4 inline-block rounded-lg bg-yellow-600 px-6 py-2 text-white hover:bg-yellow-700"
            >
              Lengkapi Data
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
