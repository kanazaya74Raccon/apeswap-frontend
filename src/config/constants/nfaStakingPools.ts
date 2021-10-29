import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x12D87c577738F53b85fEE44738420070C7406e4b',
      56: '0xC84E54e4e09FfD7f971C674f87002A54A2D6B5E3',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
  {
    sousId: 2,
    tier: 2,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x25e682EdB9641bacecc9271F6de377C69c8B8d0B',
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
      97: '0xc58044A3aB2ED5BBD8F3e15bBB4571A45ad7C6c2',
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
      97: '0xDC4A95CBA750f0F44438187A301BD617A577164a',
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
      97: '0xb675449fbC57BE8b15e0C3F3F7E196650c2441dc',
      56: '0xec1eD44688d7E5A622656b699eD1339e70890385',
    },
    tokenPerBlock: '0',
    isFinished: false,
  },
]
export default nftStakingPools
