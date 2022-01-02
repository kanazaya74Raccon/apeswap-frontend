import React from 'react'
import { BaseLayout, Card, CardBody, Heading, Text, ButtonSquare, AddIcon, SvgProps } from '@apeswapfinance/uikit'
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
  border-radius: 22px;
`
const HeadBody = styled(CardBody)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
`
const HeadTitle = styled(Heading)`
  font-size: 22px;
  color: ${({ theme }) => (theme.isDark ? '#FFFFFF' : theme.colors.text)};
  font-weight: 700;
  text-transform: uppercase;
`
const HeadDesc = styled(Text)`
  font-size: 12px;
  color: #ffb300;
  font-weight: 500;
`
// NOT BEING USED FOR NOW (Example how to use UIKit Icon)
const StyledAddIcon = styled(AddIcon)`
  fill: #ffb300;
  width: 60px;
`
const PlusIcon = styled(Text)`
  color: #ffb300;
  font-family: 'Titan One';
  font-size: 35px;
`

const Section = styled(Card)`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  align-items: center;
  margin-top: 0.5em;
  padding-left: 0.6em;
  padding-right: 0.6em;
`
const OpCon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.textDisabled)};
  width: 125px;
  padding-top: 1em;
  padding-bottom: 1em;
  border-radius: 32px;
`
const ImgBorder = styled.div`
  width: 95px;
  height: 95px;
  max-width: 95px;
  max-height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: radial-gradient(
    108.59% 108.6% at 6.38% 83.17%,
    #ffe988 0%,
    #ba801e 25%,
    #fbec83 50%,
    #ba801f 75%,
    #ffe97f 100%
  );
  margin-bottom: 0.6em;
`
const ImgCon = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  display: flex;
  justify-content: center;
  align-items: center;
`
const OpHeadingCon = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  margin-bottom: 0.5em;
`
const OpHeading = styled(Heading)`
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  line-height: 22px;
`
const OpDesc = styled(Text)`
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  height: 30px;
  /* margin-bottom: 1em; */
`
const ActionDiv = styled.div`
  margin-top: 2em;
  height: 40px;
`
const ActionButton = styled(ButtonSquare)``

interface OpDetailsProps {
  Icon?: SvgProps
  Title: string
  Desc: string
  onAction: () => null
  ActionTitle: string
  OpStyle?: Record<string, unknown>
}

export const OpDetails: React.FC<OpDetailsProps> = ({
  Icon,
  Title,
  Desc,
  onAction,
  ActionTitle,
  OpStyle,
  ...props
}) => {
  const TranslateString1 = useI18n()

  return (
    <OpCon style={OpStyle} {...props}>
      <ImgBorder>
        <ImgCon>{Icon}</ImgCon>
      </ImgBorder>

      <OpHeadingCon>
        <OpHeading>{Title}</OpHeading>
      </OpHeadingCon>

      <OpDesc>{Desc}</OpDesc>

      <ActionDiv>
        <ActionButton onClick={onAction}>{TranslateString1(292, ActionTitle)}</ActionButton>
      </ActionDiv>
    </OpCon>
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
          <HeadBody>
            <HeadTitle>Option 1</HeadTitle>
            <HeadDesc>Hold in Wallet</HeadDesc>
          </HeadBody>
        </HeadCard>

        <Section>
          <OpDetails
            Icon={<StyledAddIcon />}
            Title="Passive Farming"
            Desc="Propose and Vote on platform decisions"
            ActionTitle="Buy Gnana"
            onAction={() => null}
          />
          {/* <StyledAddIcon /> */}
          <PlusIcon>+</PlusIcon>
          <OpDetails
            Icon={<StyledAddIcon />}
            Title="Governance"
            Desc="Propose and Vote on platform decisions"
            ActionTitle="Explore"
            onAction={() => null}
          />
        </Section>
      </Option1>

      <Section>
        {/* Option2 */}
        <OpDetails
          Icon={<StyledAddIcon />}
          Title="Exclusive Pools"
          Desc="Access unique pools with higher APRs"
          ActionTitle="Go to pools"
          onAction={() => null}
          OpStyle={{
            width: '45%',
          }}
        />

        {/* Option3 */}
        <OpDetails
          Icon={<StyledAddIcon />}
          Title="Exclusive IAO Acess"
          Desc="Access to secondary offerings for a higher token allocation"
          ActionTitle="Go to IAOs"
          onAction={() => null}
        />
      </Section>
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
