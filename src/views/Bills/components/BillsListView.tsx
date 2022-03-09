import React from 'react'
import { Flex, useMatchBreakpoints, Text } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { Bills } from 'state/types'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import getTimePeriods from 'utils/getTimePeriods'
import { billsStub } from '../stubData'
import { Container, StyledButton } from './styles'
import BillModal from './BillModal'

const BillsListView: React.FC<{ bills: Bills[] }> = ({ bills }) => {
  const { isXl, isLg } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl
  const billsListView = bills.map((bill) => {
    const { token, quoteToken, earnToken } = bill
    const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
    return {
      tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
      title: (
        <ListViewContent
          title={bill.billType}
          value={bill.lpToken.symbol}
          width={isMobile ? 90 : 120}
          height={45}
          ml={10}
        />
      ),
      cardContent: (
        <>
          <ListViewContent
            title="Price"
            value={`$${bill?.price}`}
            width={isMobile ? 90 : 150}
            height={52.5}
            toolTip="s"
          />
          <ListViewContent
            title="ROI"
            value={`${bill?.roi}%`}
            width={isMobile ? 100 : 200}
            height={52.5}
            toolTip="APR is calculated by summing up the rewards from providing liquidity (e.g., DEX swap fees) and the rewards in BANANA."
          />
          <ListViewContent
            title="Vesting Time"
            value={`${vestingTime.days}d, ${vestingTime.minutes}h, ${vestingTime.seconds}m`}
            width={isMobile ? 100 : 180}
            height={52.5}
            toolTip="s"
          />
          <Flex alignItems="center" style={{ height: '100%' }}>
            <BillModal bill={bill} buttonText="BUY" />
          </Flex>
        </>
      ),
    } as ExtendedListViewProps
  })

  return (
    <Container>
      <Text margin="20px 10px">Available Treasury Bills</Text>
      <ListView listViews={billsListView} />
    </Container>
  )
}

export default React.memo(BillsListView)
