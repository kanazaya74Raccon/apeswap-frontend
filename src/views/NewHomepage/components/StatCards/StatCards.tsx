import React, { useEffect, useState } from 'react'
import { Flex, Text, PFarmingIcon, useMatchBreakpoints, Skeleton } from '@apeswapfinance/uikit'
import CountUp from 'react-countup'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useFetchHomepageStats, useHomepageStats } from 'state/hooks'
import { StyledCard, CardWrapper } from './styles'
import { statsData } from './statsData'

const StatCards: React.FC = () => {
  const { isSm, isXs } = useMatchBreakpoints()
  const [loadStats, setLoadStats] = useState(false)
  const isMobile = isSm || isXs
  const { observerRef, isIntersecting } = useIntersectionObserver()
  useFetchHomepageStats(loadStats)
  const rawStats = useHomepageStats()
  const stats = statsData.map((stat) => {
    return { ...stat, value: rawStats ? rawStats[stat.id] : null }
  })

  useEffect(() => {
    if (isIntersecting) {
      setLoadStats(true)
    }
  }, [isIntersecting])

  return (
    <div ref={observerRef}>
      <Flex alignItems="center" justifyContent="center" style={{ width: '100%' }}>
        <CardWrapper>
          {stats?.map((stat) => {
            return (
              <StyledCard key={stat.id}>
                {!isMobile && (
                  <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                    <PFarmingIcon width="30px" />
                  </Flex>
                )}
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '25px' }}>{stat.title}</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  {stat?.value ? (
                    <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                      {stat?.title !== 'Partners' && '$'}
                      <CountUp end={stat?.value} decimals={0} duration={1} separator="," />
                    </Text>
                  ) : (
                    <Skeleton width="220px" height="30px" />
                  )}
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
