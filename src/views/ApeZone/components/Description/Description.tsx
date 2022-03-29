import React from 'react'
import { Text, Heading } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Title from './Title'

import {
  StyledContainer,
  StyledFlex,
  StyledTextContainer,
  List,
  StyledButton,
  StyledCard,
  StyledCircle,
  StyledImg,
  StyledMonkey,
} from './styles'

const Description = () => {
  const TranslateString = useI18n()

  return (
    <StyledContainer>
      <StyledFlex>
        <StyledTextContainer>
          <Heading color="white">{TranslateString(594, 'GOLDEN BANANA')}</Heading>
          <Title as="h2">{TranslateString(592, 'What is it good for?')}</Title>
          <Title color="white" mb="15px" mt="15px">
            {TranslateString(594, 'Passive Farming')}
          </Title>
          <List>
            <Text color="white">{TranslateString(596, 'GNANA is a reflect token with a 2% transfer fee')}</Text>
            <Text color="white">
              {TranslateString(
                596,
                'GNANA holders get a share of the fee proportional to their holdings just by having it in their wallets',
              )}
            </Text>
          </List>
          <Title color="white" mb="12px" mt="12px" fontWeight={500}>
            {TranslateString(594, 'Exclusive perks')}
          </Title>
          <List>
            <Text color="white">{TranslateString(596, 'Gain access to GNANA only IAO allocation')}</Text>
            <Text color="white">
              {TranslateString(596, 'A new array of pools will be made available only to GNANA holders')}
            </Text>
          </List>
          <Title color="white" mb="12px" mt="12px" fontWeight={500}>
            {TranslateString(594, 'Governance')}
          </Title>
          <List>
            <Text color="white">
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
