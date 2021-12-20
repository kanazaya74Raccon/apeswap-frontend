import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Card, Text, Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Title from './Title'

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const StyledContainer = styled.div`
  background-color: #af6e5aff;
`

const StyledFlex = styled(Flex)`
  max-width: 100%;
  margin: auto;
  padding: 0px;
  margin-left: 20px;
  margin-right: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 1200px;
    padding-left: 53px;
    padding-right: 53px;
    margin: auto;
  }
`

const StyledTextContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  z-index: 99;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 89px;
    margin-bottom: 89px;
  }
`

const StyledImg = styled.img`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
    height: 100%;
    display: inline-block;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 95px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 115px;
  }
`

const StyledCircle = styled.circle`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    background-color: #333333;
    width: 120px;
    height: 120px;
    filter: drop-shadow(0px 0px 20px #ebb02a);
    position: relative;
    margin: auto auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 140px;
    height: 140px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 174px;
    height: 174px;
  }
`

const StyledCard = styled(Card)`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 220px;
    height: 170px;
    margin-top: 176px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    height: 190px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 269px;
    height: 256px;
  }
`

const StyledButton = styled(Button)`
  background: #fafafa;
  border: 2px solid #a16552;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 10px 40px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #a16552;
`

const StyledMonkey = styled.img`
  width: 800px;
  opacity: 0.05;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  top: -100px;
  left: 0px;
  right: 0px;

  ${({ theme }) => theme.mediaQueries.md} {
    top: -250px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    width: 900px;
    top: -350px;
  }
`
const Description = () => {
  const TranslateString = useI18n()

  return (
    <StyledContainer>
      <StyledFlex>
        <StyledTextContainer>
          <Heading size="xxl" color="white" fontFamily="Titan One">
            {TranslateString(594, 'GOLDEN BANANA')}
          </Heading>
          <Title as="h2" mt="15px" mb="15px" color="white" fontFamily="poppins" size="lg" fontWeight={700}>
            {TranslateString(592, 'What is it good for?')}
          </Title>
          <Title color="white" fontFamily="poppins" size="md" mb="12px" fontWeight={500}>
            {TranslateString(594, 'Passive Farming')}
          </Title>
          <List>
            <Text color="white" fontFamily="poppins">
              {TranslateString(596, 'GNANA is a reflect token with a 2% transfer fee')}
            </Text>
            <Text color="white" fontFamily="poppins">
              {TranslateString(
                596,
                'GNANA holders get a share of the fee proportional to their holdings just by having it in their wallets',
              )}
            </Text>
          </List>
          <Title color="white" fontFamily="poppins" size="md" mb="12px" mt="12px" fontWeight={500}>
            {TranslateString(594, 'Exclusive perks')}
          </Title>
          <List>
            <Text color="white" fontFamily="poppins">
              {TranslateString(596, 'Gain access to GNANA only IAO allocation')}
            </Text>
            <Text color="white" fontFamily="poppins">
              {TranslateString(596, 'A new array of pools will be made available only to GNANA holders')}
            </Text>
          </List>
          <Title color="white" fontFamily="poppins" size="md" mb="12px" mt="12px" fontWeight={500}>
            {TranslateString(594, 'Governance')}
          </Title>
          <List>
            <Text color="white" fontFamily="poppins">
              {TranslateString(596, 'GNANA is being lined up to be the official governance token of ApeSwap')}
            </Text>
          </List>
          <Text as="div" pt="16px" mt="22px" mb="16px" color="white">
            <StyledButton
              as="a"
              href="https://apeswap.gitbook.io/apeswap-finance/tokens-and-economics/the-usdgnana-token"
              target="_blank"
            >
              {TranslateString(610, 'READ MORE')}
            </StyledButton>
          </Text>
        </StyledTextContainer>
        <StyledCard>
          <StyledCircle>
            <StyledImg src="/images/golden-banana.svg" alt="golden banana" />
          </StyledCircle>
        </StyledCard>
        <StyledMonkey src="/images/monkey-thin.svg" alt="monkey" />
      </StyledFlex>
    </StyledContainer>
  )
}

export default React.memo(Description)
