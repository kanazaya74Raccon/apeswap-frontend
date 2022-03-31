import { DefaultServiceData } from './types'
import { ContextApi } from '../../../../contexts/Localization/types'

export const defaultServiceData: (t: ContextApi['t']) => DefaultServiceData[] = (t) => [
  {
    id: 'poolDetails',
    title: t('Staking Pools'),
    description: t('Earn new tokens by staking BANANA or GNANA'),
    backgroundImg: 'images/homepage-pools.svg',
    link: '/pools',
    stats: [],
  },
  {
    id: 'farmDetails',
    title: t('Yield Farms'),
    description: t('Earn BANANA by providing liquidity'),
    backgroundImg: 'images/homepage-farms.svg',
    link: '/farms',
    stats: [],
  },
  {
    id: 'lendingDetails',
    title: t('Lending'),
    description: t('Earn interest by supplying and borrowing popular tokens'),
    backgroundImg: 'images/homepage-lending.svg',
    link: 'https://lending.apeswap.finance/markets',
    stats: [],
  },
  {
    id: '',
    title: '',
    description: '',
    backgroundImg: 'images/homepage-coming-soon.svg',
    link: '',
    stats: [],
  },
]
