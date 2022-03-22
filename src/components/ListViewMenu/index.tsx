import React from 'react'
import { useTheme } from 'styled-components'
import { ListViewProps } from './types'
import FarmTabButtons from './FarmTabButtons'
import SearchInput from './SearchInput'
import Select from './Select/Select'
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
}) => {
  const { isDark } = useTheme()
  return (
    <ControlContainer>
      <SectionOneWrapper>
        <LabelWrapper>
          <StyledText bold mr="15px">
            Search
          </StyledText>
          <SearchInput onChange={onHandleQueryChange} value={query} />
        </LabelWrapper>
        <Select options={OPTIONS} onChange={(option) => onSetSortOption(option.value)} />
      </SectionOneWrapper>
      <SectionTwoWrapper>
        <FarmTabButtons />
        <ToggleWrapper onClick={() => onSetStake(!stakedOnly)}>
          <StyledCheckbox checked={stakedOnly} onChange={() => onSetStake(!stakedOnly)} />
          <StyledText> Staked </StyledText>
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
