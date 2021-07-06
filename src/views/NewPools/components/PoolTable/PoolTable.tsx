import BigNumber from 'bignumber.js'
import React, { useCallback, useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Text, Flex, useMatchBreakpoints } from '@apeswapfinance/uikit'
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

const EarnedMobileCell = styled.div`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.div`
  padding-top: 16px;
  padding-bottom: 24px;
`

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

const Container = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
  position: relative;

  transform: translateY(-85px);
  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
  }
`

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTd2 = styled.div`
  border-right: #faf9fa;
  border-right-style: solid;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
`

const StyledTable = styled.div`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background-color: ${({ theme }) => (theme.isDark ? 'black' : '#faf9fa')};
`

const TableContainer = styled.div`
  position: relative;
`

const StyledButton = styled(Button)`
  max-width: 100px;
  width: 100%;
`

const SubTitle = styled(Text)`
  margin-bottom: 24px;
`
const StyledContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
`

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

const FarmMobileCell = styled.div`
  padding-top: 24px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  position: relative;
`
const StyledTd1 = styled.div`
  border-radius: 20px 0 0 20px;
  -moz-border-radius: 20px 0 0 20px;
`

const EarnedContainer = styled.div`
  position: absolute;
  left: 660px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 803px;
  }
`

const PoolTable: React.FC<HarvestProps> = ({ pool }) => {
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

  const rewardRefUnstake = useRef(null)
  const rewardRefStake = useRef(null)
  const rewardRefApeHarder = useRef(null)
  const rewardRefWuzzOut = useRef(null)
  const rewardRefReward = useRef(null)
  const tableWrapperEl = useRef<HTMLDivElement>(null)

  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress[CHAIN_ID])
  const { account } = useWeb3React()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const onStake = useReward(rewardRefStake, useSousStake(sousId, isBnbPool).onStake)
  const onApeHarder = useReward(rewardRefApeHarder, useSousStake(sousId, isBnbPool).onStake)
  const onUnstake = useReward(rewardRefUnstake, useSousUnstake(sousId).onUnstake)
  const onWuzzOut = useReward(rewardRefWuzzOut, useSousUnstake(sousId).onUnstake)
  const onReward = useReward(rewardRefWuzzOut, useSousHarvest(sousId, isBnbPool).onReward)
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const { isXl, isXs } = useMatchBreakpoints()

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const rawEarningsBalance = getBalanceNumber(earnings)

  const blocksUntilStart = Math.max(startBlock - block, 0)
  const blocksRemaining = Math.max(endBlock - block, 0)
  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isLoading = !pool.userData
  const isCompound = sousId === 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  const isCardActive = isFinished && accountHasStakedBalance
  const comingSoon = blocksUntilStart > 0 && block > 0

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefStake.current?.rewardMe()
        })
      }}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const toggleExpand = () => {
    setShowExpandableSection(!showExpandableSection)
  }

  // const [onPresentCompound] = useModal(
  //   <CompoundModal
  //     earnings={earnings}
  //     onConfirm={async (val) => {
  //       setTypeOfReward('rewardBanana')
  //       await onApeHarder(val).catch(() => {
  //         setTypeOfReward('error')
  //         rewardRefApeHarder.current?.rewardMe()
  //       })
  //     }}
  //     tokenName={stakingTokenName}
  //   />,
  // )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setTypeOfReward('removed')
        await onWuzzOut(val).catch(() => {
          setTypeOfReward('error')
          rewardRefWuzzOut.current?.rewardMe()
        })
      }}
      tokenName={stakingTokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      } else {
        rewardRefReward.current?.rewardMe()
      }
    } catch (e) {
      setTypeOfReward('error')
      rewardRefReward.current?.rewardMe()
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

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
          isApproved={isApproved}
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

  const handleRenderRow = () => {
    if (isXs) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          <StyledFlex alignItems="center">
            <ArrowContainer justifyContent="center" alignItems="center">
              {/* {!account ? (
                        <UnlockButton />
                      ) : (
                        <HarvestAction
                          {...props.earned}
                          {...props.farm}
                          lpSymbol={details.lpSymbol}
                          addLiquidityUrl={addLiquidityUrl}
                        />
                      )} */}
              <CellInner>
                <CellLayout>
                  <Details actionPanelToggled={actionPanelToggled} />
                </CellLayout>
              </CellInner>
            </ArrowContainer>
            <APRContainer>
              {/* <Apr {...props.apr} hideButton={isMobile} addLiquidityUrl={addLiquidityUrl} /> */} <></>
            </APRContainer>
            <LiquidtyContainer>
              {/* {React.createElement(cells[key], { ...props[key] })} */} <></>
            </LiquidtyContainer>
            {/* <EarnedContainer key={key}>{React.createElement(cells[key], { ...props[key] })}</EarnedContainer> */}
          </StyledFlex>
          {/* {actionPanelToggled && details && (
            <ActionPanel {...props} account={account} addLiquidityUrl={addLiquidityUrl} liquidity={liquidity} />
          )} */}
        </StyledTr>
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
            {/* // ) : (
                      //   <HarvestAction
                      //     {...props.earned}
                      //     {...props.farm}
                      //     lpSymbol={details.lpSymbol}
                      //     addLiquidityUrl={addLiquidityUrl}
                      //   /> */}
            <CellInner>
              <CellLayout>
                <Details actionPanelToggled={actionPanelToggled} />
              </CellLayout>
            </CellInner>
          </ArrowContainer>
          <APRContainer>
            <Apr poolApr={apr.toNumber().toFixed(2)} />
          </APRContainer>
          <LiquidtyContainer>
            <Staked staked={getBalanceNumber(totalStaked)} />
          </LiquidtyContainer>
          <EarnedContainer>
            <Earned earnings={rawEarningsBalance} />
          </EarnedContainer>
          <CellInner>
            <CellLayout>
              {/* <Details actionPanelToggled={actionPanelToggled} /> */}
              <></>
            </CellLayout>
          </CellInner>
          {/* <AprMobileCell>
            <CellLayout label={TranslateString(736, 'APR')}>
              <Apr {...props.apr} hideButton addLiquidityUrl={addLiquidityUrl} />
            </CellLayout>
          </AprMobileCell> */}
          {/* <ArrowContainer justifyContent="center" alignItems="center" /> */}
          {/* {isFinished && sousId !== 0 && <PoolFinishedSash />} */}
          {/* {comingSoon ? (
          <SubTitle color="green">Coming Soon</SubTitle>
        ) : (
          account &&
          harvest &&
          !isOldSyrup && (
            <Reward ref={rewardRefWuzzOut} type="emoji" config={rewards[typeOfReward]}>
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? 'Collecting' : 'Wuzz out'}
                onClick={async () => {
                  setPendingTx(true)
                  setTypeOfReward('removed')
                  await onReward().catch(() => {
                    setTypeOfReward('error')
                    rewardRefWuzzOut.current?.rewardMe()
                    setPendingTx(false)
                  })
                  setPendingTx(false)
                }}
              />
            </Reward>
          )
        )} */}
          {/* {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance
              value={getBalanceNumber(earnings, tokenDecimals)}
              decimals={displayDecimals}
              isDisabled={isFinished}
            />
            {sousId === 0 && account && harvest && (
              <Reward ref={rewardRefApeHarder} type="emoji" config={rewards[typeOfReward]}>
                <HarvestButton
                  disabled={!earnings.toNumber() || pendingTx}
                  text={pendingTx ? TranslateString(999, 'Aping') : TranslateString(999, 'Ape Harder')}
                  onClick={() => {
                    setTypeOfReward('rewardBanana')
                    onPresentCompound()
                  }}
                />
              </Reward>
            )}
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )} */}
          {/* <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} /> */}
          {/* <ExpandingWrapper expanded={showExpandableSection}>
              <DetailsSection
                totalStaked={getBalanceNumber(totalStaked)}
                personalValueStaked={getBalanceNumber(stakedBalance)}
                blocksRemaining={blocksRemaining}
                isFinished={isFinished}
                blocksUntilStart={blocksUntilStart}
              />
            </ExpandingWrapper> */}
          {/* <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APR')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <>
              <ApyButton
                lpLabel={tokenName}
                rewardTokenName={tokenName}
                addLiquidityUrl="https://dex.apeswap.finance/#/swap"
                rewardTokenPrice={new BigNumber(rewardTokenPrice)}
                apy={new BigNumber(apy).div(100)}
              />
              <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
            </>
          )}
        </StyledDetails>
        <StyledDetails>
          <div style={{ flex: 1 }}>
            <span role="img" aria-label={stakingTokenName}>
              {stakingTokenName === 'BANANA' && <span>🍌</span>}{' '}
            </span>
            {TranslateString(384, 'Your Stake')}:
          </div>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </StyledDetails> */}
          {/* <StyledContainer>
        <CardFooter
          projectLink={projectLink}
          totalStaked={totalStaked}
          blocksRemaining={blocksRemaining}
          isFinished={isFinished}
          blocksUntilStart={blocksUntilStart}
          poolCategory={poolCategory}
        />
      </StyledContainer> */}
        </StyledFlex>
        {actionPanelToggled && (
          <>
            <Flex>
              <StakeAction
                pool={pool}
                stakingTokenBalance={stakingTokenBalance}
                stakedBalance={stakedBalance}
                isApproved={isApproved}
                isStaked={accountHasStakedBalance}
              />
            </Flex>
            <ActionPanel
              totalStaked={getBalanceNumber(totalStaked)}
              personalValueStaked={getBalanceNumber(stakedBalance)}
              blocksRemaining={blocksRemaining}
              isFinished={isFinished}
              blocksUntilStart={blocksUntilStart}
            />
          </>
        )}
      </StyledTr>
    )
  }
  return handleRenderRow()
}

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

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
`

export default PoolTable
