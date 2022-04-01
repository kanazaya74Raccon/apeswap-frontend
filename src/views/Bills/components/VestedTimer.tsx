import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import ListViewContent from 'components/ListViewContent'
import useCurrentTime from 'hooks/useTimer'
import React from 'react'
import getTimePeriods from 'utils/getTimePeriods'
import { StyledHeadingText } from './BillModal/styles'

const VestedTimer: React.FC<{ lastBlockTimestamp: string; vesting: string; userModalFlag?: boolean }> = ({
  lastBlockTimestamp,
  vesting,
  userModalFlag,
}) => {
  const { isXl, isLg, isXxl } = useMatchBreakpoints()
  const isMobile = !isLg && !isXl && !isXxl
  const currentTime = useCurrentTime() / 1000
  const vestingTime = getTimePeriods(parseInt(lastBlockTimestamp) + parseInt(vesting) - currentTime, true)

  return userModalFlag ? (
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
