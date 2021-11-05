import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import multicallABI from 'config/abi/Multicall.json'
import multicall from 'utils/multicall'
import { getMulticallAddress } from 'utils/addressHelper'
import { CHAIN_ID } from 'config/constants/chains'
import { getContract } from 'utils/web3'
import { VaultConfig } from 'config/constants/types'
import { vaultsConfig } from 'config/constants'
import { BLOCKS_PER_YEAR, MATIC_BLOCKS_PER_YEAR, SECONDS_PER_YEAR, VAULT_COMPOUNDS_PER_DAY } from 'config'
import { getBalanceNumber } from 'utils/formatBalance'
import { TokenPrices } from 'state/types'
import { getRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import masterchefABI from './vaultedMasterChefABI.json'

const fetchVaultData = async (chainId: number, tokenPrices: TokenPrices[]) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const data = await Promise.all(
    filteredVaultsToFetch.map(async (vault: VaultConfig) => {
      const { strat, stakeTokenAddress, token0, masterchef, isPair, totalFees, rewardsInSeconds } = vault

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
        (token) => token.address[chainId]?.toLowerCase() === masterchef.rewardToken?.toLowerCase(),
      )?.price
      const quoteTokenPriceUsd = tokenPrices?.find(
        (token) => token.address[chainId]?.toLowerCase() === token0.address[chainId]?.toLowerCase(),
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
        ? totalInQuoteToken.times(quoteTokenPriceUsd).times(pairTokenRatio).toString()
        : quoteTokenAmountTotal.times(quoteTokenPriceUsd).toString()

      // Calculate APR
      const blockPerYear = () => {
        if (chainId === CHAIN_ID.MATIC || chainId === CHAIN_ID.MATIC_TESTNET) {
          return MATIC_BLOCKS_PER_YEAR
        }
        return BLOCKS_PER_YEAR
      }
      const poolWeight = totalAllocPoint ? allocPoint.div(new BigNumber(totalAllocPoint)) : new BigNumber(0)
      const rewardTokensPerBlock = rewardsPerBlock ? getBalanceNumber(new BigNumber(rewardsPerBlock)) : new BigNumber(0)
      const totalValueInLp =
        isPair &&
        new BigNumber(quoteTokenPairBalance)
          .div(new BigNumber(10).pow(18))
          .times(new BigNumber(2))
          .times(quoteTokenPriceUsd)
      const stakeTokenPrice = isPair
        ? totalValueInLp.div(new BigNumber(getBalanceNumber(pairTotalSupply))).toNumber()
        : quoteTokenPriceUsd
      const yearlyRewardTokens = rewardsInSeconds
        ? SECONDS_PER_YEAR.times(rewardTokensPerBlock).times(poolWeight)
        : blockPerYear().times(rewardTokensPerBlock).times(poolWeight)
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
        performanceFee: totalFees,
      })
      const amountEarnedDaily = tokenEarnedPerThousandDollarsCompounding({
        numberOfDays: 1,
        farmApr: apr,
        tokenPrice: earnTokenPriceUsd,
        compoundFrequency: VAULT_COMPOUNDS_PER_DAY,
        performanceFee: totalFees,
      })
      const yealryApy = getRoi({ amountEarned: amountEarnedYealry, amountInvested: oneThousandDollarsWorthOfToken })
      const dailyApy = getRoi({ amountEarned: amountEarnedDaily, amountInvested: oneThousandDollarsWorthOfToken })

      return {
        ...vault,
        totalStaked,
        totalAllocPoint: totalAllocPoint.toString(),
        allocPoint: allocPoint.toString(),
        weight: parseInt(weight.toString()),
        strategyPairBalance: strategyPairBalance.toString(),
        strategyPairBalanceFixed: null,
        stakeTokenDecimals: stakeTokenDecimals.toString(),
        stakeTokenPrice,
        masterChefPairBalance: pairBalanceMc.toString(),
        totalInQuoteToken: totalInQuoteToken.toString(),
        totalInQuoteTokenInMasterChef: quoteTokenAmountTotal.toString(),
        apy: {
          daily: dailyApy,
          yearly: yealryApy,
        },
      }
    }),
  )
  return data
}

export default fetchVaultData
