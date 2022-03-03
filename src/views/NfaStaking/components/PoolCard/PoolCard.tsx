import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import { useBlock } from 'state/block/hooks'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/formatBalance'
import { NfaStakingPool } from 'state/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import StakeAction from './CardActions/StakeActions'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

interface HarvestProps {
  pool: NfaStakingPool
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
  overflow: hidden;
`

const PoolCard: React.FC<HarvestProps> = ({ pool, removed }) => {
  const { sousId, tier, apr, totalStaked, startBlock, endBlock, userData, rewardToken, contractAddress } = pool
  console.log(endBlock)
  const { account } = useWeb3React()
  const { currentBlock } = useBlock()
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const allowance = userData?.allowance
  const stakedNfas = userData?.stakedNfas

  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance
  const pendingReward = userData?.pendingReward
  const toggleExpand = () => {
    setShowExpandableSection(!showExpandableSection)
  }
  return (
    <PCard onClick={toggleExpand}>
      <CardHeading
        pool={pool}
        earnToken={rewardToken.symbol}
        sousId={sousId}
        apr={new BigNumber(apr)}
        poolAPR={apr?.toFixed(2)}
        showExpandableSection={showExpandableSection}
        removed={removed}
        rewardTokenPrice={rewardToken?.price}
        tier={tier}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <Flex>
          <StakeAction
            pool={pool}
            stakingTokenBalance={stakingTokenBalance}
            stakedBalance={stakedBalance}
            isApproved={isApproved}
            isStaked={accountHasStakedBalance}
            tier={tier}
            stakedNfas={stakedNfas}
          />
          <></>
        </Flex>
        <DetailsSection
          totalStaked={getBalanceNumber(totalStaked, 0)}
          personalValueStaked={getBalanceNumber(stakedBalance, 0)}
          blocksRemaining={blocksRemaining}
          blocksUntilStart={blocksUntilStart}
          rewardTokenPrice={rewardToken?.price}
          addLiquidityUrl="https://apeswap.finance/swap"
          pendingReward={pendingReward}
          bscScanAddress={`https://bscscan.com/address/${contractAddress[CHAIN_ID]}`}
        />
      </ExpandingWrapper>
    </PCard>
  )
}

export default PoolCard
