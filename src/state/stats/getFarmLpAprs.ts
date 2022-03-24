import { apiBaseUrl } from 'hooks/api'

const getFarmLpAprs = async (chainId: number) => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/network/lpAprs/${chainId}`)
    const farmLpAprs = await response.json()
    if (farmLpAprs.statusCode === 500) {
      return null
    }
    return farmLpAprs
  } catch (error) {
    return null
  }
}

export default getFarmLpAprs
