import type { Invitation } from '@/lib/types/invitation'
import { formatEventDate } from '@/lib/utils/invitation'
import Image from 'next/image'

interface ClassicTemplateProps {
  invitation: Invitation
}

export function ClassicTemplate({ invitation }: ClassicTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4">
        {invitation.cover_image_url && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={invitation.cover_image_url}
              alt="Cover"
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div className="relative z-10 text-center">
          <h1 className="font-serif text-5xl font-bold text-gray-900 md:text-7xl">
            {invitation.bride_name}
          </h1>
          <div className="my-8 text-4xl text-rose-600">&</div>
          <h1 className="font-serif text-5xl font-bold text-gray-900 md:text-7xl">
            {invitation.groom_name}
          </h1>
          
          <p className="mt-8 text-lg text-gray-700">
            {formatEventDate(invitation.event_date)}
          </p>
          
          {invitation.custom_message && (
            <p className="mt-6 max-w-2xl text-gray-600">
              {invitation.custom_message}
            </p>
          )}
        </div>
      </section>
      
      {/* Story Section */}
      {invitation.story_text && (
        <section className="bg-white px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Cerita Kami
            </h2>
            <p className="mt-6 whitespace-pre-line text-gray-700 leading-relaxed">
              {invitation.story_text}
            </p>
          </div>
        </section>
      )}
      
      {/* Event Details */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Detail Acara
          </h2>
          
          <div className="mt-8 rounded-lg border bg-white p-8 shadow-lg">
            <p className="text-2xl font-semibold text-gray-900">
              {invitation.event_location}
            </p>
            
            {invitation.event_address && (
              <p className="mt-4 text-gray-600">
                {invitation.event_address}
              </p>
            )}
            
            <p className="mt-6 text-lg text-gray-700">
              {formatEventDate(invitation.event_date)}
            </p>
            
            {invitation.maps_url && (
              <a
                href={invitation.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-lg bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
              >
                Buka Google Maps
              </a>
            )}
          </div>
        </div>
      </section>
      
      {/* Gallery */}
      {invitation.gallery_images && invitation.gallery_images.length > 0 && (
        <section className="bg-white px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center font-serif text-3xl font-bold text-gray-900">
              Galeri
            </h2>
            
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {invitation.gallery_images.map((url, idx) => (
                <div key={idx} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt={`Gallery ${idx + 1}`}
                    fill
                    className="object-cover transition-transform hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* RSVP Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Konfirmasi Kehadiran
          </h2>
          
          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              className="w-full rounded-lg border px-4 py-3"
              required
            />
            
            <select className="w-full rounded-lg border px-4 py-3" required>
              <option value="">Pilih Kehadiran</option>
              <option value="hadir">Hadir</option>
              <option value="tidak-hadir">Tidak Hadir</option>
            </select>
            
            <textarea
              placeholder="Ucapan & Doa (opsional)"
              rows={4}
              className="w-full rounded-lg border px-4 py-3"
            />
            
            <button
              type="submit"
              className="w-full rounded-lg bg-rose-600 px-6 py-3 text-white hover:bg-rose-700"
            >
              Kirim Konfirmasi
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
