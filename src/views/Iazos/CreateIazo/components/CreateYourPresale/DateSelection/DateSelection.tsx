import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import TextInput from 'components/TextInput'
import DateSelectionButton from './DateSelectionButton'

const LaunchPadInfoWrapper = styled.div`
  width: 796px;
  border-radius: 10px;
  background: #333333;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 24px;
  font-style: normal;
  line-height: 27px;
  color: #ffffff;
  margin-top: 25px;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0.05em;
  text-align: left;
`

const StyledSubText = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
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
  width: 686px;
  border-radius: 10px;
  margin-top: 15px;
  align-items: center;
  margin-bottom: 20px;
  z-index: 0;
`

const formatDate = (date: Date) => {
  return `${date?.getDay()} ${date?.getMonth()} ${date?.getFullYear()}`
}

const formatCountdown = (startDate, endDate) => {
  const timeUntil = new Date(Math.abs(endDate - startDate))
  return `in ${timeUntil?.getMonth()} months ${timeUntil?.getDay()} days ${timeUntil?.getHours()} hours`
}

const TokenDropdown: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>Start Date</StyledHeader>
        <DateSelectionContainer>
          <TextContainer>
            <StyledText>{formatDate(startDate)}</StyledText>
            <StyledSubText>{formatCountdown(new Date(), startDate)}</StyledSubText>
          </TextContainer>
          <DateButtonContainer>
            <DateSelectionButton onChange={(date) => setStartDate(date)} />
          </DateButtonContainer>
        </DateSelectionContainer>
        <StyledHeader>End Date</StyledHeader>
        <DateSelectionContainer>
          <TextContainer>
            <StyledText>{formatDate(endDate)}</StyledText>
            <StyledSubText>{formatCountdown(startDate, endDate)}</StyledSubText>
          </TextContainer>
          <DateButtonContainer>
            <DateSelectionButton onChange={(date) => setEndDate(date)} />
          </DateButtonContainer>
        </DateSelectionContainer>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default TokenDropdown
