import React from 'react'
import styled from 'styled-components'
import { Auction } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useCurrentTime } from 'hooks/useTimer'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import Image from '../../../Nft/components/Image'
import Timer from '../Timer'
import Bid from '../Actions/Bid'
import Price from '../Price'
import Description from '../Description'
import MobileHeader from '../Mobile/MobileHeader'

interface LiveCardProps {
  auction: Auction
  minIncrementAmount: number
}

const Card = styled.div`
  width: 354px;
  height: 625px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 5px 4px 8px rgba(0, 0, 0, 0.1), inset 355px 4px 250px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 450px;
    width: 900px;
    left: 386px;
    top: 431px;
  }
`

const NfaImageHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 314px;
  height: 323px;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
    width: 300px;
    margin-left: 25px;
    margin-top: 25px;
  }
`

const LiveCard: React.FC<LiveCardProps> = ({ auction, minIncrementAmount }) => {
  const { isXl } = useMatchBreakpoints()
  const isDesktop = isXl
  const { nfa, highestBid } = auction
  const countdown = getTimePeriods(auction.endTime - useCurrentTime() / 1000)

  return (
    <Card>
      <NfaImageHolder>
        <Image src={nfa.image} rarityTier={nfa.attributes.rarityTierNumber} alt={nfa.name} borderRadius="10px" />
      </NfaImageHolder>
      <Timer countdown={countdown} />
      {isDesktop ? (
        <Description nfa={nfa} />
      ) : (
        <>
          <MobileHeader nfa={nfa} />
        </>
      )}
      <Price currentBid={highestBid} />
      <Bid currentBid={highestBid} minBidRaise={minIncrementAmount} nfaId={nfa.index} countdown={countdown} />
    </Card>
  )
}

export default LiveCard
