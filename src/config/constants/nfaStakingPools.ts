import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x36A03D91C64730d01c2827B41b93116fDCf3B15d',
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
      97: '0x4b9Ce604b09B83AF4A86930387d8b03E2b73bB47',
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
      97: '0xeB83E9E4c8bf8ad6A73Bf5A6D30B2544393bad4E',
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
      97: '0x23122925Ac620be873C49477e0F41ebE3Ec956D2',
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
      97: '0x5eFEf8e31436Fcb699d00a8b289853825D5D8084',
      56: '',
    },
    tokenPerBlock: '.100000000000000000',
    isFinished: false,
  },
]
export default nftStakingPools
