import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { CHAIN_ID } from 'config/constants/chains'
import { VaultConfig } from 'config/constants/types'
import { BLOCKS_PER_YEAR, MATIC_BLOCKS_PER_YEAR, VAULT_COMPOUNDS_PER_DAY } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import { TokenPrices } from 'state/types'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import masterchefABI from './vaultedMasterChefABI.json'

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
  apy: {
    daily: number
    yearly: number
  }
}

const fetchVaultData = async (
  multicallContract,
  chainId: number,
  vault: VaultConfig,
  tokenPrices: TokenPrices[],
): Promise<PublicVaultData> => {
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
    {
      address: masterchef.address,
      name: masterchef.rewardsPerBlock,
    },
  ]

  const [totalAllocPoint, poolInfo, userInfo, rewardsPerBlock] = await multicall(
    multicallContract,
    masterchefABI,
    masterchefCalls,
  )

  const allocPoint = new BigNumber(poolInfo.allocPoint?._hex)
  const strategyPairBalance = userInfo.amount
  const weight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)

  const earnTokenPriceUsd = tokenPrices?.find(
    (token) => token.address[chainId].toLowerCase() === masterchef.rewardToken.toLowerCase(),
  )?.price
  const quoteTokenPriceUsd = tokenPrices?.find(
    (token) => token.address[chainId].toLowerCase() === token0.address[chainId].toLowerCase(),
  )?.price

  const erc20Calls = [
    // Quote token balance of
    {
      address: token0.address[chainId],
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
    // quote token decimals
    {
      address: token0.address[chainId],
      name: 'decimals',
    },
  ]

  const [quoteTokenPairBalance, pairBalanceMc, pairTotalSupply, stakeTokenDecimals, quoteTokenDecimals] =
    await multicall(multicallContract, erc20ABI, erc20Calls)

  const quoteTokenAmountTotal = isPair
    ? new BigNumber(quoteTokenPairBalance).div(new BigNumber(10).pow(quoteTokenDecimals))
    : new BigNumber(strategyPairBalance.toString()).div(new BigNumber(10).pow(quoteTokenDecimals))
  const pairTokenRatio = parseFloat(strategyPairBalance) / parseFloat(pairTotalSupply.toString())
  const lptokenRatio = new BigNumber(pairBalanceMc).div(new BigNumber(pairTotalSupply))
  const quoteTokenAmountMc = quoteTokenAmountTotal.times(lptokenRatio)
  const totalInQuoteToken = isPair
    ? quoteTokenAmountMc.times(new BigNumber(2))
    : new BigNumber(getBalanceNumber(pairBalanceMc, quoteTokenDecimals))
  const totalStaked = isPair
    ? totalInQuoteToken.times(quoteTokenPriceUsd).times(pairTokenRatio)
    : quoteTokenAmountTotal.times(quoteTokenPriceUsd)

  // Calculate APR
  const blockPerYear = () => {
    if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
      return MATIC_BLOCKS_PER_YEAR
    }
    return BLOCKS_PER_YEAR
  }
  const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)
  const rewardTokensPerBlock = rewardsPerBlock ? getBalanceNumber(new BigNumber(rewardsPerBlock)) : new BigNumber(0)
  const yearlyRewardTokens = blockPerYear().times(rewardTokensPerBlock).times(poolWeight)
  const oneThousandDollarsWorthOfToken = 1000 / earnTokenPriceUsd
  const apr = yearlyRewardTokens
    .times(new BigNumber(earnTokenPriceUsd))
    .div(totalInQuoteToken.times(new BigNumber(quoteTokenPriceUsd)))
    .times(100)

  const amountEarnedYealry = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice: earnTokenPriceUsd,
    compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
  })
  const amountEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice: earnTokenPriceUsd,
    compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
  })
  const yealryApy = getRoi({ amountEarned: amountEarnedYealry, amountInvested: oneThousandDollarsWorthOfToken })
  const dailyApy = getRoi({ amountEarned: amountEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })

  return {
    totalStaked,
    totalAllocPoint: totalAllocPoint.toString(),
    allocPoint: allocPoint.toString(),
    weight: parseInt(weight.toString()),
    strategyPairBalance: strategyPairBalance.toString(),
    strategyPairBalanceFixed: null,
    stakeTokenDecimals: stakeTokenDecimals.toString(),
    masterChefPairBalance: pairBalanceMc.toString(),
    totalInQuoteToken: totalInQuoteToken.toString(),
    totalInQuoteTokenInMasterChef: quoteTokenAmountTotal.toString(),
    apy: {
      daily: dailyApy,
      yearly: yealryApy,
    },
  }
}

export default fetchVaultData
