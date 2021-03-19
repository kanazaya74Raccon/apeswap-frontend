import React from 'react'
import { Card, CardBody, Heading, Text, Link, Flex, Image } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { FarmPool } from 'state/types'
import useI18n from 'hooks/useI18n'
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

const CardStats: React.FC<PoolStatsProps> = ({ data, type }) => {
  const TranslateString = useI18n()
  const bscScanAddress = `https://bscscan.com/address/${data.address}`
  const farmName = data.lpSymbol.replace(/[\])}[{(]/g, '')
  const farmImage = farmName.split(' ')[0].toLocaleLowerCase()

  return (
    <StyledPoolStats key={farmName} isActive={type === 'pool'} isSuccess={type === 'farm'}>
      <CardBody>
        <Flex justifyContent="flex-start" alignItems="center">
          <Image
            src={type === 'pool' ? `/images/tokens/${farmImage}.svg` : `/images/farms/${farmImage}.svg`}
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
        <Flex justifyContent="center">
          <Link external href={bscScanAddress} bold={false}>
            {TranslateString(356, 'View on BscScan')}
          </Link>
        </Flex>
      </CardBody>
    </StyledPoolStats>
  )
}

export default CardStats
