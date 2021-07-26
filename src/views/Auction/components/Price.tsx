import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceBnbBusd } from 'state/hooks'

const PriceWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 64px;
  bottom: 30px;
  margin-left: 25px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  background: ${(props) => (props.theme.isDark ? 'rgb(250, 250, 250, 0.1)' : 'rgb(250, 250, 250)')};
`

const PriceText = styled(Text)`
  position: absolute;
  width: 52px;
  height: 24px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.05em;
  margin-left: 20px;
`

const BnbLogo = styled.div`
  position: absolute;
  background-image: url(/images/rounded-bnb.svg);
  background-position: center;
  width: 40px;
  height: 40px;
  left: 100px;
  margin-top: 2px;
`

const CurrentBidWrapper = styled(Text)`
  position: absolute;
  width: 159px;
  height: 41px;
  left: 150px;
  margin-bottom: 18px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 27px;
  line-height: 40px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
`

const CurrentBidDollarWrapper = styled(Text)`
  position: absolute;
  width: 81px;
  height: 15px;
  left: 155px;
  margin-top: 25px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  color: #38a611;
`

interface TimerProps {
  currentBid: string
}

const Price: React.FC<TimerProps> = ({ currentBid }) => {
  const rawBidAmount = getBalanceNumber(new BigNumber(currentBid))
  const bnbPrice = usePriceBnbBusd()
  const dollarValue = (getBalanceNumber(bnbPrice) * rawBidAmount).toFixed(2)
  
  return (
    <PriceWrapper>
      <PriceText>Price:</PriceText>
      <CurrentBidWrapper> {rawBidAmount.toFixed(4)} </CurrentBidWrapper>
      <CurrentBidDollarWrapper> ~${dollarValue} </CurrentBidDollarWrapper>
      <BnbLogo />
    </PriceWrapper>
  )
}

export default Price
