import React from 'react'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { BLOCK_EXPLORER, NETWORK_LABEL } from 'config/constants/chains'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { DualFarm, FarmPool } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmStats?: FarmPool
  multiplier?: string
  liquidity?: BigNumber
  pid?: number
  farm?: DualFarm
}

const Wrapper = styled.div`
  margin-top: 24px;
  margin-left: 2px;
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: bold;
  font-family: 'Poppins';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const StyledText = styled(Text)`
  font-weight: bold;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({ lpLabel, addLiquidityUrl, farm }) => {
  const TranslateString = useI18n()
  const chainId = useNetworkChainId()

  const blockExplorer = `${BLOCK_EXPLORER[chainId]}/address/${farm?.stakeTokenAddress}`

  const miniChefEarnings = getBalanceNumber(farm?.userData?.miniChefEarnings, farm?.rewardTokens?.token0?.decimals)
  const rewarderEarnings = getBalanceNumber(farm?.userData?.rewarderEarnings, farm?.rewardTokens?.token1?.decimals)

  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const displayLiquidity = `$${Number(farm?.totalStaked).toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  return (
    <Wrapper>
      <ValueWrapper>
        <StyledText fontFamily="poppins" fontSize="12px">
          Total Staked
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {displayLiquidity}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontFamily="poppins" fontSize="12px">
          Reward Tokens
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {`${farm?.rewardTokens?.token0?.symbol} & ${farm?.rewardTokens?.token1?.symbol}`}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontFamily="poppins" fontSize="12px">
          {farm?.rewardTokens?.token0?.symbol} Earned:
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px" color="green">
          {miniChefEarnings ? miniChefEarnings.toFixed(4) : '0'}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontFamily="poppins" fontSize="12px">
          {farm?.rewardTokens?.token1?.symbol} Earned:
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px" color="green">
          {rewarderEarnings ? rewarderEarnings.toFixed(4) : '0'}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontFamily="poppins" fontSize="12px">
          Staked Amount
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {rawStakedBalance ? rawStakedBalance.toFixed(10) : '0'}
        </StyledText>
      </ValueWrapper>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Stake')}:
        </StyledText>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={blockExplorer} bold={false} fontFamily="Titan One">
          {TranslateString(356, `View on ${NETWORK_LABEL[chainId]}Scan`)}
        </StyledLink>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
