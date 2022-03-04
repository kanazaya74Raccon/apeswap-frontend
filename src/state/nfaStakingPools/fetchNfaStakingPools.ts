import nfaStakingPoolsConfig from 'config/constants/nfaStakingPools'
import nfaStakingAbi from 'config/abi/nfaStaking.json'
import nonFungibleApesAbi from 'config/abi/nonFungibleApes.json'
import { getPoolApr } from 'utils/apr'
import { getNonFungibleApesAddress } from 'utils/addressHelper'
import { getBalanceNumber } from 'utils/formatBalance'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import { TokenPrices } from 'state/types'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  return nfaStakingPoolsConfig.map((nfaStakingPool) => {
    return {
      sousId: nfaStakingPool.sousId,
      startBlock: 0,
    }
  })
}

export const fetchPoolsTotalStatking = async (chainId) => {
  const nfaAddress = getNonFungibleApesAddress(chainId)
  const calls = nfaStakingPoolsConfig.map((poolConfig) => {
    return {
      address: nfaAddress,
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const nfaStakingPoolTotalStaked = await multicall(chainId, nonFungibleApesAbi, calls)

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
