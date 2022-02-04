import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { BannerWrapper } from './styles'
import Cards from './Cards/Cards'

const Banner: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <BannerWrapper>
      <Cards />
    </BannerWrapper>
  )
}

export default Banner
