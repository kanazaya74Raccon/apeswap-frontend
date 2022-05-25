import jungleFarmsConfig from 'config/constants/jungleFarms'
import jungleChefABI from 'config/abi/jungleChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import getProvider from 'utils/getProvider'

const nonBnbFarms = jungleFarmsConfig.filter((p) => p.stakingToken.address !== QuoteToken.BNB)
const bnbFarms = jungleFarmsConfig.filter((p) => p.stakingToken.address === QuoteToken.BNB)
const provider = getProvider(56)

export const fetchJungleFarmsAllowance = async (chainId: number, account) => {
  const calls = nonBnbFarms.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'allowance',
    params: [account, p.contractAddress[chainId]],
  }))

  const allowances = await multicall(chainId, erc20ABI, calls)
  return nonBnbFarms.reduce(
    (acc, farm, index) => ({ ...acc, [farm.jungleId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (chainId: number, account) => {
  // Non BNB farms
  const calls = nonBnbFarms.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(chainId, erc20ABI, calls)
  const tokenBalances = nonBnbFarms.reduce(
    (acc, farm, index) => ({ ...acc, [farm.jungleId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB farms
  const bnbBalance = await provider.getBalance(account)
  const bnbBalances = bnbFarms.reduce(
    (acc, farm) => ({ ...acc, [farm.jungleId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (chainId: number, account) => {
  const calls = jungleFarmsConfig.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(chainId, jungleChefABI, calls)
  const stakedBalances = jungleFarmsConfig.reduce(
    (acc, farm, index) => ({
      ...acc,
      [farm.jungleId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...stakedBalances }
}

export const fetchUserPendingRewards = async (chainId: number, account) => {
  const calls = jungleFarmsConfig.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(chainId, jungleChefABI, calls)
  const pendingRewards = jungleFarmsConfig.reduce(
    (acc, farm, index) => ({
      ...acc,
      [farm.jungleId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  return { ...pendingRewards }
}
