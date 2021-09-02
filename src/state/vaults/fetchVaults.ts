import { VaultConfig } from 'config/constants/types'
import fetchVault from './fetchVault'

const fetchVaults = async (vaultsToFetch: VaultConfig[]) => {
  const data = await Promise.all(
    vaultsToFetch.map(async (vaultConfig) => {
      const vaultPublicData = await fetchVault(vaultConfig)
      return { ...vaultConfig, ...vaultPublicData }
    }),
  )
  return data
}

export default fetchVaults
