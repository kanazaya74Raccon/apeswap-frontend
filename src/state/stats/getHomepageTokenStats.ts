import { apiBaseUrl } from 'hooks/api'
import { HomepageTokenStats } from 'state/types'

const getHomepageTokenStats = async (): Promise<HomepageTokenStats[]> => {
  try {
    const response = await fetch(`${apiBaseUrl}/tokens/primary`)
    const tokenRes = await response.json()
    if (tokenRes.statusCode === 500) {
      return null
    }
    return tokenRes?.tokens
  } catch (error) {
    return null
  }
}

export default getHomepageTokenStats
