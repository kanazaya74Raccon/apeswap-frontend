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
    vestingTime: '6df892612ef894f39',
  },
  {
    billType: 'Jungle Bill',
    token: tokens.nfty,
    quoteToken: tokens.wbnb,
    lpAddress: '',
    earnToken: tokens.banana,
    price: 51.24,
    roi: 122.33,
    vestingTime: 'e4bd8709e83527741',
  },
  {
    billType: 'Jungle Bill',
    token: tokens.lico,
    quoteToken: tokens.wbnb,
    lpAddress: '',
    earnToken: tokens.banana,
    price: 51.24,
    roi: 122.33,
    vestingTime: 'e27ab2f636e825826a4ed',
  },
]
