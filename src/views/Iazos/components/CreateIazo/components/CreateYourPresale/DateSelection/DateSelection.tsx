import React, { useEffect, useState } from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import DateSelectionButton from './DateSelectionButton'
import { DateObject } from '../types'
import {
  DateContainer,
  StyledHeader,
  StyledText,
  StyledSubText,
  TextContainer,
  DateButtonContainer,
  DateSelectionContainer,
} from './styles'

interface DateSelectorProps {
  onChange: (dates: DateObject) => void
}

const formatDate = (date: Date) => {
  const [weekDay, month, dayNumber, year] = date?.toDateString().split(' ')
  const time = date?.toTimeString().split(' ')
  return `${weekDay} ${dayNumber} ${month} ${year} ${time[0]}`
}

const formatCountdown = (startDate, endDate, duration?) => {
  const timeUntil = getTimePeriods(Math.abs(endDate - startDate) / 1000)
  return `${duration ? 'Last for' : 'Starts in'} ${timeUntil?.months} months ${timeUntil?.days} days ${
    timeUntil?.hours
  } hours`
}

const DateSelection: React.FC<DateSelectorProps> = ({ onChange }) => {
  const delayedDate = new Date(new Date().setDate(new Date().getDate() + 10))
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
          <StyledText>
            {dateState.start > dateState.end ? formatDate(dateState.start) : formatDate(dateState.end)}
          </StyledText>
          <StyledSubText>
            {dateState.start > dateState.end
              ? formatCountdown(new Date(), dateState.start, true)
              : formatCountdown(dateState.start, dateState.end, true)}
          </StyledSubText>
        </TextContainer>
        <DateButtonContainer>
          <DateSelectionButton
            minDate={dateState.start}
            onChange={(date) => setDateState({ ...dateState, end: date })}
          />
        </DateButtonContainer>
      </DateSelectionContainer>
    </DateContainer>
  )
}

export default React.memo(DateSelection)
