import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

// Pool 0, Cake / Cake is a different kind of contract (master chef)
// BNB pools use the native BNB token (wrapping ? unwrapping is done at the contract level)
const nonBnbPools = poolsConfig.filter((p) => p.stakingToken.address !== QuoteToken.BNB)
const bnbPools = poolsConfig.filter((p) => p.stakingToken.address === QuoteToken.BNB)
const nonMasterPools = poolsConfig.filter((p) => p.sousId !== 0)
const web3 = getWeb3()

export const fetchPoolsAllowance = async (multicallContract, chainId: number, account) => {
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'allowance',
    params: [account, p.contractAddress[chainId]],
  }))

  const allowances = await multicall(multicallContract, erc20ABI, calls)
  return nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (multicallContract, chainId: number, account) => {
  // Non BNB pools
  const calls = nonBnbPools.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(multicallContract, erc20ABI, calls)
  const tokenBalances = nonBnbPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB pools
  const bnbBalance = await web3.eth.getBalance(account)
  const bnbBalances = bnbPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (multicallContract, masterChefContract, chainId: number, account) => {
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(multicallContract, sousChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (multicallContract, masterChefContract, chainId: number, account) => {
  const calls = nonMasterPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(multicallContract, sousChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  const pendingReward = await masterChefContract.methods.pendingCake('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}
