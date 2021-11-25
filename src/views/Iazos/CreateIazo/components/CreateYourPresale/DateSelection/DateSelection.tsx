import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import DateSelectionButton from './DateSelectionButton'
import { DateObject } from '../types'

interface DateSelectorProps {
  onChange: (dates: DateObject) => void
}

const DateContainer = styled.div`
  width: 300px;
  border-radius: 10px;
  background: #333333;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 24px;
  font-style: normal;
  line-height: 27px;
  font-weight: 700;
  color: #ffffff;
  margin-top: 25px;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.05em;
  text-align: left;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 22px;
  }
`

const StyledSubText = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  line-height: 24px;
  color: #ffffff;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  aling-items: flex-start;
  height 80px;
  width: 300px;
  margin-left: 35px;
`

const DateButtonContainer = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  justify-content: flex-end;
  z-index: 1;
`

const DateSelectionContainer = styled.div`
  position: relative;
  display: flex;
  height: 135px;
  background: #414141;
  width: 280px;
  border-radius: 10px;
  margin-top: 15px;
  align-items: center;
  margin-bottom: 20px;
  z-index: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
  }
`

const formatDate = (date: Date) => {
  return `${date?.getMonth() + 1} ${date?.getDate()} ${date?.getFullYear()}`
}

const formatCountdown = (startDate, endDate) => {
  const timeUntil = getTimePeriods(Math.abs(endDate - startDate) / 1000)
  return `in ${timeUntil?.months} months ${timeUntil?.days} days ${timeUntil?.hours} hours`
}

const DateSelection: React.FC<DateSelectorProps> = ({ onChange }) => {
  const delayedDate = new Date(new Date().setDate(new Date().getDate() + 0))
  const [dateState, setDateState] = useState<DateObject>({ start: delayedDate, end: delayedDate })

  useEffect(() => {
    onChange(dateState)
  }, [dateState, onChange])

  return (
    <DateContainer>
      <StyledHeader>Start Date</StyledHeader>
      <DateSelectionContainer>
        <TextContainer>
          <StyledText>{formatDate(dateState.start)}</StyledText>
          <StyledSubText>{formatCountdown(new Date(), dateState.start)}</StyledSubText>
        </TextContainer>
        <DateButtonContainer>
          <DateSelectionButton onChange={(date) => setDateState({ ...dateState, start: date })} />
        </DateButtonContainer>
      </DateSelectionContainer>
      <StyledHeader>End Date</StyledHeader>
      <DateSelectionContainer>
        <TextContainer>
          <StyledText>{formatDate(dateState.end)}</StyledText>
          <StyledSubText>{formatCountdown(dateState.start, dateState.end)}</StyledSubText>
        </TextContainer>
        <DateButtonContainer>
          <DateSelectionButton onChange={(date) => setDateState({ ...dateState, end: date })} />
        </DateButtonContainer>
      </DateSelectionContainer>
    </DateContainer>
  )
}

export default React.memo(DateSelection)
