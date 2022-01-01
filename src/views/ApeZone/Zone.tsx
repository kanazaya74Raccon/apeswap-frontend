import React from 'react'
import { BaseLayout, Card, CardBody, Heading, Text, ButtonSquare } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { TranslateString } from 'utils/translateTextHelpers'
import Divider from './components/Divider'
import BuyCard from './components/BuyCard'
import SellCard from './components/SellCard'
import Iao from './components/IAO/CurrentIao'
import Description from './components/Description/Description'

// GNANA UTILITY START
const UtilityCon = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
`
const UtilityTitle = styled.div`
  display: none;
`
const Options = styled.div`
  display: flex;
  flex-direction: column;
`
const Option1 = styled.div`
  display: flex;
  flex-direction: column;
`
const HeadCard = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
`
const Section = styled.div`
  display: flex;
`
const OtherOptions = styled.div`
  display: flex;
`

export const OpDetails = ({ Icon, Title, Desc, onAction, ActionTitle, ...props }) => {
  const TranslateString1 = useI18n()

  return (
    <div>
      <Text>Icon: {Icon}</Text>
      <Heading>{Title}</Heading>
      <Text>{Desc}</Text>
      <ButtonSquare onClick={onAction} {...props}>
        {TranslateString1(292, ActionTitle)}
      </ButtonSquare>
    </div>
  )
}

export const GnanaUtility = () => (
  <UtilityCon>
    <UtilityTitle>
      <Heading textTransform="uppercase">Gnana Utility</Heading>
    </UtilityTitle>
    <Options>
      <Option1>
        <HeadCard>
          <CardBody>
            <Heading textTransform="uppercase">Option 1</Heading>
            <Text>Hold in Wallet</Text>
          </CardBody>
        </HeadCard>

        <Section>
          <OpDetails
            Icon="PFarming"
            Title="Passive Farming"
            Desc="Propose and Vote on platform decisions"
            ActionTitle="Buy Gnana"
            onAction={() => null}
          />
          <Text>Plus Sign</Text>
          <OpDetails
            Icon="Governance"
            Title="Governance"
            Desc="Propose and Vote on platform decisions"
            ActionTitle="Explore"
            onAction={() => null}
          />
        </Section>
      </Option1>

      <OtherOptions>
        {/* Option2 */}
        <OpDetails
          Icon="XPools"
          Title="Exclusive Pools"
          Desc="Access unique pools with higher APRs"
          ActionTitle="Go to pools"
          onAction={() => null}
        />

        {/* Option3 */}
        <OpDetails
          Icon="X IAO Access"
          Title="Exclusive IAO Acess"
          Desc="Access to secondary offerings for a higher token allocation"
          ActionTitle="Go to IAOs"
          onAction={() => null}
        />
      </OtherOptions>
    </Options>
  </UtilityCon>
)

// GNANA UTILITY END

const StyledHeroSection = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`

const MarginContainer = styled.div`
  margin: 53px 30px;
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
const PaddedCard = styled(Card)`
  padding: 26px;
`

const Zone = () => {
  return (
    <>
      <Description />
      <StyledHeroSection>
        <MarginContainer>
          <Heading size="xl" mb="26px" color="primary" fontFamily="Titan One">
            {TranslateString(999, 'Buy Golden Banana')}
          </Heading>
          <PaddedCard>
            <Heading size="lg" fontFamily="poppins" color="warning">
              WARNING
            </Heading>
            <Text fontFamily="poppins">
              Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%.
            </Text>
            <Text fontFamily="poppins">
              This means that for every 1 BANANA you trade in, you will receive 0.7 GNANA
            </Text>
          </PaddedCard>
          <Cards>
            <BuyCard />
            <SellCard />
          </Cards>
          <GnanaUtility />
        </MarginContainer>
      </StyledHeroSection>
      <Iao />
      <Divider />
    </>
  )
}
export default React.memo(Zone)
