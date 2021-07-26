import React from 'react'
import { Auction } from 'state/types'
import HistoryCard from './AuctionCardVarients/HistoryCard'
import LiveCard from './AuctionCardVarients/LiveCard'
import QueuedCard from './AuctionCardVarients/QueuedCard'

interface AuctionCardProps {
  auction: Auction
  minIncrementAmount: number
  activeAuctionId: number
}

const AuctionCard: React.FC<AuctionCardProps> = ({ activeAuctionId, auction, minIncrementAmount }) => {
  const renderCard = () => {
    if (activeAuctionId === auction.auctionId) {
      return <LiveCard auction={auction} minIncrementAmount={minIncrementAmount} />
    }
    if (activeAuctionId < auction.auctionId) {
      return <QueuedCard nfa={auction.nfa} />
    }
    return <HistoryCard auction={auction} />
  }
  return renderCard()
}

export default AuctionCard
