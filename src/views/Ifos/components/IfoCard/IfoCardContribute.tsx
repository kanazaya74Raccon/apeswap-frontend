import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ifoAbi from 'config/abi/ifo.json'
import { useModal, Button, Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { getMulticallAddress } from 'utils/addressHelper'
import { useNetworkChainId } from 'state/hooks'
import getTimePeriods from 'utils/getTimePeriods'
import multicall from 'utils/multicall'
import useRefresh from 'hooks/useRefresh'
import { Contract } from 'ethers'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { IfoStatus } from 'config/constants/types'
import { getBalanceNumber } from 'utils/formatBalance'
import track from 'utils/track'
import LabelButton from './LabelButton'
import ContributeModal from './ContributeModal'

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
  harvestTwoBlockRelease: number
  harvestThreeBlockRelease: number
  harvestFourBlockRelease: number
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

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  status,
  raisingAmount,
  totalAmount,
  tokenDecimals,
  notLp,
  harvestTwoBlockRelease,
  harvestThreeBlockRelease,
  harvestFourBlockRelease,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userAllocation, setAllocation] = useState(0)
  const [userInfo, setUserInfo] = useState({ amount: new BigNumber(0), refunded: false })
  const [userHarvestedFlags, setUserHarvestedFlags] = useState([true, true, true, true])
  const [userTokenStatus, setUserTokenStatus] = useState({
    stakeTokenHarvest: new BigNumber(0),
    offeringTokenHarvest: new BigNumber(0),
    offeringTokensVested: new BigNumber(0),
  })

  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)
  const [onPresentContributeModal] = useModal(
    <ContributeModal currency={currency} contract={contract} currencyAddress={currencyAddress} notLp={notLp} />,
  )
  const harvestTwoTime = getTimePeriods(harvestTwoBlockRelease, true)
  const harvestThreeTime = getTimePeriods(harvestThreeBlockRelease, true)
  const harvestFourTime = getTimePeriods(harvestFourBlockRelease, true)
  const chainId = useNetworkChainId()
  const multicallAddress = getMulticallAddress(chainId)

  useEffect(() => {
    const fetch = async () => {
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
        {
          address,
          name: 'hasHarvested',
          params: [account, 0],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 1],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 2],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 3],
        },
      ]

      const [
        balance,
        userinfo,
        allocation,
        userTokens,
        harvestOneFlag,
        harvestTwoFlag,
        harvestThreeFlag,
        harvestFourFlag,
      ] = await multicall(chainId, ifoAbi, calls)
      setUserInfo(userinfo)
      setAllocation(allocation / 1e10)
      setOfferingTokenBalance(new BigNumber(balance))
      setUserTokenStatus(userTokens)
      setUserHarvestedFlags([harvestOneFlag[0], harvestTwoFlag[0], harvestThreeFlag[0], harvestFourFlag[0]])
    }

    if (account) {
      fetch()
    }
  }, [account, contract, address, pendingTx, slowRefresh, multicallAddress, chainId])

  if (allowance === null) {
    return null
  }

  const claim = async (harvestPeriod: number) => {
    setPendingTx(true)
    const tx = await contract.harvest(harvestPeriod).send({ from: account })
    setPendingTx(false)
    track({
      event: 'iao',
      chain: chainId,
      data: {
        amount: tokensHarvestedAvailable,
        cat: 'claim',
        instance: harvestPeriod,
        contract: tx.to,
      },
    })
  }
  const isFinished = status === 'finished'
  const overSubscribed = totalAmount.gte(raisingAmount)
  const amountContributed = getBalanceNumber(new BigNumber(userInfo.amount.toString()))
  const percentOfUserContribution = overSubscribed
    ? userAllocation
    : new BigNumber(userInfo.amount.toString()).div(raisingAmount).times(100)

  const tokensHarvestedAvailable = getBalanceNumber(
    new BigNumber(userTokenStatus?.offeringTokenHarvest.toString()),
    tokenDecimals,
  )
  const tokensVested = getBalanceNumber(new BigNumber(userTokenStatus?.offeringTokensVested.toString()), tokenDecimals)
  const totalTokensHarvested =
    getBalanceNumber(offeringTokenBalance, tokenDecimals) - (tokensVested + tokensHarvestedAvailable)

  if (allowance <= 0) {
    return (
      <Button
        fullWidth
        disabled={pendingTx}
        onClick={async () => {
          try {
            setPendingTx(true)
            await onApprove()
            setPendingTx(false)
          } catch (e) {
            setPendingTx(false)
            console.warn(e)
          }
        }}
      >
        Approve
      </Button>
    )
  }

  return (
    <>
      {!isFinished && (
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
          <Text fontSize="16px" fontFamily="poppins" fontWeight={700} color="textSubtle">
            You&apos;ll be refunded any excess tokens on your first claim
          </Text>
          <VestingButtonWrapper>
            {amountContributed > 0 && (
              <>
                <VestingClaimButton disabled={userHarvestedFlags[0]} onClick={() => claim(0)}>
                  {userHarvestedFlags[0] ? <Claim>Claimed</Claim> : <Claim color="white">Claim</Claim>}
                </VestingClaimButton>
                {(tokensVested > 0 || tokensHarvestedAvailable > 0) && (
                  <>
                    <VestingClaimButton
                      disabled={harvestTwoBlockRelease > 0 || userHarvestedFlags[1]}
                      onClick={() => claim(1)}
                    >
                      {userHarvestedFlags[1] && harvestTwoBlockRelease < 0 && <Claim>Claimed</Claim>}
                      {!userHarvestedFlags[1] && harvestTwoBlockRelease < 0 && <Claim color="white">Claim</Claim>}
                      {harvestTwoBlockRelease > 0 && (
                        <>
                          <DisplayVestingTime>Vesting Timer</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestTwoTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                    <VestingClaimButton
                      disabled={harvestThreeBlockRelease > 0 || userHarvestedFlags[2]}
                      onClick={() => claim(2)}
                    >
                      {userHarvestedFlags[2] && harvestThreeBlockRelease < 0 && <Claim>Claimed</Claim>}
                      {!userHarvestedFlags[2] && harvestThreeBlockRelease < 0 && <Claim color="white">Claim</Claim>}
                      {harvestThreeBlockRelease > 0 && (
                        <>
                          <DisplayVestingTime>Vesting Timer</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestThreeTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                    <VestingClaimButton
                      disabled={harvestFourBlockRelease > 0 || userHarvestedFlags[3]}
                      onClick={() => claim(3)}
                    >
                      {userHarvestedFlags[3] && harvestFourBlockRelease < 0 && <Claim>Claimed</Claim>}
                      {!userHarvestedFlags[3] && harvestFourBlockRelease < 0 && <Claim color="white">Claim</Claim>}
                      {harvestFourBlockRelease > 0 && (
                        <>
                          <DisplayVestingTime>Vesting Timer</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestFourTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                  </>
                )}
              </>
            )}
          </VestingButtonWrapper>
          {amountContributed > 0 && (
            <VestingStatsWrapper>
              <TextWrapRow>
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
              </TextWrapRow>
            </VestingStatsWrapper>
          )}
        </>
      )}
    </>
  )
}

export default IfoCardContribute
