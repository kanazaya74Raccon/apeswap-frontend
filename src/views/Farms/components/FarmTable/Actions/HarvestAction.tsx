import React, { useState, useRef, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import useI18n from 'hooks/useI18n'
import { usePriceBananaBusd } from 'state/hooks'
import { useCountUp } from 'react-countup'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, StakedStyle } from './styles'

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData }) => {
  const { account }: { account: string } = useWallet()
  const earningsBigNumber = userData && account ? new BigNumber(userData.earnings) : null
  const bananaPrice = usePriceBananaBusd()
  let earnings = null
  let earningsBusd = 0
  let displayBalance = '?'

  if (earningsBigNumber) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(bananaPrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const TranslateString = useI18n()

  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(earningsBusd)
  }, [earningsBusd, updateValue])

  return (
    <ActionContainer>
      <ActionTitles>
        <Title>BANANA </Title>
        <Subtle>{TranslateString(999, 'EARNED')}</Subtle>
      </ActionTitles>
      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          <StakedStyle>~{countUp}USD</StakedStyle>
        </div>
        <Button
          disabled={!earnings || pendingTx || !account}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)
          }}
          ml="4px"
        >
          {TranslateString(562, 'Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
