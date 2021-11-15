import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

interface TokenInfoCardProps {
  tokenName: string
  tokenAddress: string
  tokenWebsite?: string
  tokenImage: string
}

const IazoCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 110px;
  width: 796px;
  border-radius: 10px;
  margin-bottom: 12.5px;
  background: rgba(65, 65, 65, 1);
`
const CardMonkey = styled.div`
  position: absolute;
  height: 110px;
  width: 796px;
  overflow: hidden;
  background: url(images/card-ape.svg) no-repeat 425px 0px;
  opacity: 0.2;
`

const TokenHeaderInformationWrapper = styled.div`
  display: flex;
  height: 65%;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
`

const TokenImage = styled.img`
  border-radius: 50%;
  width: 71px;
  height: 71px;
  margin-left: 25px;
`

const TokenName = styled(Text)`
  font-size: 24px;
  padding-left: 2px;
  align-self: flex-start;
`

const TokenButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 330px;
`

const TokenInfoButton = styled.div<{ opacity: string }>`
  display: flex;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  height: 27px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgba(255, 179, 0, ${(props) => props.opacity});
  color: white;
  font-family: poppins;
  font-weight: 100;
  font-size: 15px;
  z-index: 1;
`

const TokenInfoCard: React.FC<TokenInfoCardProps> = ({ tokenName, tokenAddress, tokenWebsite, tokenImage }) => {
  const formatTokenAddress = `${tokenAddress.slice(0, 5)}...${tokenAddress.slice(
    tokenAddress.length - 3,
    tokenAddress.length,
  )}`
  return (
    <IazoCardWrapper>
      <CardMonkey />
      <TokenImage src="/images/tokens/BANANA.svg" />
      <TokenHeaderInformationWrapper>
        <TokenName> {tokenName} </TokenName>
        <TokenButtonsWrapper>
          <TokenInfoButton opacity="1">BscScan</TokenInfoButton>
          <TokenInfoButton opacity=".1">{formatTokenAddress}</TokenInfoButton>
          <TokenInfoButton opacity=".1">Website</TokenInfoButton>
        </TokenButtonsWrapper>
      </TokenHeaderInformationWrapper>
    </IazoCardWrapper>
  )
}

export default TokenInfoCard
