import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { LinkExternal, Text, Flex } from '@apeswapfinance/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useFarmUser, useStats, usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import StakedAction from './StakedAction'
import Apr, { AprProps } from '../Apr'
import Multiplier, { MultiplierProps } from '../Multiplier'
import { LiquidityProps } from '../Liquidity'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  account: string
  addLiquidityUrl: string
}

export interface InfoPropsContainer {
  liquidityDigits: number
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 340px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 401px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 10px;
`

const ActionContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div<InfoPropsContainer>`
  width: ${({ liquidityDigits }) =>
    (liquidityDigits === 8 && '265px') || (liquidityDigits === 7 && '255px') || (liquidityDigits === 6 && '238px')};

  ${({ theme }) => theme.mediaQueries.xl} {
    width: ${({ liquidityDigits }) =>
      (liquidityDigits === 8 && '315px') || (liquidityDigits === 7 && '300px') || (liquidityDigits === 6 && '280px')};
  }
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

const StakedText = styled(Text)`
  font-weight: 700;
  margin-left 60px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left 85px;
  }
`

const StakedValueText = styled(Text)`
  margin-left 60px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left 85px;
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  account,
  addLiquidityUrl,
  liquidity,
}) => {
  const farm = details

  const TranslateString = useI18n()

  const lpAddress = farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const bsc = `https://bscscan.com/address/${lpAddress}`

  const { earnings, stakedBalance } = useFarmUser(farm.pid)
  const bananaPrice = usePriceBananaBusd()
  let earningsToReport = null
  let earningsBusd = 0
  let displayHarvestBalance = '?'

  if (earnings) {
    earningsToReport = getBalanceNumber(earnings)
    earningsBusd = earningsToReport * bananaPrice.toNumber()
    displayHarvestBalance = earningsBusd.toLocaleString()
  }

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const yourStats = useStats()
  const farmStats = yourStats?.stats?.farms
  const filteredFarmStats = farmStats?.find((item) => item.pid === farm.pid)
  const totalValuePersonalFormated = filteredFarmStats
    ? `$${Number(filteredFarmStats.stakedTvl).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  let liquidityDigits
  if (typeof liquidity.liquidity === 'string') {
    const number = parseInt(liquidity.liquidity)
    liquidityDigits = Math.round(number).toString().length
  } else {
    liquidityDigits = liquidity.liquidity.toFixed(0).toString().length
  }
  /* eslint-disable no-debugger */
  debugger
  /* eslint-enable no-debugger */

  return (
    <>
      <Container>
        <Flex>
          <InfoContainer liquidityDigits={liquidityDigits}>
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
                <LinkExternal href={addLiquidityUrl}>
                  <StyledText fontFamily="poppins" fontSize="12px">
                    {farm.lpSymbol}
                  </StyledText>
                </LinkExternal>
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
          <Flex flexDirection="column">
            {account && rawStakedBalance !== 0 && (
              <>
                <StakedText fontFamily="poppins" fontSize="12px">
                  Staked
                </StakedText>
                <StakedValueText color="text" fontSize="20px">
                  {displayBalance}
                </StakedValueText>
              </>
            )}
          </Flex>
          <ValueContainerNoneLarge>
            <ValueWrapper>
              <StyledText fontFamily="poppins" fontSize="12px">
                {TranslateString(736, 'APR:')}
              </StyledText>
              <Apr {...apr} addLiquidityUrl={addLiquidityUrl} />
            </ValueWrapper>
          </ValueContainerNoneLarge>
          <ActionContainer>
            <StakedAction {...farm} />
          </ActionContainer>
        </Flex>
      </Container>
      <StyledLinkExternal href={bsc}>{TranslateString(999, 'View on BscScan')}</StyledLinkExternal>
    </>
  )
}

export default ActionPanel
