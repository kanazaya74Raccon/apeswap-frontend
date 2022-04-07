// import { apiBaseUrl } from 'hooks/api'
const apiBaseUrl = 'https://apeswap-api-development.herokuapp.com'

const getBillNftData = async (billNftId: string) => {
  try {
    const response = await fetch(`${apiBaseUrl}/bills/bsc/${billNftId}`)
    const billNftDataResp = await response.json()
    if (billNftDataResp.statusCode === 500) {
      return null
    }
    return billNftDataResp
  } catch (error) {
    return null
  }
}

export default getBillNftData
