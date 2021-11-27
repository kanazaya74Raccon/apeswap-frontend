import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoStatus, IazoTimeInfo, IazoTokenInfo } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import useFetchUserIazoCommit, { UserCommit } from 'views/Iazos/hooks/useFetchUserIazoCommit'
import { useTokenPriceFromAddress } from 'state/hooks'
import ClaimIazo from '../../Actions/ClaimIazo'

interface BeforeSaleProps {
  timeInfo: IazoTimeInfo
  hardcap: string
  baseToken: IazoTokenInfo
  iazoToken: IazoTokenInfo
  status: IazoStatus
  iazoAddress: string
  tokenPrice: string
}

const BeforeSaleWrapper = styled.div`
  width: 796px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Heading = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 30px;
`

const ProgressBarWrapper = styled.div`
  width: 557px;
  margin-top: 15px;
  margin-bottom: 20px;
  border-radius: 20px;
  overflow: hidden;
`

const ProgressBar = styled.div`
  height: 18px;
  width: 100%;
  border-radius: 20px;
  background: #c4c4c4;
`

const BoldAfterText = styled(Text)<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  &:after {
    font-weight: 700;
    font-size: 17px;
    content: '${(props) => props.boldContent}';
  }
`

const Progress = styled(ProgressBar)<{ percentComplete: string }>`
  width: ${(props) => props.percentComplete};
  background: linear-gradient(53.53deg, #a16552 15.88%, #e1b242 92.56%);
`

const AfterSale: React.FC<BeforeSaleProps> = ({ hardcap, baseToken, iazoToken, status, tokenPrice, iazoAddress }) => {
  const { symbol, decimals, address } = baseToken
  const [pendingUserInfo, setPendingUserInfo] = useState(true)
  const { deposited, tokensBought }: UserCommit = useFetchUserIazoCommit(iazoAddress, pendingUserInfo)
  const tokensDepositedFormatted = getBalanceNumber(new BigNumber(deposited), parseInt(decimals))
  const tokensBoughtFormatted = getBalanceNumber(new BigNumber(tokensBought), parseInt(iazoToken.decimals))

  const { totalBaseCollected } = status
  const hardcapFormatted = getBalanceNumber(new BigNumber(hardcap), parseInt(decimals))
  const baseCollectedFormatted = getBalanceNumber(new BigNumber(totalBaseCollected), parseInt(decimals))
  const percentRaised = (baseCollectedFormatted / parseFloat(hardcap)) * 100

  console.log('render render')

  const onPendingClaim = useCallback((pendingTrx: boolean) => {
    setPendingUserInfo(pendingTrx)
  }, [])

  return (
    <BeforeSaleWrapper>
      <Heading>
        {baseCollectedFormatted} / {hardcap} {symbol}
      </Heading>
      <ProgressBarWrapper>
        <ProgressBar>
          <Progress percentComplete={`${percentRaised}%`} />
        </ProgressBar>
      </ProgressBarWrapper>
      <BoldAfterText boldContent={`${tokensBoughtFormatted.toString()} ${iazoToken.symbol}`}>
        Tokens bought:{' '}
      </BoldAfterText>
      <ClaimIazo iazoAddress={iazoAddress} tokensToClaim={tokensBoughtFormatted} onPendingClaim={onPendingClaim} />
    </BeforeSaleWrapper>
  )
}

export default React.memo(AfterSale)
