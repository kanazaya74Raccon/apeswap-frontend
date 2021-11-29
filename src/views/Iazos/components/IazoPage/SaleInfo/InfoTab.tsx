import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { Iazo } from 'state/types'
import DonutChart from 'views/Iazos/components/DonutChart'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import InfoFooter from './InfoFooter'

interface InfoTabProps {
  iazo: Iazo
}

const InfoWrapper = styled.div`
  display: flex;
  width: 300px;
  margin-bottom: 20px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 0px 0px 10px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const InfoTab: React.FC<InfoTabProps> = ({ iazo }) => {
  const { iazoToken, amount, liquidityPercent, feeInfo, socialInfo } = iazo
  const { decimals, name, totalSupply } = iazoToken
  const { iazoTokenFee } = feeInfo
  const tokenTotalSupply = getBalanceNumber(new BigNumber(totalSupply), parseInt(decimals))
  const tokenFee = parseInt(iazoTokenFee) / 1000
  const liquidityPercentParsed = parseFloat(liquidityPercent) / 1000

  // Inputs
  const tokensForSale = getBalanceNumber(new BigNumber(amount), parseInt(decimals))
  const tokensForLiquidity = tokensForSale * liquidityPercentParsed
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
      <InfoFooter social={socialInfo} />
    </InfoWrapper>
  )
}

export default InfoTab
