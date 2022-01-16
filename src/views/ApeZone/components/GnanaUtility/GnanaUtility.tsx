import React from 'react'
import styled from 'styled-components'
import { Text, Card, Heading, PFarmingIcon, XPoolsIcon, GovernanceIcon, IaoIcon } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'

import OptionCard from './OptionCard'
import OpDetails from './OpDetails'

const UtilityCon = styled.div`
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 22px;

  ${({ theme }) => theme.mediaQueries.md} {
    padding: 1em;
    background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  }
`
const UtilityTitle = styled.div`
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2em;
    margin-top: 1em;
  }
`
const UtilityHeading = styled(Heading)`
  text-transform: uppercase;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 20px;
    font-weight: 700;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 30px;
  }
`

const Options = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    justify-content: space-between;
  }
`
const OtherOptions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5em;

  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
    width: 49%;
  }
`
const FirstOption = styled.div`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 49%;
  }
`
const PlusIcon = styled(Text)`
  color: #ffb300;
  font-family: 'Titan One';
  font-size: 48px;
  font-weight: 400;
`
const Section = styled(Card)`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  align-items: center;
  padding-left: 0.6em;
  padding-right: 0.6em;
  border-radius: 22px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  }
`
const Section2 = styled(Card)`
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  border-radius: 22px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-right: 0.5em;
    padding-left: 0.5em;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    padding-right: 0;
    padding-left: 0;
    background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  }
`

const OtherOpStyle = {}

export const GnanaUtility: React.FC = () => {
  const theme = useTheme()

  const exploreGovernance = () => {
    return window.open('https://vote.apeswap.finance/', '_blank')
  }
  const goToPools = () => {
    return window.open('https://apeswap.finance/pools', '_blank')
  }
  const goToIAOs = () => {
    return window.open('https://apeswap.finance/iao', '_blank')
  }

  return (
    <UtilityCon>
      <UtilityTitle>
        <UtilityHeading>Gnana Utility</UtilityHeading>
      </UtilityTitle>
      <Options>
        <FirstOption>
          <OptionCard type="1" title="Option 1" desc="Hold in Wallet">
            <Section>
              <OpDetails
                Icon={
                  <PFarmingIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#212121' : '#FFF'}
                    color={theme.isDark ? '#FFF' : '#af6e5aff'}
                  />
                }
                Title="Passive Farming"
                Desc="Collect a 2% Reflect Fee on all GNANA Transactions"
                ActionTitle="CONVERT"
                actionHref="#convert"
                OpStyle={OtherOpStyle}
                type="1"
              />
              <PlusIcon>+</PlusIcon>
              <OpDetails
                Icon={
                  <GovernanceIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#212121' : '#FFF'}
                    color={theme.isDark ? '#FFF' : '#af6e5aff'}
                  />
                }
                Title="Governance"
                Desc="Propose and Vote on platform decisions"
                ActionTitle="EXPLORE"
                onAction={exploreGovernance}
                OpStyle={OtherOpStyle}
                type="1"
              />
            </Section>
          </OptionCard>
        </FirstOption>

        <OtherOptions>
          <OptionCard type="2" title="Option 2" desc="Stake">
            <Section2>
              <OpDetails
                Icon={
                  <XPoolsIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#212121' : '#FFF'}
                    color={theme.isDark ? '#FFF' : '#af6e5aff'}
                  />
                }
                Title="Exclusive Pools"
                Desc="Access unique pools with higher APRs"
                ActionTitle="GO TO POOLS"
                onAction={goToPools}
                OpStyle={OtherOpStyle}
                type="2"
              />
            </Section2>
          </OptionCard>

          <OptionCard type="3" title="Option 3" desc="Commit">
            <Section2>
              <OpDetails
                Icon={
                  <IaoIcon
                    width="90px"
                    height="90px"
                    bgColor={theme.isDark ? '#212121' : '#FFF'}
                    color={theme.isDark ? '#FFF' : '#af6e5aff'}
                  />
                }
                Title="Exclusive IAO Acess"
                Desc="Access to secondary offerings for a higher token allocation"
                ActionTitle="GO TO IAOs"
                onAction={goToIAOs}
                OpStyle={OtherOpStyle}
                type="3"
              />
            </Section2>
          </OptionCard>
        </OtherOptions>
      </Options>
    </UtilityCon>
  )
}

export default GnanaUtility
