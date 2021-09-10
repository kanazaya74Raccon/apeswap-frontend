import BigNumber from 'bignumber.js'
import masterchefABI from 'config/abi/masterchef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { VaultConfig } from 'config/constants/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

type PublicVaultData = {
  totalStaked: BigNumber
  totalAllocPoint: string
  weight: number
  strategyPairBalance: string
  allocPoint: string
  strategyPairBalanceFixed: string
  stakeTokenDecimals: string
  masterChefPairBalance: string
  totalInQuoteToken: string
  totalInQuoteTokenInMasterChef: string
}

const fetchVaultData = async (vault: VaultConfig): Promise<PublicVaultData> => {
  const { pid, strat, stakeTokenAddress, token0, token1, masterchef, isPair } = vault

  const masterchefCalls = [
    // Masterchef total alloc points
    {
      address: masterchef.address,
      name: 'totalAllocPoint',
    },
    // Vaulted farm pool info
    {
      address: masterchef.address,
      name: 'poolInfo',
      params: [masterchef.pid],
    },
    // Masterchef strategy info
    {
      address: masterchef.address,
      name: 'userInfo',
      params: [masterchef.pid, strat],
    },
  ]

  const [totalAllocPoint, poolInfo, userInfo] = await multicall(masterchefABI, masterchefCalls)

  const allocPoint = poolInfo.allocPoint
  const strategyPairBalance = userInfo.amount
  const weight = Number(allocPoint) / Number(totalAllocPoint)

  const erc20Calls = [
    // Quote token balance of
    {
      address: token0.address[CHAIN_ID],
      name: 'balanceOf',
      params: [stakeTokenAddress],
    },
    // Stake token balance in masterchef
    {
      address: stakeTokenAddress,
      name: 'balanceOf',
      params: [masterchef.address],
    },
    // Stake token total supply
    {
      address: stakeTokenAddress,
      name: 'totalSupply',
    },
    // Stake token decimals
    {
      address: stakeTokenAddress,
      name: 'decimals',
    },
  ]

  const [quoteTokenPairBalance, masterChefPairBalance, pairTotalSupply, stakeTokenDecimals] = await multicall(
    erc20ABI,
    erc20Calls,
  )

  // Ratio in % a LP tokens that are in staking, vs the total number in circulation
  const pairTokenRatio = parseFloat(strategyPairBalance) / parseFloat(pairTotalSupply.toString())
  const pairTokenRatioInMasterChef =
    parseFloat(masterChefPairBalance.toString()) / parseFloat(pairTotalSupply.toString())
  const totalInQuoteToken = isPair
    ? parseFloat(
        new BigNumber(quoteTokenPairBalance).div(new BigNumber(10).pow(18)).times(new BigNumber(2)).toString(),
      ) * pairTokenRatio
    : parseFloat(new BigNumber(strategyPairBalance).div(new BigNumber(10).pow(token0.decimals)).toString())

  const totalInQuoteTokenInMasterChef = vault.isPair
    ? parseFloat(
        new BigNumber(quoteTokenPairBalance).div(new BigNumber(10).pow(18)).times(new BigNumber(2)).toString(),
      ) * pairTokenRatioInMasterChef
    : parseFloat(new BigNumber(masterChefPairBalance).div(new BigNumber(10).pow(token0.decimals)).toString())


    console.log(parseFloat(new BigNumber(strategyPairBalance).toString()))

  return {
    totalStaked: null,
    totalAllocPoint: totalAllocPoint.toString(),
    allocPoint: allocPoint.toString(),
    weight,
    strategyPairBalance: strategyPairBalance.toString(),
    strategyPairBalanceFixed: null,
    stakeTokenDecimals: stakeTokenDecimals.toString(),
    masterChefPairBalance: masterChefPairBalance.toString(),
    totalInQuoteToken: totalInQuoteToken.toString(),
    totalInQuoteTokenInMasterChef: totalInQuoteTokenInMasterChef.toString(),
  }
}

export default fetchVaultData
