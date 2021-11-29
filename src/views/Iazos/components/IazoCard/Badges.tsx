import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import Tooltip from 'components/Tooltip/Tooltip'
import { Text, Button } from '@apeswapfinance/uikit'
import KycBadge from '../Icons/KycBadge'
import ShieldBadge from '../Icons/ShieldBadge'
import RugDocBadge from '../Icons/RugDocBadge'
import RedditBadge from '../Icons/RedditBadge'

const BadgeContainer = styled.div`
  display: flex;
  margin-left: 2.5px;
  z-index: 50;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 5px;
  }
`

const BadgeWrapper = styled.div`
  margin-left: 2.5px;
  margin-right: 2.5px;
  width: 20px;
  height: 20px;
  z-index: 100;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 30px;
    height: 30px;
    margin-left: 5px;
    margin-right: 5px;
  }
`
const Badges: React.FC = () => {
  const { isDark } = useTheme()
  const iconFill = isDark ? '#333' : 'rgba(240, 240, 240, .1)'
  return (
    <BadgeContainer>
      <BadgeWrapper>
        <Tooltip content="This is a test">
          <ShieldBadge fill={iconFill} />
        </Tooltip>
      </BadgeWrapper>
      <BadgeWrapper>
        <Tooltip content="This is a test">
          <RugDocBadge fill={iconFill} />
        </Tooltip>
      </BadgeWrapper>
      <BadgeWrapper>
        <Tooltip content="This is a test">
          <KycBadge fill={iconFill} />
        </Tooltip>
      </BadgeWrapper>
      <BadgeWrapper>
        <Tooltip content="This is a test">
          <RedditBadge fill={iconFill} />
        </Tooltip>
      </BadgeWrapper>
    </BadgeContainer>
  )
}

export default Badges
