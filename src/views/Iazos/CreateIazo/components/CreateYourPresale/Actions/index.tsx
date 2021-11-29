import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import useIazoAllowance from 'views/Iazos/hooks/useIazoAllowance'
import { useIazoFactoryAddress } from 'hooks/useAddress'
import ApproveCreateIazo from './ApproveCreateIazo'
import CreatePresale from './CreatePresale'
import Validations from '../Validations'
import { PresaleData } from '../types'

interface ActionsProps {
  presaleData: PresaleData
  creationFee: string
}

const ActionWrapper = styled.div`
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 450px;
  }
`
const Actions: React.FC<ActionsProps> = ({ presaleData, creationFee }) => {
  const { pairCreation } = presaleData
  const { tokenAddress } = pairCreation
  const [validated, setValidated] = useState(true)
  const [pendingApproved, setPendingApproved] = useState(true)
  const iazoFactoryAddress = useIazoFactoryAddress()
  const approved = useIazoAllowance(tokenAddress, iazoFactoryAddress, pendingApproved)?.gt(0)

  const onPendingApproved = useCallback((pendingTrx: boolean) => {
    setPendingApproved(pendingTrx)
  }, [])

  const onValidationChange = useCallback((valid: boolean) => {
    setValidated(valid)
  }, [])

  return (
    <>
      <ActionWrapper>
        <ApproveCreateIazo
          tokenAddress={tokenAddress}
          disabled={validated}
          approved={approved}
          onPendingApproved={onPendingApproved}
        />
        <CreatePresale presaleData={presaleData} disabled={validated || !approved} creationFee={creationFee}/>
      </ActionWrapper>
      <Validations presaleData={presaleData} onValidationChange={onValidationChange} />
    </>
  )
}

export default Actions
