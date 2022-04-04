import { MenuEntry } from '@apeswapfinance/uikit'
import { ContextApi } from 'contexts/Localization/types'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { EXCHANGE } from '../constants'

const bscConfig: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  EXCHANGE(t),
  {
    label: t('Stake'),
    lightIcon: 'StakeLightImage',
    darkIcon: 'StakeDarkImage',
    items: [
      {
        label: t('BANANA Farms'),
        href: '/farms',
      },
      {
        label: t('Pools'),
        href: '/pools',
      },
      {
        label: t('Jungle Farms'),
        href: '/jungle-farms',
      },
      {
        label: t('Vaults'),
        href: '/vaults',
      },
      {
        label: t('GNANA'),
        href: '/gnana',
      },
    ],
  },
  {
    label: t('Offerings'),
    lightIcon: 'OfferingsLightImage',
    darkIcon: 'OfferingsDarkImage',
    items: [
      {
        label: t('Official IAO'),
        href: '/iao',
      },
      {
        label: t('Self-Serve IAO'),
        href: '/ss-iao',
      },
    ],
  },
  {
    label: t('NFTs'),
    lightIcon: 'NfaLightImage',
    darkIcon: 'NfaDarkImage',
    items: [
      {
        label: t('NFA Collection'),
        href: '/nft',
      },
      {
        label: t('NFA Auction'),
        href: '/auction',
      },
      {
        label: t('NFA Staking'),
        href: '/staking',
      },
      {
        label: t('Liquid Collectibles'),
        href: 'https://liquidcollectibles.io/',
      },
    ],
  },
  {
    label: t('Lending'),
    href: 'https://lending.apeswap.finance/',
  },
  {
    label: t('More'),
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: t('Docs'),
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: t('Charts'),
        href: NETWORK_INFO_LINK[CHAIN_ID.BSC],
      },
      {
        label: t('Governance'),
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
