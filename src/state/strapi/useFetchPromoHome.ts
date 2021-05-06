import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useEffect, useState } from 'react'
import { getPromosHome } from '../../hooks/api'

const useFetchPromoHome = () => {
  const { account, connect } = useWallet()
  const [state, setState] = useState({
    carouselSlidesData: [],
    loading: true,
  })

  useEffect(() => {
    getPromosHome().then((promos) => {
      setState({
        carouselSlidesData: promos,
        loading: false,
      })
    })
  }, [account, connect])

  return state
}

export default useFetchPromoHome
