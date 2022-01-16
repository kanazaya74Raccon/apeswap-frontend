import React from 'react'
import { PFarmingIcon, XPoolsIcon, GovernanceIcon, IaoIcon } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'

import OptionCard from './OptionCard'
import OpDetails from './OpDetails'

import {
  UtilityCon,
  UtilityTitle,
  UtilityHeading,
  Section,
  Section2,
  PlusIcon,
  OtherOpStyle,
  OtherOptions,
  FirstOption,
  Options,
} from './styles'

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
