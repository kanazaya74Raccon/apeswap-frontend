import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { Flex } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { Vault } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import StakeAction from './CardActions/StakeActions'

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
`

const PCard = styled.div`
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

const VaultCard: React.FC<HarvestProps> = ({ vault, removed }) => {
  const {
    pid,
    strat,
    stakeTokenAddress,
    token0,
    token1,
    totalFees,
    withdrawFee,
    burning,
    userData,
    isPair,
    image,
    totalStaked,
  } = vault

  const { account } = useWeb3React()
  const block = useBlock()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const chainId = useNetworkChainId()

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.tokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  // const earnings = new BigNumber(userData?.pendingReward || 0)
  // const rawEarningsBalance = getBalanceNumber(earnings, tokenDecimals)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const needsApproval = !allowance.gt(0)
  const isLoading = !userData
  const lpLabel = vault.isPair ? `${vault.token0.symbol}-${vault.token1.symbol}` : vault.token0.symbol
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()
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
          addLiquidityUrl="https://app.apeswap.finance/swap"
          blockExplorer={`${BLOCK_EXPLORER[chainId]}/address/${vault?.strat}`}
          stakedTokenPrice={vault?.stakeTokenPrice}
        />
      </ExpandingWrapper>
    </PCard>
  )
}

export default VaultCard
