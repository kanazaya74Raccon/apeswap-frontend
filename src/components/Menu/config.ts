import { MenuEntry } from '@apeswapfinance/uikit'
import { BASE_EXCHANGE_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: BASE_EXCHANGE_URL,
      },
      {
        label: 'Liquidity',
        href: BASE_LIQUIDITY_POOL_URL,
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  /* {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
  },
  {
    label: 'NFT',
    icon: 'NftIcon',
    href: '/nft',
  },
  {
    label: 'Teams & Profile',
    icon: 'GroupsIcon',
    items: [
      {
        label: 'Leaderboard',
        href: '/teams',
      },
      {
        label: 'Your Profile',
        href: '/profile',
      },
    ],
  }, */
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.apeswap.finance',
      },
      {
        label: 'Tokens',
        href: 'https://info.apeswap.finance/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.apeswap.finance/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.apeswap.finance/accounts',
      },
    ],
  },
  {
    label: 'IAO',
    icon: 'IfoIcon',
    href: '/iao',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      /* {
        label: 'Chart',
        href: '/chart',
      }, */
      {
        label: 'Github',
        href: 'https://github.com/apeswapfinance',
      },
      {
        label: 'Docs',
        href: 'https://obiedobo.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Blog',
        href: 'https://ape-swap.medium.com/',
      },
      {
        label: 'Team',
        href: 'https://ape-swap.medium.com/meet-the-founding-monkeys-behind-apeswap-6f837113db00',
      },
      {
        label: 'Community Feedback',
        href: 'https://apeswap.nolt.io/',
      },
      {
        label: 'GEMZ Audit Report',
        href:
          'https://github.com/ApeSwapFinance/apeswap-banana-farm/blob/master/audits/ApeSwap_GEMZ_Audit_Report_21.03.05.pdf',
      },
    ],
  },
]

export default config
