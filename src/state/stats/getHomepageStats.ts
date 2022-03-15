// import { apiBaseUrl } from 'hooks/api'
import { HomepageData } from 'state/types'

const apiBaseUrl = ' https://apeswap-api-development.herokuapp.com'


const getHomepageStats = async (): Promise<HomepageData> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/tvl`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    return null
  }
}

export default getHomepageStats
