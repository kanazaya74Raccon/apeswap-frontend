import React from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ButtonSquare, Flex, Spinner, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { ContentContainer, HeadingText } from './styles'

const WelcomeContent: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const { isSm, isXs } = useMatchBreakpoints()
  const isMobile = isSm || isXs

  return (
    <Flex justifyContent="center" alignItems="center" style={{ width: '100%' }}>
      <ContentContainer>
        <Flex flexDirection="column" style={{ maxWidth: '540px' }}>
          <HeadingText>Welcome to the Most Connected Defi Hub</HeadingText>
          <br />
          <br />
          <Text color="white">
            Whether youre new to crypto or youre a DeFi veteran, ApeSwap has the tools and the community to support your
            decentralized finance needs.
          </Text>
          <br />
          <br />
          <Flex>
            {isMobile ? (
              <Flex justifyContent="center" alignItems="center" flexDirection="column" style={{ width: '100%' }}>
                <ButtonSquare fullWidth>Buy Banana</ButtonSquare>
                <ButtonSquare
                  mt="10px"
                  fullWidth
                  style={{ background: 'none', border: '2px solid rgb(244, 182, 66)', color: 'rgb(244, 182, 66)' }}
                >
                  Learn More
                </ButtonSquare>
              </Flex>
            ) : (
              <>
                <ButtonSquare mr="40px">Buy Banana</ButtonSquare>
                <ButtonSquare
                  style={{ background: 'none', border: '2px solid rgb(244, 182, 66)', color: 'rgb(244, 182, 66)' }}
                >
                  Learn More
                </ButtonSquare>
              </>
            )}
          </Flex>
        </Flex>
        {!isMobile && (
          <Flex alignItems="center" justifyContent="center" paddingBottom="100px">
            <Spinner size={400} />
          </Flex>
        )}
      </ContentContainer>
    </Flex>
  )
}

export default React.memo(WelcomeContent)
