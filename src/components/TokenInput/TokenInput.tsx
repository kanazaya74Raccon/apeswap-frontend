import React from 'react'
import styled from 'styled-components'
import { Button } from '@apeswapfinance/uikit'
import useI18n from '../../hooks/useI18n'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
  max: number | string
  symbol: string
  onSelectMax?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({ max, symbol, onChange, onSelectMax, value }) => {
  const TranslateString = useI18n()
  return (
    <StyledTokenInput>
      <StyledMaxText>
        {max.toLocaleString()} {symbol} {TranslateString(526, 'Available')}
      </StyledMaxText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <StyledButton size="sm" onClick={onSelectMax}>
                {TranslateString(452, 'Max')}
              </StyledButton>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
      />
    </StyledTokenInput>
  )
}

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledButton = styled(Button)`
  align-items: center;
  display: flex;
  background-color: #ffb300;
  box-shadow: none;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 14px;
  font-weight: 450;
  height: 44px;
  justify-content: flex-end;
  font-family: 'Poppins';
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 450;
  font-family: 'Poppins';
`

export default TokenInput
