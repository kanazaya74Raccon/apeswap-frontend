import { useEffect, useState } from 'react'
import { getPromosHome } from '../../hooks/api'

const useFetchPromoHome = () => {
  const [state, setState] = useState({
    carouselSlidesData: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promos = await getPromosHome()
        setState({
          carouselSlidesData: promos,
          loading: false,
        })
      } catch (error) {
        console.warn('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [])

  return state
}

export default useFetchPromoHome
