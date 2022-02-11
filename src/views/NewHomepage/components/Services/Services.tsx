import React, { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex, Link, Skeleton, Text } from '@apeswapfinance/uikit'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { ServiceWrapper, YieldCard, ColorWrap } from './styles'

const Services: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const [loadServices, setLoadServices] = useState(false)
  const { observerRef, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      setLoadServices(true)
    }
  }, [isIntersecting])

  return (
    <div ref={observerRef}>
      <ColorWrap>
        <ServiceWrapper>
          {loadServices ? (
            <>
              <YieldCard image="images/pool-background-day.svg">
                <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Flex flexDirection="column">
                    <Flex>
                      <Text color="white" fontSize="25px" bold>
                        Staking Pools
                      </Text>
                    </Flex>
                    <Flex>
                      <Text color="white">Stake BANANA or GNANA</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    style={{ bottom: '40px', height: '250px' }}
                  >
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                  </Flex>
                  <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
                    <Text color="white" fontSize="14px">
                      See All {'>'}
                    </Text>
                  </Flex>
                </Flex>
              </YieldCard>
              <YieldCard image="images/pool-background-day.svg">
                <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Flex flexDirection="column">
                    <Flex>
                      <Text color="white" fontSize="25px" bold>
                        Staking Pools
                      </Text>
                    </Flex>
                    <Flex>
                      <Text color="white">Stake BANANA or GNANA</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    style={{ bottom: '40px', height: '250px' }}
                  >
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                  </Flex>
                  <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
                    <Text color="white" fontSize="14px">
                      See All {'>'}
                    </Text>
                  </Flex>
                </Flex>
              </YieldCard>
              <YieldCard image="images/pool-background-day.svg">
                <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Flex flexDirection="column">
                    <Flex>
                      <Text color="white" fontSize="25px" bold>
                        Staking Pools
                      </Text>
                    </Flex>
                    <Flex>
                      <Text color="white">Stake BANANA or GNANA</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    style={{ bottom: '40px', height: '250px' }}
                  >
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                  </Flex>
                  <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
                    <Text color="white" fontSize="14px">
                      See All {'>'}
                    </Text>
                  </Flex>
                </Flex>
              </YieldCard>
              <YieldCard image="images/pool-background-day.svg">
                <Flex flexDirection="column" justifyContent="space-between" style={{ height: '100%' }}>
                  <Flex flexDirection="column">
                    <Flex>
                      <Text color="white" fontSize="25px" bold>
                        Staking Pools
                      </Text>
                    </Flex>
                    <Flex>
                      <Text color="white">Stake BANANA or GNANA</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    style={{ bottom: '40px', height: '250px' }}
                  >
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                    <Flex
                      mt="5px"
                      mb="5px"
                      style={{
                        width: '100%',
                        height: '70px',
                        background: 'rgba(250, 250, 250, .25)',
                        borderRadius: '10px',
                      }}
                    />
                  </Flex>
                  <Flex alignItems="center" justifyContent="center" style={{ textAlign: 'center' }}>
                    <Text color="white" fontSize="14px">
                      See All {'>'}
                    </Text>
                  </Flex>
                </Flex>
              </YieldCard>
            </>
          ) : (
            <>
              <YieldCard>
                <Skeleton height="100%" width="100%" />
              </YieldCard>
              <YieldCard>
                <Skeleton height="100%" width="100%" />
              </YieldCard>
              <YieldCard>
                <Skeleton height="100%" width="100%" />
              </YieldCard>
              <YieldCard>
                <Skeleton height="100%" width="100%" />
              </YieldCard>
            </>
          )}
        </ServiceWrapper>
      </ColorWrap>
    </div>
  )
}

export default React.memo(Services)
