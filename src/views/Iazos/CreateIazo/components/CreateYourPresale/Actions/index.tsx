import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { Text, ButtonSquare } from '@apeswapfinance/uikit'
import 'react-datepicker/dist/react-datepicker.css'
import ApproveCreateIazo from './ApproveCreateIazo'
import CreatePresale from './CreatePresale'
import { PresaleData } from '../types'

interface ActionsProps {
  presaleData: PresaleData
}

const ActionWrapper = styled.div`
  width: 450px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid red;
  margin-top: 50px;
  margin-bottom: 100px;
`
const Actions: React.FC<ActionsProps> = ({ presaleData }) => {
  const { pairCreation } = presaleData
  const { tokenAddress } = pairCreation
  return (
    <ActionWrapper>
      <ApproveCreateIazo tokenAddress={tokenAddress} />
      <CreatePresale presaleData={presaleData} />
    </ActionWrapper>
  )
}

export default Actions
