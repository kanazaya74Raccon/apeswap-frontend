import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints, Checkbox } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import TokenInput from '../PresaleDetails/TokenInput'
import { ExtendedERC20Details } from '../PairCreation/PairCreation'

interface LiquidityLockDetails {
  liquidity: number
  listingPrice: string
  lockLiquidity: number
}

interface PresaleDataProps {
  pairTokenDetails: ExtendedERC20Details
  onChange?: void
}

const LaunchPadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 371px;
  width: 686px;
  border-radius: 10px;
  background: #414141;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`
const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 22px;
  line-height: 27px;
  margin-top: 15px;
`

const CheckboxContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`

const FooterContainer = styled.div`
  display: flex;
  width: 450px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  margin-left: 15px;
`

const StyledSubText = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  line-height: 24px;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: flex-start;
  height 80px;
  width: 300px;
  margin-left: 35px;
`

const DateButtonContainer = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`

const DateSelectionContainer = styled.div`
  position: relative;
  display: flex;
  height: 135px;
  background: #414141;
  width: 686px;
  border-radius: 10px;
  margin-top: 15px;
  align-items: center;
  margin-bottom: 20px;
  z-index: 0;
`

const InputTitle = styled(Text)`
  position: absolute;
  top: -30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
`

const PercentageToRaiseWrapper = styled.div`
  position: relative;
  display: flex;
  height: 60px;
  width: 475px;
  margin-top: 30px;
  margin-bottom: 30px;
  justify-content: space-between;
  align-items: center;
`

const LiquidityButton = styled.div<{ active: boolean }>`
  display: flex;
  width: 100px;
  height: 40px;
  background: ${(props) => (props.active ? '#ffb300' : 'rgba(122, 122, 122, 1)')};
  border-radius: 5px;
  color: white;
  font-weight: 700;
  font-family: Poppins;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const InputsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const PostSaleDetails: React.FC = () => {
  const [liquidityDetails, setLiquidityDetails] = useState<LiquidityLockDetails>()

  const onLiquidityClick = (amount: number) => {
    setLiquidityDetails((prevState) => ({ ...prevState, liquidity: amount }))
  }

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>Post sale liquidity</StyledHeader>
        <PercentageToRaiseWrapper>
          <InputTitle>Percentage of raise to lock in liquidity</InputTitle>
          <LiquidityButton active={liquidityDetails?.liquidity === 30} onClick={() => onLiquidityClick(30)}>
            30%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidity === 50} onClick={() => onLiquidityClick(50)}>
            50%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidity === 75} onClick={() => onLiquidityClick(75)}>
            75%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidity === 100} onClick={() => onLiquidityClick(100)}>
            100%
          </LiquidityButton>
        </PercentageToRaiseWrapper>
        <InputsWrapper>
          <TokenInput
            onChange={(e) => setLiquidityDetails({ ...liquidityDetails, listingPrice: e.currentTarget.value })}
            title="Listing Price"
            quoteTokenSymbol="BNB"
            size="md"
            backgroundColor="rgba(51, 51, 51, 1)"
          />
          <TokenInput
            onChange={(e) => setLiquidityDetails({ ...liquidityDetails, listingPrice: e.currentTarget.value })}
            title="Listing Price"
            quoteTokenSymbol="BNB"
            size="md"
            backgroundColor="rgba(51, 51, 51, 1)"
          />
        </InputsWrapper>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default PostSaleDetails
