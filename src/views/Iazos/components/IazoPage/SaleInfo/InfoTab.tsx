import React from 'react'
import { Iazo } from 'state/types'
import DonutChart from 'views/Iazos/components/DonutChart'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import InfoFooter from './InfoFooter'
import { BoldAfterText } from '../../styles'
import { InfoWrapper } from './styles'

interface InfoTabProps {
  iazo: Iazo
}

const InfoTab: React.FC<InfoTabProps> = ({ iazo }) => {
  const { iazoToken, amount, liquidityPercent, feeInfo, socialInfo, listingPrice, tokenPrice } = iazo
  const { decimals, name, totalSupply } = iazoToken
  const { iazoTokenFee } = feeInfo
  const tokenTotalSupply = getBalanceNumber(new BigNumber(totalSupply), parseInt(decimals))
  const tokenFee = parseInt(iazoTokenFee) / 1000
  const liquidityPercentParsed = parseFloat(liquidityPercent) / 1000
  const priceDifference = Math.abs(parseFloat(tokenPrice) / parseFloat(listingPrice))

  // Inputs
  const tokensForSale = getBalanceNumber(new BigNumber(amount), parseInt(decimals))
  const tokensForLiquidity = tokensForSale * priceDifference * liquidityPercentParsed
  const tokensForFees = tokenFee * tokensForSale
  const tokensForOther = tokenTotalSupply - tokensForSale - tokensForLiquidity - tokensForFees
  const items = [
    {
      label: 'For Sale',
      value: tokensForSale,
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
      color: 'rgba(161, 101, 82, 1)',
    },
    {
      label: 'Dev/Other',
      value: tokensForOther,
      color: 'rgba(122, 122, 122, 1)',
    },
  ]
  return (
    <InfoWrapper>
      <DonutChart items={items} title={`${name} Tokenomics`} />
      <div>
        <BoldAfterText boldContent={tokenTotalSupply.toString()}> Total Token Supply: </BoldAfterText>
        <BoldAfterText boldContent={tokensForSale.toString()}> Total Tokens For Sale: </BoldAfterText>
        <BoldAfterText boldContent={tokensForLiquidity.toFixed(2)}> Total Tokens For Liquidity: </BoldAfterText>
      </div>
      <br />
      <br />
      <InfoFooter social={socialInfo} />
    </InfoWrapper>
  )
}

export default InfoTab
