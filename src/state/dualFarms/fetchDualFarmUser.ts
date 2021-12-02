import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import miniChefABI from 'config/abi/miniApeV2.json'
import rewarderABI from 'config/abi/miniComplexRewarder.json'
import { getMiniChefAddress } from 'utils/addressHelper'
import multicall from 'utils/multicall'
import { dualFarmsConfig } from 'config/constants'

export const fetchDualFarmUserAllowances = async (chainId: number, account: string) => {
  const miniChefAddress = getMiniChefAddress(chainId)
  const calls = dualFarmsConfig.map((farm) => {
    const lpContractAddress = farm.stakeTokenAddress
    return { address: lpContractAddress, name: 'allowance', params: [account, miniChefAddress] }
  })

  const rawLpAllowances = await multicall(chainId, erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchDualFarmUserTokenBalances = async (chainId: number, account: string) => {
  const calls = dualFarmsConfig.map((farm) => {
    const lpContractAddress = farm.stakeTokenAddress
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(chainId, erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchDualFarmUserStakedBalances = async (
  chainId: number,

  account: string,
) => {
  const miniChefAddress = getMiniChefAddress(chainId)
  const calls = dualFarmsConfig.map((farm) => {
    return {
      address: miniChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(chainId, miniChefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchDualMiniChefEarnings = async (
  chainId: number,

  account: string,
) => {
  const miniChefAddress = getMiniChefAddress(chainId)
  const calls = dualFarmsConfig.map((farm) => {
    return {
      address: miniChefAddress,
      name: 'pendingBanana',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(chainId, miniChefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}

export const fetchDualFarmRewarderEarnings = async (chainId: number, account: string) => {
  const calls = dualFarmsConfig.map((farm) => {
    return {
      address: farm.rewarderAddress,
      name: 'pendingToken',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(chainId, rewarderABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
