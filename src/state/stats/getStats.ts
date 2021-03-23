import { apiBaseUrl } from 'hooks/api'
import { Stats } from 'state/types'

const getStats = async (address: string): Promise<Stats> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/${address}`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export default getStats
