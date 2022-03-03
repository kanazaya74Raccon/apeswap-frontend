import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/formatBalance'
import { useBlock } from 'state/block/hooks'
import { Pool } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import UnlockButtonSquare from 'components/UnlockButtonSquare'
import PoolHeading from './PoolHeading'
import CellLayout from './CellLayout'
import Details from './Details'
import Earned from './Earned'
import Apr from './Apr'
import Staked from './Liquidity'
import HarvestActions from './CardActions/HarvestActions'
import ApprovalAction from './CardActions/ApprovalAction'
import StakeAction from './CardActions/StakeActions'
import ContainerDetail from '../ContainerDetail'

interface HarvestProps {
  pool: Pool
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
  background-color: ${({ theme }) => theme.colors.navbar};
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
    left: 607px;
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
    flex-grow: 1;
    flex-basis: 0;
  }
`

const StyledUnlockButton = styled(UnlockButtonSquare)`
  font-weight: 600;
`

const PoolTable: React.FC<HarvestProps> = ({ pool, removed }) => {
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
  const { currentBlock } = useBlock()
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const toggleActionPanel = (e) => {
    if (e.target?.classList.contains('noClick')) return
    setActionPanelToggled(!actionPanelToggled)
  }
  const chainId = useNetworkChainId()

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const rawEarningsBalance = getBalanceNumber(earnings, tokenDecimals)

  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const needsApproval = !allowance.gt(0)
  const isCompound = sousId === 0
  const isLoading = !pool.userData

  const totalDollarAmountStaked = getBalanceNumber(totalStaked) * stakingToken?.price

  const cardHeaderButton = () => {
    if (!account) {
      return <StyledUnlockButton size="sm" />
    }
    if (needsApproval) {
      return (
        <ApprovalAction
          stakingTokenContractAddress={stakingToken.address[chainId]}
          sousId={sousId}
          isLoading={isLoading}
        />
      )
    }
    if (!needsApproval && !accountHasStakedBalance && !pool.emergencyWithdraw) {
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
        emergencyWithdraw={pool.emergencyWithdraw}
      />
    )
  }

  return (
    <StyledTr onClick={toggleActionPanel}>
      <StyledFlex alignItems="center">
        <CellLayout>
          <PoolHeading
            stakeToken={stakingToken?.symbol}
            earnToken={tokenName}
            earnTokenImage={image}
            isLp={pool?.lpStaking}
            isEarnTokenLp={pool?.isEarnTokenLp}
          />
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
            poolApr={removed ? '0' : apr?.toFixed(2)}
            apr={new BigNumber(apr)}
            rewardTokenPrice={rewardToken?.price}
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
          <ContainerDetail
            totalStaked={getBalanceNumber(totalStaked)}
            personalValueStaked={getBalanceNumber(stakedBalance)}
            blocksRemaining={blocksRemaining}
            isFinished={isFinished}
            blocksUntilStart={blocksUntilStart}
            stakedTokenPrice={stakingToken?.price}
            rewardTokenPrice={rewardToken?.price}
            pendingReward={userData?.pendingReward}
            lpLabel={stakingToken?.symbol}
            addLiquidityUrl={
              stakingToken.symbol === `GNANA` ? `https://apeswap.finance/gnana` : `https://apeswap.finance/swap`
            }
            projectLink={projectLink}
            bscScanAddress={`https://bscscan.com/address/${contractAddress[chainId]}`}
            tokenDecimals={tokenDecimals}
            type="table"
            rewardToken={rewardToken}
            imageToken={image}
          />
        </>
      )}
    </StyledTr>
  )
}

export default PoolTable
