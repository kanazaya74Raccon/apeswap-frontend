import React, { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Flex, Skeleton, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { Bubble, NewsCard, NewsWrapper } from './styles'

const News: React.FC = () => {
  const [loadImages, setLodImages] = useState(false)
  // const [amountToDisplay, setAmountToDisplay] = useState()
  const { isSm, isXs, isXl, isLg } = useMatchBreakpoints()
  const isMobile = isSm || isXs
  const isTablet = !isXl && !isLg && !isMobile
  const amountToDisplay = isMobile ? 1 : isTablet ? 3 : 5
  const { chainId } = useActiveWeb3React()
  const { observerRef, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      setLodImages(true)
    }
  }, [isIntersecting])

  console.log(amountToDisplay)

  return (
    <div ref={observerRef}>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{ position: 'relative', width: '100%' }}
      >
        <NewsWrapper>
          {loadImages ? (
            <>
              <NewsCard image="images/news1.png" />
              <NewsCard image="images/news2.png" />
              <NewsCard image="images/news3.png" />
              <NewsCard image="images/news4.png" />
              <NewsCard image="images/news5.png" />
            </>
          ) : (
            <>
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
              <Skeleton height="348px" width="266px" />
            </>
          )}
        </NewsWrapper>
        <Flex justifyContent="center" alignContent="center" style={{ position: 'absolute', bottom: '50px' }}>
          <Bubble isActive />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </Flex>
      </Flex>
    </div>
  )
}

export default React.memo(News)
