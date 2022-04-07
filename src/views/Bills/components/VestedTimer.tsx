import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import ListViewContent from 'components/ListViewContent'
import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import { StyledHeadingText } from './Modals/styles'

const VestedTimer: React.FC<{
  lastBlockTimestamp: string
  vesting: string
  userModalFlag?: boolean
  transferModalFlag?: boolean
}> = ({ lastBlockTimestamp, vesting, userModalFlag, transferModalFlag }) => {
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const currentTime = useCurrentTime() / 1000
  const vestingTime = getTimePeriods(parseInt(lastBlockTimestamp) + parseInt(vesting) - currentTime, true)

  return transferModalFlag ? (
    <Text bold>
      {vestingTime.days}d, {vestingTime.hours}h, {vestingTime.minutes}m
    </Text>
  ) : userModalFlag ? (
    <StyledHeadingText bold>
      {vestingTime.days}d, {vestingTime.hours}h, {vestingTime.minutes}m
    </StyledHeadingText>
  ) : (
    <ListViewContent
      title="Fully Vested"
      value={`${vestingTime.days}d, ${vestingTime.hours}h, ${vestingTime.minutes}m`}
      width={isMobile ? 200 : 180}
      height={52.5}
      toolTip="s"
    />
  )
}

export default React.memo(VestedTimer)
