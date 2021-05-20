import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { getContract } from 'utils/erc20'
import { Button, ButtonSquare } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import useI18n from 'hooks/useI18n'
import { usePriceBananaBusd, useFarmUser } from 'state/hooks'
import { useApprove } from 'hooks/useApprove'
import { useCountUp } from 'react-countup'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, StakedStyle } from './styles'

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData, lpAddresses }) => {
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const earningsBigNumber = userData && account ? new BigNumber(userData.earnings) : null
  const bananaPrice = usePriceBananaBusd()
  let earnings = null
  let earningsBusd = 0
  let displayBalance = '?'

  const rewardRefPos = useRef(null)
  const rewardRefNeg = useRef(null)
  const rewardRef = useRef(null)

  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  if (earningsBigNumber) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(bananaPrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const TranslateString = useI18n()

  const [requestedApproval, setRequestedApproval] = useState(false)
  const { allowance, tokenBalance, stakedBalance } = useFarmUser(pid)

  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpAddress)
  }, [ethereum, lpAddress])

  const { onApprove } = useApprove(lpContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const sucess = await onApprove()
      if (!sucess) setTypeOfReward('error')
      else setTypeOfReward('rewardBanana')
      setRequestedApproval(false)
      rewardRef.current?.rewardMe()
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const isApproved = account && allowance && allowance.isGreaterThan(0)

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

  const renderHarvestButton = () => {
    return (
      <Button
        mt="10px"
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
    )
  }

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
        {!account ? (
          // if (isApproved) {
          //   if (rawStakedBalance) {
          //     return <IconButtonWrapper>{renderStakingButtons()}</IconButtonWrapper>
          //   }

          //   return (
          //     <IconButtonWrapper>
          //       <ButtonSquare onClick={onPresentDeposit}>{TranslateString(999, 'Stake LP')}</ButtonSquare>
          //     </IconButtonWrapper>
          //   )
          // }

          // return (
          //   <IconButtonWrapper>
          //     <ButtonSquare disabled={requestedApproval} onClick={handleApprove}>
          //       {TranslateString(999, 'Enable')}
          //     </ButtonSquare>
          //   </IconButtonWrapper>
          // )
          // }

          <ButtonSquare disabled={requestedApproval} onClick={handleApprove}>
            {TranslateString(999, 'Enable')}
          </ButtonSquare>
        ) : (
          <Button
            mt="10px"
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
        )}
      </ActionContent>
    </ActionContainer>
  )
}

export default HarvestAction
