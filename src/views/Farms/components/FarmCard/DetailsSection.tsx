import React from 'react'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/Home/components/HotFarms/FarmCardForHome'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { useFarmUser, useNetworkChainId, usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { getTokenInfo, registerToken } from 'utils/wallet'
import Multiplier from '../FarmTable/Multiplier'
import { LpTokenPrices } from '../../../../state/types'

export interface ExpandableSectionProps {
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  addLiquidityUrl?: string
  farmsPrices?: LpTokenPrices[]
  multiplier?: string
  liquidity?: BigNumber
  pid?: number
  farmLp?: string
  farm?: FarmWithStakedValue
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

const StyledTextGreen = styled(Text)`
  font-weight: 600;
  color: #38a611;
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
  font-weight: 800;
`

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  bscScanAddress,
  lpLabel,
  addLiquidityUrl,
  farmsPrices,
  multiplier,
  pid,
  liquidity,
  farmLp,
  farm,
}) => {
  const { t } = useTranslation()
  const chainId = useNetworkChainId()

  const { stakedBalance } = useFarmUser(pid)
  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const lpPrice: LpTokenPrices = farmsPrices?.find((lp) => lp.pid === farm.pid)

  const totalValuePersonalFormated =
    lpPrice && rawStakedBalance > 0
      ? `$${Number(lpPrice.price * rawStakedBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : '-'

  const totalValueFormated = liquidity
    ? `$${Number(liquidity).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const { earnings } = useFarmUser(pid)
  const bananaPrice = usePriceBananaBusd()
  let earningsToReport = null
  let earningsBusd = 0
  let displayHarvestBalance = '?'

  if (earnings) {
    earningsToReport = getBalanceNumber(earnings)
    earningsBusd = earningsToReport * bananaPrice.toNumber()
    displayHarvestBalance = `$${earningsBusd.toLocaleString()}`
  }

  const addTokenWallet = async (address) => {
    if (!address) return
    const { symbolToken, decimalsToken } = await getTokenInfo(address, chainId)
    registerToken(address, symbolToken, decimalsToken, '')
  }
  return (
    <Wrapper>
      <ValueWrapper>
        <StyledText fontSize="12px">{t('Multiplier:')}</StyledText>
        <Multiplier multiplier={multiplier} />
      </ValueWrapper>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Liquidity')}:</StyledText>
        <StyledText fontSize="12px">{totalValueFormated}</StyledText>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Stake')}:</StyledText>
        <StyledLinkExternal href={addLiquidityUrl}>{lpLabel}</StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Staked Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">{totalValuePersonalFormated}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Earned Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">{displayHarvestBalance}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={bscScanAddress} bold={false}>
          {t('View on BscScan')}
        </StyledLink>
      </Flex>
      {farm.projectLink && (
        <Flex justifyContent="center">
          <StyledLink external href={farm.projectLink} bold={false}>
            {t('View Project Site')}
          </StyledLink>
        </Flex>
      )}
      <Flex justifyContent="center">
        <StyledLink bold={false} className="noClick" onClick={() => addTokenWallet(farmLp)}>
          {t('Add to Metamask')}
        </StyledLink>
      </Flex>
    </Wrapper>
  )
}

export default DetailsSection
