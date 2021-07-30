import React from 'react'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { Auction } from 'state/types'
import { usePriceBnbBusd } from 'state/hooks'
import { Text } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import Image from '../../../Nft/components/Image'

interface HistoryCardProps {
  auction: Auction
}

const Card = styled.div`
  width: 300px;
  height: 435px;
  border-radius: 10px;
  opacity: 0.7;
  background-color: ${({ theme }) => theme.colors.card};
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 420px;
    height: 235px;
  }
`

const NfaImageHolder = styled.div`
  position: absolute;
  height: 150px;
  width: 280px;
  left: 10px;
  top: 10px;
  border-radius: 45px 0px 0px 0px;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 200px;
    width: 200px;
    left: 15px;
    top: 17px;
  }
`

const TextHolder = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 280px;
  left: 0px;
  width: 300px;
  height: 200px;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 20px;
    left: 225px;
    width: 180px;
    height: 200px;
  }
`

const BoughtText = styled(Text)`
  position: absolute;
  top: 25px;
  font-size: 25px;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 30px;
    font-size: 20px;
  }
`

const BidAmount = styled(Text)`
  position: absolute;
  top: 70px;
  font-size: 20px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  ${({ theme }) => theme.mediaQueries.lg} {
  }
`

const CurrentBidDollarWrapper = styled(Text)`
  position: absolute;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 15px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  color: #38a611;
  ${({ theme }) => theme.mediaQueries.lg} {
  }
`

const HistoryCard: React.FC<HistoryCardProps> = ({ auction }) => {
  const { nfa, highestBid } = auction
  const rawBidAmount = getBalanceNumber(new BigNumber(highestBid))
  const bnbPrice = usePriceBnbBusd()
  const dollarValue = (getBalanceNumber(bnbPrice, 0) * rawBidAmount).toFixed(2)

  return (
    <Card>
      <TextHolder>
        <BoughtText>Bought For</BoughtText>
        <BidAmount> {rawBidAmount.toFixed(3)} BNB</BidAmount>
        <CurrentBidDollarWrapper>~${dollarValue}</CurrentBidDollarWrapper>
      </TextHolder>
      <NfaImageHolder>
        <Image src={nfa.image} rarityTier={nfa.attributes.rarityTierNumber} alt={nfa.name} borderRadius="10px" />
      </NfaImageHolder>
    </Card>
  )
}

export default HistoryCard
