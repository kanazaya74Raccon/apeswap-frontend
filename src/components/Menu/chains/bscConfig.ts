import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'

const bscConfig: MenuEntry[] = [
  EXCHANGE,
  {
    label: 'Stake',
    lightIcon: 'StakeLightImage',
    darkIcon: 'StakeDarkImage',
    items: [
      {
        label: 'BANANA Farms',
        href: '/farms',
        isNew: false,
        isLive: false,
      },
      {
        label: 'Pools',
        href: '/pools',
        isNew: false,
        isLive: false,
      },
      {
        label: 'Jungle Farms',
        href: '/jungle-farms',
        isNew: true,
        isLive: false,
      },
      {
        label: 'Vaults',
        href: '/vaults',
        isNew: false,
        isLive: false,
      },
      {
        label: 'GNANA',
        href: '/gnana',
        isNew: false,
        isLive: false,
      },
    ],
  },
  {
    label: 'Raise',
    lightIcon: 'OfferingsLightImage',
    darkIcon: 'OfferingsDarkImage',
    items: [
      {
        label: 'Official IAO',
        href: '/iao',
        isNew: false,
        isLive: false,
      },
      {
        label: 'Self-Serve IAO',
        href: '/ss-iao',
        isNew: false,
        isLive: false,
      },
    ],
  },
  {
    label: 'Collect',
    lightIcon: 'NfaLightImage',
    darkIcon: 'NfaDarkImage',
    items: [
      {
        label: 'NFA Collection',
        href: '/nft',
        isNew: false,
        isLive: false,
      },
      {
        label: 'NFA Auction',
        href: '/auction',
        isNew: false,
        isLive: false,
      },
      {
        label: 'NFA Staking',
        href: '/staking',
        isNew: false,
        isLive: false,
      },
      {
        label: 'Liquid Collectibles',
        href: 'https://liquidcollectibles.io/',
        isNew: false,
        isLive: false,
      },
    ],
  },
  {
    label: 'Lend',
    href: 'https://lending.apeswap.finance/',
  },
  {
    label: 'More',
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: 'Docs',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
        isLive: false,
      },
      {
        label: 'Charts',
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
        isNew: false,
        isLive: false,
      },
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
        isNew: false,
        isLive: false,
      },
    ],
  },

  // {
  //   label: 'Burn',
  //   icon: 'GameBurnIcon',
  //   href: '/burn',
  // },
  // {
  //   label: 'Info',
  //   icon: 'InfoIcon',
  //   items: [
  //     {
  //       label: 'Overview',
  //       href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
  //     },
  //     {
  //       label: 'Tokens',
  //       href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/tokens`,
  //     },
  //     {
  //       label: 'Pairs',
  //       href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/pairs`,
  //     },
  //     {
  //       label: 'Accounts',
  //       href: `${NETWORK_INFO_LINK[CHAIN_ID.BSC]}/accounts`,
  //     },
  //   ],
  // },
]

export default bscConfig
