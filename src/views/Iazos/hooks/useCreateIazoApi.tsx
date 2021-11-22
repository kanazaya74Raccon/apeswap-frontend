// import { apiBaseUrl } from 'hooks/api'
import { useCallback } from 'react'

const useCreateIazoApi = () => {
  const apiBaseUrl = 'https://apeswap-api-development.herokuapp.com'
  const handleCreateIazoApi = useCallback(async (data) => {
    try {
      await fetch(`${apiBaseUrl}/iazo/`, {
        mode: 'no-cors',
        method: 'POST',
        body: data,
      })
    } catch (error) {
      console.log(error)
      console.warn('Unable to post data:', error)
    }
  }, [])

  return { onCreateIazoApi: handleCreateIazoApi }
}

export default useCreateIazoApi
