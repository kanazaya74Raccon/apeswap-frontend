import { Flex } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { usePollBills, useBills, usePollUserBills } from 'state/bills/hooks'
import { Bills as BillType } from 'state/types'
import BillsListView from './components/BillsListView'
import UserBillViews from './components/UserBillViews'
import BillMenu from './components/Menu'
import { Header, HeadingContainer, StyledHeading } from './styles'

const Bills: React.FC = () => {
  usePollBills()
  usePollUserBills()
  const bills = useBills()
  const [query, setQuery] = useState('')

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const renderBills = (): BillType[] => {
    let billsToReturn = bills
    if (query) {
      billsToReturn = bills?.filter((bill) => {
        return bill.lpToken.symbol.toUpperCase().includes(query.toUpperCase())
      })
    }
    return billsToReturn
  }

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1">Treasury Bills</StyledHeading>
        </HeadingContainer>
      </Header>
      <Flex
        justifyContent="center"
        alignItems="center"
        mb="80px"
        padding="0px 10px"
        style={{ position: 'relative', top: '30px', width: '100%' }}
      >
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <BillMenu
            bills={bills}
            onHandleQueryChange={handleChangeQuery}
            onSetSortOption={(s) => s}
            activeOption="all"
            query={query}
          />
          <UserBillViews bills={renderBills()} />
          <BillsListView bills={renderBills()} />
        </Flex>
      </Flex>
    </>
  )
}

export default React.memo(Bills)
