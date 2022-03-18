// import { apiBaseUrl } from 'hooks/api'
const apiBaseUrl = 'https://apeswap-api-development.herokuapp.com'

const getFarmLpAprs = async () => {
  try {
    const response = await fetch(`${apiBaseUrl}/stats/network/lpAprs`)
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
