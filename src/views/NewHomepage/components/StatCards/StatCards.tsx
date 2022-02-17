import React, { useEffect, useState } from 'react'
import { Flex, Text, PFarmingIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import CountUp from 'react-countup'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { StyledCard, CardWrapper } from './styles'
import { statStubData } from './statStubData'

const StatCards: React.FC = () => {
  const { isSm, isXs } = useMatchBreakpoints()
  const [loadStats, setLoadStats] = useState(false)
  const isMobile = isSm || isXs
  const { observerRef, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      setLoadStats(true)
    }
  }, [isIntersecting])

  return (
    <div ref={observerRef}>
      <Flex alignItems="center" justifyContent="center" style={{ width: '100%' }}>
        <CardWrapper>
          {statStubData.map((stat) => {
            return (
              <StyledCard>
                {!isMobile && (
                  <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                    <PFarmingIcon width="30px" />
                  </Flex>
                )}
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '25px' }}>{stat.title}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                    {stat.title !== 'Partners' && '$'}
                    <CountUp end={stat?.value} decimals={0} duration={1} separator="," />
                  </Text>
                </Flex>
              </StyledCard>
            )
          })}
        </CardWrapper>
      </Flex>
    </div>
  )
}

export default React.memo(StatCards)
