import type { Database } from '@/lib/supabase/types'

export type Invitation = Database['public']['Tables']['invitations']['Row'] & {
  user?: Database['public']['Tables']['users']['Row']
}

export type Guest = Database['public']['Tables']['guests']['Row']

export interface TemplateProps {
  invitation: Invitation
  guest?: Guest
  isPreview?: boolean
}

export interface TemplateMetadata {
  id: string
  name: string
  description: string
  thumbnail: string
  tierRequired: 'free' | 'premium'
  component: React.ComponentType<TemplateProps>
}
