import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link } from '@apeswapfinance/uikit'
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

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.input};
  border-radius: 16px;
  box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  box-shadow: none;
  width: 60px;
  margin: 0 8px;
  padding: 0 8px;
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.xs} {
    width: 80px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalInput: React.FC<ModalInputProps> = ({
  max,
  symbol,
  onChange,
  onSelectMax,
  value,
  addLiquidityUrl,
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
          <Text fontSize="14px" fontFamily="Titan One">
            {inputTitle}
          </Text>
          <Text fontSize="14px" fontFamily="Titan One">
            {TranslateString(999, 'Balance')}: {displayBalance.toLocaleString()}
          </Text>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-around">
          <StyledInput onChange={onChange} placeholder="0" value={value} />
          <Button size="sm" onClick={onSelectMax} mr="8px">
            {TranslateString(452, 'Max')}
          </Button>
          <Text fontSize="16px" fontFamily="Titan One">
            {symbol}
          </Text>
        </Flex>
      </StyledTokenInput>
      {isBalanceZero && (
        <StyledErrorMessage fontSize="14px" color="failure">
          No tokens to stake:{' '}
          <Link fontSize="14px" bold={false} href={addLiquidityUrl} external color="failure" fontFamily="Titan One">
            {TranslateString(999, 'get')} {symbol}
          </Link>
        </StyledErrorMessage>
      )}
    </div>
  )
}

export default ModalInput
