import React from 'react'
import styled from 'styled-components'
import { Text, Progress } from '@apeswapfinance/uikit'

interface IfoCardProgressProps {
  progress: number
  amountLabel?: string
  timeLabel?: string
}

const StyledProgress = styled.div`
  margin-bottom: 16px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  align-items: center;
  width: 100%;
`

const ProgressBar = styled.div`
  width: 100%;
`

const Label = styled(Text)`
  font-weight: 700;
`

const IfoCardProgress: React.FC<IfoCardProgressProps> = ({ progress, amountLabel, timeLabel }) => {
  return (
    <StyledProgress>
      {!!amountLabel && <Label fontSize="16px">{amountLabel}</Label>}
      <ProgressBar><Progress primaryStep={progress} /></ProgressBar>
      {!!timeLabel && <Label fontSize="12px">{timeLabel}</Label>}
    </StyledProgress>
  )
}

export default IfoCardProgress
