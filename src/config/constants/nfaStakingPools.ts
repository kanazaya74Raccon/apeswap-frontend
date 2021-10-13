import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x12D87c577738F53b85fEE44738420070C7406e4b',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
  {
    sousId: 2,
    tier: 2,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x25e682EdB9641bacecc9271F6de377C69c8B8d0B',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
  {
    sousId: 3,
    tier: 3,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xc58044A3aB2ED5BBD8F3e15bBB4571A45ad7C6c2',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
  {
    sousId: 4,
    tier: 4,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xDC4A95CBA750f0F44438187A301BD617A577164a',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
  {
    sousId: 5,
    tier: 5,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xb675449fbC57BE8b15e0C3F3F7E196650c2441dc',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
]
export default nftStakingPools
