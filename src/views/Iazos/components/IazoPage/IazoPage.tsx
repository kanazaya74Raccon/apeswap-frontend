import React from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '@apeswapfinance/uikit'
import { useFetchIazo, useIazos } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import TokenInfoCard from './TokenInfoCard'
import SaleStatus from './SaleStatus/SaleStatus'
import SaleInfo from './SaleInfo/SaleInfo'
import Header from '../Header'
import TopNav from '../TopNav'
import { PageWrapper, LaunchPadWrapper, BeforeSaleWrapper, SpinnerHolder } from './styles'

const IazoPage: React.FC = () => {
  const { id }: { id: string } = useParams()
  useFetchIazo(id)
  const { iazos, isInitialized } = useIazos()
  const { t } = useTranslation()
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
