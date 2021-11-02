import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useNetworkChainId } from 'state/hooks'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { NETWORK_LABEL } from 'config/constants/chains'

export interface ExpandableSectionProps {
  blockExplorer?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  multiplier?: string
  totalStaked?: string
  totalStakedRaw?: string
  personalValueStaked?: number
  blocksRemaining?: number
  isFinished?: boolean
  blocksUntilStart?: number
  stakedTokenPrice?: number
  rewardTokenPrice?: number
  pendingReward?: BigNumber
  projectSite?: string
  tokenDecimals?: number
}

const Wrapper = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  margin-right: 24px;
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

const StyledText = styled(Text)`
  font-weight: bold;
`

const StyledTextGreen = styled(Text)`
  font-weight: bold;
  color: #38a611;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  blockExplorer,
  lpLabel,
  addLiquidityUrl,
  personalValueStaked,
  totalStaked,
  totalStakedRaw,
  stakedTokenPrice,
  pendingReward,
}) => {
  const TranslateString = useI18n()

  const totalDollarAmountStakedFormated = totalStaked
    ? `${Number(totalStaked).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'

  const totalStakedFormated = totalStakedRaw
    ? `${Number(totalStakedRaw).toLocaleString(undefined, { maximumFractionDigits: 3 })}`
    : '-'
  const totalUserStaked = personalValueStaked > 0 ? (personalValueStaked * stakedTokenPrice).toFixed(2) : 0

  const chainId = useNetworkChainId()


  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(23, 'Staked Amount')}:
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {personalValueStaked}
        </StyledText>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(23, 'Staked Value')}:
        </StyledText>
        <StyledTextGreen fontFamily="poppins" fontSize="12px">
          ${totalUserStaked}
        </StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Total Staked Value')}:
        </StyledText>
        <StyledTextGreen fontFamily="poppins" fontSize="12px">
          ${totalDollarAmountStakedFormated}
        </StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Total Staked Value')}:
        </StyledText>
        <StyledText fontFamily="poppins" fontSize="12px">
          {totalStakedFormated}
        </StyledText>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontFamily="poppins" fontSize="12px">
          {TranslateString(316, 'Stake')}:
        </StyledText>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={blockExplorer} bold={false}>
          {TranslateString(999, `View on ${NETWORK_LABEL[chainId]}Scan`)}
        </StyledLink>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
