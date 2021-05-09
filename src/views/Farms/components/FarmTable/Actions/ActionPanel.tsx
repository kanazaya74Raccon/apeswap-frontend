import React, { useEffect } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text, Flex } from '@apeswapfinance/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { communityFarms } from 'config/constants'
import { CommunityTag, CoreTag } from 'components/Tags'
import { useFarmUser, useStats, usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { BASE_ADD_LIQUIDITY_URL } from 'config'

import HarvestAction from './HarvestAction'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import Liquidity, { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column-reverse;
  padding: 24px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: column;
    padding: 16px 32px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  font-size: 12px;
  text-decoration-line: underline;
`

const StakeContainer = styled.div`
  color: ${({ theme }) => theme.colors.text};
  align-items: center;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 16px;
  }

  > div {
    height: 24px;
    padding: 0 6px;
    font-size: 14px;
    margin-right: 4px;

    svg {
      width: 14px;
    }
  }
`

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div`
  min-width: 200px;
`

const ValueContainer = styled.div`
  display: block;
`

const ValueContainerNoneLarge = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ details, apr, multiplier, liquidity }) => {
  const farm = details

  const TranslateString = useI18n()
  const isActive = farm.multiplier !== '0X'
  const lpLabel = farm.lpSymbol && farm.lpSymbol.toUpperCase().replace('PANCAKE', '')

  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = `https://bscscan.com/address/${lpAddress}`
  const isCommunityFarm = communityFarms.includes(farm.lpSymbol)

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`

  const { earnings } = useFarmUser(farm.pid)
  const bananaPrice = usePriceBananaBusd()
  let earningsToReport = null
  let earningsBusd = 0
  let displayHarvestBalance = '?'

  if (earnings) {
    earningsToReport = getBalanceNumber(earnings)
    earningsBusd = earningsToReport * bananaPrice.toNumber()
    displayHarvestBalance = earningsBusd.toLocaleString()
  }

  const yourStats = useStats()
  const farmStats = yourStats?.stats?.farms
  const filteredFarmStats = farmStats?.find((item) => item.pid === farm.pid)
  const totalValuePersonalFormated = filteredFarmStats
    ? `$${Number(filteredFarmStats.stakedTvl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  return (
    <Container>
      <Flex>
        <InfoContainer>
          <ValueContainer>
            <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                {TranslateString(999, 'Multiplier:')}
              </StyledText>
              <Multiplier multiplier={apr.multiplier} />
            </ValueWrapper>
          </ValueContainer>
          <ValueContainer>
            <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                {TranslateString(999, 'Stake:')}
              </StyledText>
              <StyledText fontFamily="poppins" fontSize="12px">
                {farm.lpSymbol}
              </StyledText>
            </ValueWrapper>
            <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                Staked Value
              </StyledText>
              <StyledText fontFamily="poppins" fontSize="12px" color="green">
                ~{totalValuePersonalFormated}USD
              </StyledText>
            </ValueWrapper>
            <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                Earned Value
              </StyledText>
              <StyledText fontFamily="poppins" fontSize="12px" color="green">
                ~{displayHarvestBalance}USD
              </StyledText>
            </ValueWrapper>
          </ValueContainer>
        </InfoContainer>
        <ValueContainerNoneLarge>
          <ValueWrapper>
            <StyledText fontFamily="poppins" fontSize="12px">
              {TranslateString(736, 'APR:')}
            </StyledText>
            <Apr {...apr} />
          </ValueWrapper>
        </ValueContainerNoneLarge>
        <ActionContainer>
          <StakedAction {...farm} />
        </ActionContainer>
      </Flex>
      <StyledLinkExternal href={bsc}>{TranslateString(999, 'View on BscScan')}</StyledLinkExternal>
      {/* <StyledLinkExternal href={addLiquidityUrl}>{TranslateString(999, 'Stake')}</StyledLinkExternal> */}
    </Container>
  )
}

export default ActionPanel
