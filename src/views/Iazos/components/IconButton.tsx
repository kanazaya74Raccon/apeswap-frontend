import React from 'react'
import styled from 'styled-components'
import { Text, Button } from '@apeswapfinance/uikit'

interface IconButtonProps {
  icon: string
  text?: string
  onClick?: () => void
}

const StyledButton = styled(Button)<{ live?: boolean }>`
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

const IconButton: React.FC<IconButtonProps> = ({ icon, text, onClick }) => {
  return (
    <StyledButton onClick={onClick}>
      <img src={`/images/${icon}.svg`} alt="Icon" />
      {text && <IconText>{text}</IconText>}
    </StyledButton>
  )
}

export default IconButton
