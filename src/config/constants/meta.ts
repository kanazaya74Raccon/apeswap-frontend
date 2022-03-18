import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ApeSwap',
  description: 'Cheaper and faster than UniSwap? Discover ApeSwap, the go to AMM and yield farm for apes by apes.',
  image: 'https://apeswap.finance/logo.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | ApeSwap',
  },
  '/stats': {
    title: 'Ape Stats | ApeSwap',
  },
  '/nft': {
    title: 'NFA Collectibles | ApeSwap',
  },
  '/farms': {
    title: 'BANANA Farms | ApeSwap',
  },
  '/jungle-farms': {
    title: 'Jungle Farms | ApeSwap',
  },
  '/pools': {
    title: 'Pools | ApeSwap',
  },
  '/lottery': {
    title: 'Lottery | ApeSwap',
  },
  '/iao': {
    title: 'Initial Ape Offering | ApeSwap',
  },
  '/gnana': {
    title: 'GNANA | ApeSwap',
  },
  '/vaults': {
    title: 'Vaults | ApeSwap',
  },
  '/auction': {
    title: 'Auction | ApeSwap',
  },
  '/staking': {
    title: 'NFA Staking | ApeSwap',
  },
}
