import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import DonutChart from '../DonutChart'
import { TokenSaleDetails } from '../PresaleDetails/PresaleDetails'
import { LiquidityLockDetails } from '../PostSaleDetails/PostSaleDetails'
import { ExtendedERC20Details } from '../PairCreation/PairCreation'

interface SaleReviewProps {
  presaleDetails: TokenSaleDetails
  postsaleDetails: LiquidityLockDetails
  pairDetails: ExtendedERC20Details
}

const Container = styled.div`
  position: relative;
  width: 318px;
  border-radius: 10px;
  background: rgba(51, 51, 51, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  flex-direction: column;
  border: 1px solid red;
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 700;
  margin-left: 20px;
  text-align: left;
`
const StyledText = styled(Text)`
  text-align: start;
  font-family: Poppins;
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
`

const DropdownItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`

const InputTitle = styled(Text)`
  position: absolute;
  top: -30px;
  align-self: center;
  align-content: center;
  font-family: Poppins;
  font-size: 16px;
  font-weight: 700;
`

const DropDownWrapper = styled.div`
  width: 318px;
  position: absolute;
  top: 60px;
  display: flex;
  flex-direction: column;
  border-radius: 0px 0px 10px 10px;
  background: rgba(51, 51, 51, 1);
`

const HeaderWrapper = styled.div`
  height: 55.5px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const SaleReview: React.FC<SaleReviewProps> = ({ presaleDetails, postsaleDetails, pairDetails }) => {
  const { tokensForSale, pricePerToken } = presaleDetails
  const { liquidityPercent } = postsaleDetails
  const { totalSupply, tokenDecimals, quoteToken } = pairDetails
  // Tokenomics chart details
  const formatedTotalSupply = getBalanceNumber(new BigNumber(totalSupply), tokenDecimals)
  const tokensForLiquidity = parseFloat(tokensForSale) * liquidityPercent
  const tokensForFees = 0.018 * parseFloat(tokensForSale)
  // Tokens for sale after subtracting liquidity and fees
  const tokensForSaleMinusInputs = parseFloat(tokensForSale) - tokensForLiquidity - tokensForFees
  const tokensForOther = formatedTotalSupply - parseFloat(tokensForSale)
  // Amount raised chart details
  const amountRaisedInQuoteToken = parseFloat(pricePerToken) * parseFloat(tokensForSale)
  const quoteTokenForLiqudity = amountRaisedInQuoteToken * liquidityPercent
  const quoteTokenForFees = 0.018 * amountRaisedInQuoteToken
  const quoteTokenForOther = amountRaisedInQuoteToken - quoteTokenForLiqudity - quoteTokenForFees

  return (
    <>
      <DonutChart
        items={[
          {
            label: 'For Sale',
            value: tokensForSaleMinusInputs,
            color: 'rgba(255, 179, 0, 1)',
          },
          {
            label: 'Liquidity',
            value: tokensForLiquidity,
            color: 'rgba(56, 166, 17, 1)',
          },
          {
            label: 'Fees',
            value: tokensForFees,
            color: 'rgba(122, 122, 122, 1)',
          },
          { label: 'Dev/Other', value: tokensForOther, color: 'rgba(161, 101, 82, 1)' },
        ]}
        title="IAZO's Tokenomics"
      />
      <DonutChart
        items={[
          {
            label: 'Liquidity',
            value: quoteTokenForLiqudity,
            color: 'rgba(56, 166, 17, 1)',
          },
          {
            label: 'Fees',
            value: quoteTokenForFees,
            color: 'rgba(122, 122, 122, 1)',
          },
          { label: 'Dev/Other', value: quoteTokenForOther, color: 'rgba(161, 101, 82, 1)' },
        ]}
        title={`${quoteToken} Raised`}
      />
    </>
  )
}

export default SaleReview
