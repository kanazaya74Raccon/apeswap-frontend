import React from 'react'
import { Flex, Select, SelectItem, Text } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { ListViewProps } from './types'
import SearchInput from './SearchInput'
import { ClaimAllWrapper, ControlContainer, LabelWrapper, LearnMoreButton, StyledText } from './styles'
import { OPTIONS } from './constants'
import ClaimAll from '../Actions/ClaimAll'

const BillMenu: React.FC<ListViewProps> = ({ onHandleQueryChange, onSetSortOption, query, activeOption, bills }) => {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const userOwnedBills = bills?.filter((bill) => bill?.userOwnedBillsData?.length > 0)
  const ownedBillsAmount = bills
    ?.flatMap((bill) => (bill?.userOwnedBillsData ? bill.userOwnedBillsData : []))
    .filter((b) => parseFloat(b.pendingRewards) > 0).length
  const ownedBills = userOwnedBills?.map((bill) => {
    return (
      bill?.userOwnedBillsData && {
        billAddress: bill.contractAddress[chainId],
        billIds: bill.userOwnedBillsData
          .filter((b) => parseFloat(b.pendingRewards) > 0)
          .map((b) => {
            return b.id
          }),
      }
    )
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
      <LearnMoreButton variant="secondary" as={Link} to="?modal=bills">
        {' '}
        {t('Learn More')}{' '}
      </LearnMoreButton>
      <ClaimAllWrapper>
        <ClaimAll userOwnedBills={ownedBills} ownedBillsAmount={ownedBillsAmount} />
      </ClaimAllWrapper>
    </ControlContainer>
  )
}

export default React.memo(BillMenu)
