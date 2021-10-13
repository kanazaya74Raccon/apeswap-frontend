import React from 'react'
import { Auction } from 'state/types'
import HistoryCard from './AuctionCardVarients/HistoryCard'
import LiveCard from './AuctionCardVarients/LiveCard'
import QueuedCard from './AuctionCardVarients/QueuedCard'

interface AuctionCardProps {
  auction: Auction
  minIncrementAmount: number
  activeAuctionId: number
  minIncrementPercentage: number
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  activeAuctionId,
  auction,
  minIncrementAmount,
  minIncrementPercentage,
}) => {
  const renderCard = () => {
    if (activeAuctionId === auction.auctionId) {
      return (
        <LiveCard
          auction={auction}
          minIncrementAmount={minIncrementAmount}
          minIncrementPercentage={minIncrementPercentage}
        />
      )
    }
    if (activeAuctionId < auction.auctionId && activeAuctionId !== 0) {
      return <QueuedCard nfa={auction.nfa} seller={auction.seller} />
    }
    return <HistoryCard auction={auction} />
  }
  return renderCard()
}

export default AuctionCard
