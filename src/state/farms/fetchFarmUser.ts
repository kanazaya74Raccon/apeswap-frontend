import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { Contract } from 'web3-eth-contract'
import { farmsConfig } from 'config/constants'

export const fetchFarmUserAllowances = async (
  multicallContract: Contract,
  masterChefAddress: string,
  chainId: number,
  account: string,
) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpAddresses[chainId]
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })

  const rawLpAllowances = await multicall(multicallContract, erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (multicallContract: Contract, chainId: number, account: string) => {
  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpAddresses[chainId]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(multicallContract, erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (
  multicallContract: Contract,
  masterChefAddress: string,
  account: string,
) => {
  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(multicallContract, masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (
  multicallContract: Contract,
  masterChefAddress: string,
  account: string,
) => {
  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingCake',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(multicallContract, masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
