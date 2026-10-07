/**
 * Generate URL-friendly slug from bride and groom names
 */
export function generateSlug(brideName: string, groomName: string): string {
  const bride = brideName.trim().toLowerCase().replace(/\s+/g, '-')
  const groom = groomName.trim().toLowerCase().replace(/\s+/g, '-')
  const timestamp = Date.now().toString(36).slice(-4)
  
  return `${bride}-${groom}-${timestamp}`
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .slice(0, 100)
}

/**
 * Format event date for display
 */
export function formatEventDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format event time for display
 */
export function formatEventTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta'
  })
}
