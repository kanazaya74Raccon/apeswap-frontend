import React, { useCallback } from 'react'
import { Currency } from '@apeswapfinance/sdk'
import { Text, Flex } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'

import { RowBetween } from '../layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 20px;
  z-index: 1;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 310px;
  height: 70px;
  background-color: ${({ theme }) => theme.colors.white4};

  ${({ theme }) => theme.mediaQueries.md} {
    width: 244px;
  } ;
`

const CurrencyInputContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 45px 0px 25px 0px;
  justify-content: space-between;
  height: 253px;
  width: 330px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 155px;
    width: 640px;
    flex-direction: row;
    padding: 0px 15px 0px 15px;
    align-items: flex-end;
  }
`

const CurrencySymbol = styled.div`
  opacity: 0.5;
  line-height: 24px;
  margin-right: 20px;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 310px;
  height: 100px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.white4};

  ${({ theme }) => theme.mediaQueries.md} {
    width: 340px;
  } ;
`

const CurrentPrice = styled.span`
  height: 20px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: #ffb300;
  padding: 0px 15px;
  margin-left: 10px;
  line-height: 20px;
`

const MessageText = styled(Text)`
  display: flex;
  font-size: 12px;
`

interface PriceInputPanelProps {
  value: string
  currentPrice?: string
  onUserInput: (value: string) => void
  inputValue: string
  inputCurrency?: Currency | null
  outputCurrency?: Currency | null
  id: string
}
export default function PriceInputPanel({
  value,
  currentPrice = '0',
  onUserInput,
  inputValue,
  inputCurrency,
  outputCurrency,
  id,
}: PriceInputPanelProps) {
  const { chainId } = useActiveWeb3React()
  const { t } = useTranslation()

  const currencySymbol = useCallback(
    (currency: Currency | null) => {
      return currency && currency.symbol && currency.symbol.length > 20
        ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
            currency.symbol.length - 5,
            currency.symbol.length,
          )}`
        : currency?.getSymbol(chainId)
    },
    [chainId],
  )

  return (
    <CurrencyInputContainer>
      <Flex style={{ position: 'relative' }}>
        <InputPanel id={id}>
          <Container>
            <RowBetween>
              <NumericalInput
                id="token-price-input"
                value={value}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
                align="left"
              />
              <CurrencySymbol>{currencySymbol(outputCurrency)}</CurrencySymbol>
            </RowBetween>
          </Container>
        </InputPanel>
        <Text
          fontSize="14px"
          style={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'absolute',
            top: '-30px',
            marginLeft: '10px',
          }}
        >
          {t('Price')}: <CurrentPrice onClick={() => onUserInput(currentPrice)}>{t('CURRENT')}</CurrentPrice>
        </Text>
      </Flex>
      <MessageContainer>
        <MessageText>
          When&nbsp;<MessageText bold>{currencySymbol(inputCurrency)}</MessageText>&nbsp;equals
        </MessageText>
        <MessageText>
          <MessageText color="#ffb300">{value || '0'}</MessageText>&nbsp;
          <MessageText bold>{currencySymbol(outputCurrency)}</MessageText>,
        </MessageText>
        <MessageText>
          <MessageText color="#ffb300">{inputValue || '0'}</MessageText>&nbsp;
          <MessageText bold>{currencySymbol(inputCurrency)}</MessageText>
        </MessageText>
        <MessageText>will be swapped for</MessageText>
        <MessageText>
          <MessageText color="#ffb300">{+value * +inputValue}</MessageText>&nbsp;
          <MessageText bold>{currencySymbol(outputCurrency)}</MessageText>
        </MessageText>
      </MessageContainer>
    </CurrencyInputContainer>
  )
}
