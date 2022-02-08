import React, { useEffect, useState } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex, Text, Skeleton } from '@apeswapfinance/uikit'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Title, TokenContainer, TrendingTokensWrapper, Container } from './styles'

const TrendingTokens: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const [loadTokens, setLoadTokens] = useState(false)
  const { observerRef, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    if (isIntersecting) {
      setLoadTokens(true)
    }
  }, [isIntersecting])

  return (
    <div ref={observerRef}>
      <Container>
        <TrendingTokensWrapper>
          <Title>Trending Tokens</Title>
          <Flex flexWrap="wrap" justifyContent="space-between" alignItems="space-between" style={{ width: '100%' }}>
            {loadTokens ? (
              <>
                <TokenContainer>
                  <Flex>
                    <div
                      style={{
                        height: '36px',
                        width: '36px',
                        borderRadius: '50px',
                        backgroundImage: 'url(images/tokens/BANANA.svg)',
                      }}
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                    <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%', height: '50%' }}>
                      <Text fontSize="12px">Banana</Text>
                      <Text fontSize="12px" color="green">
                        +1.2%
                      </Text>
                    </Flex>
                    <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                      <Text>$0.52</Text>
                    </Flex>
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex>
                    <div
                      style={{
                        height: '36px',
                        width: '36px',
                        borderRadius: '50px',
                        backgroundImage: 'url(images/tokens/BANANA.svg)',
                      }}
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                    <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%', height: '50%' }}>
                      <Text fontSize="12px">Banana</Text>
                      <Text fontSize="12px" color="green">
                        +1.2%
                      </Text>
                    </Flex>
                    <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                      <Text>$0.52</Text>
                    </Flex>
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex>
                    <div
                      style={{
                        height: '36px',
                        width: '36px',
                        borderRadius: '50px',
                        backgroundImage: 'url(images/tokens/BANANA.svg)',
                      }}
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                    <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%', height: '50%' }}>
                      <Text fontSize="12px">Banana</Text>
                      <Text fontSize="12px" color="green">
                        +1.2%
                      </Text>
                    </Flex>
                    <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                      <Text>$0.52</Text>
                    </Flex>
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex>
                    <div
                      style={{
                        height: '36px',
                        width: '36px',
                        borderRadius: '50px',
                        backgroundImage: 'url(images/tokens/BANANA.svg)',
                      }}
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                    <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%', height: '50%' }}>
                      <Text fontSize="12px">Banana</Text>
                      <Text fontSize="12px" color="green">
                        +1.2%
                      </Text>
                    </Flex>
                    <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                      <Text>$0.52</Text>
                    </Flex>
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex>
                    <div
                      style={{
                        height: '36px',
                        width: '36px',
                        borderRadius: '50px',
                        backgroundImage: 'url(images/tokens/BANANA.svg)',
                      }}
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                    <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%', height: '50%' }}>
                      <Text fontSize="12px">Banana</Text>
                      <Text fontSize="12px" color="green">
                        +1.2%
                      </Text>
                    </Flex>
                    <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                      <Text>$0.52</Text>
                    </Flex>
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex>
                    <div
                      style={{
                        height: '36px',
                        width: '36px',
                        borderRadius: '50px',
                        backgroundImage: 'url(images/tokens/BANANA.svg)',
                      }}
                    />
                  </Flex>
                  <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                    <Flex alignItems="center" justifyContent="space-between" style={{ width: '100%', height: '50%' }}>
                      <Text fontSize="12px">Banana</Text>
                      <Text fontSize="12px" color="green">
                        +1.2%
                      </Text>
                    </Flex>
                    <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                      <Text>$0.52</Text>
                    </Flex>
                  </Flex>
                </TokenContainer>
              </>
            ) : (
              <>
                <TokenContainer>
                  <Flex style={{ width: '136px' }}>
                    <Skeleton height="50px" width="136px" />
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex style={{ width: '136px' }}>
                    <Skeleton height="50px" width="136px" />
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex style={{ width: '136px' }}>
                    <Skeleton height="50px" width="136px" />
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex style={{ width: '136px' }}>
                    <Skeleton height="50px" width="136px" />
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex style={{ width: '136px' }}>
                    <Skeleton height="50px" width="136px" />
                  </Flex>
                </TokenContainer>
                <TokenContainer>
                  <Flex style={{ width: '136px' }}>
                    <Skeleton height="50px" width="136px" />
                  </Flex>
                </TokenContainer>
              </>
            )}
          </Flex>
        </TrendingTokensWrapper>
      </Container>
    </div>
  )
}

export default React.memo(TrendingTokens)
