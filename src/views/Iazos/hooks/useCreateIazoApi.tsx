// import { apiBaseUrl } from 'hooks/api'
import { useCallback } from 'react'

const useCreateIazoApi = () => {
  const apiBaseUrl = 'https://apeswap-api-development.herokuapp.com'
  const handleCreateIazoApi = useCallback(async (data) => {
    try {
      const resp = await fetch(`${apiBaseUrl}/iazo/`, {
        method: 'POST',
        body: data,
      })
      return resp
    } catch (error) {
      console.warn('Unable to post data:', error)
      return error
    }
  }, [])

  return { onCreateIazoApi: handleCreateIazoApi }
}

export default useCreateIazoApi
