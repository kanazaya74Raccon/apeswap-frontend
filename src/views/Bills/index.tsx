import { Flex } from '@apeswapfinance/uikit'
import ListViewMenu from 'components/ListViewMenu'
import React from 'react'
import { usePollBills, useBills } from 'state/bills/hooks'
import BillsListView from './components/BillsListView'
import UserBillViews from './components/UserBillViews'
import BillMenu from './components/Menu'
import { Header, HeadingContainer, StyledHeading } from './styles'

const Bills: React.FC = () => {
  usePollBills()
  const bills = useBills()
  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1">Treasury Bills</StyledHeading>
        </HeadingContainer>
      </Header>
      <Flex justifyContent="center" mb="80px" style={{ position: 'relative', top: '30px', width: '100%' }}>
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <BillMenu onHandleQueryChange={(s) => s} onSetSortOption={(s) => s} activeOption="all" query="" />
          <UserBillViews bills={bills} />
          <BillsListView bills={bills} />
        </Flex>
      </Flex>
    </>
  )
}

export default React.memo(Bills)
