import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex, Link, Text } from '@apeswapfinance/uikit'
import { ServiceWrapper, YieldCard, ColorWrap } from './styles'

const Services: React.FC = () => {
  const { chainId } = useActiveWeb3React()

  return (
    <ColorWrap>
      <ServiceWrapper>
        <YieldCard image="images/pool-background-day.svg">
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
          <Flex flexDirection="column" justifyContent="space-between" style={{ bottom: '40px', height: '250px' }}>
            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Text color="white" fontSize="14px">
              See All {'>'}
            </Text>
          </Flex>
        </YieldCard>
        <YieldCard image="images/pool-background-day.svg">
          <Flex flexDirection="column">
            <Flex>
              <Text color="white" fontSize="25px" bold>
                Yield Farms
              </Text>
            </Flex>
            <Flex>
              <Text color="white">Stake BANANA or GNANA</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" justifyContent="space-between" style={{ bottom: '40px', height: '250px' }}>
            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Text color="white" fontSize="14px">
              See All {'>'}
            </Text>
          </Flex>
        </YieldCard>
        <YieldCard image="images/pool-background-day.svg">
          <Flex flexDirection="column">
            <Flex>
              <Text color="white" fontSize="25px" bold>
                Lending
              </Text>
            </Flex>
            <Flex>
              <Text color="white">Stake BANANA or GNANA</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" justifyContent="space-between" style={{ bottom: '40px', height: '250px' }}>
            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Text color="white" fontSize="14px">
              See All {'>'}
            </Text>
          </Flex>
        </YieldCard>
        <YieldCard image="images/pool-background-day.svg">
          <Flex flexDirection="column">
            <Flex>
              <Text color="white" fontSize="25px" bold>
                Treasury Bills
              </Text>
            </Flex>
            <Flex>
              <Text color="white">Stake BANANA or GNANA</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" justifyContent="space-between" style={{ bottom: '40px', height: '250px' }}>
            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />

            <Flex
              style={{ width: '100%', height: '70px', background: 'rgba(250, 250, 250, .25)', borderRadius: '10px' }}
            />
          </Flex>
          <Flex alignItems="center" justifyContent="center">
            <Text color="white" fontSize="14px">
              See All {'>'}
            </Text>
          </Flex>
        </YieldCard>
      </ServiceWrapper>
    </ColorWrap>
  )
}

export default React.memo(Services)
