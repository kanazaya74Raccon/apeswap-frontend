import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import vaultApeABI from 'config/abi/vaultApe.json'
import multicall from 'utils/multicall'
import { vaultsConfig } from 'config/constants'

export const fetchVaultUserAllowances = async (
  multicallContract,
  vaultApeAddress: string,
  account: string,
  chainId: number,
) => {
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const calls = filteredVaultsToFetch.map((vault) => {
    return { address: vault.stakeTokenAddress, name: 'allowance', params: [account, vaultApeAddress] }
  })
  const rawStakeAllowances = await multicall(multicallContract, erc20ABI, calls)
  const parsedStakeAllowances = rawStakeAllowances.map((stakeBalance) => {
    return new BigNumber(stakeBalance).toJSON()
  })
  return parsedStakeAllowances
}

export const fetchVaultUserTokenBalances = async (multicallContract, account: string, chainId: number) => {
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const calls = filteredVaultsToFetch.map((vault) => {
    return {
      address: vault.stakeTokenAddress,
      name: 'balanceOf',
      params: [account],
    }
  })
  console.log(calls)
  const rawTokenBalances = await multicall(multicallContract, erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchVaultUserStakedBalances = async (
  multicallContract,
  vaultApeAddress: string,
  account: string,
  chainId: number,
) => {
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const calls = filteredVaultsToFetch.map((vault) => {
    return {
      address: vaultApeAddress,
      name: 'stakedWantTokens',
      params: [vault.pid, account],
    }
  })

  const rawStakedBalances = await multicall(multicallContract, vaultApeABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}
