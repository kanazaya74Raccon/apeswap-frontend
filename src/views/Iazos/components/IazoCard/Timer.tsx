import React from 'react'
import styled from 'styled-components'
import { useCurrentTime } from 'hooks/useTimer'
import getTimePeriods from 'utils/getTimePeriods'
import { Text } from '@apeswapfinance/uikit'
import { IazoTimeInfo } from 'state/types'

interface TimerProps {
  timeInfo: IazoTimeInfo
  fontColor?: string
  fontSize?: string
}

const formatCountdown = (countdown: any): string => {
  const formatDays = countdown.days < 10 ? `0${countdown.days}` : countdown.days.toString()
  const formatHours = countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours.toString()
  const formatMinutes = countdown.minutes < 10 ? `0${countdown.minutes}` : countdown.minutes.toString()
  const formatSeconds = countdown.seconds < 9 ? `0${countdown.seconds.toFixed(0)}` : countdown.seconds.toFixed(0)
  return `${formatDays}:${formatHours}:${formatMinutes}:${formatSeconds}`
}

const Timer: React.FC<TimerProps> = ({ timeInfo, fontSize, fontColor }) => {
  const { activeTime, startTime } = timeInfo
  const currentTime = useCurrentTime() / 1000
  const endTime = parseInt(activeTime) + parseInt(startTime)
  const timeUntilStart = parseInt(startTime) - currentTime
  const timeUntilEnd = endTime - currentTime
  const timeUntilStartFormatted = formatCountdown(getTimePeriods(timeUntilStart, true))
  const timeUntilEndFormatted = formatCountdown(getTimePeriods(timeUntilEnd, true))

  const timeToDisplay = () => {
    if (timeUntilStart > 0) {
      return (
        <BoldAfterText fontSize={fontSize} boldContent={timeUntilStartFormatted} fontColor={fontColor}>
          Starts in{' '}
        </BoldAfterText>
      )
    }
    if (timeUntilEnd > 0) {
      return (
        <BoldAfterText fontSize={fontSize} boldContent={timeUntilEndFormatted} fontColor={fontColor}>
          Ends in{' '}
        </BoldAfterText>
      )
    }
    return <BoldAfterText fontSize={fontSize} boldContent="Finished" fontColor={fontColor} />
  }
  return timeToDisplay()
}

const BoldAfterText = styled(Text)<{ boldContent?: string; fontSize?: string; fontColor?: string }>`
  font-family: poppins;
  font-weight: ${(props) => props.fontSize};
  color: ${(props) => props.fontColor};
  &:after {
    font-weight: 700;
    font-size: ${(props) => props.fontSize || '17px'};
    content: '${(props) => props.boldContent}';
  }
`

export default Timer
