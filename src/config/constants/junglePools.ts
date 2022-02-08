import tokens from './tokens'
import { PoolConfig } from './types'

const junglePools: PoolConfig[] = [
  {
    sousId: 12,
    tokenName: 'JDI',
    stakingToken: tokens.bnbjdi,
    image: 'JDI.svg',
    rewardToken: tokens.jdi,
    contractAddress: {
      // BEP20RewardApe
      97: '0xb1108939748A635C5ed982a17FF5C6E7D79ECF62',
      56: '0x7336B60aC64a5Bf04Eec760bD135ea105994387C',
    },
    projectLink: 'https://jdiyield.com',
    harvest: true,
    tokenPerBlock: '0.07716049382716',
    sortOrder: 6,
    isFinished: true,
    tokenDecimals: 18,
    lpStaking: true,
  },
]

export default junglePools
