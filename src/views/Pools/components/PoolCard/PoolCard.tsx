import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import CardHeading from './CardHeading'
import StakeAction from './CardActions/StakeActions'
import ContainerDetail from '../ContainerDetail'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

interface HarvestProps {
  pool: Pool
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
    stakingToken,
    apr,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    rewardToken,
    projectLink,
    contractAddress,
    tokenDecimals,
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
  const toggleExpand = (e) => {
    if (e.target?.classList.contains('noClick')) return
    setShowExpandableSection(!showExpandableSection)
  }

  return (
    <PCard onClick={toggleExpand}>
      <CardHeading
        pool={pool}
        stakeToken={stakingToken.symbol}
        earnToken={tokenName}
        earnTokenImage={image}
        stakingTokenAddress={stakingToken.address[CHAIN_ID]}
        sousId={sousId}
        apr={new BigNumber(apr)}
        poolAPR={apr?.toFixed(2)}
        showExpandableSection={showExpandableSection}
        removed={removed}
        rewardTokenPrice={rewardToken?.price}
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
        <ContainerDetail
          totalStaked={getBalanceNumber(totalStaked)}
          personalValueStaked={getBalanceNumber(stakedBalance)}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          rewardTokenPrice={rewardToken?.price}
          lpLabel={stakingToken.symbol}
          addLiquidityUrl={
            stakingToken.symbol === `GNANA` ? `https://apeswap.finance/gnana` : `https://app.apeswap.finance/swap`
          }
          stakedTokenPrice={stakingToken?.price}
          pendingReward={pendingReward}
          projectLink={projectLink}
          bscScanAddress={`https://bscscan.com/address/${contractAddress[CHAIN_ID]}`}
          tokenDecimals={tokenDecimals}
          type="card"
          rewardToken={rewardToken}
          imageToken={image}
        />
      </ExpandingWrapper>
    </PCard>
  )
}

export default PoolCard
