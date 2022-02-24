import React from 'react'
import styled from 'styled-components'
import { Button } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

const StyledButton = styled(Button)`
  display: flex;
  align-self: center;
  border: none;
  text-decoration: underline;
  margin-top: 10px;
`

const UnderlinedButton = ({ text, handleClick }) => {
  const TranslateString = useI18n()

  return (
    <StyledButton variant="text" onClick={handleClick}>
      {TranslateString(462, text)}
    </StyledButton>
  )
}

export default UnderlinedButton
