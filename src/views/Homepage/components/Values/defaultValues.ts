import { Values } from './types'
import { ContextApi } from '../../../../contexts/Localization/types'

export const defaultValues: (t: ContextApi['t']) => Values[] = (t) => [
  {
    title: t('Accessibility'),
    description: t(
      'We create tools for users to leverage DeFi opportunities, regardless of location, background, wealth, or experience.',
    ),
    logoImg: 'images/accessibility.png',
  },
  {
    title: t('Transparency'),
    description: t(
      'We build together through transparent governance and processes that ensure our community understands our goals.',
    ),
    logoImg: 'images/transparency.png',
  },
  {
    title: t('Security'),
    description: t(
      'Our highest priority is to ensure the safety of the funds of our users, of our partner projects, and of our community.',
    ),
    logoImg: 'images/security.png',
  },
]
