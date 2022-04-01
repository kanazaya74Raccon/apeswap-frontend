import React from 'react'
import { useTheme } from 'styled-components'
import { Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import { ListViewProps } from './types'
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

const BillMenu: React.FC<ListViewProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  harvestAll,
  query,
  activeOption,
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
        <Flex>
          <Select size="sm" width="126px" onChange={(e) => onSetSortOption(e.target.value)} active={activeOption}>
            {OPTIONS.map((option) => {
              return (
                <SelectItem size="sm" value={option.value}>
                  <Text>{option.label}</Text>
                </SelectItem>
              )
            })}
          </Select>
        </Flex>
      </SectionOneWrapper>
      {harvestAll && <HarvestAllWrapper> {harvestAll} </HarvestAllWrapper>}
    </ControlContainer>
  )
}

export default React.memo(BillMenu)
