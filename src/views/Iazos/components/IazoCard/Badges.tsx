import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { IazoTags } from 'state/types'
import { Text, Button } from '@apeswapfinance/uikit'
import Tooltip from './Tooltip'
import KycBadge from '../Icons/KycBadge'
import ShieldBadge from '../Icons/ShieldBadge'
import RugDocBadge from '../Icons/RugDocBadge'
import RedditBadge from '../Icons/RedditBadge'

interface BadgeProps {
  badges: IazoTags[]
}

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
const Badges: React.FC<BadgeProps> = ({ badges }) => {
  const { isDark } = useTheme()
  const iconFill = isDark ? '#333' : 'rgba(240, 240, 240, .1)'
  const renderBadge = (badge: IazoTags) => {
    const { tagName, tagLinks } = badge
    if (tagName === 'Security') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLink={tagLinks}>
            <ShieldBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    if (tagName === 'Rug Doc') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLink={tagLinks}>
            <RugDocBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    if (tagName === 'Reddit') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLink={tagLinks}>
            <RedditBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    if (tagName === 'KYC') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLink={tagLinks}>
            <KycBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    return <></>
  }
  return (
    <BadgeContainer>
      {badges?.map((badge) => {
        return renderBadge(badge)
      })}
    </BadgeContainer>
  )
}

export default Badges
