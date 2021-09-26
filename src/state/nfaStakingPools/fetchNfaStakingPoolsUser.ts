import { AbiItem } from 'web3-utils'
import nfaStakingPools from 'config/constants/nfaStakingPools'
import masterChefABI from 'config/abi/masterchef.json'
import nfaStakingPoolsAbi from 'config/abi/nfaStaking.json'
import nfaAbi from 'config/abi/nonFungibleApes.json'
import multicall from 'utils/multicall'
import { getMasterChefAddress, getNonFungibleApesAddress } from 'utils/addressHelpers'
import { getWeb3 } from 'utils/web3'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const nfaAddress = getNonFungibleApesAddress()
const web3 = getWeb3()
const masterChefContract = new web3.eth.Contract(masterChefABI as unknown as AbiItem, getMasterChefAddress())

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
  const stakedBalances = nfaStakingPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
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

  const pendingReward = await masterChefContract.methods.pendingCake('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}
