import nfaStakingPoolsConfig from 'config/constants/nfaStakingPools'
import nfaStakingAbi from 'config/abi/nfaStaking.json'
import nonFungibleApesAbi from 'config/abi/nonFungibleApes.json'
import { getPoolApr } from 'utils/apr'
import { getBalanceNumber } from 'utils/formatBalance'
import multicall from 'utils/multicall'
import { getNonFungibleApesAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'
import { TokenPrices } from 'state/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const callsStartBlock = nfaStakingPoolsConfig.map((nfaStakingPool) => {
    return {
      address: nfaStakingPool.contractAddress[CHAIN_ID],
      name: 'startBlock',
    }
  })
  const callsEndBlock = nfaStakingPoolsConfig.map((nfaStakingPool) => {
    return {
      address: nfaStakingPool.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(nfaStakingAbi, callsStartBlock)
  const ends = await multicall(nfaStakingAbi, callsEndBlock)

  return nfaStakingPoolsConfig.map((nfaStakingPool, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: nfaStakingPool.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  const nfaContractAddress = getNonFungibleApesAddress()

  const calls = nfaStakingPoolsConfig.map((poolConfig) => {
    return {
      address: nfaContractAddress,
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const nfaStakingPoolTotalStaked = await multicall(nonFungibleApesAbi, calls)

  return [
    ...nfaStakingPoolsConfig.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nfaStakingPoolTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolTokenStatsAndApr = async (tokenPrices: TokenPrices[], totalStakingList) => {
  const mappedValues = nfaStakingPoolsConfig.map((pool) => {
    // Get values needed to calculate apr
    const curPool = pool
    const rewardToken = tokenPrices
      ? tokenPrices.find(
          (token) => pool?.rewardToken && token?.address[CHAIN_ID] === pool?.rewardToken.address[CHAIN_ID],
        )
      : pool.rewardToken
    const totalStaked = totalStakingList.find((totalStake) => totalStake.sousId === pool.sousId)?.totalStaked
    // Calculate apr
    const apr = getPoolApr(1, rewardToken?.price, getBalanceNumber(totalStaked), curPool?.tokenPerBlock)
    return {
      sousId: curPool.sousId,
      rewardToken,
      apr,
    }
  })
  return mappedValues
}
