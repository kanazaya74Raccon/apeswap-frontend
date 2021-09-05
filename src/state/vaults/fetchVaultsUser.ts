import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import vaultApeABI from 'config/abi/vaultApe.json'
import multicall from 'utils/multicall'
import { vaultsConfig } from 'config/constants'
import { getVaultApeAddress } from 'utils/addressHelpers'

export const fetchVaultUserAllowances = async (account: string) => {
  const vaultApe = getVaultApeAddress()

  const calls = vaultsConfig.map((vault) => {
    return { address: vault.stakeTokenAddress, name: 'allowance', params: [account, vaultApe] }
  })

  const rawStakeAllowances = await multicall(erc20ABI, calls)
  const parsedStakeAllowances = rawStakeAllowances.map((stakeBalance) => {
    return new BigNumber(stakeBalance).toJSON()
  })
  return parsedStakeAllowances
}

export const fetchVaultUserTokenBalances = async (account: string) => {
  const calls = vaultsConfig.map((vault) => {
    return {
      address: vault.stakeTokenAddress,
      name: 'balanceOf',
      params: [account],
    }
  })
  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchVaultUserStakedBalances = async (account: string) => {
  const vaultApe = getVaultApeAddress()

  const calls = vaultsConfig.map((vault) => {
    return {
      address: vaultApe,
      name: 'userInfo',
      params: [vault.pid, account],
    }
  })

  const rawStakedBalances = await multicall(vaultApeABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchVaultUserEarnings = async (account: string) => {
  const vaultApe = getVaultApeAddress()

  const calls = vaultsConfig.map((vault) => {
    return {
      address: vaultApe,
      name: 'stakedWantTokens',
      params: [vault.pid, account],
    }
  })

  const rawEarnings = await multicall(vaultApeABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
