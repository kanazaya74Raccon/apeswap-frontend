import React, { useState } from 'react'
import { Card, CardBody, Heading, Text, Flex, Image } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { FarmPool } from 'state/types'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { useAllPools } from 'state/hooks'
import DetailsSection from './DetailsSection'
import CardValue from './CardValue'

export interface PoolStatsProps {
  data?: FarmPool
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

const CardStats: React.FC<PoolStatsProps> = ({ data, type }) => {
  const TranslateString = useI18n()
  const pools = useAllPools()
  const bscScanAddress = `https://bscscan.com/address/${data.address}`
  const farmName = data.name.replace(/[\])}[{(]/g, '').replace('WBNB', 'BNB')
  let farmImage = farmName.split(' ')[0].toLocaleLowerCase()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  if (type === 'pool') {
    const currentPool = pools.find(pool => pool.tokenName === data.rewardTokenSymbol)
    farmImage = currentPool.image
  }

  return (
    <StyledPoolStats key={farmName} isActive={type === 'pool'} isSuccess={type === 'farm'}>
      <CardBody>
        <Flex justifyContent="flex-start" alignItems="center">
          <Image
            src={type === 'pool' ? `/images/tokens/${farmImage}` : `/images/farms/${farmImage}.svg`}
            alt={farmImage}
            width={64}
            height={64}
          />
          <Heading size="lg" mb="24px" style={{ textAlign: 'center', marginLeft: 20 }}>
            {TranslateString(534, `Your ${farmName} Stats`)}
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
          <CardValue fontSize="14px" decimals={2} value={data.pendingReward} />
        </Row>
        <ExpandableSectionButton
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
        <ExpandingWrapper expanded={showExpandableSection}>
          <DetailsSection farmStats={data} bscScanAddress={bscScanAddress} />
        </ExpandingWrapper>
      </CardBody>
    </StyledPoolStats>
  )
}

export default CardStats
