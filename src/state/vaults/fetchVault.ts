import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import { VaultConfig } from 'config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

type PublicVaultData = {
  totalStaked?: BigNumber
  totalAllocPoint?: number
  stakeTokenDecimals?: number
  pairBalanceMc?: number
}

const fetchVault = async (vault: VaultConfig): Promise<PublicVaultData> => {
  const { pid, strat, stakeTokenAddress, token0, token1, masterchef } = vault

  const masterchefCalls = [
    {
      address: masterchef.address,
      name: 'totalAllocPoint',
    },
    {
      address: masterchef.address,
      name: 'poolInfo',
      params: [pid],
    },
    {
      address: masterchef.address,
      name: 'userInfo',
      params: [pid, strat],
    },
  ]

  const [totalAllocPoint, poolInfo, userInfo] = await multicall(masterchefABI, masterchefCalls)
  console.log(totalAllocPoint)

  const erc20Calls = [
    // Quote token balance of
    {
      address: token0.address,
      name: 'balanceOf',
      params: [stakeTokenAddress],
    },
    {
      address: stakeTokenAddress,
      name: 'balanceOf',
      params: [masterchef.address],
    },
    {
      address: stakeTokenAddress,
      name: 'totalSupply',
    },
    {
      address: stakeTokenAddress,
      name: 'decimals',
    },
  ]

  return {
    totalStaked: null,
    totalAllocPoint: null,
    stakeTokenDecimals: null,
    pairBalanceMc: null,
  }
}

// const fetchVaults = async () => {
//   const data = await Promise.all(
//     VaultConfig.map(async (farmConfig) => {
//       const lpAdress = farmConfig.lpAddresses[CHAIN_ID]
//       const calls = [
//         // Balance of token in the LP contract
//         {
//           address: farmConfig.tokenAddresses[CHAIN_ID],
//           name: 'balanceOf',
//           params: [lpAdress],
//         },
//         // Balance of quote token on LP contract
//         {
//           address: farmConfig.quoteTokenAdresses[CHAIN_ID],
//           name: 'balanceOf',
//           params: [lpAdress],
//         },
//         // Balance of LP tokens in the master chef contract
//         {
//           address: lpAdress,
//           name: 'balanceOf',
//           params: [getMasterChefAddress()],
//         },
//         // Total supply of LP tokens
//         {
//           address: lpAdress,
//           name: 'totalSupply',
//         },
//         // Token decimals
//         {
//           address: farmConfig.tokenAddresses[CHAIN_ID],
//           name: 'decimals',
//         },
//         // Quote token decimals
//         {
//           address: farmConfig.quoteTokenAdresses[CHAIN_ID],
//           name: 'decimals',
//         },
//       ]

//       const [
//         tokenBalanceLP,
//         quoteTokenBlanceLP,
//         lpTokenBalanceMC,
//         lpTotalSupply,
//         tokenDecimals,
//         quoteTokenDecimals,
//       ] = await multicall(erc20, calls)

//       // Ratio in % a LP tokens that are in staking, vs the total number in circulation
//       const lpTokenRatio = new BigNumber(lpTokenBalanceMC).div(new BigNumber(lpTotalSupply))

//       // Total value in staking in quote token value
//       const lpTotalInQuoteToken = new BigNumber(quoteTokenBlanceLP)
//         .div(new BigNumber(10).pow(18))
//         .times(new BigNumber(2))
//         .times(lpTokenRatio)

//       // Total value in pool in quote token value
//       const totalInQuoteToken = new BigNumber(quoteTokenBlanceLP).div(new BigNumber(10).pow(18)).times(new BigNumber(2))

//       // Amount of token in the LP that are considered staking (i.e amount of token * lp ratio)
//       const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals)).times(lpTokenRatio)
//       const quoteTokenAmount = new BigNumber(quoteTokenBlanceLP)
//         .div(new BigNumber(10).pow(quoteTokenDecimals))
//         .times(lpTokenRatio)

//       let alloc = null
//       let multiplier = 'unset'
//       try {
//         const [info, totalAllocPoint] = await multicall(masterchefABI, [
//           {
//             address: getMasterChefAddress(),
//             name: 'poolInfo',
//             params: [farmConfig.pid],
//           },
//           {
//             address: getMasterChefAddress(),
//             name: 'totalAllocPoint',
//           },
//         ])
//         const allocPoint = new BigNumber(info.allocPoint._hex)
//         const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))
//         alloc = poolWeight.toJSON()
//         multiplier = `${allocPoint.div(100).toString()}X`
//         // eslint-disable-next-line no-empty
//       } catch (error) {
//         console.log('Error fetching farm', error, farmConfig)
//       }

//       return {
//         ...farmConfig,
//         tokenAmount: tokenAmount.toJSON(),
//         quoteTokenAmount: quoteTokenAmount.toJSON(),
//         totalInQuoteToken: totalInQuoteToken.toJSON(),
//         lpTotalInQuoteToken: lpTotalInQuoteToken.toJSON(),
//         tokenPriceVsQuote: quoteTokenAmount.div(tokenAmount).toJSON(),
//         poolWeight: alloc,
//         multiplier,
//       }
//     }),
//   )
//   return data
// }

export default fetchVault
