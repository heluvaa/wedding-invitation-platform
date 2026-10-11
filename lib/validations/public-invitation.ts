import { z } from 'zod'

const url = z.string().trim().max(300).refine(
  (v) => v === '' || /^https?:\/\//.test(v),
  'Link harus diawali http:// atau https://'
)

export const invitationInputSchema = z.object({
  template_id: z.enum([
    'elegant-simple', 'classic', 'modern', 'elegant',
    'floral', 'rustic', 'islami', 'jawa',
  ]),
  bride_name: z.string().trim().min(2, 'Nama mempelai wanita minimal 2 karakter').max(80),
  groom_name: z.string().trim().min(2, 'Nama mempelai pria minimal 2 karakter').max(80),
  event_date: z.string().refine((v) => !Number.isNaN(Date.parse(v)), 'Tanggal acara tidak valid'),
  event_location: z.string().trim().min(3, 'Lokasi acara minimal 3 karakter').max(200),
  event_address: z.string().trim().max(400).optional().default(''),
  maps_url: url.optional().default(''),
  story_text: z.string().trim().max(2000).optional().default(''),
  custom_message: z.string().trim().max(500).optional().default(''),
  cover_image_url: url.optional().default(''),
  gallery_images: z.array(url).max(12).optional().default([]),
})

export type InvitationInput = z.infer<typeof invitationInputSchema>

export const idSchema = z.string().uuid()
