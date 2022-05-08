import React from 'react'
import { useTheme } from 'styled-components'
import { Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import { ListViewProps } from './types'
import MenuTabButtons from './MenuTabButtons'
import SearchInput from './SearchInput'
import {
  ControlContainer,
  HarvestAllWrapper,
  LabelWrapper,
  SectionOneWrapper,
  SectionTwoWrapper,
  StyledCheckbox,
  StyledImage,
  StyledText,
  ToggleWrapper,
} from './styles'
import { OPTIONS } from './constants'

const ListViewMenu: React.FC<ListViewProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  onSetStake,
  harvestAll,
  stakedOnly,
  query,
  showMonkeyImage,
  activeOption,
}) => {
  const { isDark } = useTheme()
  const { t } = useTranslation()
  return (
    <ControlContainer>
      <SectionOneWrapper>
        <LabelWrapper>
          <StyledText bold mr="15px">
            {t('Search')}
          </StyledText>
          <SearchInput onChange={onHandleQueryChange} value={query} />
        </LabelWrapper>
        <Flex>
          <Select size="sm" width="126px" onChange={(e) => onSetSortOption(e.target.value)} active={activeOption}>
            {OPTIONS.map((option) => {
              return (
                <SelectItem size="sm" value={option.value}>
                  <Text>{t(option.label)}</Text>
                </SelectItem>
              )
            })}
          </Select>
        </Flex>
      </SectionOneWrapper>
      <SectionTwoWrapper>
        <MenuTabButtons />
        <ToggleWrapper onClick={() => onSetStake(!stakedOnly)}>
          <StyledCheckbox checked={stakedOnly} onChange={() => onSetStake(!stakedOnly)} />
          <StyledText> {t('Staked')} </StyledText>
        </ToggleWrapper>
      </SectionTwoWrapper>
      {harvestAll && <HarvestAllWrapper> {harvestAll} </HarvestAllWrapper>}
      {showMonkeyImage && isDark ? (
        <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
      ) : (
        <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
      )}
    </ControlContainer>
  )
}

export default React.memo(ListViewMenu)
