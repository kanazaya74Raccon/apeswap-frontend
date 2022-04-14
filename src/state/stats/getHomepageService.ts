import { apiBaseUrl } from 'hooks/api'
import { ServiceData } from 'state/types'

const getHomepageServiceStats = async (): Promise<ServiceData[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/features`)
    const serviceResp = await response.json()
    if (serviceResp.statusCode === 500) {
      return null
    }
    return serviceResp
  } catch (error) {
    return null
  }
}

export default getHomepageServiceStats
