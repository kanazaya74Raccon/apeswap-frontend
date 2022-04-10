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
      },
      {
        label: 'Pools',
        href: '/pools',
      },
      {
        label: 'Jungle Farms',
        href: '/jungle-farms',
      },
      {
        label: 'Vaults',
        href: '/vaults',
      },
      {
        label: 'GNANA',
        href: '/gnana',
      },
    ],
  },
  {
    label: 'Offerings',
    lightIcon: 'OfferingsLightImage',
    darkIcon: 'OfferingsDarkImage',
    items: [
      {
        label: 'Bills',
        href: '/bills',
      },
      {
        label: 'Official',
        href: '/iao',
      },
      {
        label: 'Self-Serve',
        href: '/ss-iao',
      },
    ],
  },
  {
    label: 'NFTs',
    lightIcon: 'NfaLightImage',
    darkIcon: 'NfaDarkImage',
    items: [
      {
        label: 'NFA Collection',
        href: '/nft',
      },
      {
        label: 'NFA Auction',
        href: '/auction',
      },
      {
        label: 'NFA Staking',
        href: '/staking',
      },
      {
        label: 'Liquid Collectibles',
        href: 'https://liquidcollectibles.io/',
      },
    ],
  },
  {
    label: 'Lending',
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
      },
      {
        label: 'Charts',
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: 'Governance',
        href: 'https://vote.apeswap.finance',
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
