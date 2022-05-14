import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ifoAbi from 'config/abi/ifo.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import multicall from 'utils/multicall'
import UnlockButton from 'components/UnlockButton'
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
import { Container, Wrapper } from './styles'

const StyledUnlockButton = styled(UnlockButton)`
  padding: 25px 35px;
  display: flex;
  align-self: center;
  font-size: 16px;
  font-weight: 600;
`
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
    burnedTxUrl,
    vesting,
    startBlock: start,
  } = ifo
  const [state, setState] = useState({
    isLoading: true,
    status: null,
    blocksRemaining: 0,
    secondsUntilStart: 0,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    startBlockNum: 0,
    endBlockNum: 0,
  })
  const { account, chainId } = useActiveWeb3React()
  const contract = useSafeIfoContract(address, false)
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
          name: 'raisingAmount',
        },
        {
          address,
          name: 'totalAmount',
        },
      ]
      const [startBlock, endBlock, raisingAmount, totalAmount] = await multicall(chainId, ifoAbi, calls)

      const startBlockNum = start || parseInt(startBlock, 10)
      const endBlockNum = parseInt(endBlock, 10)

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const blocksRemaining = endBlockNum - currentBlock

      setState({
        isLoading: currentBlock === 0,
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
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

  const { userTokenStatus, userInfo, offeringTokenBalance } = useUserInfo(contract, tokenDecimals, address)

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
  }

  const stats = React.useMemo(() => {
    let texts = [
      { label: t('For sale'), value: saleAmount },
      { label: t('To raise (USD)'), value: raiseAmount },
    ]

    if (vestingTime) texts.push({ label: t('Total vesting time'), value: vestingTime })

    if (isFinished && statsType === 0 && getBalanceNumber(userInfo.amount, 18) > 0) {
      const tokensHarvestedAvailable = getBalanceNumber(
        new BigNumber(userTokenStatus?.offeringTokenHarvest.toString()),
        tokenDecimals,
      )
      const tokensVested = getBalanceNumber(
        new BigNumber(userTokenStatus?.offeringTokensVested.toString()),
        tokenDecimals,
      )
      const totalTokensHarvested =
        getBalanceNumber(offeringTokenBalance, tokenDecimals) - (tokensVested + tokensHarvestedAvailable)
      const vestedValueAmount = userInfo.refunded ? state.raisingAmount.times(userInfo.allocation) : userInfo.amount
      const vestedValueDollar = getBalanceNumber(vestedValueAmount.times(currencyPrice), 18).toFixed(2)

      texts = [
        {
          label: t('Tokens available'),
          value: tokensHarvestedAvailable.toFixed(4),
        },
        { label: t('Tokens vesting'), value: tokensVested.toFixed(4) },
        { label: t('Tokens harvested'), value: totalTokensHarvested.toFixed(4) },
        {
          label: t('Committed value'),
          value: `${Number(getBalanceNumber(vestedValueAmount, 18)).toFixed(4)} ${currency} (~$${vestedValueDollar})`,
        },
      ]

      return texts
    }

    if (hasStarted) {
      texts.splice(2, 0, {
        label: t('Total raised (% of target)'),
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
    offeringTokenBalance,
    hasStarted,
    userTokenStatus?.offeringTokenHarvest,
    userTokenStatus?.offeringTokensVested,
    tokenDecimals,
    userInfo.refunded,
    userInfo.allocation,
    userInfo.amount,
    state.raisingAmount,
    state.totalAmount,
    currencyPrice,
    currency,
    statsType,
    t,
  ])

  return (
    <Container>
      <IfoCardHeader
        ifoId={id}
        gnana={gnana}
        isLP={!!burnedTxUrl}
        isComingSoon={!address}
        isLoading={state.isLoading}
        status={state.status}
        secondsUntilStart={state.secondsUntilStart}
        secondsUntilEnd={state.secondsUntilEnd}
      />
      {!isFinished && (
        <IfoCardProgress progress={progress} amountLabel={progressBarAmountLabel} timeLabel={progressBarTimeLabel} />
      )}

      {!account ? (
        <StyledUnlockButton size="lg" />
      ) : (
        (isActive || isFinished) &&
        vesting && (
          <IfoCardContribute
            account={account}
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            contract={contract}
            amountContributed={getBalanceNumber(userInfo.amount, 18)}
            tokenDecimals={tokenDecimals}
            isActive={isActive}
            isFinished={isFinished}
          />
        )
      )}
      {getBalanceNumber(userInfo.amount, 18) !== 0 && isFinished && (
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
