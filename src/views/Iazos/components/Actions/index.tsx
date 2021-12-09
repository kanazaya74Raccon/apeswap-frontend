import React, { useState } from 'react'
import useIazoAllowance from 'views/Iazos/hooks/useIazoAllowance'
import { IazoTokenInfo } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import { getNativeWrappedAddress } from 'utils/addressHelper'
import ApproveIazo from './ApproveIazo'
import CommitToIazo from './CommitToIazo'
import { ActionWrapper } from './styles'

interface ActionsProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
  disabled?: boolean
  maxSpendFormatted: number
  onPendingContribute: (pendingTrx: boolean) => void
}

const Actions: React.FC<ActionsProps> = ({
  iazoAddress,
  baseToken,
  onPendingContribute,
  disabled,
  maxSpendFormatted,
}) => {
  const { address } = baseToken
  const [approveTrx, setApproveTrx] = useState(false)
  const approved = useIazoAllowance(address, iazoAddress, approveTrx)?.gt(0)
  const chainId = useNetworkChainId()
  const isNative = address.toLowerCase() === getNativeWrappedAddress(chainId).toLowerCase()
  const onApprove = (pendingTrx: boolean) => {
    setApproveTrx(pendingTrx)
  }

  return (
    <ActionWrapper>
      {approved || isNative ? (
        <CommitToIazo
          baseToken={baseToken}
          iazoAddress={iazoAddress}
          isNative={isNative}
          onPendingContribute={onPendingContribute}
          disabled={disabled}
          maxSpendFormatted={maxSpendFormatted}
        />
      ) : (
        <ApproveIazo tokenAddress={address} iazoAddress={iazoAddress} onApproveChange={onApprove} />
      )}
    </ActionWrapper>
  )
}

export default React.memo(Actions)
