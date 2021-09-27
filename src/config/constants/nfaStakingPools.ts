import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xdDC39CAfd2C1ab028149c110BFa92E8f3472d063',
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
      97: '0xA5B4d823Cb1A759C6080067a9D7a6e0627Ab6398',
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
      97: '0xc161f9e9ef1221E65172E340040a7898EaD0B08D',
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
      97: '0x6300fa0cE8c5eFA803263934915d3D1b9591a383',
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
      97: '0x6397161C4D7C1259576d869D9acFa20892C76446',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
]
export default nftStakingPools
