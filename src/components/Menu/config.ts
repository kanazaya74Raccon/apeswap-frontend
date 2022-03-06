import { MenuEntry } from '@apeswapfinance/uikit'
import { BASE_EXCHANGE_URL } from 'config'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Ape Stats'),
    icon: 'StatsIcon',
    href: '/stats',
  },
  {
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
  },
  {
    label: t('Vaults'),
    icon: 'Vaults',
    href: `${BASE_EXCHANGE_URL}/vaults`,
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: t('Pools'),
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: t('IAZOs'),
    icon: 'IfoIcon',
    href: '/iazos',
  },
  {
    label: t('IAO'),
    icon: 'IfoIcon',
    href: '/iao',
  },
  {
    label: t('NFA'),
    icon: 'apeNFTIcon',
    items: [
      {
        label: t('List'),
        href: '/nft',
      },
      {
        label: t('Auction'),
        href: '/auction',
      },
      {
        label: t('Staking'),
        href: '/staking',
      },
    ],
  },
  {
    label: t('GNANA'),
    icon: 'ApeZone',
    href: '/gnana',
  },
  // {
  //   label: t('Lottery'),
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  /* 
  {
    label: t('Teams & Profile'),
    icon: 'GroupsIcon',
    items: [
      {
        label: t('Leaderboard'),
        href: '/teams',
      },
      {
        label: t('Your Profile'),
        href: '/profile',
      },
    ],
  }, */
  {
    label: t('Info'),
    icon: 'InfoIcon',
    items: [
      {
        label: t('Overview'),
        href: 'https://info.apeswap.finance',
      },
      {
        label: t('Tokens'),
        href: 'https://info.apeswap.finance/tokens',
      },
      {
        label: t('Pairs'),
        href: 'https://info.apeswap.finance/pairs',
      },
      {
        label: t('Accounts'),
        href: 'https://info.apeswap.finance/accounts',
      },
    ],
  },
  {
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
      {
        label: t('Audits'),
        href: 'https://apeswap.gitbook.io/apeswap-finance/security/audits',
      },
    ],
  },
]

export default config
