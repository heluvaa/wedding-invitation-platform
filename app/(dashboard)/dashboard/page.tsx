import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const instant = false

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()
  
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  const { data: user } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Selamat datang, {user?.full_name}
      </h1>
      
      <div className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium capitalize border">
        Tier: {user?.tier}
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">Total Undangan</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">Total Tamu</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
        
        <div className="rounded-lg border bg-white p-6">
          <p className="text-sm font-medium text-gray-500">Total RSVP</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
    </div>
  )
}
