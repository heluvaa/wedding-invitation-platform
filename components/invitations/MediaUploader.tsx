'use client'

import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import Image from 'next/image'

interface MediaUploaderProps {
  invitationId: string
  userId: string
  currentCoverImage?: string | null
  currentGalleryImages?: string[] | null
}

export function MediaUploader({
  invitationId,
  userId,
  currentCoverImage,
  currentGalleryImages
}: MediaUploaderProps) {
  const [coverImage, setCoverImage] = useState<string | null>(currentCoverImage || null)
  const [galleryImages, setGalleryImages] = useState<string[]>(currentGalleryImages || [])
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingGallery, setUploadingGallery] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()
  
  const uploadCoverImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingCover(true)
      setError(null)
      
      const file = e.target.files?.[0]
      if (!file) return
      
      // Validate file
      if (!file.type.startsWith('image/')) {
        setError('File harus berupa gambar')
        return
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Ukuran file maksimal 5MB')
        return
      }
      
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}/${invitationId}/cover-${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('invitation-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) throw uploadError
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('invitation-media')
        .getPublicUrl(uploadData.path)
      
      // Update invitation record
      const { error: updateError } = await supabase
        .from('invitations')
        .update({ cover_image_url: publicUrl })
        .eq('id', invitationId)
      
      if (updateError) throw updateError
      
      setCoverImage(publicUrl)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploadingCover(false)
    }
  }
  
  const uploadGalleryImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingGallery(true)
      setError(null)
      
      const files = Array.from(e.target.files || [])
      if (files.length === 0) return
      
      // Validate count
      if (galleryImages.length + files.length > 10) {
        setError('Maksimal 10 gambar galeri')
        return
      }
      
      const uploadedUrls: string[] = []
      
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue
        if (file.size > 5 * 1024 * 1024) continue
        
        const fileExt = file.name.split('.').pop()
        const fileName = `${userId}/${invitationId}/gallery-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('invitation-media')
          .upload(fileName, file)
        
        if (uploadError) continue
        
        const { data: { publicUrl } } = supabase.storage
          .from('invitation-media')
          .getPublicUrl(uploadData.path)
        
        uploadedUrls.push(publicUrl)
      }
      
      const newGallery = [...galleryImages, ...uploadedUrls]
      
      // Update invitation record
      const { error: updateError } = await supabase
        .from('invitations')
        .update({ gallery_images: newGallery })
        .eq('id', invitationId)
      
      if (updateError) throw updateError
      
      setGalleryImages(newGallery)
    } catch (err: any) {
      setError(err.message || 'Gagal mengupload gambar')
    } finally {
      setUploadingGallery(false)
    }
  }
  
  const removeGalleryImage = async (url: string) => {
    try {
      const newGallery = galleryImages.filter(img => img !== url)
      
      const { error: updateError } = await supabase
        .from('invitations')
        .update({ gallery_images: newGallery })
        .eq('id', invitationId)
      
      if (updateError) throw updateError
      
      setGalleryImages(newGallery)
    } catch (err: any) {
      setError(err.message || 'Gagal menghapus gambar')
    }
  }
  
  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}
      
      {/* Cover Image */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Foto Cover</h2>
        <p className="mt-1 text-sm text-gray-600">
          Gambar utama undangan (maksimal 5MB)
        </p>
        
        <div className="mt-4">
          {coverImage ? (
            <div className="relative h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={coverImage}
                alt="Cover"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
              <span className="text-sm text-gray-500">Belum ada cover</span>
            </div>
          )}
          
          <label className="mt-4 inline-flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            {uploadingCover ? 'Mengupload...' : coverImage ? 'Ganti Cover' : 'Upload Cover'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadCoverImage}
              disabled={uploadingCover}
            />
          </label>
        </div>
      </div>
      
      {/* Gallery */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Galeri Foto</h2>
        <p className="mt-1 text-sm text-gray-600">
          Upload hingga 10 foto (maksimal 5MB per foto)
        </p>
        
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((url, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden rounded-lg">
              <Image
                src={url}
                alt={`Gallery ${idx + 1}`}
                fill
                className="object-cover"
              />
              <button
                onClick={() => removeGalleryImage(url)}
                className="absolute top-2 right-2 rounded-full bg-red-600 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          
          {galleryImages.length < 10 && (
            <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="mt-2 block text-sm text-gray-600">
                  {uploadingGallery ? 'Uploading...' : 'Upload'}
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={uploadGalleryImages}
                disabled={uploadingGallery}
              />
            </label>
          )}
        </div>
      </div>
      
      <div className="rounded-lg border bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Preview & Publish</h2>
        <p className="mt-1 text-sm text-gray-600">
          Setelah selesai mengedit, publikasikan undangan Anda
        </p>
        
        <div className="mt-4 flex space-x-4">
          <a
            href={`/dashboard/invitations/${invitationId}/edit`}
            className="rounded-lg bg-gray-600 px-6 py-2 text-white hover:bg-gray-700"
          >
            ← Kembali ke Edit
          </a>
          
          <a
            href={`/dashboard/invitations/${invitationId}/publish`}
            className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
          >
            Publish Undangan
          </a>
        </div>
      </div>
    </div>
  )
}
