import jungleFarmsConfig from 'config/constants/jungleFarms'
import jungleChefABI from 'config/abi/jungleChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'

export const fetchJungleFarmsAllowance = async (chainId: number, account) => {
  const calls = jungleFarmsConfig
    .filter((f) => f.network === chainId)
    .map((f) => ({
      address: f.stakingToken.address[chainId],
      name: 'allowance',
      params: [account, f.contractAddress[chainId]],
    }))

  const allowances = await multicall(chainId, erc20ABI, calls)
  return jungleFarmsConfig.reduce(
    (acc, farm, index) => ({ ...acc, [farm.jungleId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (chainId: number, account) => {
  const calls = jungleFarmsConfig
    .filter((f) => f.network === chainId)
    .map((p) => ({
      address: p.stakingToken.address[chainId],
      name: 'balanceOf',
      params: [account],
    }))
  const tokenBalancesRaw = await multicall(chainId, erc20ABI, calls)
  const tokenBalances = jungleFarmsConfig.reduce(
    (acc, farm, index) => ({ ...acc, [farm.jungleId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
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
