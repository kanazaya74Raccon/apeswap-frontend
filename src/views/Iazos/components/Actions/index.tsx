import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import useIazoAllowance from 'views/Iazos/hooks/useIazoAllowance'
import { IazoTokenInfo } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import { getNativeWrappedAddress } from 'utils/addressHelper'
import ApproveIazo from './ApproveIazo'
import CommitToIazo from './CommitToIazo'

interface ActionsProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
  disabled?: boolean
  onPendingContribute: (pendingTrx: boolean) => void
}

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 50px;
`
const Actions: React.FC<ActionsProps> = ({ iazoAddress, baseToken, onPendingContribute, disabled }) => {
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
        />
      ) : (
        <ApproveIazo tokenAddress={address} iazoAddress={iazoAddress} onApproveChange={onApprove} />
      )}
    </ActionWrapper>
  )
}

export default React.memo(Actions)
