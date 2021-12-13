import React from 'react'
import styled from 'styled-components'
import { Link } from '@apeswapfinance/uikit'
import { IfoStatus } from 'config/constants/types'
import getTimePeriods from 'utils/getTimePeriods'

export interface IfoCardTimeProps {
  block: number
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
}

const Details = styled.div`
  align-items: center;
  display: flex;
  height: 24px;
  justify-content: center;
  margin-bottom: 24px;
`

const Countdown = styled.div`
  color: ${({ theme }) => theme.colors.contrast};
  font-size: 20px;
  font-weight: 300;
  text-align: center;
`

const IfoCardTime: React.FC<IfoCardTimeProps> = ({ block, status, secondsUntilStart, secondsUntilEnd }) => {
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
  const timeUntil = getTimePeriods(countdownToUse)
  const suffix = status === 'coming_soon' ? 'start' : 'finish'

  return (
    <Details>
      <Countdown>{`${timeUntil.days}d, ${timeUntil.hours}h, ${timeUntil.minutes}m until ${suffix}`}</Countdown>
      <Link href={`https://bscscan.com/block/countdown/${block}`} target="blank" rel="noopener noreferrer" ml="8px">
        (blocks)
      </Link>
    </Details>
  )
}

export default IfoCardTime
