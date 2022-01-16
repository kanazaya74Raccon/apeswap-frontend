import React, { useState } from 'react'
import { Button, Heading, Text } from '@apeswapfinance/uikit'
import { zoneIfo } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from '../../../Ifos/components/IfoCard'
import Title from '../Description/Title'

import {
  StyledHeroHeading,
  StyledHeroSection,
  StyledCard,
  StyledFlex,
  Cards,
  StyledGoldenMonkey,
  StyledTextContainer,
  List,
} from './styles'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = zoneIfo.find((ifo) => ifo.isActive)
const prevIfos = zoneIfo.filter((ifo) => !ifo.isActive)

const Iao = () => {
  const TranslateString = useI18n()
  const [showHistory, setShowHistory] = useState(false)
  return (
    <>
      <StyledHeroSection>
        <StyledHeroHeading>
          <Heading size="xl" color="white" fontFamily="Titan One">
            {TranslateString(594, 'Golden Banana IAO')}
          </Heading>
          <Heading size="sm" color="white" fontFamily="Titan One">
            {TranslateString(594, 'Buy new token by staking GNANA')}
          </Heading>
        </StyledHeroHeading>
      </StyledHeroSection>
      <StyledFlex>
        <Cards>
          <IfoCard ifo={activeIfo} notLp gnana />
          <StyledCard>
            <StyledGoldenMonkey src="/images/monkey-golden-banana.svg" alt="monkey" />
            <StyledTextContainer>
              <Heading size="xl" fontFamily="Titan One">
                {TranslateString(594, 'GOLDEN BANANA IAO')}
              </Heading>
              <Title as="h2" mt="15px" mb="15px" fontFamily="poppins" size="sm">
                {TranslateString(592, 'How To Take Part')}
              </Title>
              <Title fontFamily="poppins" fontWeight={700}>
                {TranslateString(594, 'Before Sale')}
              </Title>
              <List>
                <Text fontFamily="poppins">{TranslateString(596, 'Be ready to pay a 30% fee to buy GNANA')}</Text>
                <Text fontFamily="poppins">{TranslateString(598, 'Purchase GNANA using BANANA')}</Text>
              </List>
              <Text fontSize="10px" fontFamily="poppins">
                * Remember buying GNANA means you lose 30% of your BANANA when making the purchase
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
                  {TranslateString(
                    606,
                    'Immediately after sale: You may claim your refund and 25% of your offering tokens',
                  )}
                </Text>
                <Text fontFamily="poppins">
                  {TranslateString(606, '30 days after sale: You may claim another 25% of your offering tokens')}
                </Text>
                <Text fontFamily="poppins">
                  {TranslateString(606, '60 days after sale: You may claim another 25% of your offering tokens')}
                </Text>
                <Text fontFamily="poppins">
                  {TranslateString(606, '90 days after sale: You may claim the final 25% of your offering tokens')}
                </Text>
                <Text fontFamily="poppins">{TranslateString(608, 'Done!')}</Text>
                <Text fontSize="10px" fontFamily="poppins">
                  * Remember selling GNANA returns you BANANA at a 1:1 ratio
                </Text>
              </List>

              <Text as="div" pt="16px" mb="16px" mt="16px" color="primary">
                <Button marginBottom="10px" marginRight="10px" onClick={() => setShowHistory(!showHistory)}>
                  {TranslateString(610, showHistory ? 'Hide Past IAOs' : 'Show Past IAOs')}
                </Button>
                <Button as="a" href="https://apeswap.gitbook.io/apeswap-finance/initial-ape-offerings-iao">
                  {TranslateString(610, 'READ MORE')}
                </Button>
              </Text>
            </StyledTextContainer>
          </StyledCard>
          {showHistory && prevIfos.map((ifo) => <IfoCard ifo={ifo} notLp gnana />)}
        </Cards>
      </StyledFlex>
    </>
  )
}

export default React.memo(Iao)
