import { useEffect, useState } from 'react'
import { getBurningGames } from '../../hooks/api'

const useFetchBurningGames = () => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const games = await getBurningGames()
        setState({
          data: games,
          loading: false,
        })
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  return state
}

export default useFetchBurningGames
