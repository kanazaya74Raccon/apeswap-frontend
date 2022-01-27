import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import vaultApeABI from 'config/abi/vaultApe.json'
import multicall from 'utils/multicall'
import { vaultsConfig } from 'config/constants'
import { getVaultApeAddress } from 'utils/addressHelper'

export const fetchVaultUserAllowances = async (account: string, chainId: number) => {
  const vaultApeAddress = getVaultApeAddress(chainId)
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const calls = filteredVaultsToFetch.map((vault) => {
    return { address: vault.stakeTokenAddress, name: 'allowance', params: [account, vaultApeAddress] }
  })
  const rawStakeAllowances = await multicall(chainId, erc20ABI, calls)
  const parsedStakeAllowances = rawStakeAllowances.map((stakeBalance) => {
    return new BigNumber(stakeBalance).toJSON()
  })
  return parsedStakeAllowances
}

export const fetchVaultUserTokenBalances = async (account: string, chainId: number) => {
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const calls = filteredVaultsToFetch.map((vault) => {
    return {
      address: vault.stakeTokenAddress,
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

export const fetchVaultUserStakedBalances = async (account: string, chainId: number) => {
  const vaultApeAddress = getVaultApeAddress(chainId)
  const filteredVaultsToFetch = vaultsConfig.filter((vault) => vault.network === chainId)
  const calls = filteredVaultsToFetch.map((vault) => {
    return {
      address: vaultApeAddress,
      name: 'stakedWantTokens',
      params: [vault.pid, account],
    }
  })

  const rawStakedBalances = await multicall(chainId, vaultApeABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}
