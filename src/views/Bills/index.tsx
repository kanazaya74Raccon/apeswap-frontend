import { Flex } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { usePollBills, useBills, usePollUserBills } from 'state/bills/hooks'
import { Bills as BillType } from 'state/types'
import ListViewLayout from 'components/layout/ListViewLayout'
import Banner from 'components/Banner'
import BillsListView from './components/BillsListView'
import UserBillViews from './components/UserBillViews'
import BillMenu from './components/Menu'

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
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mb="80px"
        style={{ position: 'relative', top: '30px', width: '100%' }}
      >
        <ListViewLayout>
          <Banner banner="treasury-bills" title="Treasury Bills" listViewBreak titleColor="primaryBright" />
          <BillMenu
            bills={bills}
            onHandleQueryChange={handleChangeQuery}
            onSetSortOption={(s) => s}
            activeOption="all"
            query={query}
          />
          <UserBillViews bills={renderBills()} />
          <BillsListView bills={renderBills()} />
        </ListViewLayout>
      </Flex>
    </>
  )
}

export default React.memo(Bills)
