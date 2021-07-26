import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { Text, Input } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from 'config'
import SubmitBid from './SubmitBid'

interface BidProps {
  currentBid: string
  nfaId: number
  minBidRaise: number
  minBidPercentage?: BigNumber
  countdown: any
}

const BidWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 64px;
  bottom: 30px;
  margin-left: 350px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  background: F7F8F9;
  background: ${(props) => (props.theme.isDark ? 'rgb(250, 250, 250, 0.1)' : 'rgb(250, 250, 250)')};
`

const MinButton = styled.div`
  position: absolute;
  width: 52px;
  height: 30px;
  left: 200px;
  background: #ffb300;
  border-radius: 5px 5px 5px 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

const PlusButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0px;
  top: 0px;
  background: #ffb300;
  border-radius: 10px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`

const SubButton = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 0px;
  bottom: 0px;
  background: #ffb300;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
`

const ButtonText = styled(Text)`
  width: 52px;
  height: 30px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  margin-top: 5px;
  color: #fafafa;
`

const SubText = styled(Text)`
  position: absolute;
  height: 41px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 27px;
  letter-spacing: 0.05em;
  color: #fafafa;
`

const UserBalanceWrapper = styled(Text)`
  position: absolute;
  width: 107px;
  height: 15px;
  left: 20px;
  bottom: 10px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 15px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  opacity: 0.7;
`

const BidInput = styled.input`
  position: absolute;
  background: none;
  width: 137px;
  height: 38px;
  top: 5px;
  outline: none;
  border: none;
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 27px;
  line-height: 10px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.colors.text};
  margin-left: 20px;
`

const Bid: React.FC<BidProps> = ({ currentBid, minBidRaise, nfaId, countdown }) => {
  const rawBidAmount = getBalanceNumber(new BigNumber(currentBid))
  const rawMinBidRaise = getBalanceNumber(new BigNumber(minBidRaise))
  const [bidAmount, setBidAmount] = useState(rawBidAmount + rawMinBidRaise)
  const bnbBalance = useTokenBalance(ZERO_ADDRESS)
  const rawBnbBalance = getBalanceNumber(bnbBalance).toFixed(6)

  const minBid = () => {
    setBidAmount(rawBidAmount + rawMinBidRaise)
  }

  const addBid = () => {
    setBidAmount(bidAmount + rawMinBidRaise)
  }

  const subBid = () => {
    setBidAmount(bidAmount - rawMinBidRaise)
  }

  const updateBid = (e) => {
    setBidAmount(e.target.value)
  }

  useEffect(() => {
    setBidAmount(rawBidAmount + rawMinBidRaise)
  }, [rawBidAmount, rawMinBidRaise])


  return (
    <>
      <BidWrapper>
        <BidInput type="text" value={bidAmount} onChange={updateBid}/>
        <MinButton>
          <ButtonText onClick={minBid}>Min</ButtonText>
        </MinButton>
        <PlusButton>
          <SubText onClick={addBid}>+</SubText>
        </PlusButton>
        <SubButton>
          <SubText onClick={subBid}>-</SubText>
        </SubButton>
        <UserBalanceWrapper>Balance: {rawBnbBalance} </UserBalanceWrapper>
      </BidWrapper>
      <SubmitBid currentBid={bidAmount} nfaId={nfaId} countdown={countdown}/>
    </>
  )
}

export default Bid
