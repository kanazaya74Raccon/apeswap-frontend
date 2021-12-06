import React from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { Text, Spinner } from '@apeswapfinance/uikit'
import { useFetchIazo, useIazos } from 'state/hooks'
import TokenInfoCard from './TokenInfoCard'
import SaleStatus from './SaleStatus/SaleStatus'
import SaleInfo from './SaleInfo/SaleInfo'
import Header from '../Header'
import TopNav from '../TopNav'

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  justify-content: center;
`

const LaunchPadWrapper = styled.div`
  border-radius: 20px;
  margin-top: 50px;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'rgba(255, 255, 255, 1)')};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 30px;
  font-style: normal;
  line-height: 52px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 45px;
    margin-bottom: 20px;
  }
`
const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  left: 411px;
  top: 502px;
  background-color: rgba(223, 65, 65, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  z-index: 0;
  padding: 25px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
    padding: 50px;
  }
`

const BeforeSaleWrapper = styled.div`
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 10px;
  width: 300px;
  margin-top: 40px;
  margin-bottom: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`

const SpinnerHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 20px;
`

const IazoPage: React.FC = () => {
  const { id }: { id: string } = useParams()
  useFetchIazo(id)
  const { iazos, isInitialized } = useIazos()
  const iazo = isInitialized && iazos.find((i) => i.iazoContractAddress === id)
  const {
    iazoToken,
    timeInfo,
    hardcap,
    baseToken,
    status,
    iazoContractAddress,
    socialInfo,
    tokenPrice,
    liquidityPercent,
    maxSpendPerBuyer,
    iazoState,
    iazoOwnerAddress,
  } = isInitialized && iazo
  const { tokenImage, website } = isInitialized && socialInfo
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNav />
          <WarningWrapper>
            <StyledHeader fontSize="10px"> Safety Alert</StyledHeader>
            <StyledText>WARNING</StyledText>
            <br />
            <StyledText>
              SS-IAOs are NOT ApeSwap endorsed or official ApeSwap partners. Always DYOR. Be sure to read our medium
              article on DYOR best practices before aping in and always talk with your fellow Apes on the project Reddit
              thread!
            </StyledText>
            <br />
            <StyledText>
              This is a fully decentralized and open launchpad, anyone can create an SS-IAO, under any token name, with
              any capabilities. Also, there is no control of what happens post launch (projects could leave with your
              money, have an unlimited mint function to extract all liquidity, and/or perform other malicious activity).
            </StyledText>
          </WarningWrapper>
          <BeforeSaleWrapper>
            {isInitialized || iazo ? (
              <>
                <TokenInfoCard
                  tokenName={iazoToken?.name}
                  tokenAddress={iazoToken?.address}
                  tokenImage={tokenImage}
                  tokenWebsite={website}
                  contractAddress={iazoContractAddress}
                />
                <SaleStatus
                  timeInfo={timeInfo}
                  hardcap={hardcap}
                  baseToken={baseToken}
                  status={status}
                  iazoAddress={iazoContractAddress}
                  tokenPrice={tokenPrice}
                  iazoToken={iazoToken}
                  liquidityPercent={liquidityPercent}
                  maxSpend={maxSpendPerBuyer}
                  iazoState={iazoState}
                  iazoOwner={iazoOwnerAddress}
                />
              </>
            ) : (
              <SpinnerHolder>
                <Spinner />
              </SpinnerHolder>
            )}
          </BeforeSaleWrapper>
          {(isInitialized || iazo) && <SaleInfo iazo={iazo} />}
        </LaunchPadWrapper>
      </PageWrapper>
    </>
  )
}

export default IazoPage
