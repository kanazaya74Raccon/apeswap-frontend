import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xd138D4F886EdFe593dfA85d2EE2E184E7915a160',
      56: '0xeb6D978c6cA8BF3c2ffaC5536e13021920E4e3E6',
    },
    tokenPerBlock: '0.011774074074074',
    isFinished: false,
  },
  {
    sousId: 2,
    tier: 2,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x28B868bf63bdB1bcAf30184eFb6684312FEf134A',
      56: '0x0aAd4a7509617c9254B20e565bFcf58B917Fac2c',
    },
    tokenPerBlock: '0.011774074074074',
    isFinished: false,
  },
  {
    sousId: 3,
    tier: 3,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x26b6414bC46aC1a149bb4ECD789163C0710f2d55',
      56: '0xBabFEce5c014ec5cE5A7Dd36625F942CA0f7E313',
    },
    tokenPerBlock: '0.011774074074074',
    isFinished: false,
  },
  {
    sousId: 4,
    tier: 4,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x01FA5C85D152994B57314313e1b4f7005D12CD90',
      56: '0xed66A25F551555e03456356510628060166f81F9',
    },
    tokenPerBlock: '0.011774074074074',
    isFinished: false,
  },
  {
    sousId: 5,
    tier: 5,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x6f2361afb0E69C5fde812f79C7B206A94f127e0f',
      56: '0x9CAe4d6Fd1Ad948C810D6F1b4Fdbd69716BA50a0',
    },
    tokenPerBlock: '0.011774074074074',
    isFinished: false,
  },
]
export default nftStakingPools
