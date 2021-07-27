import { useContext } from 'react'
import { SwiperContext } from '../contexts/SwiperProvider'

const useSwiper = () => {
  const swiperContext = useContext(SwiperContext)

  if (swiperContext === undefined) {
    throw new Error('Swiper not found')
  }

  return swiperContext
}

export default useSwiper
