import React, { useState } from 'react'
import styled from 'styled-components'
import { Auction } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { useWeb3React } from '@web3-react/core'
import { useCurrentTime } from 'hooks/useTimer'
import { useMatchBreakpoints } from '@apeswapfinance/uikit'
import Image from '../../../Nft/components/Image'
import Timer from '../Timer'
import Bid from '../Actions/Bid'
import Price from '../Price'
import Description from '../Description'
import MobileHeader from '../Mobile/MobileHeader'
import MobileInformation from '../Mobile/MobileInformation'
import MobileDescription from '../Mobile/MobileDescription'

interface LiveCardProps {
  auction: Auction
  minIncrementAmount: number
  minIncrementPercentage: number
}

interface CardProps {
  expanded: boolean
  highestBidFlag: boolean
}

const Card = styled.div<CardProps>`
  width: 354px;
  height: ${(props) => (props.expanded ? '825px' : '625px')};
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 5px 4px 8px rgba(0, 0, 0, 0.1), inset 355px 4px 250px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  margin-bottom: 100px;
  box-shadow: ${(props) => props.highestBidFlag && '0px 0px 20px #ffb300'};
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

const HighestBidder = styled.div`
  position: absolute;
  top: 350px;
  right: 60px;
  background-image: url(/images/number-one.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 50px;
  height: 50px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 125px;
    height: 125px;
    top: 150px;
    right: 100px;s
  }
`

const LiveCard: React.FC<LiveCardProps> = ({ auction, minIncrementAmount, minIncrementPercentage }) => {
  const { isXl } = useMatchBreakpoints()
  const [expanded, setExpanded] = useState(false)
  const isDesktop = isXl
  const { nfa, highestBid, highestBidder } = auction
  const { account } = useWeb3React()
  const highestBidFlag = highestBidder === account
  const countdown = getTimePeriods(auction.endTime - useCurrentTime() / 1000)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  const renderMobile = () => {
    if (expanded) {
      return (
        <>
          <MobileHeader nfa={nfa} />
          <MobileInformation onClick={handleClick} expanded={expanded} />
          <MobileDescription nfa={nfa} />
        </>
      )
    }
    return (
      <>
        <MobileHeader nfa={nfa} />
        <MobileInformation onClick={handleClick} expanded={expanded} />
      </>
    )
  }

  return (
    <Card expanded={expanded} highestBidFlag={highestBidFlag}>
      <NfaImageHolder>
        <Image src={nfa.image} rarityTier={nfa.attributes.rarityTierNumber} alt={nfa.name} borderRadius="10px" />
      </NfaImageHolder>
      <Timer countdown={countdown} />
      {isDesktop ? <Description nfa={nfa} /> : renderMobile()}
      <Price currentBid={highestBid} />
      {highestBidFlag && <HighestBidder />}
      <Bid
        currentBid={highestBid}
        minBidRaise={minIncrementAmount}
        minBidPercentage={minIncrementPercentage}
        nfaId={nfa.index}
        countdown={countdown}
        auctionId={auction.auctionId}
      />
    </Card>
  )
}

export default LiveCard
