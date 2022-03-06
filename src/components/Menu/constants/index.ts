import { ContextApi } from 'contexts/Localization/types'
import { MenuEntry } from '@apeswapfinance/uikit'

export const HOME: (t: ContextApi['t']) => MenuEntry = (t) => ({
  label: t('Home'),
  icon: 'HomeIcon',
  href: '/',
})

export const EXCHANGE: (t: ContextApi['t']) => MenuEntry = (t) => ({
  label: t('Trade'),
  icon: 'TradeIcon',
  items: [
    {
      label: t('Exchange'),
      href: '/swap',
    },
    {
      label: t('Liquidity'),
      href: '/pool',
    },
  ],
})

export const MORE_INFO: (t: ContextApi['t']) => MenuEntry = (t) => ({
  label: t('More'),
  icon: 'MoreIcon',
  items: [
    {
      label: t('Governance'),
      href: 'https://vote.apeswap.finance',
    },
    {
      label: t('Github'),
      href: 'https://github.com/apeswapfinance',
    },
    {
      label: t('Docs'),
      href: 'https://apeswap.gitbook.io/apeswap-finance/',
    },
    {
      label: t('Blog'),
      href: 'https://ape-swap.medium.com/',
    },
    {
      label: t('Partnership Application'),
      href: 'https://docs.google.com/forms/d/e/1FAIpQLSdiC4jpKQAYD4iALGrm9ErmDIs1xtsOENu9GsvgdczVwe_uOw/viewform?usp=sf_link',
    },
    {
      label: t('ApeTV'),
      href: 'https://anchor.fm/apetv',
    },
    {
      label: t('ApeLabs'),
      href: 'https://www.apelabs.education',
    },
    {
      label: t('Bug Bounty Program'),
      href: 'https://apeswap.gitbook.io/apeswap-finance/security/bug-bounty-program',
    },
  ],
})
