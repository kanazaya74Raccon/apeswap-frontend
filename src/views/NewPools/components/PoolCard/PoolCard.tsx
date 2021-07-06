import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Text, Flex } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import useReward from 'hooks/useReward'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import CompoundModal from '../CompoundModal'
import StakeAction from './CardActions/StakeActions'
import CardTitle from '../CardTitle'
import Card from '../Card'
import OldSyrupTitle from '../OldSyrupTitle'
import HarvestButton from '../HarvestButton'
import CardFooter from '../CardFooter'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export interface PoolWithStakeValue extends Pool {
  apr?: BigNumber
  staked?: BigNumber
  addStakedUrl?: string
}

interface HarvestProps {
  pool: PoolWithStakeValue
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

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apr,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
    displayDecimals,
  } = pool

  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE

  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress[CHAIN_ID])
  const { account } = useWeb3React()
  const block = useBlock()
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const allowance = new BigNumber(userData?.allowance || 0)

  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance
  const comingSoon = blocksUntilStart > 0 && block > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

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
        stakingTokenAddress={stakingTokenAddress[56]}
        sousId={sousId}
        apr={apr}
        poolAPR={apr.toNumber().toFixed(2).toString()}
        showExpandableSection={showExpandableSection}
      />
      {isFinished && sousId !== 0 && <PoolFinishedSash />}
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
        />
      </ExpandingWrapper>
    </PCard>
  )
}


export default PoolCard
