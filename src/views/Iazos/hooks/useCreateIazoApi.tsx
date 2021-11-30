import { apiBaseUrl } from 'hooks/api'
import { useCallback } from 'react'
import { useNetworkChainId } from 'state/hooks'

const useCreateIazoApi = () => {
  const chainId = useNetworkChainId()
  const apiUrl = chainId === 97 ? 'https://apeswap-api-development.herokuapp.com' : apiBaseUrl
  const handleCreateIazoApi = useCallback(async (data) => {
    try {
      const resp = await fetch(`${apiUrl}/iazo/`, {
        method: 'POST',
        body: data,
      })
      return resp
    } catch (error) {
      console.warn('Unable to post data:', error)
      return error
    }
  }, [apiUrl])

  return { onCreateIazoApi: handleCreateIazoApi }
}

export default useCreateIazoApi
