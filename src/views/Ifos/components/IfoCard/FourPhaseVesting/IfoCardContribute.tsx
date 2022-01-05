import React, { useState } from 'react'
import { Button, Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import getTimePeriods from 'utils/getTimePeriods'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { getBalanceNumber } from 'utils/formatBalance'
import { ZERO_ADDRESS } from 'config'
import { CHAIN_ID } from 'config/constants'
import track from 'utils/track'
import useUserInfo from './useUserInfo'
import { VestingButtonWrapper, VestingClaimButton, Claim, DisplayVestingTime, TextWrapRow } from './styles'

import ContributeInput from '../ContributeInput/ContributeInput'

export interface Props {
  account: string
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  amountContributed: number
  tokenDecimals: number
  isActive?: boolean
  isFinished?: boolean
}

const formatTime = (time: any): string => {
  return `${time.days}d - ${time.hours}h - ${time.minutes}m`
}

const IfoCardContribute: React.FC<Props> = ({
  address,
  currency,
  currencyAddress,
  contract,
  tokenDecimals,
  isFinished,
}) => {
  const [pendingTx, setPendingTx] = useState(false)

  const { account } = useWeb3React()

  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)

  const { userTokenStatus, harvestBlockReleases, userInfo, userHarvestedFlags } = useUserInfo(
    contract,
    tokenDecimals,
    address,
  )

  const harvestTwoTime = getTimePeriods(harvestBlockReleases.two, true)
  const harvestThreeTime = getTimePeriods(harvestBlockReleases.three, true)
  const harvestFourTime = getTimePeriods(harvestBlockReleases.four, true)

  if (currencyAddress !== ZERO_ADDRESS && allowance === null) {
    return null
  }

  if (currencyAddress !== ZERO_ADDRESS && allowance <= 0) {
    return (
      <Button
        fullWidth
        disabled={pendingTx}
        variant="yellow"
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

  const amountContributed = getBalanceNumber(new BigNumber(userInfo.amount.toString()))

  const tokensHarvestedAvailable = getBalanceNumber(
    new BigNumber(userTokenStatus?.offeringTokenHarvest.toString()),
    tokenDecimals,
  )
  const tokensVested = getBalanceNumber(new BigNumber(userTokenStatus?.offeringTokensVested.toString()), tokenDecimals)

  const claim = async (harvestPeriod: number) => {
    setPendingTx(true)
    const tx = await contract.methods.harvest(harvestPeriod).send({ from: account })
    setPendingTx(false)
    track({
      event: 'iao',
      chain: CHAIN_ID,
      data: {
        amount: tokensHarvestedAvailable,
        cat: 'claim',
        instance: harvestPeriod,
        contract: tx.to,
      },
    })
  }

  return (
    <>
      {!isFinished && account && (
        <>
          <ContributeInput
            currency={currency}
            contract={contract}
            currencyAddress={currencyAddress}
            disabled={pendingTx}
          />
          {amountContributed > 0 && (
            <TextWrapRow>
              <Text fontSize="14px" color="textSubtle" fontWeight={700}>
                Your contributions:
              </Text>
              <Text fontSize="14px" color="textSubtle" fontWeight={700}>
                {amountContributed.toFixed(4)} {currency}
              </Text>
            </TextWrapRow>
          )}
        </>
      )}
      {isFinished && (
        <>
          <VestingButtonWrapper>
            {amountContributed > 0 && (
              <>
                <VestingClaimButton disabled={userHarvestedFlags[0]} onClick={() => claim(0)}>
                  {userHarvestedFlags[0] ? <Claim>Claimed</Claim> : <Claim color="white">Claim</Claim>}
                </VestingClaimButton>
                {(tokensVested > 0 || tokensHarvestedAvailable > 0) && (
                  <>
                    <VestingClaimButton
                      disabled={harvestBlockReleases.two > 0 || userHarvestedFlags[1]}
                      onClick={() => claim(1)}
                    >
                      {userHarvestedFlags[1] && harvestBlockReleases.two < 0 && <Claim>Claimed</Claim>}
                      {!userHarvestedFlags[1] && harvestBlockReleases.two < 0 && <Claim color="white">Claim</Claim>}
                      {harvestBlockReleases.two > 0 && (
                        <>
                          <DisplayVestingTime>Vesting Timer</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestTwoTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                    <VestingClaimButton
                      disabled={harvestBlockReleases.three > 0 || userHarvestedFlags[2]}
                      onClick={() => claim(2)}
                    >
                      {userHarvestedFlags[2] && harvestBlockReleases.three < 0 && <Claim>Claimed</Claim>}
                      {!userHarvestedFlags[2] && harvestBlockReleases.three < 0 && <Claim color="white">Claim</Claim>}
                      {harvestBlockReleases.three > 0 && (
                        <>
                          <DisplayVestingTime>Vesting Timer</DisplayVestingTime>
                          <DisplayVestingTime>{formatTime(harvestThreeTime)}</DisplayVestingTime>
                        </>
                      )}
                    </VestingClaimButton>
                    <VestingClaimButton
                      disabled={harvestBlockReleases.four > 0 || userHarvestedFlags[3]}
                      onClick={() => claim(3)}
                    >
                      {userHarvestedFlags[3] && harvestBlockReleases.four < 0 && <Claim>Claimed</Claim>}
                      {!userHarvestedFlags[3] && harvestBlockReleases.four < 0 && <Claim color="white">Claim</Claim>}
                      {harvestBlockReleases.four > 0 && (
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
        </>
      )}
    </>
  )
}

export default IfoCardContribute
