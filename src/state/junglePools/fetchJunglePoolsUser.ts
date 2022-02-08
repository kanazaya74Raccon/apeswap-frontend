import junglePools from 'config/constants/junglePools'
import sousChefABI from 'config/abi/sousChef.json'
import masterChefABI from 'config/abi/masterchef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import { getMasterChefAddress } from 'utils/addressHelper'
import { getContract } from 'utils/getContract'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import getProvider from 'utils/getProvider'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = junglePools.filter((p) => p.stakingToken.address !== QuoteToken.BNB)
const bnbPools = junglePools.filter((p) => p.stakingToken.address === QuoteToken.BNB)
const nonMasterPools = junglePools.filter((p) => p.sousId !== 0)
const provider = getProvider(56)

export const fetchJunglePoolsAllowance = async (chainId: number, account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'allowance',
    params: [account, p.contractAddress[chainId]],
  }))

  const allowances = await multicall(chainId, erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (chainId: number, account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(chainId, erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await provider.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (chainId: number, account) => {
  const masterChefAddress = getMasterChefAddress(chainId)
  const masterChefContract = getContract(masterChefABI, masterChefAddress, chainId)
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(chainId, sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
}

export const fetchUserPendingRewards = async (chainId: number, account) => {
  const masterChefAddress = getMasterChefAddress(chainId)
  const masterChefContract = getContract(masterChefABI, masterChefAddress, chainId)
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(chainId, sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  const pendingReward = await masterChefContract.pendingCake('0', account)

  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
}
