import React from 'react'
import styled from 'styled-components'
import { Text, Button } from '@apeswapfinance/uikit'

interface IconButtonProps {
  icon: string
  text: string
}

const StyledButton = styled(Button)<{ live?: boolean }>`
  height: 44px;
  border-radius: 10px;
  background: #333333;
  padding-left: 10px;
  padding-right: 10px;
  margin-right: 15px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #333333;
  }
`

const IconText = styled(Text)`
  font-family: Titan One;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 15px;
  color: #ffffff;
  padding-left: 10px;
`

const IconButton: React.FC<IconButtonProps> = ({ icon, text }) => {
  return (
    <StyledButton>
      <img src={`/images/${icon}.svg`} alt="Icon" />
      <IconText>{text}</IconText>
    </StyledButton>
  )
}

export default IconButton
