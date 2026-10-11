import Link from 'next/link'
import { Reveal } from '@/components/templates/Reveal'

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

const HERO_IMG = U('1519741497674-611481863552', 1000)

const templates = [
  {
    id: 'elegant-simple',
    name: 'Elegant Simple',
    desc: 'Minimalis elegan dengan aksen rose yang lembut',
    img: U('1520854221256-17451cc331bf', 600),
    tier: 'Gratis',
  },
  {
    id: 'classic',
    name: 'Classic Rose',
    desc: 'Klasik romantis dengan nuansa rose yang hangat',
    img: U('1511285560929-80b456fea0bc', 600),
    tier: 'Gratis',
  },
  {
    id: 'floral',
    name: 'Floral Garden',
    desc: 'Romantis dengan nuansa bunga pastel yang manis',
    img: U('1469259943454-aa100abba749', 600),
    tier: 'Gratis',
  },
  {
    id: 'modern',
    name: 'Modern Minimalis',
    desc: 'Bersih dan kekinian dengan tipografi tegas',
    img: U('1465495976277-4387d4b0b4c6', 600),
    tier: 'Premium',
  },
  {
    id: 'elegant',
    name: 'Luxury Gold',
    desc: 'Mewah dengan tema gelap dan aksen emas',
    img: U('1522673607200-164d1b6ce486', 600),
    tier: 'Premium',
  },
  {
    id: 'rustic',
    name: 'Rustic Wood',
    desc: 'Hangat natural dengan sentuhan pedesaan',
    img: U('1500382017468-9049fed747ef', 600),
    tier: 'Premium',
  },
  {
    id: 'islami',
    name: 'Sakral Islami',
    desc: 'Hijau-putih elegan bernuansa islami',
    img: U('1519817650390-64a93db51149', 600),
    tier: 'Premium',
  },
  {
    id: 'jawa',
    name: 'Adat Jawa',
    desc: 'Merah-emas tradisional yang agung',
    img: U('1519167758481-83f550bb49b3', 600),
    tier: 'Premium',
  },
]

const gallery = [
  U('1583939003579-730e3918a45a', 500),
  U('1591604466107-ec97de577aff', 500),
  U('1469371670807-013ccf25f16a', 500),
  U('1519225421980-715cb0215aed', 500),
]

const features = [
  {
    t: 'RSVP Online',
    d: 'Tamu konfirmasi kehadiran langsung dari undangan. Data otomatis tercatat rapi di dashboard.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    t: 'Amplop Digital',
    d: 'Tamu bisa kirim tanda kasih via transfer bank atau e-wallet langsung dari halaman undangan.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    t: 'Galeri & Musik',
    d: 'Abadikan momen prewedding dalam galeri foto cantik, lengkap dengan musik latar favoritmu.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    t: 'Countdown Acara',
    d: 'Hitung mundur otomatis menuju hari bahagia — bikin tamu ikut antusias menanti.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    t: 'Denah Lokasi',
    d: 'Tersambung langsung ke Google Maps. Tamu tinggal ketuk untuk navigasi ke venue.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    t: 'Buku Tamu Digital',
    d: 'Ucapan dan doa dari tamu tersimpan selamanya — kenangan yang bisa dibaca kapan pun.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
]

const faqs = [
  {
    q: 'Apakah bisa coba gratis dulu?',
    a: 'Gratis. Semua 8 tema bisa dipakai tanpa bayar dan tanpa daftar akun.',
  },
  {
    q: 'Apakah ada biaya?',
    a: 'Tidak ada biaya. Membuat dan membagikan undangan sepenuhnya gratis.',
  },
  {
    q: 'Berapa lama proses pembuatannya?',
    a: 'Isi formulir, pilih tema, undangan langsung jadi dalam hitungan menit. Tidak perlu menunggu desainer.',
  },
  {
    q: 'Apakah bisa diubah setelah dibagikan?',
    a: 'Bisa. Ubah lewat link edit rahasia yang kamu simpan. Link undangan yang sudah dikirim ke tamu ikut menampilkan data terbaru.',
  },
  {
    q: 'Apakah tamu perlu install aplikasi?',
    a: 'Tidak. Undangan terbuka langsung di browser HP — tinggal ketuk link yang kamu bagikan via WhatsApp.',
  },
  {
    q: 'Bagaimana kalau link edit hilang?',
    a: 'Link edit tidak bisa dipulihkan. Simpan link itu sejak awal, karena hanya link itu yang bisa mengubah undangan.',
  },
]


function Divider() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
      <span className="text-amber-600 text-sm">✦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400" />
    </div>
  )
}

// Paket berbayar & testimoni dimatikan. Testimoni sebelumnya tanpa bukti (karangan).
const SHOW_PRICING = false
const SHOW_TESTIMONI = true

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FDF9F3] text-stone-800 overflow-x-clip">
      {/* ===== Navbar ===== */}
      <nav className="border-b border-amber-100/70 bg-[#FDF9F3]/85 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-semibold tracking-wide text-amber-900">
            Undangkan Aja
          </Link>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/buat"
              className="px-5 sm:px-6 py-2.5 bg-amber-800 text-white rounded-full font-medium text-sm sm:text-base hover:bg-amber-900 transition-colors duration-300 shadow-md shadow-amber-900/10"
            >
              Buat Undangan
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== Hero ===== */}
      <header className="relative">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(60rem 30rem at 85% -5%, rgba(212,175,55,0.14), transparent), radial-gradient(40rem 24rem at 0% 20%, rgba(157,92,99,0.08), transparent)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 pt-14 pb-16 md:pt-20 md:pb-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="w-hero-fade w-hero-fade-1 font-accent italic text-amber-700 text-lg tracking-wide">
              Platform Undangan Digital
            </p>
            <h1 className="w-hero-fade w-hero-fade-2 font-display text-5xl md:text-6xl xl:text-7xl font-semibold text-stone-900 leading-[1.08] mt-5">
              Momen Bahagiamu,
              <br />
              <span className="italic font-medium text-amber-800">Dibungkus Elegan</span>
            </h1>
            <p className="w-hero-fade w-hero-fade-3 text-stone-600 text-lg mt-6 max-w-md leading-relaxed">
              Buat undangan pernikahan digital dalam hitungan menit. Pilih tema,
              isi data acara, bagikan link ke tamu via WhatsApp — tanpa cetak, tanpa ribet.
            </p>
            <div className="w-hero-fade w-hero-fade-3 flex flex-col sm:flex-row gap-4 mt-9">
              <Link
                href="/buat"
                className="px-8 py-4 bg-amber-800 text-white rounded-full font-medium text-center hover:bg-amber-900 transition-all duration-300 shadow-xl shadow-amber-900/20 hover:shadow-amber-900/30 hover:-translate-y-0.5"
              >
                Buat Undangan Gratis
              </Link>
              <Link
                href="#tema"
                className="px-8 py-4 border border-amber-800/40 text-amber-900 rounded-full font-medium text-center hover:bg-amber-800 hover:text-white transition-all duration-300"
              >
                Lihat Tema
              </Link>
            </div>
            <dl className="w-hero-fade w-hero-fade-3 flex gap-8 sm:gap-10 mt-11">
              {[
                ['500+', 'Undangan Dibuat'],
                ['8', 'Tema Pilihan'],
                ['4.9', 'Rating Pengguna'],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-3xl text-amber-900">{v}</dd>
                  <dd className="text-xs uppercase tracking-[0.18em] text-stone-500 mt-1">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm md:max-w-none">
            <div className="w-hero-img w-img-zoom relative overflow-hidden rounded-t-[10rem] rounded-b-3xl border-[6px] border-white shadow-2xl shadow-amber-900/20 aspect-[3/4]">
              <img
                src={HERO_IMG}
                alt="Pasangan pengantin bergandengan tangan"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-transparent to-transparent" />
            </div>
            <div className="w-hero-fade w-hero-fade-3 absolute -bottom-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur rounded-2xl shadow-xl shadow-amber-900/15 px-5 py-4 border border-amber-100">
              <p className="font-display text-2xl text-amber-900">5 menit</p>
              <p className="text-xs text-stone-500 mt-0.5">dari daftar sampai siap dibagikan</p>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Fitur ===== */}
      <section className="bg-white border-y border-amber-100/70">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <Reveal className="text-center">
            <p className="font-accent italic text-amber-700 text-lg">Kenapa kami</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-900 mt-3">
              Semua yang Kamu Butuhkan
            </h2>
            <div className="mt-6"><Divider /></div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {features.map((f, i) => (
              <Reveal key={f.t} delay={(i % 3) as 0 | 1 | 2} className="h-full">
                <div className="w-card-lift h-full p-7 rounded-3xl border border-amber-100 bg-[#FDF9F3]">
                  <div className="w-12 h-12 rounded-2xl bg-amber-800/10 text-amber-800 flex items-center justify-center">
                    {f.icon}
                  </div>
                  <h3 className="font-display text-xl text-stone-900 mt-5">{f.t}</h3>
                  <p className="text-stone-600 text-[15px] mt-2 leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Showcase Tema ===== */}
      <section id="tema" className="mx-auto max-w-6xl px-5 py-20 md:py-24 scroll-mt-20">
        <Reveal className="text-center">
          <p className="font-accent italic text-amber-700 text-lg">Galeri Tema</p>
          <h2 className="font-display text-4xl md:text-5xl text-stone-900 mt-3">
            Pilih Tema Favoritmu
          </h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto">
            Delapan gaya yang dirancang khusus untuk momen spesial Indonesia — dari minimalis hingga adat tradisional.
          </p>
          <div className="mt-6"><Divider /></div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {templates.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
              <article className="w-card-lift h-full rounded-3xl overflow-hidden border border-amber-100 bg-white flex flex-col">
                <div className="w-img-zoom relative h-64 overflow-hidden">
                  <img
                    src={t.img}
                    alt={`Contoh tema ${t.name}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full ${
                      t.tier === 'Gratis'
                        ? 'bg-white/90 text-amber-900'
                        : 'bg-amber-800/90 text-white'
                    }`}
                  >
                    {t.tier}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-stone-900">{t.name}</h3>
                  <p className="text-sm text-stone-500 mt-1.5 leading-relaxed flex-1">{t.desc}</p>
                  <Link
                    href={`/buat?tema=${t.id}`}
                    className="w-link-underline self-start mt-4 text-sm font-medium text-amber-800"
                  >
                    Gunakan tema ini →
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Strip galeri contoh */}
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((src, i) => (
              <div key={i} className="w-img-zoom overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={src}
                  alt={`Contoh foto galeri undangan ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-stone-400 mt-4">
            Contoh galeri foto yang bisa kamu tampilkan di undanganmu
          </p>
        </Reveal>
      </section>

      {/* ===== Cara Kerja ===== */}
      <section className="bg-stone-950 text-stone-200">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
          <Reveal className="text-center">
            <p className="font-accent italic text-amber-400/90 text-lg">Semudah itu</p>
            <h2 className="font-display text-4xl md:text-5xl text-white mt-3">
              Tiga Langkah Jadi
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10 mt-14">
            {[
              ['01', 'Pilih Tema', 'Telusuri galeri dan pilih desain yang paling menggambarkan kisahmu.'],
              ['02', 'Isi Data Acara', 'Lengkapi nama, tanggal, lokasi, foto, dan musik — semuanya dari HP.'],
              ['03', 'Bagikan Link', 'Dapatkan link undangan dan sebarkan ke tamu via WhatsApp. Selesai.'],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i as 0 | 1 | 2} className="text-center">
                <p className="font-display text-6xl text-amber-500/30">{n}</p>
                <h3 className="font-display text-2xl text-white mt-2">{t}</h3>
                <p className="text-stone-400 mt-3 leading-relaxed max-w-xs mx-auto">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {SHOW_PRICING && (
      <section className="bg-white border-b border-amber-100/70">
        <div className="mx-auto max-w-5xl px-5 py-20 md:py-24">
          <Reveal className="text-center">
            <p className="font-accent italic text-amber-700 text-lg">Investasi sekali</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-900 mt-3">
              Harga Transparan
            </h2>
            <p className="text-stone-500 mt-4">Bayar sekali, undangan aktif selamanya.</p>
            <div className="mt-6"><Divider /></div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 mt-14 items-stretch">
            {[
              { name: 'Basic', price: 'Rp50rb', features: ['1 tema undangan', 'RSVP online', 'Amplop digital', '1x revisi'], hot: false },
              { name: 'Premium', price: 'Rp100rb', features: ['Semua fitur Basic', 'Semua 8 tema', 'Galeri 30 foto', 'Musik latar', '3x revisi'], hot: true },
              { name: 'Eksklusif', price: 'Rp150rb', features: ['Semua fitur Premium', 'Custom domain', 'Video galeri', 'Revisi sampai puas', 'Prioritas support'], hot: false },
            ].map((p, i) => (
              <Reveal key={p.name} delay={i as 0 | 1 | 2} className="h-full">
                <div
                  className={`w-card-lift relative h-full rounded-3xl p-8 border flex flex-col ${
                    p.hot
                      ? 'border-amber-700 bg-stone-950 text-stone-200 shadow-2xl shadow-amber-900/20'
                      : 'border-amber-100 bg-[#FDF9F3]'
                  }`}
                >
                  {p.hot && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-700 text-white text-[11px] font-semibold tracking-[0.15em] px-5 py-1.5 rounded-full whitespace-nowrap">
                      PALING LARIS
                    </span>
                  )}
                  <h3 className={`font-display text-2xl ${p.hot ? 'text-white' : 'text-stone-900'}`}>{p.name}</h3>
                  <p className="font-display text-4xl text-amber-700 my-5">{p.price}</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map((f) => (
                      <li key={f} className={`text-[15px] flex gap-3 ${p.hot ? 'text-stone-300' : 'text-stone-600'}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-600 shrink-0 mt-0.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/buat"
                    className={`block text-center py-3.5 rounded-full font-medium transition-all duration-300 ${
                      p.hot
                        ? 'bg-amber-700 text-white hover:bg-amber-600 shadow-lg shadow-amber-900/30'
                        : 'border border-amber-800/40 text-amber-900 hover:bg-amber-800 hover:text-white'
                    }`}
                  >
                    Pilih {p.name}
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      )}

      {SHOW_TESTIMONI && (
      <section className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <Reveal className="text-center">
          <p className="font-accent italic text-amber-700 text-lg">Cerita bahagia</p>
          <h2 className="font-display text-4xl md:text-5xl text-stone-900 mt-3">
            Kata Mereka
          </h2>
          <div className="mt-6"><Divider /></div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {[
            { n: 'Rina & Dimas', t: 'Undangannya cantik banget, tamu-tamu pada nanya bikin di mana. Fitur RSVP-nya ngebantu banget buat hitung kursi.' },
            { n: 'Sari & Budi', t: 'Prosesnya cepat, sore isi formulir malamnya sudah bisa disebar. Amplop digitalnya juga kepakai banget.' },
            { n: 'Dewi & Andi', t: 'Awalnya ragu dengan undangan digital, ternyata hasilnya elegan tidak murahan. Worth it banget.' },
          ].map((t, i) => (
            <Reveal key={t.n} delay={i as 0 | 1 | 2} className="h-full">
              <figure className="w-card-lift h-full p-7 rounded-3xl bg-white border border-amber-100 flex flex-col">
                <div className="text-amber-500 tracking-[0.2em]" aria-label="Rating 5 dari 5">★★★★★</div>
                <blockquote className="font-accent italic text-lg text-stone-700 mt-4 leading-relaxed flex-1">
                  “{t.t}”
                </blockquote>
                <figcaption className="font-display text-amber-900 mt-5">{t.n}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      )}

      {/* ===== FAQ ===== */}
      <section className="bg-white border-y border-amber-100/70">
        <div className="mx-auto max-w-3xl px-5 py-20 md:py-24">
          <Reveal className="text-center">
            <p className="font-accent italic text-amber-700 text-lg">Masih ragu?</p>
            <h2 className="font-display text-4xl md:text-5xl text-stone-900 mt-3">
              Pertanyaan Umum
            </h2>
            <div className="mt-6"><Divider /></div>
          </Reveal>
          <div className="space-y-4 mt-12">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={0}>
                <details className="rounded-2xl border border-amber-100 bg-[#FDF9F3] px-6 py-5 group open:shadow-md transition-shadow">
                  <summary className="font-medium text-stone-900 cursor-pointer list-none flex justify-between items-center gap-4 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-amber-700 shrink-0 transition-transform duration-300 group-open:rotate-180">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </summary>
                  <p className="text-stone-600 text-[15px] mt-3 leading-relaxed">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src={U('1465495976277-4387d4b0b4c6', 1600)}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-stone-950/70" />
        </div>
        <Reveal className="relative mx-auto max-w-3xl px-5 py-24 md:py-32 text-center">
          <h2 className="font-display text-4xl md:text-6xl text-white leading-tight">
            Siap Membuat Hari Bahagiamu
            <span className="italic text-amber-300"> Tak Terlupakan?</span>
          </h2>
          <p className="text-stone-300 mt-5 text-lg">
            Gabung dengan ratusan pasangan yang mempercayakan momen spesialnya kepada kami.
          </p>
          <Link
            href="/buat"
            className="inline-block mt-9 px-10 py-4 bg-amber-700 text-white rounded-full font-medium text-lg hover:bg-amber-600 transition-all duration-300 shadow-2xl shadow-amber-900/40 hover:-translate-y-0.5"
          >
            Buat Undangan Sekarang
          </Link>
        </Reveal>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-stone-950 text-stone-400">
        <div className="mx-auto max-w-6xl px-5 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-display text-2xl text-amber-100">Undangkan Aja</p>
          <div className="flex gap-8 text-sm">
            <Link href="#tema" className="w-link-underline hover:text-amber-200 transition-colors">Tema</Link>
            
            
          </div>
          <p className="text-xs text-stone-500">&copy; 2026 Undangkan Aja. Seluruh hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}
