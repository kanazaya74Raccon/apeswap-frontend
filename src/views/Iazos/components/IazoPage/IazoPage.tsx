import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Text, Spinner } from '@apeswapfinance/uikit'
import { useFetchIazos, useIazos } from 'state/hooks'
import TokenInfoCard from './TokenInfoCard'
import SaleStatus from './SaleStatus/SaleStatus'
import SaleInfo from './SaleInfo/SaleInfo'
import Header from '../Header'

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

const TopNavWrapper = styled.div`
  position: relative;
  height: 60px;
  width: 320px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(161, 101, 82, 1)')};
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 856px;
  }
`

const TopNavMonkey = styled.div`
  position: absolute;
  height: 60px;
  width: 100px;
  right: 20px;
  overflow: hidden;
  background: url(/images/header-ape.svg) no-repeat 0px 10px;
  opacity: 0.2;
  z-index: 0;
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

const BackWrapper = styled.div`
  z-index: 1;
  display: flex;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const BackArrow = styled.img`
  cursor: pointer;
  margin-right: 20px;
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
  useFetchIazos()
  const { id }: { id: string } = useParams()
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
  } = isInitialized && iazo
  const { tokenImage, website } = isInitialized && socialInfo
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNavWrapper>
            <TopNavMonkey />
            <Link to="/ss-iao">
              <BackWrapper>
                <BackArrow src="/images/left-arrow.svg" />
                <StyledText color="white">Back to SS-IAO Launchpad</StyledText>
              </BackWrapper>
            </Link>
          </TopNavWrapper>
          <WarningWrapper>
            <StyledHeader fontSize="10px"> Safety Alert</StyledHeader>
            <StyledText>
              Warning: SS-IAOs are NOT ApeSwap endorsed or yet official ApeSwap partners. Always DYOR. Be sure to read
              our medium articles on best DYOR Practices before aping in and talk with your fellow Apes!
            </StyledText>
            <br />
            <StyledText>
              This is a fully decentralized and open launchpad. Anyone can create an SS-IAO, under any token name with
              any capabilities. There is also no control of what happens post launch (projects could leave with your
              money, have an unlimited mint function to extract all liquidity, or any other malicious activity).
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
