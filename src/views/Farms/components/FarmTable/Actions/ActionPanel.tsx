import React from 'react'
import { Text, Flex } from '@apeswapfinance/uikit'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { useFarmUser, usePriceBananaBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import StakedAction from './StakedAction'
import { AprProps } from '../Apr'
import { MultiplierProps } from '../Multiplier'
import { LiquidityProps } from '../Liquidity'
import { LpTokenPrices } from '../../../../../state/types'
import HarvestAction from '../../FarmCard/HarvestAction'
import {
  StyledUnlockButton,
  Container,
  Caption,
  DollarValue,
  OnlyDesktop,
  RecordBox,
  StyledButtonSquare,
} from './styles'
import { EarnedProps } from '../Earned'
import { FarmProps } from '../Farm'

export interface ActionPanelProps {
  apr: AprProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
  account: string
  earned: EarnedProps
  farm: FarmProps
  addLiquidityUrl: string
  farmsPrices: LpTokenPrices[]
}

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({
  details,
  apr,
  account,
  addLiquidityUrl,
  liquidity,
  earned,
  farm: propFarm,
  farmsPrices,
}) => {
  const farm = details

  const { earnings, stakedBalance } = useFarmUser(farm.pid)
  const bananaPrice = usePriceBananaBusd()
  let earningsToReport = null
  let earingsToReportText = '?'
  let earningsBusd = 0
  let displayHarvestBalance = '?'

  if (earnings) {
    earningsToReport = getBalanceNumber(earnings)
    earningsBusd = earningsToReport * bananaPrice.toNumber()
    displayHarvestBalance = earningsBusd.toLocaleString()
    earingsToReportText = earningsToReport.toFixed(4)
  }

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const lpPrice: LpTokenPrices = farmsPrices?.find((lp) => lp.pid === farm.pid)

  const totalValuePersonalFormated =
    lpPrice && rawStakedBalance > 0
      ? `${(lpPrice.price * rawStakedBalance).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : '-'

  return (
    <Container>
      <RecordBox>
        <Flex flexDirection="column">
          <Caption>Available LP</Caption>
          <Text fontWeight={700}>0.0000 LP</Text>
          <DollarValue>~$0.0000</DollarValue>
        </Flex>
        <StyledButtonSquare onClick={() => window.open(addLiquidityUrl)}>GET LP</StyledButtonSquare>
      </RecordBox>
      <OnlyDesktop>
        <img src="/images/home-right-arrow.svg" alt=">>" />
      </OnlyDesktop>
      <RecordBox>
        <Flex flexDirection="column">
          <Caption>Staked</Caption>
          <Text fontWeight={700}>{displayBalance} LP</Text>
          <DollarValue>~${totalValuePersonalFormated}</DollarValue>
        </Flex>
        <StakedAction {...farm} />
      </RecordBox>
      <OnlyDesktop>
        <img src="/images/home-right-arrow.svg" alt=">>" />
      </OnlyDesktop>
      <RecordBox>
        <Flex flexDirection="column">
          <Caption>Earned</Caption>
          <Text fontWeight={700}>{earingsToReportText} BANANA</Text>
          <DollarValue>~${displayHarvestBalance}</DollarValue>
        </Flex>
        {!account ? (
          <StyledUnlockButton size="sm" />
        ) : (
          <HarvestAction {...earned} {...propFarm} lpSymbol={details.lpSymbol} addLiquidityUrl={addLiquidityUrl} />
        )}
      </RecordBox>
    </Container>
  )
}

export default ActionPanel
