import { apiBaseUrl } from 'hooks/api'
import { useCallback } from 'react'
import { useNetworkChainId } from 'state/hooks'
import axiosRetry from 'axios-retry'
import axios from 'axios'

const useCreateIazoApi = () => {
  const chainId = useNetworkChainId()
  const apiUrl = chainId === 97 ? 'https://apeswap-api-development.herokuapp.com' : apiBaseUrl
  const handleCreateIazoApi = useCallback(
    async (data) => {
      try {
        axiosRetry(axios, {
          retries: 3,
          retryCondition: () => true,
        })
        const resp = await axios.post(`${apiUrl}/iazo/`, data)
        return resp
      } catch (error) {
        console.warn('Unable to post data:', error)
        return error
      }
    },
    [apiUrl],
  )

  return { onCreateIazoApi: handleCreateIazoApi }
}

export default useCreateIazoApi
