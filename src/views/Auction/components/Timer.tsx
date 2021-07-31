import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

const StyledTimeWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 134px;
  height: 38px;
  right: 0px;
  top: 20px;
  background: #ffb300;
  border-radius: 50px 0px 0px 50px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 176px;
    height: 49px;
  }
`

const HourGlass = styled.div`
  position: absolute;
  width: 31px;
  height: 31px;
  background-image: url(/images/hourglass-sm.svg);
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 4px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 176px;
    height: 49px;
    background-image: url(/images/hourglass-lg.svg);
    width: 40px;
    height: 40px;
    margin-left: 8px;
  }
`

const TimerText = styled(Text)`
  position: absolute;
  width: 101px;
  height: 32px;
  margin-left: 42px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 31px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  color: #ffffff;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 101px;
    height: 32px;
    margin-left: 65px;
    font-size: 21px;
  }
`

interface TimerProps {
  countdown: any
}

const formatCountdown = (countdown: any): string => {
  const formatHours = countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours.toString()
  const formatMinutes = countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes.toString()
  const formatSeconds = countdown.seconds < 10 ? `0${countdown.seconds.toFixed(0)}` : countdown.seconds.toFixed(0)
  return `${formatHours}:${formatMinutes}:${formatSeconds}`
}

const Timer: React.FC<TimerProps> = ({ countdown }) => {
  const formatTimer = formatCountdown(countdown)
  return (
    <StyledTimeWrapper>
      <HourGlass />
      <TimerText>{countdown.seconds > 0 ? formatTimer : 'Finished'}</TimerText>
    </StyledTimeWrapper>
  )
}

export default Timer
