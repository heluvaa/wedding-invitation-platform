import { connection } from 'next/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { adminDb } from '@/lib/server/db'
import { ClassicTemplate } from '@/components/templates/ClassicTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { ElegantTemplate } from '@/components/templates/ElegantTemplate'
import ElegantSimpleTemplate from '@/components/templates/ElegantSimpleTemplate'
import { FloralGardenTemplate } from '@/components/templates/FloralGardenTemplate'
import { RusticWoodTemplate } from '@/components/templates/RusticWoodTemplate'
import { IslamiTemplate } from '@/components/templates/IslamiTemplate'
import { JawaTemplate } from '@/components/templates/JawaTemplate'

// Halaman undangan dirender per request (data DB dinamis, bukan prerender).
export const instant = false

interface Props {
  params: Promise<{ slug: string }>
}

const TEMPLATES: Record<string, React.ComponentType<any>> = {
  'elegant-simple': ElegantSimpleTemplate,
  classic: ClassicTemplate,
  modern: ModernTemplate,
  elegant: ElegantTemplate,
  floral: FloralGardenTemplate,
  rustic: RusticWoodTemplate,
  islami: IslamiTemplate,
  jawa: JawaTemplate,
}

async function loadPublished(slug: string) {
  const { data } = await adminDb()
    .from('invitations')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connection()
  const { slug } = await params
  const inv = await loadPublished(slug)
  if (!inv) return { title: 'Undangan tidak ditemukan' }

  const names = `${inv.bride_name} & ${inv.groom_name}`
  const title = `${names} — Undangan Pernikahan`
  const description = `Anda diundang ke pernikahan ${names}. ${inv.event_location ?? ''}`.trim()
  const image = inv.cover_image_url || (inv.gallery_images?.[0] ?? undefined)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export default async function InvitationPage({ params }: Props) {
  await connection()
  const { slug } = await params
  const inv = await loadPublished(slug)
  if (!inv) notFound()

  // Increment view count. Gagal hitung tidak boleh bikin halaman error.
  adminDb().rpc('increment_invitation_views', { invitation_id: inv.id }).then(() => {}, () => {})

  const Template = TEMPLATES[inv.template_id] ?? ClassicTemplate
  return <Template invitation={inv} />
}
