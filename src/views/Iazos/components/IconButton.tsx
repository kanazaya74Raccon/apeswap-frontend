import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { Text, Button } from '@apeswapfinance/uikit'
import CheckMarkIcon from './Icons/CheckMarkIcon'
import CalendarIcon from './Icons/CalendarIcon'
import GraphIcon from './Icons/GraphIcon'

interface IconButtonProps {
  text?: string
  onClick?: () => void
  icon: 'check' | 'graph' | 'calendar'
  active?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({ icon, text, onClick, active }) => {
  const { isDark } = useTheme()
  const iconColor = isDark ? 'white' : '#A16552'
  const renderIcon = () => {
    if (icon === 'check') {
      return <CheckMarkIcon fill={iconColor} />
    }
    if (icon === 'graph') {
      return <GraphIcon fill={iconColor} />
    }
    if (icon === 'calendar') {
      return <CalendarIcon fill={iconColor} />
    }
    return <></>
  }

  return (
    <StyledButton onClick={onClick} active={active}>
      {renderIcon()}
      {text && <IconText>{text}</IconText>}
    </StyledButton>
  )
}

const StyledButton = styled(Button)<{ active?: boolean }>`
  height: 44px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 7.5px;
  margin-left: 7.5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: ${(props) => (props.theme.isDark ? '#333333' : 'rgba(240, 240, 240, 1)')};
  }
  margin-top: 25px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
`

const IconText = styled(Text)`
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 15px;
  padding-left: 10px;
  font-weight: 500;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 13px;
  }
`

export default IconButton
