import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import { Text, ButtonSquare } from '@apeswapfinance/uikit'

import 'react-datepicker/dist/react-datepicker.css'

interface DateSelectionProps {
  onChange: (date: Date) => void
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 200px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
`

const ApproveCreateIazo: React.FC = () => {
  return (
    <>
      <StyledButton>APPROVE</StyledButton>
    </>
  )
}

export default ApproveCreateIazo
