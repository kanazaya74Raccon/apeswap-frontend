import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useStats } from 'state/hooks'
import { DualFarm, Farm } from 'state/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Farm {
  apr?: BigNumber
  liquidity?: BigNumber
  addLiquidityUrl?: string
}

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  max-width: 530px;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : '#faf9fa')};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
`

const StyledContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: DualFarm
  removed: boolean
  bananaPrice?: BigNumber
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, bananaPrice, account }) => {
  const yourStats = useStats()
  const farmStats = yourStats?.stats?.farms
  const filteredFarmStats = farmStats?.find((item) => item.pid === farm.pid)
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const farmImage = `${farm?.stakeTokens?.token0?.symbol} ${farm?.stakeTokens?.token1?.symbol}`

  const totalValueFormated = farm?.totalStaked
    ? `$${Number(farm?.totalStaked).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
  const farmAPR = farm?.apr

  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/`

  const toggleExpand = () => {
    setShowExpandableSection(!showExpandableSection)
  }

  return (
    <FCard onClick={toggleExpand}>
      <CardHeading
        lpLabel={lpLabel}
        farmImage={farmImage}
        tokenSymbol={lpLabel}
        stakeTokens={farm?.stakeTokens}
        rewardTokens={farm?.rewardTokens}
        pid={farm.pid}
        lpSymbol={lpLabel}
        apr={new BigNumber(farm?.apr)}
        addLiquidityUrl={addLiquidityUrl}
        bananaPrice={bananaPrice}
        farmAPR={farmAPR?.toFixed(2)}
        removed={removed}
        showExpandableSection={showExpandableSection}
        farm={farm}
      />
      <StyledContainer>
        <ExpandingWrapper expanded={showExpandableSection}>
          <CardActionsContainer
            farm={farm}
            account={account}
            addLiquidityUrl={addLiquidityUrl}
            totalValueFormated={totalValueFormated}
          />
          <DetailsSection
            removed={removed}
            bscScanAddress={`https://bscscan.com/address/${farm?.stakeTokenAddress}`}
            totalValueFormated={totalValueFormated}
            lpLabel={lpLabel}
            addLiquidityUrl={addLiquidityUrl}
            farmStats={filteredFarmStats}
            multiplier={farm.multiplier}
            liquidity={new BigNumber(farm?.totalStaked)}
            pid={farm.pid}
            farm={farm}
          />
        </ExpandingWrapper>
      </StyledContainer>
    </FCard>
  )
}

export default FarmCard
