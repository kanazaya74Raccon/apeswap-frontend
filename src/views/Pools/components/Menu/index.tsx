import React from 'react'
import { Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import { Checkbox } from '@ape.swap/uikit'
import { ToggleWrapper } from 'components/ListViewMenu/styles'
import MenuTabButtons from 'components/ListViewMenu/MenuTabButtons'
import { useTranslation } from 'contexts/Localization'
import { ListViewProps } from './types'
import SearchInput from './SearchInput'
import { ClaimAllWrapper, ControlContainer, LabelWrapper, StyledText } from './styles'
import { OPTIONS, TOKEN_OPTIONS } from './constants'
import HarvestAll from '../Actions/HarvestAll'

const PoolMenu: React.FC<ListViewProps> = ({
  onHandleQueryChange,
  onSetSortOption,
  onSetTokenOption,
  query,
  activeTokenOption,
  activeOption,
  pools,
  onSetStake,
  stakedOnly,
}) => {
  const { t } = useTranslation()
  const sousIds = pools.map((pool) => {
    return pool.sousId
  })
  return (
    <ControlContainer>
      <LabelWrapper>
        <StyledText bold mr="15px">
          {t('Search')}
        </StyledText>
        <SearchInput onChange={onHandleQueryChange} value={query} />
      </LabelWrapper>
      <Flex>
        <Select size="sm" width="140px" onChange={(e) => onSetSortOption(e.target.value)} active={activeOption}>
          {OPTIONS.map((option) => {
            return (
              <SelectItem size="sm" value={option.value}>
                <Text>{t(option.label)}</Text>
              </SelectItem>
            )
          })}
        </Select>
      </Flex>
      <Flex>
        <Select size="sm" width="126px" onChange={(e) => onSetTokenOption(e.target.value)} active={activeTokenOption}>
          {TOKEN_OPTIONS.map((option) => {
            return (
              <SelectItem size="sm" value={option.value}>
                <Text>{t(option.label)}</Text>
              </SelectItem>
            )
          })}
        </Select>
      </Flex>
      <MenuTabButtons />
      <ToggleWrapper onClick={() => onSetStake(!stakedOnly)}>
        <Checkbox checked={stakedOnly} onChange={() => onSetStake(!stakedOnly)} />
        <StyledText> {t('Staked')} </StyledText>
      </ToggleWrapper>
      <ClaimAllWrapper>
        <HarvestAll sousIds={sousIds} />
      </ClaimAllWrapper>
    </ControlContainer>
  )
}

export default React.memo(PoolMenu)
