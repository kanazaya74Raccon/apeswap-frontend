import { apiBaseUrl } from 'hooks/api'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const getBillNftData = async (billNftId: string) => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apiBaseUrl}/bills/bsc/${billNftId}`)
    const billNftDataResp = await response.data
    if (billNftDataResp.statusCode === 500) {
      return null
    }
    return billNftDataResp
  } catch (error) {
    return null
  }
}

export const getNewBillNftData = async (billNftId: string, transactionHash: string) => {
  try {
    axiosRetry(axios, {
      retries: 5,
      retryCondition: () => true,
    })
    const response = await axios.get(`${apiBaseUrl}/bills/bsc/${billNftId}/${transactionHash}`)
    const billNftDataResp = await response.data
    if (billNftDataResp.statusCode === 500) {
      return null
    }
    return billNftDataResp
  } catch (error) {
    return null
  }
}

export default getBillNftData
