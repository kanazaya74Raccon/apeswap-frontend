import { VaultConfig } from 'config/constants/types'
import { TokenPrices } from 'state/types'
import fetchVaultData from './fetchVaultData'

const fetchVaults = async (
  multicallContract,
  chainId: number,
  vaultsToFetch: VaultConfig[],
  tokenPrices: TokenPrices[],
) => {
  const filteredVaultsToFetch = vaultsToFetch.filter((vault) => vault.network === chainId)
  const data = await Promise.all(
    filteredVaultsToFetch.map(async (vaultConfig) => {
      const vault = await fetchVaultData(multicallContract, chainId, vaultConfig, tokenPrices)
      return { ...vaultConfig, ...vault }
    }),
  )
  return data
}

export default fetchVaults
