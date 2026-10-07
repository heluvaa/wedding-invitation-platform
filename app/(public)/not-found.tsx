export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">Undangan tidak ditemukan</p>
        <p className="mt-2 text-gray-500">
          Link undangan mungkin salah atau undangan belum dipublikasikan
        </p>
      </div>
    </div>
  )
}
