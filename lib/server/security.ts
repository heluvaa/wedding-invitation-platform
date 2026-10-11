import { createHash, randomBytes } from 'node:crypto'

// Token mentah hanya ditampilkan sekali ke pembuat. DB cuma simpan SHA-256-nya.
export function newEditToken(): string {
  return randomBytes(24).toString('base64url')
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  const ip = fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  // Hash IP supaya tidak menyimpan IP mentah di tabel rate limit.
  return createHash('sha256').update(ip).digest('hex').slice(0, 32)
}
