import React from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
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
  font-weight: 600;
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
  font-weight: 600;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({ lpLabel, addLiquidityUrl, farm }) => {
  const { t } = useTranslation()
  const chainId = useNetworkChainId()

  const blockExplorer = `${BLOCK_EXPLORER[chainId]}/address/${farm?.stakeTokenAddress}`

  const miniChefEarnings = getBalanceNumber(farm?.userData?.miniChefEarnings, farm?.rewardTokens?.token0?.decimals)
  const rewarderEarnings = getBalanceNumber(farm?.userData?.rewarderEarnings, farm?.rewardTokens?.token1?.decimals)

  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const displayLiquidity = `$${Number(farm?.totalStaked).toLocaleString(undefined, { maximumFractionDigits: 0 })}`

  return (
    <Wrapper>
      <ValueWrapper>
        <StyledText fontSize="12px">{t('Total Staked')}</StyledText>
        <StyledText fontSize="12px">{displayLiquidity}</StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontSize="12px">{t('Reward Tokens')}</StyledText>
        <StyledText fontSize="12px">
          {`${farm?.rewardTokens?.token0?.symbol} & ${farm?.rewardTokens?.token1?.symbol}`}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontSize="12px">
          {farm?.rewardTokens?.token0?.symbol} {t('Earned')}:
        </StyledText>
        <StyledText fontSize="12px" color="green">
          {miniChefEarnings ? miniChefEarnings.toFixed(4) : '0'}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontSize="12px">
          {farm?.rewardTokens?.token1?.symbol} {t('Earned')}:
        </StyledText>
        <StyledText fontSize="12px" color="green">
          {rewarderEarnings ? rewarderEarnings.toFixed(4) : '0'}
        </StyledText>
      </ValueWrapper>
      <ValueWrapper>
        <StyledText fontSize="12px">{t('Staked Amount')}</StyledText>
        <StyledText fontSize="12px">{rawStakedBalance ? rawStakedBalance.toFixed(10) : '0'}</StyledText>
      </ValueWrapper>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Stake')}:</StyledText>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={blockExplorer} bold={false} fontWeight={800}>
          {t(`View on %chain% Scan`, { chain: NETWORK_LABEL[chainId] })}
        </StyledLink>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
