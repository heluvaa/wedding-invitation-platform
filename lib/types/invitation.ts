export interface Invitation {
  id: string
  user_id: string
  template_id: string
  slug: string
  bride_name: string
  groom_name: string
  event_date: string
  event_location: string
  event_address?: string | null
  maps_url?: string | null
  cover_image_url?: string | null
  gallery_images?: string[] | null
  story_text?: string | null
  custom_message?: string | null
  published: boolean
  view_count: number
  created_at: string
  updated_at: string
}
