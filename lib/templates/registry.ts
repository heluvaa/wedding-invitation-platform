import { TemplateMetadata } from './types'
import ElegantSimpleTemplate from '@/components/templates/ElegantSimpleTemplate'
import { ElegantTemplate } from '@/components/templates/ElegantTemplate'
import { ModernTemplate } from '@/components/templates/ModernTemplate'
import { ClassicTemplate } from '@/components/templates/ClassicTemplate'

export const TEMPLATES: TemplateMetadata[] = [
  {
    id: 'elegant-simple',
    name: 'Elegant Simple',
    description: 'Desain minimalis elegan dengan aksen rose, cocok untuk segala konsep',
    thumbnail: '/templates/elegant-simple.jpg',
    tierRequired: 'free',
    component: ElegantSimpleTemplate
  },
  {
    id: 'classic',
    name: 'Classic Rose',
    description: 'Klasik romantis dengan nuansa rose yang hangat',
    thumbnail: '/templates/classic.jpg',
    tierRequired: 'free',
    component: ClassicTemplate as unknown as React.ComponentType<import('./types').TemplateProps>
  },
  {
    id: 'modern',
    name: 'Modern Minimalis',
    description: 'Bersih dan kekinian dengan tipografi tegas — untuk pasangan modern',
    thumbnail: '/templates/modern.jpg',
    tierRequired: 'premium',
    component: ModernTemplate
  },
  {
    id: 'elegant',
    name: 'Luxury Gold',
    description: 'Mewah dengan tema gelap dan aksen emas — kesan premium maksimal',
    thumbnail: '/templates/elegant.jpg',
    tierRequired: 'premium',
    component: ElegantTemplate
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
