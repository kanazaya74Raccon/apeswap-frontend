import React from 'react'
import { Flex, useMatchBreakpoints, Text, useModal } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { Bills } from 'state/types'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import Claim from '../Actions/Claim'
import VestedTimer from '../VestedTimer'
import BillModal from '../BillModal'

const UserBillListView: React.FC<{ bills: Bills[] }> = ({ bills }) => {
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()
  const isMobile = !isLg && !isXl && !isXxl
  const billsListView = bills.flatMap((bill) => {
    const ownedBills = bill?.userData?.bills
    const { token, quoteToken, earnToken } = bill
    return ownedBills.map((ownedBill) => {
      const pending = getBalanceNumber(new BigNumber(ownedBill.payout), bill?.earnToken?.decimals)?.toFixed(4)
      const pendingRewards = getBalanceNumber(
        new BigNumber(ownedBill.pendingRewards),
        bill?.earnToken?.decimals,
      )?.toFixed(4)
      return {
        tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
        id: ownedBill.id,
        title: (
          <ListViewContent
            title={bill.billType}
            value={bill.lpToken.symbol}
            width={isMobile ? 150 : 150}
            height={45}
            ml={10}
          />
        ),
        cardContent: (
          <>
            <ListViewContent
              title="Claimable"
              value={pendingRewards}
              width={isMobile ? 120 : 165}
              ml={20}
              height={52.5}
              toolTip="s"
            />
            <ListViewContent
              title="Pending"
              value={pending}
              width={isMobile ? 120 : 160}
              height={52.5}
              toolTip="APR is calculated by summing up the rewards from providing liquidity (e.g., DEX swap fees) and the rewards in BANANA."
            />
            <VestedTimer lastBlockTimestamp={ownedBill.lastBlockTimestamp} vesting={ownedBill.vesting} />
            {!isMobile && (
              <>
                <Flex alignItems="center" style={{ height: '100%' }}>
                  <Claim billAddress={bill.contractAddress[chainId]} billId={ownedBill.id} buttonSize={100} />
                </Flex>
                <Flex alignItems="center" style={{ height: '100%' }}>
                  <BillModal buttonText="VIEW" bill={bill} billId={ownedBill.id} buttonSize={100} />
                </Flex>
              </>
            )}
          </>
        ),
        expandedContent: isMobile && (
          <Flex alignItems="center" justifyContent="center" style={{ height: '100%', width: '100%' }}>
            <Claim billAddress={bill.contractAddress[chainId]} billId={ownedBill.id} />
          </Flex>
        ),
      } as ExtendedListViewProps
    })
  })
  return <ListView listViews={billsListView?.reverse()} />
}

export default React.memo(UserBillListView)
