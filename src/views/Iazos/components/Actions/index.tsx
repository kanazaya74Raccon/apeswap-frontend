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
  const chainId = useNetworkChainId()
  const approved = useIazoAllowance(address, iazoAddress)?.gt(0)
  const isNative = address === getNativeWrappedAddress(chainId)
  console.log(approved)
  return (
    <ActionWrapper>
      {approved || isNative ? (
        <CommitToIazo baseToken={baseToken} iazoAddress={iazoAddress} isNative={isNative} />
      ) : (
        <ApproveIazo tokenAddress={address} iazoAddress={iazoAddress} />
      )}
    </ActionWrapper>
  )
}

export default Actions
