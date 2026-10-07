'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { coupleDetailsSchema, type CoupleDetailsInput } from '@/lib/validations/invitation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { generateSlug } from '@/lib/utils/invitation'

interface CoupleDetailsFormProps {
  invitationId: string
  initialData?: any
}

export function CoupleDetailsForm({ invitationId, initialData }: CoupleDetailsFormProps) {
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CoupleDetailsInput>({
    resolver: zodResolver(coupleDetailsSchema),
    defaultValues: initialData
  })
  
  // Auto-save on blur (debounced)
  const brideName = watch('bride_name')
  const groomName = watch('groom_name')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (brideName && groomName) {
        const newSlug = generateSlug(brideName, groomName)
        supabase
          .from('invitations')
          .update({ slug: newSlug })
          .eq('id', invitationId)
          .then(() => console.log('Slug auto-updated'))
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [brideName, groomName, invitationId, supabase])
  
  const onSubmit = async (data: CoupleDetailsInput) => {
    try {
      setSaving(true)
      setSuccess(false)
      
      const { error } = await supabase
        .from('invitations')
        .update({
          bride_name: data.bride_name,
          groom_name: data.groom_name,
          event_date: new Date(data.event_date).toISOString(),
          event_location: data.event_location,
          event_address: data.event_address || null,
          story_text: data.story_text || null,
          custom_message: data.custom_message || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', invitationId)
      
      if (error) throw error
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setSaving(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {success && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-800">
          Data berhasil disimpan!
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Pengantin Wanita *
          </label>
          <input
            {...register('bride_name')}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {errors.bride_name && (
            <p className="mt-1 text-sm text-red-600">{errors.bride_name.message}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nama Pengantin Pria *
          </label>
          <input
            {...register('groom_name')}
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {errors.groom_name && (
            <p className="mt-1 text-sm text-red-600">{errors.groom_name.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Tanggal & Waktu Acara *
        </label>
        <input
          {...register('event_date')}
          type="datetime-local"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {errors.event_date && (
          <p className="mt-1 text-sm text-red-600">{errors.event_date.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nama Lokasi *
        </label>
        <input
          {...register('event_location')}
          type="text"
          placeholder="Contoh: Grand Ballroom Hotel XYZ"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        {errors.event_location && (
          <p className="mt-1 text-sm text-red-600">{errors.event_location.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Alamat Lengkap (Opsional)
        </label>
        <textarea
          {...register('event_address')}
          rows={2}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cerita Kami (Opsional)
        </label>
        <textarea
          {...register('story_text')}
          rows={4}
          placeholder="Ceritakan perjalanan cinta Anda..."
          maxLength={1000}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">Maksimal 1000 karakter</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Pesan Khusus (Opsional)
        </label>
        <textarea
          {...register('custom_message')}
          rows={2}
          placeholder="Pesan pembuka untuk tamu..."
          maxLength={500}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">Maksimal 500 karakter</p>
      </div>
      
      <div className="flex justify-between">
        <a
          href={`/dashboard/invitations/${invitationId}/media`}
          className="rounded-lg bg-gray-600 px-6 py-2 text-white hover:bg-gray-700"
        >
          Upload Media →
        </a>
        
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>
    </form>
  )
}
