'use client'

import { TEMPLATES } from '@/lib/templates/registry'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useUser } from '@/lib/hooks/useUser'

export default function NewInvitationPage() {
  const router = useRouter()
  const { user } = useUser()
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  
  const handleSelectTemplate = async (templateId: string) => {
    try {
      setCreating(true)
      setError(null)
      
      if (!user) {
        setError('User not found')
        return
      }
      
      // Check if free tier user already has invitation
      if (user.tier === 'free') {
        const { count } = await supabase
          .from('invitations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
        
        if (count && count >= 1) {
          setError('Anda sudah mencapai batas undangan untuk tier gratis')
          return
        }
      }
      
      // Create draft invitation
      const { data: invitation, error: insertError } = await supabase
        .from('invitations')
        .insert({
          user_id: user.id,
          template_id: templateId,
          slug: `draft-${Date.now()}`,
          bride_name: '',
          groom_name: '',
          event_date: new Date().toISOString(),
          event_location: '',
          published: false
        })
        .select()
        .single()
      
      if (insertError) {
        setError(insertError.message)
        return
      }
      
      router.push(`/dashboard/invitations/${invitation.id}/edit`)
    } catch (err) {
      setError('Terjadi kesalahan saat membuat undangan')
    } finally {
      setCreating(false)
    }
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Pilih Template</h1>
      <p className="mt-2 text-gray-600">
        Pilih desain template untuk undangan Anda
      </p>
      
      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}
      
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => {
          const isLocked = template.tierRequired === 'premium' && user?.tier === 'free'
          
          return (
            <div
              key={template.id}
              className="group relative rounded-lg border bg-white p-6 hover:shadow-lg transition-shadow"
            >
              {isLocked && (
                <div className="absolute top-4 right-4 z-10 rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-white">
                  Premium
                </div>
              )}
              
              <div className="mb-4 h-48 rounded bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Preview</span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900">
                {template.name}
              </h3>
              
              <p className="mt-2 text-sm text-gray-600">
                {template.description}
              </p>
              
              <button
                onClick={() => handleSelectTemplate(template.id)}
                disabled={isLocked || creating}
                className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium ${
                  isLocked
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:bg-gray-300`}
              >
                {isLocked ? 'Upgrade untuk Unlock' : creating ? 'Membuat...' : 'Gunakan Template'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
