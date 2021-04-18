import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Button, Heading, Card, Text, Flex } from '@apeswapfinance/uikit'
import { zoneIfo } from 'config/constants'
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
  max-width: 1200px;
  margin: auto;
  padding-left: 53px;
  padding-right: 53px;
`

const StyledTextContainer = styled.div`
  margin-top: 89px;
  margin-bottom: 89px;
`

const StyledImg = styled.img`
  width: 115px;
  height: 100%;
  display: inline-block;
`

const StyledCircle = styled.circle`
  background-color: #333333;
  width: 174px;
  height: 174px;
  filter: drop-shadow(0px 0px 20px #EBB02A);
  position: relative;
  margin: auto auto;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledDiv = styled.div`
  color: white;
  font-family: 'Poppins';
  line-height: 18px;
  margin-left: 18px;
`

const StyledCard = styled(Card)`
  width: 269px;
  height: 256px;
  margin-top: 176px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
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

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = zoneIfo.find((ifo) => ifo.isActive)

const Description = () => {
  const TranslateString = useI18n()

  return (
    <StyledContainer>
      <StyledFlex>
      <img
          width="1000px"
          style={{ opacity: 0.05, 
            position: 'absolute', 
            marginLeft: 'auto',
            marginRight: 'auto',
            top: -300,
            left: 0,
            right: 0 }}
          src="/images/monkey.svg"
          alt="monkey"
        />
        <StyledTextContainer>
          <Heading size="xxl" color="white">
            {TranslateString(594, 'GOLDEN BANANA')}
          </Heading>
          <Title as="h2" mt="15px" mb="15px" color="white" fontFamily="poppins" size="sm">
            {TranslateString(592, 'How To Take Part')}
          </Title>
          <Title color="white" fontFamily="poppins" fontWeight={700}>
            {TranslateString(594, 'Before Sale')}:
          </Title>
          <List>
            <StyledDiv>{TranslateString(596, 'Be ready to pay a 30% fee to buy GNANA')}</StyledDiv>
            <StyledDiv>{TranslateString(598, 'Purcharse GNANA using BANANA')}</StyledDiv>
          </List>
          <Text fontSize="10px" color="white" fontFamily="poppins">
            * Remember buying GNANA means you lose 30% of your BANANA when making the purcharse (1.3:1 ratio)
          </Text>
          <Title color="white" fontFamily="poppins" fontWeight={700} mt="15px">{TranslateString(600, 'During Sale')}:</Title>
          <List>
            <StyledDiv>
              {TranslateString(602, 'While the sale is live, commit your GNANA tokens to buy the IAO tokens')}
            </StyledDiv>
          </List>
          <Title color="white" fontFamily="poppins" fontWeight={700} mt="15px">{TranslateString(604, 'After Sale')}:</Title>
          <List>
            <StyledDiv>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</StyledDiv>
            <StyledDiv>{TranslateString(608, 'Done!')}</StyledDiv>
          </List>
          <Text as="div" pt="16px" mb="16px" color="white">
            <StyledButton as="a" href="https://obiedobo.gitbook.io/apeswap-finance/initial-ape-offerings-iao">
              {TranslateString(610, 'READ MORE')}
            </StyledButton>
          </Text>
        </StyledTextContainer>
        <StyledCard>
          <StyledCircle>
            <StyledImg src="/images/golden-banana.svg" alt="golden banana" />
          </StyledCircle>
        </StyledCard>
      </StyledFlex>
    </StyledContainer>
  )
}

export default Description
