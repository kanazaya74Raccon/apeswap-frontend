import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { IazoTags } from 'state/types'
import Tooltip from './Tooltip'
import KycBadge from '../Icons/KycBadge'
import ShieldBadge from '../Icons/ShieldBadge'
import RugDocBadge from '../Icons/RugDocBadge'
import RedditBadge from '../Icons/RedditBadge'

interface BadgeProps {
  badges: IazoTags[]
}

const Badges: React.FC<BadgeProps> = ({ badges }) => {
  const { isDark } = useTheme()
  const iconFill = isDark ? '#333' : 'rgba(240, 240, 240, .1)'
  const renderBadge = (badge: IazoTags) => {
    const { tagName, tagLinks, tagIcon } = badge
    if (tagIcon === 'security') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLinks={tagLinks}>
            <ShieldBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    if (tagIcon === 'rugdoc') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLinks={tagLinks}>
            <RugDocBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    if (tagIcon === 'reddit') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLinks={tagLinks}>
            <RedditBadge fill={iconFill} />
          </Tooltip>
        </BadgeWrapper>
      )
    }
    if (tagIcon === 'kyc') {
      return (
        <BadgeWrapper>
          <Tooltip title={tagName} tagLinks={tagLinks}>
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

export default Badges
