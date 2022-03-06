import React from 'react'
import { PFarmingIcon, XPoolsIcon, GovernanceIcon, IaoIcon } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'contexts/Localization'

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
  const { t } = useTranslation()
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
                Title={t('Passive Farming')}
                Desc={t('Collect a 2% Reflect Fee on all GNANA Transactions')}
                ActionTitle={t('CONVERT')}
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
                Title={t('Governance')}
                Desc={t('Propose and Vote on platform decisions')}
                ActionTitle={t('EXPLORE')}
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
                Title={t('Exclusive Pools')}
                Desc={t('Access unique pools with higher APRs')}
                ActionTitle={t('GO TO POOLS')}
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
                Title={t('Exclusive IAO Access')}
                Desc={t('Access to secondary offerings for a higher token allocation')}
                ActionTitle={t('GO TO IAOs')}
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
