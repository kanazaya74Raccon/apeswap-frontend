import React from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import { Text, Spinner } from '@apeswapfinance/uikit'
import { useFetchIazos, useIazos } from 'state/hooks'
import TokenInfoCard from './TokenInfoCard'
import SaleStatus from './SaleStatus/SaleStatus'
import SaleInfo from './SaleInfo/SaleInfo'

const PageWrapper = styled.div`
  display: none;
  display: flex;
  padding-bottom: 200px;
  margin-bottom: 100px;
  justify-content: center;
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  height: 251px;
  width: 100%;
  padding-top: 36px;
  background-image: ${(props) =>
    props.theme.isDark ? 'url(/images/iazo-banner-dark.svg)' : 'url(/images/iazo-banner-light.svg)'};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
  }
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
  width: 856px;
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  padding-left: 30px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(161, 101, 82, 1)')};
  z-index: 0;
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

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 60px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`

const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  font-size: 45px;
  font-style: normal;
  line-height: 52px;
`

const BackWrapper = styled.div`
  z-index: 1;
  display: flex;
`

const StyledText = styled(Text)`
  font-family: Poppins;
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
  height: 235px;
  width: 796px;
  left: 411px;
  top: 502px;
  background-color: rgba(223, 65, 65, 0.1);
  border-radius: 10px;
  margin-top: 20px;
  z-index: 0;
  padding: 50px;
`

const BeforeSaleWrapper = styled.div`
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 10px;
  width: 796px;
  margin-top: 40px;
  margin-bottom: 40px;
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
  const { iazoToken, timeInfo, hardcap, baseToken, status, iazoContractAddress, socialInfo, tokenPrice } =
    isInitialized && iazo
  const { tokenImage, website } = isInitialized && socialInfo
  return (
    <>
      <Header />
      <PageWrapper>
        <LaunchPadWrapper>
          <TopNavWrapper>
            <TopNavMonkey />
            <Link to="/iazos">
              <BackWrapper>
                <BackArrow src="/images/left-arrow.svg" />
                <StyledText color="white">Back to Ape Launchpad</StyledText>
              </BackWrapper>
            </Link>
          </TopNavWrapper>
          <WarningWrapper>
            <StyledHeader fontSize="10px"> Safety Alert</StyledHeader>
            <br />
            <StyledText>
              This is a decentralised and open presale platform. Anyone can create and name a presale freely including
              fake versions of existing tokens. It is also possible for developers of a token to mint near infinite
              tokens and dump them on locked liquidity. Please do your own research before using this platform.
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
                />
                <SaleStatus
                  timeInfo={timeInfo}
                  hardcap={hardcap}
                  baseToken={baseToken}
                  status={status}
                  iazoAddress={iazoContractAddress}
                  tokenPrice={tokenPrice}
                  iazoToken={iazoToken}
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
