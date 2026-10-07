'use client'

import { TemplateProps } from '@/lib/templates/types'
import { formatEventDate, formatEventTime } from '@/lib/utils/invitation'
import { useEffect, useState } from 'react'

export default function ElegantSimpleTemplate({ invitation, guest, isPreview }: TemplateProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const eventTime = new Date(invitation.event_date).getTime()
      const distance = eventTime - now
      
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)
    
    return () => clearInterval(timer)
  }, [invitation.event_date])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Watermark for free tier */}
      {invitation.user?.tier === 'free' && !isPreview && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 py-2 text-center text-xs text-gray-600 backdrop-blur-sm">
          Dibuat dengan ❤️ di <span className="font-semibold">Wedding Invitation Platform</span>
        </div>
      )}
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
        {invitation.cover_image_url && (
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src={invitation.cover_image_url} 
              alt="Cover" 
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        <div className="relative z-10 text-center">
          {guest && (
            <p className="mb-4 text-sm text-gray-600">
              Kepada Yth. Bapak/Ibu
            </p>
          )}
          
          {guest && (
            <p className="mb-8 text-xl font-semibold text-gray-900">
              {guest.name}
            </p>
          )}
          
          <h1 className="mb-2 font-serif text-5xl font-bold text-gray-900 md:text-7xl">
            {invitation.bride_name}
          </h1>
          <p className="mb-2 text-3xl text-gray-600">&</p>
          <h1 className="mb-8 font-serif text-5xl font-bold text-gray-900 md:text-7xl">
            {invitation.groom_name}
          </h1>
          
          <p className="text-lg text-gray-600">
            {formatEventDate(invitation.event_date)}
          </p>
          
          {/* Countdown */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item) => (
              <div key={item.label} className="rounded-lg bg-white/80 p-4 backdrop-blur-sm">
                <p className="text-3xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Event Details */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 font-serif text-3xl font-bold text-gray-900">
            Detail Acara
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Tanggal & Waktu</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatEventDate(invitation.event_date)}
              </p>
              <p className="text-gray-700">
                {formatEventTime(invitation.event_date)}
              </p>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">Lokasi</p>
              <p className="text-lg font-semibold text-gray-900">
                {invitation.event_location}
              </p>
              {invitation.event_address && (
                <p className="text-sm text-gray-700">
                  {invitation.event_address}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Story Section */}
      {invitation.story_text && (
        <section className="bg-rose-50 py-16 px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 font-serif text-3xl font-bold text-gray-900">
              Cerita Kami
            </h2>
            <p className="whitespace-pre-line text-gray-700">
              {invitation.story_text}
            </p>
          </div>
        </section>
      )}
      
      {/* RSVP Section Placeholder */}
      <section className="bg-white py-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 font-serif text-3xl font-bold text-gray-900">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-gray-600">Form RSVP akan ditambahkan di task berikutnya</p>
        </div>
      </section>
      
      {/* Guestbook Placeholder */}
      <section className="bg-rose-50 py-16 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-8 font-serif text-3xl font-bold text-gray-900">
            Ucapan & Doa
          </h2>
          <p className="text-gray-600">Guestbook akan ditambahkan di task berikutnya</p>
        </div>
      </section>
    </div>
  )
}
