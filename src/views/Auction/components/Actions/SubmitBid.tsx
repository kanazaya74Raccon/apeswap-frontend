import React, { useState, useRef } from 'react'
import { Button } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useReward from 'hooks/useReward'
import useBid from 'hooks/useBid'
import useNextAuction from 'hooks/useNextAuction'
import { useToast } from 'state/hooks'

interface BidProps {
  currentBid: number
  disabled: boolean
  nfaId: number
  countdown: any
  auctionId: number
}

const StyledButton = styled(Button)`
  position: absolute;
  width: 314px;
  height: 50px;
  top: 505px;
  left: 22px;
  background: #ffb300;
  border-radius: 10px;
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  focus: none;
  letter-spacing: 0.05em;
  text-align: center;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 355px;
    width: 200px;
    height: 64px;
    left: 675px;
  }
`

const SubmitBid: React.FC<BidProps> = ({ disabled, currentBid, nfaId, countdown, auctionId }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const rewardRef = useRef(null)
  const onBid = useReward(rewardRef, useBid().onBid)
  const { toastError } = useToast()
  const onNextAuction = useReward(rewardRef, useNextAuction().onNextAuction)
  return countdown.seconds > 0 ? (
    <StyledButton
      disabled={pendingTx || disabled}
      onClick={async () => {
        setPendingTx(true)
        await onBid(currentBid, nfaId, auctionId).catch(() => {
          toastError('Bidding Error', 'It is likely you were outbid')
        })
        setPendingTx(false)
      }}
    >
      Bid
    </StyledButton>
  ) : (
    <StyledButton
      disabled={pendingTx}
      onClick={async () => {
        setPendingTx(true)
        await onNextAuction(nfaId).catch(() => {
          toastError('Transaction Error', 'Something went wrong submitting transaction')
        })
        setPendingTx(false)
      }}
    >
      Next
    </StyledButton>
  )
}

export default SubmitBid
