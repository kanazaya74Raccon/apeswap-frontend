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
      },
      {
        label: 'Pools',
        href: '/pools',
        isNew: false,
      },
      {
        label: 'Jungle Farms',
        href: '/jungle-farms',
        isNew: true,
      },
      {
        label: 'Vaults',
        href: '/vaults',
        isNew: false,
      },
      {
        label: 'GNANA',
        href: '/gnana',
        isNew: false,
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
      },
      {
        label: 'Self-Serve IAO',
        href: '/ss-iao',
        isNew: false,
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
      },
      {
        label: 'NFA Auction',
        href: '/auction',
        isNew: false,
      },
      {
        label: 'NFA Staking',
        href: '/staking',
        isNew: false,
      },
      {
        label: 'Liquid Collectibles',
        href: 'https://liquidcollectibles.io/',
        isNew: false,
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
      },
      {
        label: 'Charts',
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
        isNew: false,
      },
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
        isNew: false,
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
