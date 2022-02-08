import React, { useEffect, useState } from 'react'
import { Flex, Text, PFarmingIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { StyledCard, CardWrapper } from './styles'

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
          {loadStats ? (
            <>
              <StyledCard>
                {!isMobile && (
                  <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                    <PFarmingIcon width="30px" />
                  </Flex>
                )}
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '25px' }}>Total Value Locked</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                    $300,000,000
                  </Text>
                </Flex>
              </StyledCard>
              <StyledCard>
                {!isMobile && (
                  <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                    <PFarmingIcon width="30px" />
                  </Flex>
                )}
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '25px' }}>Total Trade Volume</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                    $100,300,000,000
                  </Text>
                </Flex>
              </StyledCard>
              <StyledCard>
                {!isMobile && (
                  <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                    <PFarmingIcon width="30px" />
                  </Flex>
                )}
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '25px' }}>Market Cap</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                    $100,000,000
                  </Text>
                </Flex>
              </StyledCard>
              <StyledCard>
                {!isMobile && (
                  <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                    <PFarmingIcon width="30px" />
                  </Flex>
                )}
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text style={{ lineHeight: '25px' }}>Partners</Text>
                </Flex>
                <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
                  <Text fontSize="28px" bold style={{ lineHeight: '30px' }}>
                    130
                  </Text>
                </Flex>
              </StyledCard>
            </>
          ) : (
            <></>
          )}
        </CardWrapper>
      </Flex>
    </div>
  )
}

export default React.memo(StatCards)
