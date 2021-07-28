import React, { useState, useRef } from 'react'
import { Button } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useReward from 'hooks/useReward'
import useBid from 'hooks/useBid'
import useNextAuction from 'hooks/useNextAuction'

interface BidProps {
  currentBid: number
  nfaId: number
  countdown: any
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
  letter-spacing: 0.05em;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 355px;
    width: 200px;
    height: 64px;
    left: 675px;
  }
`

const SubmitBid: React.FC<BidProps> = ({ currentBid, nfaId, countdown }) => {
  const [pendingTx, setPendingTx] = useState(false)
  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const onBid = useReward(rewardRef, useBid().onBid)
  const onNextAuction = useReward(rewardRef, useNextAuction().onNextAuction)
  return countdown.seconds > 0 ? (
    <StyledButton
      onClick={async () => {
        setPendingTx(true)
        setTypeOfReward('rewardBanana')
        await onBid(currentBid, nfaId).catch(() => {
          setTypeOfReward('error')
          rewardRef.current?.rewardMe()
        })
        setPendingTx(false)
      }}
    >
      Bid
    </StyledButton>
  ) : (
    <StyledButton
      onClick={async () => {
        setPendingTx(true)
        setTypeOfReward('rewardBanana')
        await onNextAuction(nfaId).catch(() => {
          setTypeOfReward('error')
          rewardRef.current?.rewardMe()
        })
        setPendingTx(false)
      }}
    >
      Next
    </StyledButton>
  )
}

export default SubmitBid
