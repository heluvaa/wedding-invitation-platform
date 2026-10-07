import { TemplateMetadata } from './types'
import ElegantSimpleTemplate from '@/components/templates/ElegantSimpleTemplate'
import { ElegantTemplate } from '@/components/templates/ElegantTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { ClassicTemplate } from '@/components/templates/ClassicTemplate'
import { FloralGardenTemplate } from '@/components/templates/FloralGardenTemplate'
import { RusticWoodTemplate } from '@/components/templates/RusticWoodTemplate'
import { IslamiTemplate } from '@/components/templates/IslamiTemplate'
import { JawaTemplate } from '@/components/templates/JawaTemplate'

const U = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'elegant-simple',
    name: 'Elegant Simple',
    description: 'Desain minimalis elegan dengan aksen rose, cocok untuk segala konsep',
    thumbnail: U('1520854221256-17451cc331bf'),
    tierRequired: 'free',
    component: ElegantSimpleTemplate
  },
  {
    id: 'classic',
    name: 'Classic Rose',
    description: 'Klasik romantis dengan nuansa rose yang hangat',
    thumbnail: U('1511285560929-80b456fea0bc'),
    tierRequired: 'free',
    component: ClassicTemplate as unknown as React.ComponentType<import('./types').TemplateProps>
  },
  {
    id: 'modern',
    name: 'Modern Minimalis',
    description: 'Bersih dan kekinian dengan tipografi tegas — untuk pasangan modern',
    thumbnail: U('1465495976277-4387d4b0b4c6'),
    tierRequired: 'premium',
    component: ModernTemplate
  },
  {
    id: 'elegant',
    name: 'Luxury Gold',
    description: 'Mewah dengan tema gelap dan aksen emas — kesan premium maksimal',
    thumbnail: U('1522673607200-164d1b6ce486'),
    tierRequired: 'premium',
    component: ElegantTemplate
  },
  {
    id: 'floral',
    name: 'Floral Garden',
    description: 'Romantis dengan nuansa bunga pastel yang lembut dan manis',
    thumbnail: U('1469259943454-aa100abba749'),
    tierRequired: 'free',
    component: FloralGardenTemplate
  },
  {
    id: 'rustic',
    name: 'Rustic Wood',
    description: 'Hangat dan natural dengan sentuhan pedesaan yang akrab',
    thumbnail: U('1500382017468-9049fed747ef'),
    tierRequired: 'premium',
    component: RusticWoodTemplate
  },
  {
    id: 'islami',
    name: 'Sakral Islami',
    description: 'Hijau-putih elegan dengan nuansa islami yang khidmat',
    thumbnail: U('1519817650390-64a93db51149'),
    tierRequired: 'premium',
    component: IslamiTemplate
  },
  {
    id: 'jawa',
    name: 'Adat Jawa',
    description: 'Merah-emas tradisional dengan sentuhan adat Jawa yang agung',
    thumbnail: U('1519167758481-83f550bb49b3'),
    tierRequired: 'premium',
    component: JawaTemplate
  }
]

export function getTemplateComponent(templateId: string) {
  return TEMPLATES.find(t => t.id === templateId)?.component
}

export function getTemplateMetadata(templateId: string) {
  return TEMPLATES.find(t => t.id === templateId)
}

export function getTemplatesByTier(tier: 'free' | 'premium') {
  if (tier === 'premium') return TEMPLATES
  return TEMPLATES.filter(t => t.tierRequired === 'free')
}
