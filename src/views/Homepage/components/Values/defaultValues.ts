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
    description: t('We ensure that the safety of the funds of our users and partners is our highest priority.'),
    logoImg: 'images/security.png',
  },
]
