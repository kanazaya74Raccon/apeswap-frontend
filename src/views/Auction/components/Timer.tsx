import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

const StyledTimeWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  width: 176px;
  right: 0px;
  top: 0px;
  height: 49px;
  background: #ffb300;
  border-radius: 50px 0px 0px 50px;
  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 30px;
    margin-top: 20px;
  }
`

const HourGlass = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-image: url(/images/hourglass.svg);
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 8px;
`

const TimerText = styled(Text)`
  position: absolute;
  width: 101px;
  height: 32px;
  margin-left: 65px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  font-size: 21px;
  line-height: 31px;
  display: flex;
  align-items: center;
  letter-spacing: 0.05em;
  color: #ffffff;
`

interface TimerProps {
  countdown: any
}

const Timer: React.FC<TimerProps> = ({ countdown }) => {
  return (
    <StyledTimeWrapper>
      <HourGlass />
      <TimerText>
        {countdown.seconds > 0 ? `${countdown.hours}:${countdown.minutes}:${countdown.seconds.toFixed(0)}` : 'Finished'}
      </TimerText>
    </StyledTimeWrapper>
  )
}

export default Timer
