import React, { useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useSafeIfoContract } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { ZERO_ADDRESS } from 'config'
import BigNumber from 'bignumber.js'

import useTokenBalance from 'hooks/useTokenBalance'
import { ApproveButton, VestingClaimButton, Claim, TextWrapRow } from './styles'
import ContributeInput from '../ContributeInput/ContributeInput'
import useLinearIAOHarvest from '../../../hooks/useLinearIAOHarvest'

export interface Props {
  account: string
  address: string
  currency: string
  currencyAddress: string
  amountContributed: number
  userTokenStatus: {
    stakeTokenHarvest: number
    offeringTokenTotalHarvest: number
    offeringTokenInitialHarvest: number
    offeringTokensVesting: number
    offeringTokenVestedHarvest: number
  }
  tokenDecimals: number
  refunded: boolean
  isActive?: boolean
  isFinished?: boolean
}

const IfoCardContribute: React.FC<Props> = ({
  account,
  address,
  currency,
  currencyAddress,
  amountContributed,
  isFinished,
  isActive,
  userTokenStatus,
}) => {
  const [pendingTx, setPendingTx] = useState(false)
  const contract = useSafeIfoContract(address, true)

  const allowance = useIfoAllowance(currencyAddress, address, pendingTx)
  const onApprove = useIfoApprove(currencyAddress, address)
  const tokenBalance = useTokenBalance(currencyAddress)
  const onClaim = useLinearIAOHarvest(contract, setPendingTx)

  if (currencyAddress !== ZERO_ADDRESS && allowance === null) {
    return null
  }

  if (
    isActive &&
    currencyAddress !== ZERO_ADDRESS &&
    (allowance.isLessThanOrEqualTo(new BigNumber('0')) || allowance.isLessThan(tokenBalance))
  ) {
    return (
      <ApproveButton
        disabled={pendingTx}
        variant="yellow"
        onClick={async () => {
          try {
            setPendingTx(true)
            await onApprove()
          } catch (e) {
            console.warn(e)
          }
          setPendingTx(false)
        }}
      >
        APPROVE
      </ApproveButton>
    )
  }

  return (
    <>
      {!isFinished && account && (
        <>
          <ContributeInput
            currency={currency}
            contract={contract}
            tokenBalance={tokenBalance}
            currencyAddress={currencyAddress}
            disabled={pendingTx}
          />
          {amountContributed > 0 && (
            <TextWrapRow>
              <Text fontSize="14px" color="gray" fontWeight={700}>
                Your contributions:
              </Text>
              <Text fontSize="14px" color="gray" fontWeight={700}>
                {amountContributed.toFixed(4)} {currency}
              </Text>
            </TextWrapRow>
          )}
        </>
      )}
      {isFinished && amountContributed > 0 && (
        <VestingClaimButton
          disabled={!userTokenStatus.offeringTokenTotalHarvest || pendingTx}
          onClick={async () => onClaim(userTokenStatus.offeringTokenTotalHarvest)}
        >
          <Claim color="white">Claim</Claim>
        </VestingClaimButton>
      )}
    </>
  )
}

export default IfoCardContribute
