import React, { useEffect, useState } from 'react'
import ifoLinearAbi from 'config/abi/ifoLinear.json'
import multicallABI from 'config/abi/Multicall.json'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import multicall from 'utils/multicall'
import useBlock from 'hooks/useBlock'
import { getMulticallAddress } from 'utils/addressHelper'
import { useNetworkChainId } from 'state/hooks'
import { useSafeIfoContract } from 'hooks/useContract'
import { getContract } from 'utils/web3'
import getTimePeriods from 'utils/getTimePeriods'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import IfoCardHeader from '../CardHeader/IfoCardHeader'
import IfoCardProgress from '../CardProgress/IfoCardProgress'
import IfoCardDetails from '../CardDetails/IfoCardDetails'
import IfoCardContribute from './IfoCardContribute'
import useUserInfo from './useUserInfo'
import { Container } from './styles'

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

const IfoCard: React.FC<IfoCardProps> = ({ ifo, notLp, gnana }) => {
  const {
    id,
    address,
    isLinear,
    saleAmount,
    raiseAmount,
    bananaToBurn,
    currency,
    vestingTime,
    currencyAddress,
    tokenDecimals,
    releaseBlockNumber,
    burnedTxUrl,
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
  const { account } = useWeb3React()
  const contract = useSafeIfoContract(address, isLinear)
  const currentBlock = useBlock()
  const chainId = useNetworkChainId()
  const multicallAddress = getMulticallAddress(chainId)

  useEffect(() => {
    const fetchProgress = async () => {
      const multicallContract = getContract(multicallABI, multicallAddress, chainId)

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
        multicallContract,
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
        raisingAmount: new BigNumber(raisingAmount),
        totalAmount: new BigNumber(totalAmount),
        status,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
      })
    }

    fetchProgress()
  }, [currentBlock, contract, releaseBlockNumber, setState, start, address, multicallAddress, chainId])

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

  if (isComingSoon) {
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
    const vestingPeriodInSec = (state.vestingEndBlock - state.endBlockNum) * BSC_BLOCK_TIME

    progressBarAmountLabel = `${offeringTokensClaimed.toFixed(4)} ${offeringCurrency} / ${userOfferingAmount.toFixed(4)} ${offeringCurrency}`
    progressBarTimeLabel = `${timeUntil.days}d ${timeUntil.hours}h ${timeUntil.minutes}m / ${Math.ceil(
      vestingPeriodInSec / 60 / 60 / 24,
    )}d`
    progress = ((currentBlock - state.endBlockNum) / (state.vestingEndBlock - state.endBlockNum)) * 100
  }

  const stats = React.useMemo(() => {
    let texts = [
      { label: 'For Sale', value: saleAmount },
      { label: 'To raise (USD)', value: raiseAmount },
      { label: 'Total vesting time', value: vestingTime },
    ]

    if (isFinished && userOfferingAmount > 0) {
      texts = [
        {
          label: 'Tokens available',
          value: Number(userOfferingAmount - offeringTokensClaimed).toString(),
        },
        // TODO: Calculate the vested amount based on the current block
        { label: 'Tokens vested', value: Number(userTokenStatus.offeringTokensVested).toString() },
        { label: 'Tokens harvested', value: Number(offeringTokensClaimed).toString() },
        { label: 'Vested value', value: `${Number(amount - refundingAmount).toFixed(4)} ${currency}` },
      ]

      return texts;
    }

    if (hasStarted) {
      texts.splice(2, 0, {
        label: 'Total raised (% of the target)',
        value: `${state.totalAmount.dividedBy(state.raisingAmount).multipliedBy(100).toFixed(2)}%`,
      })
      return texts
    }
    return texts
  }, [
    saleAmount,
    raiseAmount,
    vestingTime,
    hasStarted,
    isFinished,
    userOfferingAmount,
    state.totalAmount,
    state.raisingAmount,
    offeringTokensClaimed,
    userTokenStatus.offeringTokensVested,
    amount,
    refundingAmount,
    currency,
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
        <UnlockButton fullWidth />
      ) : (
        (isActive || isFinished) &&
        vesting && (
          <IfoCardContribute
            account={account}
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            contract={contract}
            amountContributed={amount}
            tokenDecimals={tokenDecimals}
            refunded={refunded}
            isActive={isActive}
            isFinished={isFinished}
            userTokenStatus={userTokenStatus}
          />
        )
      )}
      <IfoCardDetails stats={stats} />
    </Container>
  )
}

export default React.memo(IfoCard)
