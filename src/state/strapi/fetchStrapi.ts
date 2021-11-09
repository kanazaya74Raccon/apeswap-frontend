import { useEffect, useState } from 'react'
import { getPromosHome, getNewsHome, getFarmsHome, getPoolsHome, getHeadersHome } from '../../hooks/api'

export const useFetchPromoHome = () => {
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

export const useFetchNewsHome = () => {
  const [state, setState] = useState({
    newsData: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const news = await getNewsHome()
        setState({
          newsData: news,
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

export const useFetchPoolsHome = () => {
  const [state, setState] = useState({
    poolsData: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pools = await getPoolsHome()
        setState({
          poolsData: pools,
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

export const useFetchFarmsHome = () => {
  const [state, setState] = useState({
    farmsData: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const farms = await getFarmsHome()
        setState({
          farmsData: farms,
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

export const useFetchHeadersHome = () => {
  const [state, setState] = useState({
    headersData: [],
    loading: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = await getHeadersHome()
        setState({
          headersData: headers,
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
