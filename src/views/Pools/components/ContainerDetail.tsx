import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import { FarmPool } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import getTimePeriods from 'utils/getTimePeriods'
import { BSC_BLOCK_TIME } from 'config'
import Detail from './Detail'

interface RewardToken {
  address?: any
  decimals?: number
  symbol?: string
}
export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
  multiplier?: string
  totalStaked?: number
  personalValueStaked?: number
  pid?: number
  blocksRemaining?: number
  isFinished?: boolean
  blocksUntilStart?: number
  stakedTokenPrice?: number
  rewardTokenPrice?: number
  pendingReward?: BigNumber
  projectLink?: string
  tokenDecimals?: number
  type?: string
  rewardToken?: RewardToken
  imageToken?: string
}

const WrapperCard = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
`
const WrapperTable = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 340px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 401px;
  }
`

const InfoContainer = styled.div`
  width: 285px;
`

const ContainerDetail: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  lpLabel,
  addLiquidityUrl,
  personalValueStaked,
  totalStaked,
  blocksRemaining,
  blocksUntilStart,
  stakedTokenPrice,
  rewardTokenPrice,
  pendingReward,
  projectLink,
  tokenDecimals,
  type,
  rewardToken,
  imageToken,
}) => {
  const totalStakedFormated = totalStaked
    ? `${Number(totalStaked).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : '-'

  const earnings = new BigNumber(pendingReward || 0)
  const rawEarningsBalance = getBalanceNumber(earnings, tokenDecimals)
  const totalUserStaked = personalValueStaked > 0 ? Number((personalValueStaked * stakedTokenPrice).toFixed(2)) : 0

  const timeUntilStart = getTimePeriods(blocksUntilStart * BSC_BLOCK_TIME)
  const timeUntilEnd = getTimePeriods(blocksRemaining * BSC_BLOCK_TIME)

  return (
    <>
      {type === 'card' && (
        <WrapperCard>
          <Detail
            blocksUntilStart={blocksUntilStart}
            timeUntilStart={timeUntilStart}
            blocksRemaining={blocksRemaining}
            timeUntilEnd={timeUntilEnd}
            totalStakedFormated={totalStakedFormated}
            addLiquidityUrl={addLiquidityUrl}
            lpLabel={lpLabel}
            totalUserStaked={totalUserStaked}
            rawEarningsBalance={rawEarningsBalance}
            rewardTokenPrice={rewardTokenPrice}
            bscScanAddress={bscScanAddress}
            projectLink={projectLink}
            type={type}
            rewardToken={rewardToken}
            imageToken={imageToken}
          />
        </WrapperCard>
      )}
      {type === 'table' && (
        <WrapperTable>
          <Flex>
            <InfoContainer>
              <Detail
                blocksUntilStart={blocksUntilStart}
                timeUntilStart={timeUntilStart}
                blocksRemaining={blocksRemaining}
                timeUntilEnd={timeUntilEnd}
                totalStakedFormated={totalStakedFormated}
                addLiquidityUrl={addLiquidityUrl}
                lpLabel={lpLabel}
                totalUserStaked={totalUserStaked}
                rawEarningsBalance={rawEarningsBalance}
                rewardTokenPrice={rewardTokenPrice}
                bscScanAddress={bscScanAddress}
                projectLink={projectLink}
                type={type}
                rewardToken={rewardToken}
                imageToken={imageToken}
              />
            </InfoContainer>
          </Flex>
        </WrapperTable>
      )}
    </>
  )
}

export default ContainerDetail
