import { apiBaseUrl } from 'hooks/api'
import { StatsOverall } from 'state/types'

const getStatsOverall = async (): Promise<StatsOverall> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export default getStatsOverall
