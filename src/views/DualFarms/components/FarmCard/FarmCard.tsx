import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { useNetworkChainId, useStats } from 'state/hooks'
import { DualFarm, Farm } from 'state/types'
import { FarmStyles } from 'config/constants/types'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'

export interface FarmWithStakedValue extends Farm {
  apr?: BigNumber
  liquidity?: BigNumber
  addLiquidityUrl?: string
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const Accent = styled.div`
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FeaturedCardAccent = styled(Accent)`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
`

const DeprecatedCardAccent = styled(Accent)`
  background: #ca3e33;
`

const WarningCardAccent = styled(Accent)`
  background: #c57415;
`

const InactiveCardAccent = styled(Accent)`
  background: grey;
`

const styles: FarmStyles = {
  deprecated: DeprecatedCardAccent,
  warning: WarningCardAccent,
  featured: FeaturedCardAccent,
  inactive: InactiveCardAccent,
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
  const chainId = useNetworkChainId()
  const farmStats = yourStats?.stats?.farms
  const filteredFarmStats = farmStats?.find((item) => item.pid === farm.pid)
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const farmImage = `${farm?.stakeTokens?.token0?.symbol} ${farm?.stakeTokens?.token1?.symbol}`

  const totalValueFormated = farm?.totalStaked
    ? `$${Number(farm?.totalStaked).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = `${farm?.stakeTokens?.token0?.symbol}-${farm?.stakeTokens?.token1?.symbol}`
  const farmAPR = farm?.apr

  // const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
  // const liquidityUrlPathParts = getLiquidityUrlPathParts({
  //   quoteTokenAdresses,
  //   quoteTokenSymbol,
  //   tokenAddresses,
  //   chainId,
  // })
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
