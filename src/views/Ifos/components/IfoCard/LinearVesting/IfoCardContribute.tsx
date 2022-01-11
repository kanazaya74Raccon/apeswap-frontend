import React, { useState } from 'react'
import { Text } from '@apeswapfinance/uikit'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { ZERO_ADDRESS } from 'config'

import { ApproveButton, VestingClaimButton, Claim, TextWrapRow } from './styles'
import ContributeInput from '../ContributeInput/ContributeInput'
import useLinearIAOHarvest from '../../../hooks/useLinearIAOHarvest'

export interface Props {
  account: string
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  amountContributed: number
  userTokenStatus: {
    stakeTokenHarvest: number
    offeringTokenTotalHarvest: number
    offeringTokenInitialHarvest: number
    offeringTokensVested: number
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
  contract,
  amountContributed,
  isFinished,
  isActive,
  userTokenStatus,
}) => {
  const [pendingTx, setPendingTx] = useState(false)

  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)
  const onClaim = useLinearIAOHarvest(contract, setPendingTx)

  if (currencyAddress !== ZERO_ADDRESS && allowance === null) {
    return null
  }

  if (isActive && currencyAddress !== ZERO_ADDRESS && allowance <= 0) {
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
      {isFinished && amountContributed > 0 && (
        <VestingClaimButton disabled={!userTokenStatus.offeringTokenTotalHarvest || pendingTx} onClick={onClaim}>
          <Claim color="white">Claim</Claim>
        </VestingClaimButton>
      )}
    </>
  )
}

export default IfoCardContribute
