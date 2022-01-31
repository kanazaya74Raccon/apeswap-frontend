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
  width: ${(props) => props.theme.spacing[2]}px;
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
  text-transform: uppercase;
  font-weight: 700;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 10px;
`

const StyledMaxText = styled.div`
  align-items: center;
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  display: flex;
  font-size: 12px;
  font-weight: 500;
  height: 18px;
  justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
  color: ${({ theme }) => (theme.isDark ? theme.colors.white : theme.colors.primary)};
  font-weight: 500;
`

export default TokenInput
