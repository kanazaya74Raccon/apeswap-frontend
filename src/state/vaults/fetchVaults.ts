import { VaultConfig } from 'config/constants/types'
import fetchVaultData from './fetchVaultData'

const fetchVaults = async (vaultsToFetch: VaultConfig[]) => {
  const data = await Promise.all(
    vaultsToFetch.map(async (vaultConfig) => {
      const vault = await fetchVaultData(vaultConfig)
      return { ...vaultConfig, ...vault }
    }),
  )
  return data
}

export default fetchVaults
