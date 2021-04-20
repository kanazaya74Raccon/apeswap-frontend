import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Button, Flex, Heading, Text, Card } from '@apeswapfinance/uikit'
import { zoneIfo } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from '../../../Ifos/components/IfoCard'
import Title from '../Description/Title'

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const StyledHeroHeading = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 99px;
  padding-top: 49px;
  padding-left: 53px;
  padding-right: 53px;
`

const StyledHeroSection = styled.div`
  background-color: #a16552;
`

const StyledFlex = styled(Flex)`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 28px;
  margin-top: -100px;
  padding-left: 20px;
  padding-right: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: -90px;
    padding-left: 53px;
    padding-right: 53px;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin: 32px 0px;
  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const StyledCard = styled(Card)`
  padding: 24px;
`

const StyledTextContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 28px;
`

const StyledText = styled(Text)`
  line-height: 18px;
  margin-left: 18px;
`

const StyledGoldenMonkey = styled.img`
  width: 100%;
  height: 200px;
  margin-left: auto;
  margin-right: auto;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = zoneIfo.find((ifo) => ifo.isActive)

const Iao = () => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledHeroSection>
        <StyledHeroHeading>
          <Heading size="xl" color="white">
            {TranslateString(594, 'Golden Banana IAO')}
          </Heading>
          <Heading size="sm" color="white">
            {TranslateString(594, 'Buy new token by staking GNANA')}
          </Heading>
        </StyledHeroHeading>
      </StyledHeroSection>
      <StyledFlex>
        <Cards>
          <IfoCard ifo={activeIfo} />
          <StyledCard>
            <StyledGoldenMonkey src="/images/monkey-golden-banana.svg" alt="monkey" />
            <StyledTextContainer>
              <Heading size="xl">{TranslateString(594, 'GNANA IAO')}</Heading>
              <Title as="h2" mt="15px" mb="15px" fontFamily="poppins" size="sm">
                {TranslateString(592, 'How To Take Part')}
              </Title>
              <Title fontFamily="poppins" fontWeight={700}>
                {TranslateString(594, 'Before Sale')}
              </Title>
              <List>
                <Text fontFamily="poppins">{TranslateString(596, 'Be ready to pay a 30% fee to buy GNANA')}</Text>
                <Text fontFamily="poppins">{TranslateString(598, 'Purcharse GNANA using BANANA')}</Text>
              </List>
              <Text fontSize="10px" fontFamily="poppins">
                * Remember buying GNANA means you lose 30% of your BANANA when making the purcharse (1.3:1 ratio)
              </Text>
              <Title fontFamily="poppins" fontWeight={700} mt="15px">
                {TranslateString(600, 'During Sale')}
              </Title>
              <List>
                <Text fontFamily="poppins">
                  {TranslateString(602, 'While the sale is live, commit your GNANA tokens to buy the IAO tokens')}
                </Text>
              </List>
              <Title fontFamily="poppins" fontWeight={700} mt="15px">
                {TranslateString(604, 'After Sale')}
              </Title>
              <List>
                <Text fontFamily="poppins">
                  {TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}
                </Text>
                <Text fontFamily="poppins">{TranslateString(608, 'Done!')}</Text>
                <Text fontSize="10px" fontFamily="poppins">
                  * Remember selling GNANA means gives you a 1:1 ratio
                </Text>
              </List>
              <Text as="div" pt="16px" mb="16px" mt="16px" color="primary">
                <Button
                  as="a"
                  href="https://obiedobo.gitbook.io/apeswap-finance/initial-ape-offerings-iao"
                  color="primary"
                >
                  {TranslateString(610, 'READ MORE')}
                </Button>
              </Text>
            </StyledTextContainer>
          </StyledCard>
        </Cards>
      </StyledFlex>
    </>
  )
}

export default Iao
