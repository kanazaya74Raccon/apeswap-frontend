import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { SECONDS_PER_YEAR } from 'config'
import TokenInput from '../PresaleDetails/TokenInput'
import DropdownList from './DropdownList'
import { LiquidityLockDetails } from '../types'

interface PostSaleDetailsProp {
  quoteTokenSymbol: string
  onChange?: (postSaleDetails: LiquidityLockDetails) => void
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
  padding: 10px 20px 20px 20px;
`
const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 22px;
  line-height: 27px;
  margin-top: 15px;
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

const PostSaleDetails: React.FC<PostSaleDetailsProp> = ({ quoteTokenSymbol, onChange }) => {
  const [liquidityDetails, setLiquidityDetails] = useState<LiquidityLockDetails>()

  const lockedLiquidityValues = {
    '2 Years': SECONDS_PER_YEAR.times(2).toNumber(),
    '1 Year': SECONDS_PER_YEAR.toNumber(),
    '6 Months': SECONDS_PER_YEAR.div(2).toNumber(),
  }
  const onLiquidityClick = (amount: number) => {
    setLiquidityDetails((prevState) => ({ ...prevState, liquidityPercent: amount }))
  }

  useEffect(() => {
    onChange(liquidityDetails)
  }, [liquidityDetails, onChange])

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>Post sale liquidity</StyledHeader>
        <PercentageToRaiseWrapper>
          <InputTitle>Percentage of raise to lock in liquidity</InputTitle>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 0.3} onClick={() => onLiquidityClick(0.3)}>
            30%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 0.5} onClick={() => onLiquidityClick(0.5)}>
            50%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 0.75} onClick={() => onLiquidityClick(0.75)}>
            75%
          </LiquidityButton>
          <LiquidityButton active={liquidityDetails?.liquidityPercent === 1} onClick={() => onLiquidityClick(1)}>
            100%
          </LiquidityButton>
        </PercentageToRaiseWrapper>
        <InputsWrapper>
          <TokenInput
            onChange={(e) => setLiquidityDetails({ ...liquidityDetails, listingPrice: e.currentTarget.value })}
            title="Listing Price"
            quoteTokenSymbol={quoteTokenSymbol}
            size="md"
            backgroundColor="rgba(51, 51, 51, 1)"
          />
          <DropdownList
            onChange={(item) =>
              setLiquidityDetails({ ...liquidityDetails, lockLiquidity: lockedLiquidityValues[item] })
            }
            dropdownList={['2 Years', '1 Year', '6 Months']}
            title="Lock Liquidity for"
            defaultIndex={2}
          />
        </InputsWrapper>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default React.memo(PostSaleDetails)
