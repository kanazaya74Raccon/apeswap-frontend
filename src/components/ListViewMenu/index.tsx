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
  MobilePadding,
  StyledCheckbox,
  StyledImage,
  StyledText,
  ToggleWrapper,
} from './styles'
import { OPTIONS, JUNGLE_OPTIONS } from './constants'

const ListViewMenu: React.FC<ListViewProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  onSetStake,
  harvestAll,
  stakedOnly,
  query,
  showMonkeyImage,
  activeOption,
  isJungle,
}) => {
  const displayOptions = isJungle === true ? JUNGLE_OPTIONS : OPTIONS
  const { isDark } = useTheme()
  const { t } = useTranslation()
  return (
    <ControlContainer>
      <MobilePadding>
        <LabelWrapper>
          <StyledText bold mr="15px">
            {t('Search')}
          </StyledText>
          <SearchInput onChange={onHandleQueryChange} value={query} />
        </LabelWrapper>
      </MobilePadding>
      <MobilePadding>
        <Flex style={{ height: '40px' }}>
          <Select size="sm" width="126px" onChange={(e) => onSetSortOption(e.target.value)} active={activeOption}>
            {displayOptions.map((option) => {
              return (
                <SelectItem size="sm" value={option.value}>
                  <Text>{t(option.label)}</Text>
                </SelectItem>
              )
            })}
          </Select>
        </Flex>
      </MobilePadding>
      <MobilePadding>
        <MenuTabButtons />
      </MobilePadding>
      <MobilePadding>
        <ToggleWrapper onClick={() => onSetStake(!stakedOnly)}>
          <StyledCheckbox checked={stakedOnly} onChange={() => onSetStake(!stakedOnly)} />
          <StyledText> {t('Staked')} </StyledText>
        </ToggleWrapper>
      </MobilePadding>
      <MobilePadding>{harvestAll && <HarvestAllWrapper> {harvestAll} </HarvestAllWrapper>}</MobilePadding>
      {showMonkeyImage && isDark ? (
        <StyledImage src="/images/farm-night-farmer.svg" alt="night-monkey" />
      ) : (
        <StyledImage src="/images/farm-day-farmer.svg" alt="day-monkey" />
      )}
    </ControlContainer>
  )
}

export default React.memo(ListViewMenu)
