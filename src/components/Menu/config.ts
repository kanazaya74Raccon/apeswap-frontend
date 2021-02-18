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
  /* {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://pancakeswap.info',
      },
      {
        label: 'Tokens',
        href: 'https://pancakeswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://pancakeswap.info/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://pancakeswap.info/accounts',
      },
    ],
  }, {
    label: 'IFO',
    icon: 'IfoIcon',
    href: '/ifo',
  }, */
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
    ],
  },
]

export default config
