import React from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { useNetworkChainId } from 'state/hooks'

interface TokenInfoCardProps {
  tokenName: string
  tokenAddress: string
  tokenWebsite?: string
  tokenImage: string
  contractAddress: string
}

const IazoCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 110px;
  width: 300px;
  border-radius: 10px;
  margin-bottom: 12.5px;
  background: ${(props) => (props.theme.isDark ? ' rgba(65, 65, 65, 1)' : 'rgba(161, 101, 82, 1)')};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`
const CardMonkey = styled.div`
  position: absolute;
  height: 110px;
  width: 300px;
  overflow: hidden;
  background: url(images/card-ape.svg) no-repeat 425px 0px;
  opacity: 0.2;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
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
  width: 60px;
  height: 60px;
  margin-left: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 71px;
    height: 71px;
    margin-left: 25px;
  }
`

const TokenName = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 19px;
  padding-left: 2px;
  align-self: flex-start;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 24px;
  }
`

const TokenButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 330px;
  }
`

const TokenInfoButton = styled.div<{ opacity: string }>`
  display: flex;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
  height: 27px;
  border-radius: 5px;
  font-size: 9px;
  cursor: pointer;
  background-color: rgba(255, 179, 0, ${(props) => props.opacity});
  color: white;
  z-index: 1;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    padding-left: 15px;
    padding-right: 15px;
  }
`

const TokenInfoCard: React.FC<TokenInfoCardProps> = ({
  tokenName,
  tokenAddress,
  tokenWebsite,
  tokenImage,
  contractAddress,
}) => {
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const chainId = useNetworkChainId()
  const isMobile = isMd || isSm || isXs
  const formatTokenAddress = `${tokenAddress?.slice(0, 5)}...${tokenAddress?.slice(
    tokenAddress?.length - 3,
    tokenAddress?.length,
  )}`
  const tokenLink = `${BLOCK_EXPLORER[chainId]}address/${tokenAddress}`
  const contractLink = `${BLOCK_EXPLORER[chainId]}address/${contractAddress}`

  return (
    <IazoCardWrapper>
      <CardMonkey />
      <TokenImage src={tokenImage} />
      <TokenHeaderInformationWrapper>
        <TokenName color="white"> {tokenName} </TokenName>
        <TokenButtonsWrapper>
          <TokenInfoButton opacity="1">
            <a href={contractLink} target="_blank" rel="noopener noreferrer">
              <Text fontFamily="poppins" fontSize={isMobile ? '11px' : '15px'} color="white">
                BscScan
              </Text>
            </a>
          </TokenInfoButton>
          <TokenInfoButton opacity=".1">
            <a href={tokenLink} target="_blank" rel="noopener noreferrer">
              <Text fontFamily="poppins" fontSize={isMobile ? '11px' : '15px'} color="white">
                {formatTokenAddress}
              </Text>
            </a>
          </TokenInfoButton>
          <TokenInfoButton opacity=".1">
            <a href={tokenWebsite} target="_blank" rel="noopener noreferrer">
              <Text fontFamily="poppins" fontSize={isMobile ? '11px' : '15px'} color="white">
                Website
              </Text>
            </a>
          </TokenInfoButton>
        </TokenButtonsWrapper>
      </TokenHeaderInformationWrapper>
    </IazoCardWrapper>
  )
}

export default TokenInfoCard
