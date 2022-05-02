import React, { useEffect, useState } from 'react'
import ifoLinearAbi from 'config/abi/ifoLinear.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import multicall from 'utils/multicall'
import { useBlock } from 'state/block/hooks'
import { usePriceBnbBusd, usePriceGnanaBusd } from 'state/hooks'
import { useSafeIfoContract } from 'hooks/useContract'
import getTimePeriods from 'utils/getTimePeriods'
import { getBalanceNumber } from 'utils/formatBalance'
import { Toggle } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import IfoCardHeader from '../CardHeader/IfoCardHeader'
import IfoCardProgress from '../CardProgress/IfoCardProgress'
import IfoCardDetails from '../CardDetails/IfoCardDetails'
import IfoCardContribute from './IfoCardContribute'
import useUserInfo from './useUserInfo'
import { Container, UnlockButton, Wrapper } from './styles'

export interface IfoCardProps {
  ifo: Ifo
  notLp?: boolean
  gnana?: boolean
}

const getStatus = (currentBlock: number, startBlock: number, endBlock: number): IfoStatus | null => {
  if (currentBlock < startBlock) {
    return 'coming_soon'
  }

  if (currentBlock >= startBlock && currentBlock <= endBlock) {
    return 'live'
  }

  if (currentBlock > endBlock) {
    return 'finished'
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo, gnana }) => {
  const {
    id,
    address,
    saleAmount,
    raiseAmount,
    currency,
    vestingTime,
    currencyAddress,
    tokenDecimals,
    releaseBlockNumber,
    vesting,
    startBlock: start,
    offeringCurrency,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    vestingEndBlock: 0,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    startBlockNum: 0,
    endBlockNum: 0,
  })
  const { account, chainId } = useActiveWeb3React()
  const contract = useSafeIfoContract(address, true)
  const { currentBlock } = useBlock()
  const bnbPrice = usePriceBnbBusd()
  const gnanaPrice = usePriceGnanaBusd()
  const { t } = useTranslation()
  const currencyPrice = gnana ? gnanaPrice : bnbPrice
  const [statsType, setStatsType] = useState(0)

  useEffect(() => {
    const fetchProgress = async () => {
      if (!address) {
        // Allow IAO details to be shown before contracts are deployed
        return
      }

      const calls = [
        {
          address,
          name: 'startBlock',
        },
        {
          address,
          name: 'endBlock',
        },
        {
          address,
          name: 'vestingEndBlock',
        },
        {
          address,
          name: 'raisingAmount',
        },
        {
          address,
          name: 'totalAmount',
        },
      ]
      const [startBlock, endBlock, vestingEndBlock, raisingAmount, totalAmount] = await multicall(
        chainId,
        ifoLinearAbi,
        calls,
      ) // Do not need to switch the abi

      const startBlockNum = start || parseInt(startBlock, 10)
      const endBlockNum = parseInt(endBlock, 10)
      const vestingEndBlockNum = parseInt(vestingEndBlock, 10)

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const blocksRemaining = endBlockNum - currentBlock

      setState({
        isLoading: currentBlock === 0,
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
        vestingEndBlock: vestingEndBlockNum,
        raisingAmount: new BigNumber(raisingAmount.toString()),
        totalAmount: new BigNumber(totalAmount.toString()),
        status,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
      })
    }

    fetchProgress()
  }, [currentBlock, contract, releaseBlockNumber, start, address, chainId])

  const {
    userTokenStatus,
    userInfo: { amount, refunded, offeringTokensClaimed, offeringAmount: userOfferingAmount, refundingAmount },
  } = useUserInfo(contract, tokenDecimals, address)

  const isComingSoon = state.status === 'coming_soon'
  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'
  const hasStarted = currentBlock && state.startBlockNum && state.startBlockNum <= currentBlock

  let progressBarAmountLabel = ''
  let progressBarTimeLabel = ''
  let progress = 0

  if (state.isLoading) {
    progressBarTimeLabel = ''
  } else if (isComingSoon) {
    const timeUntil = getTimePeriods(state.secondsUntilStart)

    progressBarTimeLabel = `${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until start`
    progress = ((currentBlock - releaseBlockNumber) / (state.startBlockNum - releaseBlockNumber)) * 100
  } else if (isActive) {
    const timeUntil = getTimePeriods(state.secondsUntilEnd)

    progressBarAmountLabel = `${getBalanceNumber(state.totalAmount).toFixed(2)} ${currency} / ${getBalanceNumber(
      state.raisingAmount,
    ).toFixed(2)} ${currency}`
    progressBarTimeLabel = `${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until finish`
    progress = ((currentBlock - state.startBlockNum) / (state.endBlockNum - state.startBlockNum)) * 100
  } else if (isFinished) {
    const timeUntil = getTimePeriods((state.vestingEndBlock - currentBlock) * BSC_BLOCK_TIME)
    const vestingPeriod = getTimePeriods((state.vestingEndBlock - state.endBlockNum) * BSC_BLOCK_TIME)

    progressBarAmountLabel = `${offeringTokensClaimed.toFixed(4)} ${offeringCurrency} / ${userOfferingAmount.toFixed(
      4,
    )} ${offeringCurrency}`
    progressBarTimeLabel = `${timeUntil.days + timeUntil.months * 30}d ${timeUntil.hours}h ${timeUntil.minutes}m / ${
      vestingPeriod.days + vestingPeriod.months * 30
    }d ${vestingPeriod.hours}h ${vestingPeriod.minutes}m`
    progress = ((currentBlock - state.endBlockNum) / (state.vestingEndBlock - state.endBlockNum)) * 100
  }

  const stats = React.useMemo(() => {
    let texts = [
      { label: t('For Sale'), value: saleAmount },
      { label: t('To raise (USD)'), value: raiseAmount },
    ]

    if (vestingTime) texts.push({ label: t('Total vesting time'), value: vestingTime })

    if (isFinished && statsType === 0 && amount > 0) {
      const vestedValueAmount = amount - refundingAmount
      const vestedValueDollar = (getBalanceNumber(currencyPrice, 0) * vestedValueAmount).toFixed(2)
      texts = [
        {
          label: t('Tokens available'),
          value: Number(userTokenStatus.offeringTokenTotalHarvest).toFixed(4),
        },
        { label: t('Tokens vesting'), value: Number(userTokenStatus.offeringTokensVesting).toFixed(4) },
        { label: t('Tokens harvested'), value: Number(offeringTokensClaimed).toFixed(4) },
        {
          label: t('Committed value'),
          value: `${Number(vestedValueAmount).toFixed(4)} ${currency} (~$${vestedValueDollar})`,
        },
      ]

      return texts
    }

    if (hasStarted) {
      texts.splice(2, 0, {
        label: t('Total raised (% of the target)'),
        value: `${state.totalAmount.dividedBy(state.raisingAmount).multipliedBy(100).toFixed(2)}%`,
      })
      return texts
    }
    return texts
  }, [
    saleAmount,
    raiseAmount,
    vestingTime,
    isFinished,
    hasStarted,
    amount,
    refundingAmount,
    currencyPrice,
    userTokenStatus.offeringTokenTotalHarvest,
    userTokenStatus.offeringTokensVesting,
    offeringTokensClaimed,
    currency,
    state.totalAmount,
    state.raisingAmount,
    statsType,
    t,
  ])

  return (
    <Container>
      <IfoCardHeader
        ifoId={id}
        gnana={gnana}
        isComingSoon={!address}
        isLoading={state.isLoading}
        status={state.status}
        secondsUntilStart={state.secondsUntilStart}
        secondsUntilEnd={state.secondsUntilEnd}
      />

      <IfoCardProgress progress={progress} amountLabel={progressBarAmountLabel} timeLabel={progressBarTimeLabel} />

      {!account ? (
        <UnlockButton />
      ) : (
        (isActive || isFinished) &&
        vesting && (
          <IfoCardContribute
            account={account}
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            amountContributed={amount}
            tokenDecimals={tokenDecimals}
            refunded={refunded}
            isActive={isActive}
            isFinished={isFinished}
            userTokenStatus={userTokenStatus}
          />
        )
      )}
      {amount !== 0 && isFinished && (
        <Wrapper>
          <Toggle
            size="md"
            labels={[t('MY STATS'), t('OVERALL STATS')]}
            onClick={() => {
              setStatsType(statsType === 0 ? 1 : 0)
            }}
          />
        </Wrapper>
      )}
      <IfoCardDetails stats={stats} />
    </Container>
  )
}

export default React.memo(IfoCard)
