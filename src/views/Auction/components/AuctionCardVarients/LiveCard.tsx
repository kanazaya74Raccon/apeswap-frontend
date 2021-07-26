import React from 'react'
import styled from 'styled-components'
import { Auction } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useCurrentTime } from 'hooks/useTimer'
import Image from '../../../Nft/components/Image'
import Timer from '../Timer'
import Bid from '../Actions/Bid'
import Price from '../Price'
import Description from '../Description'

interface LiveCardProps {
  auction: Auction
  minIncrementAmount: number
}

const Card = styled.div`
  height: 400px;
  width: 300px;
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
  height: 150px;
  width: 150px;
  border-radius: 10px;
  margin-left: 25px;
  margin-top: 25px;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 308px;
    width: 300px;
  }
`

const LiveCard: React.FC<LiveCardProps> = ({ auction, minIncrementAmount }) => {
  const { nfa, highestBid } = auction
  const countdown = getTimePeriods(auction.endTime - useCurrentTime() / 1000)

  return (
    <Card>
      <NfaImageHolder>
        <Image src={nfa.image} rarityTier={nfa.attributes.rarityTierNumber} alt={nfa.name} borderRadius="10px" />
      </NfaImageHolder>
      <Timer countdown={countdown} />
      <Description nfa={nfa} />
      <Price currentBid={highestBid} />
      <Bid currentBid={highestBid} minBidRaise={minIncrementAmount} nfaId={nfa.index} countdown={countdown} />
    </Card>
  )
}

export default LiveCard
