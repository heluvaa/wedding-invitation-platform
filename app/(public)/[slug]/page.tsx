import { createServerSupabaseClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { ClassicTemplate } from '@/components/templates/ClassicTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { ElegantTemplate } from '@/components/templates/ElegantTemplate'
import { FloralGardenTemplate } from '@/components/templates/FloralGardenTemplate'
import { RusticWoodTemplate } from '@/components/templates/RusticWoodTemplate'
import { IslamiTemplate } from '@/components/templates/IslamiTemplate'
import { JawaTemplate } from '@/components/templates/JawaTemplate'
import type { Metadata } from 'next'

export const instant = false

interface InvitationPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (!invitation) {
    return {
      title: 'Undangan tidak ditemukan'
    }
  }
  
  return {
    title: `${invitation.bride_name} & ${invitation.groom_name} - Undangan Pernikahan`,
    description: `Anda diundang ke pernikahan ${invitation.bride_name} dan ${invitation.groom_name}`,
    openGraph: {
      title: `${invitation.bride_name} & ${invitation.groom_name}`,
      description: `Undangan Pernikahan`,
      images: invitation.cover_image_url ? [invitation.cover_image_url] : []
    }
  }
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params
  const supabase = await createServerSupabaseClient()
  
  const { data: invitation } = await supabase
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  
  if (!invitation) {
    notFound()
  }
  
  // Increment view count
  await supabase.rpc('increment_invitation_views', { invitation_id: invitation.id })
  
  // Route to appropriate template
  const templates: Record<string, React.ComponentType<any>> = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    elegant: ElegantTemplate,
    floral: FloralGardenTemplate,
    rustic: RusticWoodTemplate,
    islami: IslamiTemplate,
    jawa: JawaTemplate,
  }
  
  const TemplateComponent = templates[invitation.template_id] || ClassicTemplate
  
  return <TemplateComponent invitation={invitation} />
}
