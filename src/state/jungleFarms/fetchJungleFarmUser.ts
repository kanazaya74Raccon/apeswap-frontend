import jungleFarmsConfig from 'config/constants/jungleFarms'
import sousChefABI from 'config/abi/sousChef.json'
import masterChefABI from 'config/abi/masterchef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import { getMasterChefAddress } from 'utils/addressHelper'
import { getContract } from 'utils/getContract'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import getProvider from 'utils/getProvider'

const nonBnbFarms = jungleFarmsConfig.filter((p) => p.stakingToken.address !== QuoteToken.BNB)
const bnbFarms = jungleFarmsConfig.filter((p) => p.stakingToken.address === QuoteToken.BNB)
const nonMasterFarms = jungleFarmsConfig.filter((p) => p.sousId !== 0)
const provider = getProvider(56)

export const fetchJungleFarmsAllowance = async (chainId: number, account) => {
  const calls = nonBnbFarms.map((p) => ({
    address: p.stakingToken.address[chainId],
    name: 'allowance',
    params: [account, p.contractAddress[chainId]],
  }))

  const allowances = await multicall(chainId, erc20ABI, calls)
  return nonBnbFarms.reduce(
    (acc, farm, index) => ({ ...acc, [farm.sousId]: new BigNumber(allowances[index]).toJSON() }),
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
    (acc, farm, index) => ({ ...acc, [farm.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // BNB farms
  const bnbBalance = await provider.getBalance(account)
  const bnbBalances = bnbFarms.reduce(
    (acc, farm) => ({ ...acc, [farm.sousId]: new BigNumber(bnbBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...bnbBalances }
}

export const fetchUserStakeBalances = async (chainId: number, account) => {
  const masterChefAddress = getMasterChefAddress(chainId)
  const masterChefContract = getContract(masterChefABI, masterChefAddress, chainId)
  const calls = nonMasterFarms.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(chainId, sousChefABI, calls)
  const stakedBalances = nonMasterFarms.reduce(
    (acc, farm, index) => ({
      ...acc,
      [farm.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  const { amount: masterFarmAmount } = await masterChefContract.userInfo('0', account)

  return { ...stakedBalances, 0: new BigNumber(masterFarmAmount.toString()).toJSON() }
}

export const fetchUserPendingRewards = async (chainId: number, account) => {
  const masterChefAddress = getMasterChefAddress(chainId)
  const masterChefContract = getContract(masterChefABI, masterChefAddress, chainId)
  const calls = nonMasterFarms.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(chainId, sousChefABI, calls)
  const pendingRewards = nonMasterFarms.reduce(
    (acc, farm, index) => ({
      ...acc,
      [farm.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  const pendingReward = await masterChefContract.pendingCake('0', account)

  return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
}
