import React, { useEffect, useState } from 'react'
import ifoAbi from 'config/abi/ifo.json'
import multicallABI from 'config/abi/Multicall.json'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { BSC_BLOCK_TIME } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import multicall from 'utils/multicall'
import useBlock from 'hooks/useBlock'
import { getMulticallAddress } from 'utils/addressHelper'
import { useNetworkChainId, usePriceBnbBusd, usePriceGnanaBusd } from 'state/hooks'
import { useSafeIfoContract } from 'hooks/useContract'
import { getContract } from 'utils/web3'
import getTimePeriods from 'utils/getTimePeriods'
import { getBalanceNumber } from 'utils/formatBalance'
import IfoCardHeader from '../CardHeader/IfoCardHeader'
import IfoCardProgress from '../CardProgress/IfoCardProgress'
import IfoCardDetails from '../CardDetails/IfoCardDetails'
import IfoCardContribute from './IfoCardContribute'
import useUserInfo from './useUserInfo'
import { Container, UnlockButton } from './styles'

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
    isLinear,
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
  const { account } = useWeb3React()
  const contract = useSafeIfoContract(address, isLinear)
  const currentBlock = useBlock()
  const chainId = useNetworkChainId()
  const multicallAddress = getMulticallAddress(chainId)
  const bnbPrice = usePriceBnbBusd()
  const gnanaPrice = usePriceGnanaBusd()
  const currencyPrice = gnana ? gnanaPrice : bnbPrice

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
          name: 'raisingAmount',
        },
        {
          address,
          name: 'totalAmount',
        },
      ]
      const [startBlock, endBlock, raisingAmount, totalAmount] = await multicall(multicallContract, ifoAbi, calls)

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
  }, [currentBlock, contract, releaseBlockNumber, setState, start, address, multicallAddress, chainId])

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
      { label: 'For Sale', value: saleAmount },
      { label: 'To raise (USD)', value: raiseAmount },
    ]

    if (vestingTime) texts.push({ label: 'Total vesting time', value: vestingTime })

    if (isFinished && offeringTokenBalance.isGreaterThan(0)) {
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
          label: 'Tokens available',
          value: tokensHarvestedAvailable.toFixed(4),
        },
        { label: 'Tokens vested', value: tokensVested.toFixed(4) },
        { label: 'Tokens harvested', value: totalTokensHarvested.toFixed(4) },
        {
          label: 'Committed value',
          value: `${Number(getBalanceNumber(vestedValueAmount, 18)).toFixed(4)} ${currency} (~$${vestedValueDollar})`,
        },
      ]

      return texts
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
        <UnlockButton />
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
      <IfoCardDetails stats={stats} />
    </Container>
  )
}

export default React.memo(IfoCard)
