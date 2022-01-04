import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Text } from '@apeswapfinance/uikit'
import { Contract } from 'web3-eth-contract'
import { useERC20 } from 'hooks/useContract'
import { useIfoAllowance } from 'hooks/useAllowance'
import { useIfoApprove } from 'hooks/useApprove'
import { ZERO_ADDRESS } from 'config'

import ContributeInput from '../ContributeInput'

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

const VestingClaimButton = styled(Button)`
  width: 220px;
  height: 44px;
  background-color: secondary;
  margin: 0 auto;
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
  text-transform: uppercase;
`

const Claim = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 20px;
  }
`

const TextWrapRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`

const IfoCardContribute: React.FC<Props> = ({
  account,
  address,
  currency,
  currencyAddress,
  contract,
  amountContributed,
  isFinished,
  userTokenStatus,
}) => {
  const [pendingTx, setPendingTx] = useState(false)

  const contractRaisingToken = useERC20(currencyAddress)
  const allowance = useIfoAllowance(contractRaisingToken, address, pendingTx)
  const onApprove = useIfoApprove(contractRaisingToken, address)

  const claim = async () => {
    setPendingTx(true)
    await contract.methods.harvest().send({ from: account })
    setPendingTx(false)
  }

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
        <VestingClaimButton disabled={!userTokenStatus.offeringTokenTotalHarvest} onClick={() => claim()}>
          <Claim color="white">Claim</Claim>
        </VestingClaimButton>
      )}
    </>
  )
}

export default IfoCardContribute
