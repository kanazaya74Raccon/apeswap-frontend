import tokens from 'config/constants/tokens'
import { Bills } from './types'

export const billsStub: Bills[] = [
  {
    billType: 'BANANA Bill',
    token: tokens.banana,
    quoteToken: tokens.wbnb,
    lpAddress: '',
    earnToken: tokens.banana,
    price: 51.24,
    roi: 122.33,
    vestingTime: '14d, 20h, 22m',
  },
  {
    billType: 'Jungle Bill',
    token: tokens.nfty,
    quoteToken: tokens.wbnb,
    lpAddress: '',
    earnToken: tokens.banana,
    price: 51.24,
    roi: 122.33,
    vestingTime: '14d, 20h, 22m',
  },
  {
    billType: 'Jungle Bill',
    token: tokens.lico,
    quoteToken: tokens.wbnb,
    lpAddress: '',
    earnToken: tokens.banana,
    price: 51.24,
    roi: 122.33,
    vestingTime: '14d, 20h, 22m',
  },
]
