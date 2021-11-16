import React, { useState } from 'react'
import { Card, CardBody, Heading, Text, Flex, Image, useMatchBreakpoints } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { FarmPool } from 'state/types'
import useI18n from 'hooks/useI18n'
import { farmsConfig } from 'config/constants'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { useAllPools } from 'state/hooks'
import DetailsSection from './DetailsSection'
import CardValue from './CardValue'

export interface PoolStatsProps {
  data?: FarmPool
  forceDetails?: boolean
  type: string
}

export interface CardProps {
  type?: string
  isActive?: boolean
  isSuccess?: boolean
}

const StyledPoolStats = styled(Card)<CardProps>`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`
const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const IconImage = styled(Image)`
  align: center;
  width: 40px;
  height: 40px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 70px;
    height: 70px;
  }
`

const IconQuoteToken = styled(Image)`
  align: center;
  width: 20px;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 35px;
    height: 35px;
  }
`

const IconArrow = styled(Image)`
  align: center;
  width: 5px;
  height: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 10px;
    height: 10px;
  }
`

const StyledBackground = styled.div`
  width: 150px;
  height: 110px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  background: rgb(255, 179, 0, 0.4);
`

const CardStats: React.FC<PoolStatsProps> = ({ data, type, forceDetails = false }) => {
  const TranslateString = useI18n()
  const { isXl: isDesktop } = useMatchBreakpoints()
  const pools = useAllPools()
  const bscScanAddress = `https://bscscan.com/address/${data.address}`
  let farmName = data.name
    .replace(/[\])}[{(]/g, '')
    .replace('WBNB', 'BNB')
    .toUpperCase()
  let farmImage = type !== 'pool' && farmsConfig.find((farm) => farm.pid === data.pid).image
  const filteredFarm = type !== 'pool' && farmsConfig.find((farm) => farm.pid === data.pid)
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  if (type === 'pool') {
    const currentPool = pools.find((pool) => pool.sousId === data.id) || pools[0]
    farmImage = currentPool?.image
    farmName = `${currentPool.stakingToken.symbol} ➩ ${currentPool.tokenName}`
  }

  return (
    <StyledPoolStats key={farmName} isActive={type === 'pool'} isSuccess={type === 'farm'}>
      <CardBody>
        <Flex justifyContent="flex-start" alignItems="center" marginBottom="12px">
          {type === 'pool' ? (
            <Image
              src={type === 'pool' ? `/images/tokens/${farmImage}` : `/images/farms/${farmImage}.svg`}
              alt={farmImage}
              width={64}
              height={64}
            />
          ) : (
            <StyledBackground>
              <IconImage
                src={`/images/tokens/${farmImage || `${filteredFarm?.tokenSymbol}.svg`}`}
                alt={filteredFarm?.tokenSymbol}
                width={50}
                height={50}
                marginLeft="7.5px"
              />
              <IconQuoteToken
                src={`/images/tokens/${filteredFarm?.quoteTokenSymbol}.svg`}
                alt={filteredFarm?.quoteTokenSymbol}
                width={30}
                height={30}
                marginLeft={isDesktop ? '-20px' : '-13px'}
                marginTop={isDesktop ? '45px' : '30px'}
              />
              <IconArrow
                src="/images/arrow.svg"
                alt="arrow"
                width={10}
                height={10}
                marginRight="8px"
                marginLeft="8px"
              />
              <IconImage src="/images/tokens/banana.svg" alt="banana" width={50} height={50} marginRight="7.5px" />
            </StyledBackground>
          )}
          <Heading fontSize="16px" mb="24px" style={{ textAlign: 'center', marginLeft: 20 }}>
            {TranslateString(534, `${farmName}`)}
          </Heading>
        </Flex>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Your TVL')}</Text>
          <CardValue fontSize="14px" decimals={2} value={data.stakedTvl} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Your APR')}</Text>
          <CardValue fontSize="14px" decimals={2} value={data.apr * 100} suffix="%" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Your Pending Rewards')}</Text>
          <div>
            <CardValue fontSize="14px" decimals={2} value={data.pendingReward} />
            <CardValue fontSize="10px" decimals={2} value={data.pendingRewardUsd} prefix="($" suffix=")" />
          </div>
        </Row>
        {!forceDetails && (
          <ExpandableSectionButton
            onClick={() => setShowExpandableSection(!showExpandableSection)}
            expanded={showExpandableSection}
          />
        )}
        <ExpandingWrapper expanded={showExpandableSection || forceDetails}>
          <DetailsSection farmStats={data} bscScanAddress={bscScanAddress} />
        </ExpandingWrapper>
      </CardBody>
    </StyledPoolStats>
  )
}

export default CardStats
