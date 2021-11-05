import { NfaStakingPoolConfig } from './types'
import tokens from './tokens'

const nftStakingPools: NfaStakingPoolConfig[] = [
  {
    sousId: 1,
    tier: 1,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0xd138D4F886EdFe593dfA85d2EE2E184E7915a160',
      56: '0xC84E54e4e09FfD7f971C674f87002A54A2D6B5E3',
    },
    tokenPerBlock: '0.1',
    isFinished: false,
  },
  {
    sousId: 2,
    tier: 2,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x28B868bf63bdB1bcAf30184eFb6684312FEf134A',
      56: '0xa6824F494D26BFB8bAae9cC95c6e01A3657E44d0',
    },
    tokenPerBlock: '0.1',
    isFinished: false,
  },
  {
    sousId: 3,
    tier: 3,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x26b6414bC46aC1a149bb4ECD789163C0710f2d55',
      56: '0x00ee52127D42322E8bbfC10BE6E129b47CCdaE0A',
    },
    tokenPerBlock: '0.1',
    isFinished: false,
  },
  {
    sousId: 4,
    tier: 4,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x01FA5C85D152994B57314313e1b4f7005D12CD90',
      56: '0x98fBbC7Cb6B02E66Bd2c294D0a69D13e67afB2f7',
    },
    tokenPerBlock: '0.1',
    isFinished: false,
  },
  {
    sousId: 5,
    tier: 5,
    rewardToken: tokens.banana,
    contractAddress: {
      97: '0x6f2361afb0E69C5fde812f79C7B206A94f127e0f',
      56: '0xec1eD44688d7E5A622656b699eD1339e70890385',
    },
    tokenPerBlock: '0.1',
    isFinished: false,
  },
]
export default nftStakingPools
