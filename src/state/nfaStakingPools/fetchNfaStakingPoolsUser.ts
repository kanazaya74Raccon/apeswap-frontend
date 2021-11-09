import nfaStakingPools from 'config/constants/nfaStakingPools'
import nfaStakingPoolsAbi from 'config/abi/nfaStaking.json'
import nfaAbi from 'config/abi/nonFungibleApes.json'
import multicallABI from 'config/abi/Multicall.json'
import { getMulticallAddress, getNonFungibleApesAddress } from 'utils/addressHelper'
import { getContract } from 'utils/web3'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'

export const fetchPoolsAllowance = async (chainId, account) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const nfaAddress = getNonFungibleApesAddress(chainId)
  const calls = nfaStakingPools.map((p) => ({
    address: nfaAddress,
    name: 'isApprovedForAll',
    params: [account, p.contractAddress[chainId]],
  }))

  const allowances = await multicall(multicallContract, nfaAbi, calls)
  return nfaStakingPools.reduce((acc, pool, index) => ({ ...acc, [pool.sousId]: allowances[index][0] }), {})
}

export const fetchUserBalances = async (chainId, account) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const nfaAddress = getNonFungibleApesAddress(chainId)
  const calls = nfaStakingPools.map(() => ({
    address: nfaAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(multicallContract, nfaAbi, calls)
  const tokenBalances = nfaStakingPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )
  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (chainId, account) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const calls = nfaStakingPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(multicallContract, nfaStakingPoolsAbi, calls)
  const stakedBalances = nfaStakingPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...stakedBalances }
}

export const fetchUserPendingRewards = async (chainId, account) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const calls = nfaStakingPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(multicallContract, nfaStakingPoolsAbi, calls)
  const pendingRewards = nfaStakingPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  return { ...pendingRewards }
}

export const fetchUserStakedNfas = async (chainId, account) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const calls = nfaStakingPools.map((p) => ({
    address: p.contractAddress[chainId],
    name: 'stakedNfts',
    params: [account],
  }))
  const res = await multicall(multicallContract, nfaStakingPoolsAbi, calls)
  const stakedNfas = nfaStakingPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: res[index][0]?.map((item) => {
        return item.toNumber()
      }),
    }),
    {},
  )

  return { ...stakedNfas }
}
