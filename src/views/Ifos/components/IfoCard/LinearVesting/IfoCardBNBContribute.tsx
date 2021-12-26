import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ifoAbi from 'config/abi/ifo.json'
import multicallABI from 'config/abi/Multicall.json'
import { useModal, Text, Button } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import getTimePeriods from 'utils/getTimePeriods'
import { getMulticallAddress } from 'utils/addressHelper'
import { useNetworkChainId } from 'state/hooks'
import multicall from 'utils/multicall'
import { Contract } from 'web3-eth-contract'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import { getContract } from 'utils/web3'
import LabelButton from '../LabelButton'
import ContributeModal from '../ContributeModal'
import IfoCardDetails from './IfoCardDetails'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  status: IfoStatus
  raisingAmount: BigNumber
  totalAmount: BigNumber
  tokenDecimals: number
  notLp?: boolean
}

const VestingButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const VestingClaimButton = styled(Button)`
  width: 120px;
  height: 60px;
  background-color: secondary;
  margin: 10px;
  flex-shrink: 0;
  background: #ffb300;
  padding: 0;
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: #ffb300;
  }
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 140px;
  }
`

const DisplayVestingTime = styled(Text)`
  font-family: Poppins;
  font-size: 11px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 13px;
  }
`

const Claim = styled(Text)`
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`

const TokenAmountRemaining = styled(Text)`
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 18px;
  }
`

const VestingStatsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 10px;
`

const TextWrapRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`

const formatTime = (time: any): string => {
  return `${time.days}d - ${time.hours}h - ${time.minutes}m`
}

const IfoCardBNBContribute: React.FC<Props> = ({
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  totalAmount,
  tokenDecimals,
  address,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userAllocation, setAllocation] = useState(0)
  const [userInfo, setUserInfo] = useState({ amount: new BigNumber(0), refunded: false })
  const chainId = useNetworkChainId()
  const multicallAddress = getMulticallAddress(chainId)
  const [userTokenStatus, setUserTokenStatus] = useState({
    stakeTokenHarvest: 0,
    offeringTokenTotalHarvest: 0,
    offeringTokenInitialHarvest: 0,
    offeringTokensVested: 0,
    offeringTokenVestedHarvest: 0,
  })
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} notLp />,
  )

  // const harvestTwoTime = getTimePeriods(harvestTwoBlockRelease, true)

  useEffect(() => {
    const fetch = async () => {
      const multicallContract = getContract(multicallABI, multicallAddress, chainId)
      const calls = [
        {
          address,
          name: 'getOfferingAmount',
          params: [account],
        },
        {
          address,
          name: 'userInfo',
          params: [account],
        },
        {
          address,
          name: 'getUserAllocation',
          params: [account],
        },
        {
          address,
          name: 'userTokenStatus',
          params: [account],
        },
      ]

      const [balance, userinfo, allocation, userTokens] = await multicall(multicallContract, ifoAbi, calls)
      setUserInfo(userinfo)
      setAllocation(allocation / 1e10)
      setOfferingTokenBalance(new BigNumber(balance))
      setUserTokenStatus({
        stakeTokenHarvest: getBalanceNumber(new BigNumber(userTokens?.stakeTokenHarvest.toString()), tokenDecimals),
        offeringTokenTotalHarvest: getBalanceNumber(
          new BigNumber(userTokens?.offeringTokenTotalHarvest.toString()),
          tokenDecimals,
        ),
        offeringTokenInitialHarvest: getBalanceNumber(
          new BigNumber(userTokens?.offeringTokenInitialHarvest.toString()),
          tokenDecimals,
        ),
        offeringTokenVestedHarvest: getBalanceNumber(
          new BigNumber(userTokens?.offeringTokenVestedHarvest.toString()),
          tokenDecimals,
        ),
        offeringTokensVested: getBalanceNumber(
          new BigNumber(userTokens?.offeringTokensVested.toString()),
          tokenDecimals,
        ),
      })
    }

    if (account) {
      fetch()
    }
  }, [account, contract, address, pendingTx, fastRefresh, multicallAddress, chainId, tokenDecimals])

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.harvest().send({ from: account })
    setPendingTx(false)
  }

  const isFinished = status === 'finished'
  const overSubscribed = totalAmount.gte(raisingAmount)
  const amountContributed = getBalanceNumber(new BigNumber(userInfo.amount.toString()))
  const percentOfUserContribution = overSubscribed
    ? userAllocation
    : new BigNumber(userInfo.amount.toString()).div(raisingAmount).times(100)

  return (
    <>
      {!isFinished && account && (
        <>
          <LabelButton
            disabled={pendingTx || userInfo.refunded}
            buttonLabel="Contribute"
            label={`Your contribution (${currency})`}
            value={amountContributed.toFixed(4)}
            onClick={onPresentContributeModal}
          />
          <Text fontSize="14px" color="textSubtle">
            {percentOfUserContribution.toFixed(5)}% of total allocation
          </Text>
        </>
      )}
      {isFinished && (
        <>
          <Text fontSize="16px" fontFamily="poppins" fontWeight={700} color="textSubtle" margin="10px 0 10px 0">
            You&apos;ll be refunded any excess tokens on your first claim
          </Text>
          <VestingButtonWrapper>
            {amountContributed > 0 && (
              <>
                <VestingClaimButton disabled={userTokenStatus.offeringTokenVestedHarvest > 0} onClick={() => claim()}>
                  <Claim color="white">Claim</Claim>
                </VestingClaimButton>
              </>
            )}
          </VestingButtonWrapper>
          {amountContributed > 0 && (
            <VestingStatsWrapper>
              {/* <TextWrapRow>
                <TokenAmountRemaining>Tokens available to harvest:</TokenAmountRemaining>
                <TokenAmountRemaining>{tokensHarvestedAvailable.toFixed(4)}</TokenAmountRemaining>
              </TextWrapRow>
              <TextWrapRow>
                <TokenAmountRemaining>Tokens vested:</TokenAmountRemaining>
                <TokenAmountRemaining>{tokensVested.toFixed(4)}</TokenAmountRemaining>
              </TextWrapRow>
              <TextWrapRow>
                <TokenAmountRemaining>Tokens harvested:</TokenAmountRemaining>
                <TokenAmountRemaining>{totalTokensHarvested.toFixed(4)}</TokenAmountRemaining>
              </TextWrapRow> */}
            </VestingStatsWrapper>
          )}
        </>
      )}
      {/* TODO: Based on the harvest status, change this to reveal the harvest status per design */}
      <IfoCardDetails stats={[]} />
    </>
  )
}

export default IfoCardBNBContribute
