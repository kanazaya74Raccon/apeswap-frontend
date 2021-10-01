import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { useMasterChefAddress, useMulticallAddress } from 'hooks/useAddress'
import { useWeb3React } from '@web3-react/core'
import { farmsConfig } from 'config/constants'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const useFetchFarmUserAllowances = async (account: string) => {
  const masterChefAdress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()
  const { chainId } = useWeb3React()

  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpAddresses[chainId]
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAdress] }
  })

  const rawLpAllowances = await multicall(multicallAddress, erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const useFetchFarmUserTokenBalances = async (account: string) => {
  const multicallAddress = useMulticallAddress()
  const { chainId } = useWeb3React()

  const calls = farmsConfig.map((farm) => {
    const lpContractAddress = farm.lpAddresses[chainId]
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(multicallAddress, erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const useFetchFarmUserStakedBalances = async (account: string) => {
  const masterChefAdress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    }
  })

  const rawStakedBalances = await multicall(multicallAddress, masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const useFetchFarmUserEarnings = async (account: string) => {
  const masterChefAdress = useMasterChefAddress()
  const multicallAddress = useMulticallAddress()

  const calls = farmsConfig.map((farm) => {
    return {
      address: masterChefAdress,
      name: 'pendingCake',
      params: [farm.pid, account],
    }
  })

  const rawEarnings = await multicall(multicallAddress, masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
