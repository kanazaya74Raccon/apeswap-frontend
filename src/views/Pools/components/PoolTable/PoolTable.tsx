import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { Pool } from 'state/types'
import PoolHeading from './PoolHeading'
import CellLayout from './CellLayout'
import Details from './Details'
import Earned from './Earned'
import Apr from './Apr'
import ActionPanel from './ActionPanel'
import Staked from './Liquidity'
import HarvestActions from './CardActions/HarvestActions'
import ApprovalAction from './CardActions/ApprovalAction'
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

const StyledTr = styled.div`
  cursor: pointer;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => (theme.isDark ? '#27262c' : '#faf9fa')};
`

const APRContainer = styled.div`
  position: absolute;
  left: 340px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 401px;
  }
`

const LiquidtyContainer = styled.div`
  position: absolute;
  left: 480px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 587px;
  }
`

const CellInner = styled.div`
  padding: 0px 0px;
  display: flex;
  width: auto;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 0px;
  }
`

const ArrowContainer = styled(Flex)`
  position: absolute;
  right: 23px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  position: relative;
`

const EarnedContainer = styled.div`
  position: absolute;
  left: 660px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 803px;
  }
`

const StakeContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    border: 1px solid red;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const PoolTable: React.FC<HarvestProps> = ({ pool, removed }) => {
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
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const rawEarningsBalance = getBalanceNumber(earnings)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const needsApproval = !allowance.gt(0)
  const isCompound = sousId === 0
  const isLoading = !pool.userData

  
  const totalDollarAmountStaked = getBalanceNumber(totalStaked) * stakedTokenPrice


  const cardHeaderButton = () => {
    if (!account) {
      return <UnlockButton />
    }
    if (needsApproval) {
      return (
        <ApprovalAction stakingContractAddress={stakingTokenAddress[CHAIN_ID]} sousId={sousId} isLoading={isLoading} />
      )
    }
    if (!needsApproval && !accountHasStakedBalance) {
      return (
        <StakeAction
          pool={pool}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
        />
      )
    }
    return (
      <HarvestActions
        earnings={earnings}
        sousId={sousId}
        isLoading={isLoading}
        tokenDecimals={pool.tokenDecimals}
        compound={isCompound}
      />
    )
  }

  return (
    <StyledTr onClick={toggleActionPanel}>
      <StyledFlex alignItems="center">
        <CellLayout>
          <PoolHeading stakeToken={stakingTokenName} earnToken={tokenName} earnTokenImage={image} />
        </CellLayout>
        <ArrowContainer justifyContent="center" alignItems="center">
          {cardHeaderButton()}
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelToggled} />
            </CellLayout>
          </CellInner>
        </ArrowContainer>
        <APRContainer>
          <Apr
            poolApr={removed ? '0' : apr.toNumber().toFixed(2)}
            apr={apr}
            rewardTokenPrice={rewardTokenPrice}
            earnToken={tokenName}
          />
        </APRContainer>
        <LiquidtyContainer>
          <Staked staked={totalDollarAmountStaked} />
        </LiquidtyContainer>
        <EarnedContainer>
          <Earned earnings={rawEarningsBalance} />
        </EarnedContainer>
      </StyledFlex>
      {actionPanelToggled && (
        <>
          <StakeContainer>
            <StakeAction
              pool={pool}
              stakingTokenBalance={stakingTokenBalance}
              stakedBalance={stakedBalance}
              isApproved={isApproved}
              isStaked={accountHasStakedBalance}
            />
          </StakeContainer>
          <ActionPanel
            totalStaked={getBalanceNumber(totalStaked)}
            personalValueStaked={getBalanceNumber(stakedBalance)}
            blocksRemaining={blocksRemaining}
            isFinished={isFinished}
            blocksUntilStart={blocksUntilStart}
            stakedTokenPrice={stakedTokenPrice}
            rewardTokenPrice={rewardTokenPrice}
            pendingReward={userData?.pendingReward}
            lpLabel={tokenName}
            addLiquidityUrl="https://app.apeswap.finance/swap"
            projectLink={projectLink}
            bscScanAddress={`https://bscscan.com/address/${contractAddress[CHAIN_ID]}`}
          />
        </>
      )}
    </StyledTr>
  )
}

export default PoolTable
