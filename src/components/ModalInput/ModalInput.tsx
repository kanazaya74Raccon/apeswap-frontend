import React from 'react'
import styled from '@emotion/styled'
import { Text, Button, Input, InputProps, Flex } from '@apeswapfinance/uikit'
import useI18n from '../../hooks/useI18n'

interface ModalInputProps {
  max: string
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  addLiquidityUrl?: string
  inputTitle?: string
  displayDecimals?: number
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  border: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  font-weight: 800;
  background-color: ${({ theme }) => theme.colors.white3};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledButton = styled(Button)`
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.primaryBright};
  font-weight: 500;
  font-size: 16px;
  padding: 3px 10px;
`


const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  inputTitle,
  displayDecimals,
}) => {
  const TranslateString = useI18n()
  const isBalanceZero = max === '0' || !max

  const displayBalance = isBalanceZero ? '0' : parseFloat(max).toFixed(displayDecimals || 4)

  return (
    <div style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex justifyContent="space-between" pl="16px">
          <Text fontSize="14px" fontWeight={800}>
            {inputTitle}
          </Text>
          <Text fontSize="16px" fontWeight={500}>
            {TranslateString(999, 'Balance')}: {displayBalance.toLocaleString()}
          </Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around">
          <StyledInput onChange={onChange} placeholder="0" value={value} />
          <StyledButton size="sm" onClick={onSelectMax} mr="8px">
            {TranslateString(452, 'Max'.toUpperCase())}
          </StyledButton>
          <Text fontSize="16px" fontWeight={600}>
            {symbol}
          </Text>
        </Flex>
      </StyledTokenInput>
    </div>
  )
}

export default ModalInput
