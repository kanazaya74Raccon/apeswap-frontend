import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ifoAbi from 'config/abi/ifo.json'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Card, CardBody, CardRibbon } from '@apeswapfinance/uikit'
import { BSC_BLOCK_TIME, ZERO_ADDRESS } from 'config'
import { Ifo, IfoStatus } from 'config/constants/types'
import multicall from 'utils/multicall'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { useSafeIfoContract } from 'hooks/useContract'
import UnlockButton from 'components/UnlockButton'
import IfoCardHeader from './IfoCardHeader'
import IfoCardProgress from './IfoCardProgress'
import IfoCardDescription from './IfoCardDescription'
import IfoCardDetails from './IfoCardDetails'
import IfoCardTime from './IfoCardTime'
import IfoCardContribute from './IfoCardContribute'
import IfoCardBNBContribute from './IfoCardBNBContribute'

export interface IfoCardProps {
  ifo: Ifo
  notLp?: boolean
}

const StyledIfoCard = styled(Card)<{ ifoId: string }>`
  background-image: ${({ ifoId }) => `url('/images/ifos/${ifoId}-bg.svg')`};
  background-repeat: no-repeat;
  background-position: -5px -5px;
  background-size: contain;
  padding-top: 112px;
  margin-left: auto;
  margin-right: auto;
  max-width: 437px;
  border-radius: 50px;
  width: 100%;
  background-size: 102.5%;
`

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

const getRibbonComponent = (status: IfoStatus, TranslateString: (translationId: number, fallback: string) => any) => {
  if (status === 'coming_soon') {
    return <CardRibbon variantColor="textDisabled" text={TranslateString(999, 'Coming Soon')} />
  }

  if (status === 'live') {
    return <CardRibbon variantColor="primary" text={TranslateString(999, 'LIVE NOW!')} />
  }

  return null
}

const IfoCard: React.FC<IfoCardProps> = ({ ifo, notLp }) => {
  const {
    id,
    address,
    name,
    subTitle,
    description,
    launchDate,
    launchTime,
    saleAmount,
    raiseAmount,
    bananaToBurn,
    projectSiteUrl,
    currency,
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
    progress: 0,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    startBlockNum: 0,
    endBlockNum: 0,
    harvestOneBlockRelease: 0,
    harvestTwoBlockRelease: 0,
    harvestThreeBlockRelease: 0,
    harvestFourBlockRelease: 0,
  })
  const { account } = useWeb3React()
  const contract = useSafeIfoContract(address)
  const currentBlock = useBlock()
  const TranslateString = useI18n()

  const Ribbon = getRibbonComponent(state.status, TranslateString)

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
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [0],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [1],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [2],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [3],
        },
      ]
      const [
        startBlock,
        endBlock,
        raisingAmount,
        totalAmount,
        harvestOneBlock,
        harvestTwoBlock,
        harvestThreeBlock,
        harvestFourBlock,
      ] = await multicall(ifoAbi, calls)

      const startBlockNum = start || parseInt(startBlock, 10)
      const endBlockNum = parseInt(endBlock, 10)

      const status = getStatus(currentBlock, startBlockNum, endBlockNum)
      const totalBlocks = endBlockNum - startBlockNum
      const blocksRemaining = endBlockNum - currentBlock

      // Calculate the total progress until finished or until start
      const progress =
        currentBlock > startBlockNum
          ? ((currentBlock - startBlockNum) / totalBlocks) * 100
          : ((currentBlock - releaseBlockNumber) / (startBlockNum - releaseBlockNumber)) * 100

      // Get block release times in seconds
      const harvestOneBlockRelease = (harvestOneBlock - currentBlock) * BSC_BLOCK_TIME
      const harvestTwoBlockRelease = (harvestTwoBlock - currentBlock) * BSC_BLOCK_TIME
      const harvestThreeBlockRelease = (harvestThreeBlock - currentBlock) * BSC_BLOCK_TIME
      const harvestFourBlockRelease = (harvestFourBlock - currentBlock) * BSC_BLOCK_TIME

      setState({
        isLoading: currentBlock === 0,
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
        raisingAmount: new BigNumber(raisingAmount),
        totalAmount: new BigNumber(totalAmount),
        status,
        progress,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
        harvestOneBlockRelease,
        harvestTwoBlockRelease,
        harvestThreeBlockRelease,
        harvestFourBlockRelease,
      })
    }

    fetchProgress()
  }, [currentBlock, contract, releaseBlockNumber, setState, start, address])

  const isActive = state.status === 'live'
  const isFinished = state.status === 'finished'
  const ContributeCard = currencyAddress === ZERO_ADDRESS ? IfoCardBNBContribute : IfoCardContribute

  return (
    <StyledIfoCard ifoId={id} ribbon={Ribbon} isActive={isActive}>
      <CardBody>
        <IfoCardHeader ifoId={id} name={name} subTitle={subTitle} />
        <IfoCardProgress progress={state.progress} />
        {vesting && (
          <IfoCardTime
            isComingSoon={!address}
            isLoading={state.isLoading}
            status={state.status}
            secondsUntilStart={state.secondsUntilStart}
            secondsUntilEnd={state.secondsUntilEnd}
            block={isActive || isFinished ? state.endBlockNum : state.startBlockNum}
          />
        )}
        {!account && <UnlockButton fullWidth />}
        {(isActive || isFinished) && vesting && (
          <ContributeCard
            address={address}
            currency={currency}
            currencyAddress={currencyAddress}
            contract={contract}
            status={state.status}
            raisingAmount={state.raisingAmount}
            tokenDecimals={tokenDecimals}
            totalAmount={state.totalAmount}
            notLp={notLp}
            harvestTwoBlockRelease={state.harvestTwoBlockRelease}
            harvestThreeBlockRelease={state.harvestThreeBlockRelease}
            harvestFourBlockRelease={state.harvestFourBlockRelease}
          />
        )}
        <IfoCardDetails
          launchDate={launchDate}
          launchTime={launchTime}
          saleAmount={saleAmount}
          raiseAmount={raiseAmount}
          bananaToBurn={bananaToBurn}
          projectSiteUrl={projectSiteUrl}
          raisingAmount={state.raisingAmount}
          totalAmount={state.totalAmount}
          burnedTxUrl={burnedTxUrl}
          address={address}
        />
        <IfoCardDescription description={description} />
      </CardBody>
    </StyledIfoCard>
  )
}

export default IfoCard
