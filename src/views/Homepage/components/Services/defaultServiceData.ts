import { DefaultServiceData } from './types'

export const defaultServiceData: DefaultServiceData[] = [
  {
    id: 'poolDetails',
    title: 'Staking Pools',
    description: 'Earn new tokens by staking BANANA or GNANA',
    backgroundImg: 'images/homepage-pools.svg',
    link: '/pools',
    stats: [],
  },
  {
    id: 'farmDetails',
    title: 'Yield Farms',
    description: 'Earn BANANA by providing liquidity',
    backgroundImg: 'images/homepage-farms.svg',
    link: '/farms',
    stats: [],
  },
  {
    id: 'lendingDetails',
    title: 'Lending',
    description: 'Earn interest by supplying and borrowing popular tokens',
    backgroundImg: 'images/homepage-lending.svg',
    link: 'https://lending.apeswap.finance/markets',
    stats: [],
  },
  {
    id: 'billDetails',
    title: 'Treasury Bills',
    description: 'Purchase tokens at a discounted rate',
    backgroundImg: 'images/homepage-bills.svg',
    link: '/treasury-bills',
    stats: [],
  },
]
