import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x12D87c577738F53b85fEE44738420070C7406e4b',
      56: '0x16b5cdf4931eb5b6e137ff1a6178d723a112ccb4',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
  {
    sousId: 2,
    tier: 2,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x502e746557362963d5285912A94df8fCB4D46F4D',
      56: '0xa6824F494D26BFB8bAae9cC95c6e01A3657E44d0',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
  {
    sousId: 3,
    tier: 3,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xEF3E2FfD74a3C3277fdd5D91FCA6711eC4a63E71',
      56: '0x00ee52127D42322E8bbfC10BE6E129b47CCdaE0A',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
  {
    sousId: 4,
    tier: 4,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x012c0048084950108dfae4402b9d5f67a89d5a9e',
      56: '0x98fBbC7Cb6B02E66Bd2c294D0a69D13e67afB2f7',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
  {
    sousId: 5,
    tier: 5,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x834539f712392cf0ccD5b3BBdc0749be42f0c0DE',
      56: '0xec1eD44688d7E5A622656b699eD1339e70890385',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
]
export default nftStakingPools
