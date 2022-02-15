import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import useInterval from 'hooks/useInterval'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Flex, Text, Skeleton } from '@apeswapfinance/uikit'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Container, Title, TokenContainer, TrendingTokensWrapper } from './styles'
import { tokensToDisplayStub } from './stubData'
import { TokenDisplayAmount } from './types'

const NUMBER_OF_TOKENS_TO_DISPLAY = 6
const TOKEN_DELAY = 10000

const TrendingTokens: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const [loadTokens, setLoadTokens] = useState(false)
  const [tokenDisplayRange, setTokenDisplayRange] = useState<TokenDisplayAmount>({
    tokenStartIndex: 0,
    tokenEndIndex: NUMBER_OF_TOKENS_TO_DISPLAY,
  })
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const swapTokens = () => {
    const tokenListLength = tokensToDisplayStub.length
    if (tokenListLength % NUMBER_OF_TOKENS_TO_DISPLAY !== 0) {
      setTokenDisplayRange(tokenDisplayRange)
    } else if (tokenDisplayRange.tokenEndIndex + NUMBER_OF_TOKENS_TO_DISPLAY > tokenListLength) {
      setTokenDisplayRange({
        tokenStartIndex: 0,
        tokenEndIndex: NUMBER_OF_TOKENS_TO_DISPLAY,
      })
    } else {
      setTokenDisplayRange((prev) => ({
        tokenStartIndex: prev.tokenEndIndex,
        tokenEndIndex: tokenDisplayRange.tokenEndIndex + NUMBER_OF_TOKENS_TO_DISPLAY,
      }))
    }
  }

  useInterval(swapTokens, TOKEN_DELAY)
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
                {tokensToDisplayStub
                  .slice(tokenDisplayRange.tokenStartIndex, tokenDisplayRange.tokenEndIndex)
                  .map((token, i) => {
                    return (
                      <TokenContainer
                        key={token?.tokenTicker}
                        active={i >= tokenDisplayRange.tokenStartIndex && i < tokenDisplayRange.tokenEndIndex}
                      >
                        <Flex>
                          <img
                            src={token?.logoUrl}
                            alt={token?.tokenTicker}
                            style={{
                              height: '36px',
                              width: '36px',
                              borderRadius: '50px',
                            }}
                          />
                        </Flex>
                        <Flex flexDirection="column" ml="10px" style={{ height: '36px', width: '100px' }}>
                          <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            style={{ width: '100%', height: '50%' }}
                          >
                            <Text fontSize="12px">{token?.tokenTicker}</Text>
                            <Text fontSize="12px" color={token?.percentChange < 0 ? 'red' : 'green'}>
                              {token?.percentChange > 0 && '+'}
                              <CountUp end={token?.percentChange} decimals={2} duration={1.5} />%
                            </Text>
                          </Flex>
                          <Flex alignItems="center" style={{ width: '100%', height: '50%' }}>
                            <Text>
                              $<CountUp end={token?.tokenPrice} decimals={2} duration={1.5} separator="," />
                            </Text>
                          </Flex>
                        </Flex>
                      </TokenContainer>
                    )
                  })}
              </>
            ) : (
              [...Array(NUMBER_OF_TOKENS_TO_DISPLAY)].map(() => {
                return (
                  <TokenContainer active>
                    <Flex style={{ width: '136px' }}>
                      <Skeleton height="50px" width="136px" />
                    </Flex>
                  </TokenContainer>
                )
              })
            )}
          </Flex>
        </TrendingTokensWrapper>
      </Container>
    </div>
  )
}

export default React.memo(TrendingTokens)
