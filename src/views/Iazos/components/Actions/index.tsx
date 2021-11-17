import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { Text, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import useIazoAllowance from 'views/Iazos/hooks/useIazoAllowance'
import { IazoTokenInfo } from 'state/types'
import ApproveIazo from './ApproveIazo'
import CommitToIazo from './CommitToIazo'

interface ActionsProps {
  iazoAddress: string
  baseToken: IazoTokenInfo
}

const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 50px;
`
const Actions: React.FC<ActionsProps> = ({ iazoAddress, baseToken }) => {
  const { address } = baseToken
  const approved = useIazoAllowance(address, iazoAddress)?.gt(0)
  console.log(approved)
  return (
    <ActionWrapper>
      {approved ? (
        <CommitToIazo baseToken={baseToken} iazoAddress={iazoAddress} />
      ) : (
        <ApproveIazo tokenAddress={address} iazoAddress={iazoAddress} />
      )}
    </ActionWrapper>
  )
}

export default Actions
