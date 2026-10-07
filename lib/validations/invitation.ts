import { z } from 'zod'

export const coupleDetailsSchema = z.object({
  bride_name: z.string().min(2, 'Nama pengantin wanita wajib diisi'),
  groom_name: z.string().min(2, 'Nama pengantin pria wajib diisi'),
  event_date: z.string().min(1, 'Tanggal acara wajib diisi'),
  event_location: z.string().min(3, 'Lokasi acara wajib diisi'),
  event_address: z.string().optional(),
  story_text: z.string().optional(),
  custom_message: z.string().optional()
})

export type CoupleDetailsInput = z.infer<typeof coupleDetailsSchema>
