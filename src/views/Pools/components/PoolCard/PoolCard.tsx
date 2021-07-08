import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import  DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import StakeAction from './CardActions/StakeActions'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export interface PoolWithStakeValue extends Pool {
  apr?: BigNumber
  staked?: BigNumber
  addStakedUrl?: string
  stakedTokenPrice?: number
  rewardTokenPrice?: number
}

interface HarvestProps {
  pool: PoolWithStakeValue
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

const PoolCard: React.FC<HarvestProps> = ({ pool, removed }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    apr,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    rewardTokenPrice,
    stakedTokenPrice,
    projectLink,
    contractAddress,
  } = pool

  const { account } = useWeb3React()
  const block = useBlock()
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)

  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const pendingReward = userData?.pendingReward

  const toggleExpand = () => {
    setShowExpandableSection(!showExpandableSection)
  }

  return (
    <PCard onClick={toggleExpand}>
      <CardHeading
        pool={pool}
        stakeToken={stakingTokenName}
        earnToken={tokenName}
        earnTokenImage={image}
        stakingTokenAddress={stakingTokenAddress[CHAIN_ID]}
        sousId={sousId}
        apr={apr}
        poolAPR={apr.toNumber().toFixed(2)}
        showExpandableSection={showExpandableSection}
        removed={removed}
        rewardTokenPrice={rewardTokenPrice}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <Flex>
          <StakeAction
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isApproved={isApproved}
            isStaked={accountHasStakedBalance}
          />
        </Flex>
        <DetailsSection
          totalStaked={getBalanceNumber(totalStaked)}
          personalValueStaked={getBalanceNumber(stakedBalance)}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          rewardTokenPrice={rewardTokenPrice}
          lpLabel={tokenName}
          addLiquidityUrl="https://app.apeswap.finance/swap"
          stakedTokenPrice={stakedTokenPrice}
          pendingReward={pendingReward}
          projectSite={projectLink}
          bscScanAddress={`https://bscscan.com/address/${contractAddress[CHAIN_ID]}`}
        />
      </ExpandingWrapper>
    </PCard>
  )
}

export default PoolCard
