import axios from 'axios'
import { LiveIfo } from 'config/constants/types'

const fetchIfoStatusFromApi = async (): Promise<LiveIfo[]> => {
  try {
    const liveIfoResult = await axios.get('https://apeswap-strapi.herokuapp.com/navbar-settings')
    const res = liveIfoResult.data[0].settings

    return res
  } catch (error) {
    console.error('fetchIfoStatusFromApiError::', error)
    return null
  }
}

export default fetchIfoStatusFromApi
