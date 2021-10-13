import { AbiItem } from 'web3-utils'
import nfaStakingPools from 'config/constants/nfaStakingPools'
import masterChefABI from 'config/abi/masterchef.json'
import nfaStakingPoolsAbi from 'config/abi/nfaStaking.json'
import nfaAbi from 'config/abi/nonFungibleApes.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress, getNonFungibleApesAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const nfaAddress = getNonFungibleApesAddress()
const web3 = getWeb3()

export const fetchPoolsAllowance = async (account) => {
  const calls = nfaStakingPools.map((p) => ({
    address: nfaAddress,
    name: 'isApprovedForAll',
    params: [account, p.contractAddress[CHAIN_ID]],
  }))

  const allowances = await multicall(nfaAbi, calls)
  return nfaStakingPools.reduce((acc, pool, index) => ({ ...acc, [pool.sousId]: allowances[index][0] }), {})
}

export const fetchUserBalances = async (account) => {
  const calls = nfaStakingPools.map((p) => ({
    address: nfaAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(nfaAbi, calls)
  const tokenBalances = nfaStakingPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )
  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nfaStakingPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(nfaStakingPoolsAbi, calls)
  console.log('user info')
  console.log(userInfo)
  const stakedBalances = nfaStakingPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  return { ...stakedBalances }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nfaStakingPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(nfaStakingPoolsAbi, calls)
  const pendingRewards = nfaStakingPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  return { ...pendingRewards }
}

export const fetchUserStakedNfas = async (account) => {
  const calls = nfaStakingPools.map((p) => ({
    address: p.contractAddress[CHAIN_ID],
    name: 'stakedNfts',
    params: [account],
  }))
  const res = await multicall(nfaStakingPoolsAbi, calls)
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
