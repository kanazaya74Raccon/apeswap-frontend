import BigNumber from 'bignumber.js'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Heading, Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { BLOCK_EXPLORER } from 'config/constants/chains'
import { useNetworkChainId } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import UnlockButtonSquare from 'components/UnlockButtonSquare'
import { Vault } from 'state/types'
import VaultHeading from './VaultHeading'
import CellLayout from './CellLayout'
import Details from './Details'
import Apr from './Apr'
import ActionPanel from './ActionPanel'
import Staked from './Liquidity'
import ApprovalAction from './CardActions/ApprovalAction'
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

const DailyAPYContainer = styled.div`
  position: absolute;
  left: 340px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 401px;
  }
`

const YearlyAPYContainer = styled.div`
  position: absolute;
  left: 480px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 575px;
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
const StyledHeadingGreen = styled(Heading)`
  font-size: 14px;
  color: #38a611;
  font-weight: 800;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    color: #38a611;
  }
`

const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 12px;
`

const ArrowContainer = styled(Flex)`
  position: absolute;
  right: 23px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  position: relative;
`

const TotalStakedContainer = styled.div`
  position: absolute;
  left: 660px;
  top: 19px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 751px;
  }
`

const UserStakedContainer = styled.div`
  position: absolute;
  left: 830px;
  top: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    left: 933px;
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

const VaultTable: React.FC<HarvestProps> = ({ vault, removed }) => {
  const { pid, stakeTokenAddress, token0, token1, userData, isPair, apy, totalStaked } = vault

  const { account } = useWeb3React()
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const chainId = useNetworkChainId()

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.tokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)

  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const isApproved = account && allowance && allowance.isGreaterThan(0)
  const needsApproval = !allowance.gt(0)
  const isLoading = !userData
  const lpLabel = vault.isPair ? `${vault.token0.symbol}-${vault.token1.symbol}` : vault.token0.symbol
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const cardHeaderButton = () => {
    if (!account) {
      return <StyledUnlockButton size="sm" />
    }
    if (needsApproval) {
      return <ApprovalAction stakingContractAddress={stakeTokenAddress} pid={pid} isLoading={isLoading} />
    }
    if (isApproved && !accountHasStakedBalance) {
      return (
        <StakeAction
          vault={vault}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
          isApproved={isApproved}
          isHeader
        />
      )
    }
    return <></>
  }

  return (
    <StyledTr onClick={toggleActionPanel}>
      <StyledFlex alignItems="center">
        <CellLayout>
          <VaultHeading
            token0={token0.symbol}
            token1={token1.symbol}
            isPair={isPair}
            image={vault?.image}
            isBurning={vault?.burning}
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
        <DailyAPYContainer>
          <Apr poolApr={removed ? '0' : apy?.daily?.toFixed(2)} apr={new BigNumber(apy?.daily)} />
        </DailyAPYContainer>
        <YearlyAPYContainer>
          <Apr poolApr={removed ? '0' : apy?.yearly?.toFixed(2)} apr={new BigNumber(apy?.yearly)} />
        </YearlyAPYContainer>
        <TotalStakedContainer>
          <Staked staked={parseInt(totalStaked)} />
        </TotalStakedContainer>
        {rawStakedBalance ? (
          <UserStakedContainer>
            <StyledText>Staked</StyledText>
            <StyledHeadingGreen color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>
              {displayBalance}
            </StyledHeadingGreen>
          </UserStakedContainer>
        ) : (
          <></>
        )}
      </StyledFlex>
      {actionPanelToggled && (
        <>
          <StakeContainer>
            <StakeAction
              vault={vault}
              stakingTokenBalance={stakingTokenBalance}
              stakedBalance={stakedBalance}
              isStaked={accountHasStakedBalance}
              firstStake={!accountHasStakedBalance}
              isApproved={isApproved}
            />
          </StakeContainer>
          <ActionPanel
            totalStaked={getBalanceNumber(new BigNumber(vault?.strategyPairBalance))}
            personalValueStaked={getBalanceNumber(stakedBalance)}
            lpLabel={lpLabel}
            addLiquidityUrl="https://app.apeswap.finance/swap"
            blockExplorer={`${BLOCK_EXPLORER[chainId]}/address/${vault?.strat}`}
            stakedTokenPrice={vault?.stakeTokenPrice}
            withdrawFee={vault?.withdrawFee}
            depositFee={vault?.depositFee}
          />
        </>
      )}
    </StyledTr>
  )
}

export default VaultTable
