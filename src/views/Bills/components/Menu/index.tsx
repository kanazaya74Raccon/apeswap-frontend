import React from 'react'
import { useTheme } from 'styled-components'
import { Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ListViewProps } from './types'
import SearchInput from './SearchInput'
import { ClaimAllWrapper, ControlContainer, LabelWrapper, LearnMoreButton, StyledText } from './styles'
import { OPTIONS } from './constants'
import ClaimAll from '../Actions/ClaimAll'

const BillMenu: React.FC<ListViewProps> = ({ onHandleQueryChange, onSetSortOption, query, activeOption, bills }) => {
  const { isDark } = useTheme()
  const { chainId } = useActiveWeb3React()
  const userOwnedBills = bills?.filter((bill) => bill?.userData?.bills.length > 0)
  const ownedBillsAmount = bills?.flatMap((bill) => (bill?.userData?.bills ? bill?.userData?.bills : [])).length
  const ownedBills = userOwnedBills?.map((bill) => {
    return (
      bill?.userData?.bills && {
        billAddress: bill.contractAddress[chainId],
        billIds: bill.userData.bills.map((b) => {
          return b.id
        }),
      }
    )
  })
  return (
    <ControlContainer>
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
      <LearnMoreButton variant="secondary"> Learn More </LearnMoreButton>
      <ClaimAllWrapper>
        <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount} />
      </ClaimAllWrapper>
    </ControlContainer>
  )
}

export default React.memo(BillMenu)
