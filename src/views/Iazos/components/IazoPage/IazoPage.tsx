import React from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@apeswapfinance/uikit'
import { useFetchIazo, useIazos } from 'state/hooks'
import TokenInfoCard from './TokenInfoCard'
import SaleStatus from './SaleStatus/SaleStatus'
import SaleInfo from './SaleInfo/SaleInfo'
import Header from '../Header'
import TopNav from '../TopNav'
import {
  PageWrapper,
  LaunchPadWrapper,
  StyledHeader,
  StyledText,
  WarningWrapper,
  BeforeSaleWrapper,
  SpinnerHolder,
} from './styles'

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
