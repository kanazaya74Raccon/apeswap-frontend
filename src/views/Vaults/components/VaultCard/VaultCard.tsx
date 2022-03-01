import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { getBalanceNumber } from 'utils/formatBalance'
import { Vault } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'

export interface VaultWithStakedValue extends Vault {
  apr?: BigNumber
  staked?: BigNumber
  addStakedUrl?: string
  stakedTokenPrice?: number
  rewardTokenPrice?: number
}

interface HarvestProps {
  vault: VaultWithStakedValue
  removed: boolean
}

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white3};
`

const PCard = styled.div`
  align-self: baseline;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  text-align: center;
  max-width: 530px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.navbar};
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`

const VaultCard: React.FC<HarvestProps> = ({ vault, removed }) => {
  const { userData, image, totalStaked } = vault

  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const chainId = useNetworkChainId()

  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const lpLabel = vault.isPair ? `${vault.token0.symbol}-${vault.token1.symbol}` : vault.token0.symbol

  const toggleExpand = () => {
    setShowExpandableSection(!showExpandableSection)
  }

  return (
    <PCard onClick={toggleExpand}>
      <CardHeading
        vault={vault}
        stakingTokenAddress={vault?.stakeTokenAddress}
        apyDaily={vault?.apy?.daily?.toFixed(2)}
        apyYearly={vault?.apy?.yearly?.toFixed(2)}
        showExpandableSection={showExpandableSection}
        removed={removed}
        image={image}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          totalStaked={totalStaked}
          totalStakedRaw={getBalanceNumber(new BigNumber(vault?.strategyPairBalance)).toString()}
          personalValueStaked={getBalanceNumber(stakedBalance)}
          lpLabel={lpLabel}
          addLiquidityUrl="https://apeswap.finance/swap"
          blockExplorer={`${BLOCK_EXPLORER[chainId]}/address/${vault?.strat}`}
          stakedTokenPrice={vault?.stakeTokenPrice}
          withdrawFee={vault?.withdrawFee}
          depositFee={vault?.depositFee}
        />
      </ExpandingWrapper>
    </PCard>
  )
}

export default VaultCard
