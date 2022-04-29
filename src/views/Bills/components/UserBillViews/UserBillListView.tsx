import React from 'react'
import { Flex, useMatchBreakpoints } from '@apeswapfinance/uikit'
import ListView from 'components/ListView'
import { Bills } from 'state/types'
import { ExtendedListViewProps } from 'components/ListView/types'
import ListViewContent from 'components/ListViewContent'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import Claim from '../Actions/Claim'
import VestedTimer from '../VestedTimer'
import BillModal from '../Modals'

const UserBillListView: React.FC<{ bills: Bills[]; showAll?: boolean }> = ({ bills, showAll }) => {
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const { chainId } = useActiveWeb3React()
  const isMobile = !isLg && !isXl && !isXxl
  const billsListView = bills.flatMap((bill) => {
    const ownedBills = bill?.userOwnedBillsData
    const { token, quoteToken, earnToken } = bill
    return ownedBills.flatMap((ownedBill) => {
      if (!showAll && parseFloat(ownedBill.pendingRewards) === 0 && parseFloat(ownedBill.payout) === 0) {
        return []
      }
      const pending = getBalanceNumber(new BigNumber(ownedBill.payout), bill?.earnToken?.decimals)?.toFixed(4)
      const pendingRewards = getBalanceNumber(
        new BigNumber(ownedBill.pendingRewards),
        bill?.earnToken?.decimals,
      )?.toFixed(4)
      return {
        tokens: { token1: token.symbol, token2: quoteToken.symbol, token3: earnToken.symbol },
        id: ownedBill.id,
        billArrow: true,
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
              toolTip="This is the amount of tokens that have vested and available to claim."
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(0, 65%)"
            />
            <ListViewContent
              title="Pending"
              value={pending}
              width={isMobile ? 120 : 160}
              height={52.5}
              toolTip="This is the amount of unvested tokens that cannot be claimed yet."
              toolTipPlacement="bottomLeft"
              toolTipTransform="translate(0, 65%)"
            />
            <VestedTimer lastBlockTimestamp={ownedBill.lastBlockTimestamp} vesting={ownedBill.vesting} />
            {!isMobile && (
              <>
                <Flex alignItems="center" style={{ height: '100%' }}>
                  <Claim
                    billAddress={bill.contractAddress[chainId]}
                    billIds={[ownedBill.id]}
                    buttonSize={100}
                    pendingRewards={ownedBill?.pendingRewards}
                  />
                </Flex>
                <Flex alignItems="center" style={{ height: '100%' }}>
                  <BillModal buttonText="VIEW" bill={bill} billId={ownedBill.id} buttonSize={100} />
                </Flex>
              </>
            )}
          </>
        ),
        expandedContentSize: 135,
        expandedContent: isMobile && (
          <Flex flexDirection="column" alignItems="center" style={{ height: '110px', width: '100%' }}>
            <Flex alignItems="center" justifyContent="center">
              <Claim
                billAddress={bill.contractAddress[chainId]}
                billIds={[ownedBill.id]}
                pendingRewards={ownedBill?.pendingRewards}
              />
            </Flex>
            <Flex alignItems="center" mt="20px">
              <BillModal buttonText="VIEW" bill={bill} billId={ownedBill.id} buttonSize={200} />
            </Flex>
          </Flex>
        ),
      } as ExtendedListViewProps
    })
  })
  return <ListView listViews={billsListView?.reverse()} />
}

export default React.memo(UserBillListView)
