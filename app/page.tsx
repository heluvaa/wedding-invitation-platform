import Link from 'next/link'

const templates = [
  { name: 'Elegan Gold', desc: 'Klasik mewah dengan aksen emas', bg: 'bg-gradient-to-br from-amber-50 to-yellow-100', accent: 'text-amber-700' },
  { name: 'Floral Blush', desc: 'Lembut dengan motif bunga', bg: 'bg-gradient-to-br from-rose-50 to-pink-100', accent: 'text-rose-700' },
  { name: 'Modern Minimalis', desc: 'Bersih dan kekinian', bg: 'bg-gradient-to-br from-stone-100 to-neutral-200', accent: 'text-stone-700' },
  { name: 'Adat Jawa', desc: 'Nuansa tradisional elegan', bg: 'bg-gradient-to-br from-red-50 to-amber-100', accent: 'text-red-800' },
]

const faqs = [
  {
    q: 'Apakah bisa coba gratis dulu?',
    a: 'Bisa. Paket Basic Rp50.000 sudah termasuk 1 tema undangan, RSVP, dan amplop digital. Kamu juga bisa lihat semua contoh tema sebelum bayar.',
  },
  {
    q: 'Bagaimana cara pembayarannya?',
    a: 'Via QRIS atau DANA. Setelah pembayaran terkonfirmasi, undanganmu langsung aktif dan bisa dibagikan.',
  },
  {
    q: 'Berapa lama proses pembuatannya?',
    a: 'Isi form, pilih tema, langsung jadi dalam hitungan menit. Tidak perlu tunggu desainer.',
  },
  {
    q: 'Apakah bisa revisi setelah jadi?',
    a: 'Bisa. Paket Basic 1x revisi, Premium 3x revisi, Eksklusif revisi sampai cocok.',
  },
  {
    q: 'Apakah tamu perlu install aplikasi?',
    a: 'Tidak. Undangan dibuka langsung di browser HP, tinggal klik link yang kamu bagikan via WhatsApp.',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDF9F3] text-stone-800">
      {/* Navbar */}
      <nav className="border-b border-amber-100 bg-[#FDF9F3]/90 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold text-amber-800">
            Undangkan Aja
          </Link>
          <div className="flex gap-3">
            <Link
              href="/login"
              className="px-5 py-2 text-amber-800 font-medium hover:underline"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-5 py-2 bg-amber-700 text-white rounded-full font-medium hover:bg-amber-800"
            >
              Buat Undangan
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <p className="text-amber-700 font-medium tracking-wide uppercase text-sm mb-4">
          Platform Undangan Digital
        </p>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6 leading-tight">
          Undangan Pernikahan Digital<br />yang <span className="text-amber-700">Elegan &amp; Berkesan</span>
        </h1>
        <p className="text-lg text-stone-600 mb-10 max-w-2xl mx-auto">
          Buat undangan pernikahan digital dalam hitungan menit. Pilih tema,
          isi data acara, bagikan link ke tamu via WhatsApp — tanpa cetak, tanpa ribet.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-amber-700 text-white rounded-full font-semibold text-lg hover:bg-amber-800 shadow-lg"
          >
            Buat Undangan Gratis
          </Link>
          <Link
            href="#template"
            className="px-8 py-4 border-2 border-amber-700 text-amber-800 rounded-full font-semibold text-lg hover:bg-amber-50"
          >
            Lihat Tema
          </Link>
        </div>
        <div className="flex justify-center gap-8 mt-12 text-center">
          <div>
            <p className="text-3xl font-bold text-amber-800">500+</p>
            <p className="text-sm text-stone-500">Undangan Dibuat</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-800">10+</p>
            <p className="text-sm text-stone-500">Tema Premium</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-amber-800">4.9</p>
            <p className="text-sm text-stone-500">Rating Pengguna</p>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="bg-white border-y border-amber-100">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-4">
            Kenapa Undangkan Aja?
          </h2>
          <p className="text-center text-stone-500 mb-12 max-w-xl mx-auto">
            Semua yang kamu butuhkan untuk undangan digital yang profesional
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: 'RSVP Online', d: 'Tamu konfirmasi kehadiran langsung dari undangan. Data otomatis tercatat di dashboard.' },
              { t: 'Amplop Digital', d: 'Tamu bisa kirim hadiah via transfer bank atau e-wallet langsung dari undangan.' },
              { t: 'Galeri & Musik', d: 'Upload foto prewedding dan tambah musik latar favoritmu.' },
              { t: 'Countdown Acara', d: 'Hitung mundur otomatis ke hari bahagiamu, bikin tamu makin antusias.' },
              { t: 'Denah Lokasi', d: 'Tersambung ke Google Maps, tamu tinggal klik untuk navigasi.' },
              { t: 'Buku Tamu Digital', d: 'Tamu bisa tulis ucapan dan doa yang tersimpan selamanya.' },
            ].map((f) => (
              <div key={f.t} className="p-6 rounded-2xl border border-amber-100 bg-[#FDF9F3] hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-stone-900 mb-2">{f.t}</h3>
                <p className="text-stone-600 text-sm">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template */}
      <section id="template" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-4">
          Pilih Tema Favoritmu
        </h2>
        <p className="text-center text-stone-500 mb-12">
          Didesain khusus untuk momen spesial Indonesia
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((t) => (
            <div key={t.name} className="rounded-2xl overflow-hidden border border-amber-100 bg-white hover:shadow-lg transition">
              <div className={`${t.bg} h-48 flex items-center justify-center`}>
                <div className="text-center px-4">
                  <p className={`font-serif text-2xl ${t.accent}`}>A &amp; B</p>
                  <p className="text-xs text-stone-500 mt-1">12 . 12 . 2026</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-stone-900">{t.name}</h3>
                <p className="text-sm text-stone-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Harga */}
      <section className="bg-white border-y border-amber-100">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-4">
            Harga Transparan
          </h2>
          <p className="text-center text-stone-500 mb-12">
            Bayar sekali, undangan aktif selamanya
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Basic', price: 'Rp50rb', features: ['1 tema undangan', 'RSVP online', 'Amplop digital', '1x revisi'], hot: false },
              { name: 'Premium', price: 'Rp100rb', features: ['Semua fitur Basic', '10+ tema premium', 'Galeri 30 foto', 'Musik latar', '3x revisi'], hot: true },
              { name: 'Eksklusif', price: 'Rp150rb', features: ['Semua fitur Premium', 'Custom domain', 'Video galeri', 'Revisi sampai cocok', 'Prioritas support'], hot: false },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-8 border-2 ${p.hot ? 'border-amber-600 bg-amber-50 shadow-lg relative' : 'border-amber-100 bg-[#FDF9F3]'}`}
              >
                {p.hot && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-xs font-bold px-4 py-1 rounded-full">
                    PALING LARIS
                  </span>
                )}
                <h3 className="font-serif text-xl font-bold text-stone-900">{p.name}</h3>
                <p className="text-3xl font-bold text-amber-800 my-4">{p.price}</p>
                <ul className="space-y-2 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="text-sm text-stone-600 flex gap-2">
                      <span className="text-amber-700">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-3 rounded-full font-semibold ${p.hot ? 'bg-amber-700 text-white hover:bg-amber-800' : 'border-2 border-amber-700 text-amber-800 hover:bg-amber-50'}`}
                >
                  Pilih {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-12">
          Kata Mereka
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: 'Rina & Dimas', t: 'Undangannya cantik banget, tamu-tamu pada nanya bikin di mana. RSVP-nya ngebantu banget buat hitung kursi.' },
            { n: 'Sari & Budi', t: 'Prosesnya cepat, sore isi form malamnya udah bisa disebar. Amplop digitalnya juga kepake banget.' },
            { n: 'Dewi & Andi', t: 'Awalnya ragu undangan digital, ternyata hasilnya elegan nggak murahan. Worth it banget.' },
          ].map((t) => (
            <div key={t.n} className="p-6 rounded-2xl bg-white border border-amber-100">
              <p className="text-stone-600 italic mb-4">“{t.t}”</p>
              <p className="font-semibold text-amber-800">{t.n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white border-y border-amber-100">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-center text-stone-900 mb-12">
            Pertanyaan Umum
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-amber-100 bg-[#FDF9F3] p-5 group">
                <summary className="font-semibold text-stone-900 cursor-pointer list-none flex justify-between items-center">
                  {f.q}
                  <span className="text-amber-700 group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-stone-600 text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
          Siap Buat Hari Bahagiamu Tak Terlupakan?
        </h2>
        <p className="text-stone-600 mb-8">
          Gabung dengan ratusan pasangan yang sudah mempercayakan undangan digitalnya kepada kami.
        </p>
        <Link
          href="/register"
          className="inline-block px-10 py-4 bg-amber-700 text-white rounded-full font-semibold text-lg hover:bg-amber-800 shadow-lg"
        >
          Buat Undangan Sekarang
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-amber-100 bg-white">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="font-serif font-bold text-amber-800 text-lg mb-2">Undangkan Aja</p>
          <p className="text-sm text-stone-500">&copy; 2026 Undangkan Aja. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
