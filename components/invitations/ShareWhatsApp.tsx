'use client'

// Tombol bagikan ke WhatsApp. Teks pesan dibangun dari nama mempelai + link undangan.
export function whatsappShareHref(url: string, title: string): string {
  const text = `Kamu diundang ke pernikahan kami.\n${title}\n${url}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

export function ShareWhatsApp({
  url,
  title,
  className = '',
}: {
  url: string
  title: string
  className?: string
}) {
  return (
    <a
      href={whatsappShareHref(url, title)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#1ebe5a] ${className}`}
    >
      Bagikan ke WhatsApp
    </a>
  )
}
