import React from 'react'
import { Currency, Pair } from '@apeswapfinance/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex, ButtonSquare } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  display: flex;
  justify-content: flex-start;
  background-color: ${({ theme }) => (theme.isDark ? 'rgba(96, 96, 96, 1)' : 'rgba(230, 230, 230, 1)')};
  width: 244px;
  height: 75px;
  padding: 0;
`
const InputPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 336px;
  height: 75px;
  background-color: ${({ theme }) => (theme.isDark ? 'rgba(96, 96, 96, 1)' : 'rgba(230, 230, 230, 1)')};
`

const CurrencyInputContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 15px;
  height: 155px;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account, chainId } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <CurrencyInputContainer>
      <Flex style={{ position: 'relative' }}>
        <CurrencySelectButton
          onClick={() => {
            if (!disableCurrencySelect) {
              onPresentCurrencyModal()
            }
          }}
        >
          <Flex alignItems="center" justifyContent="flex-start">
            {pair ? (
              <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={16} margin />
            ) : currency ? (
              <CurrencyLogo currency={currency} size="50px" style={{ margin: '0 0px 0 10px' }} />
            ) : null}
            {pair ? (
              <Text id="pair" bold>
                {pair?.token0.symbol}:{pair?.token1.symbol}
              </Text>
            ) : (
              <Text id="pair" fontSize="19px" bold style={{ marginLeft: '10px' }}>
                {(currency && currency.symbol && currency.symbol.length > 20
                  ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                      currency.symbol.length - 5,
                      currency.symbol.length,
                    )}`
                  : currency?.getSymbol(chainId)) || (
                  <div className="bg-transparent hover:bg-primary border border-low-emphesis rounded-full px-2 py-1 text-xs font-medium mt-1 whitespace-nowrap ">
                    Select a token
                  </div>
                )}
              </Text>
            )}
            {!disableCurrencySelect && <ChevronDownIcon />}
          </Flex>
        </CurrencySelectButton>
        <Text
          onClick={onMax}
          fontSize="14px"
          style={{ display: 'inline', cursor: 'pointer', position: 'absolute', top: '-30px', marginLeft: '10px' }}
        >
          {id === 'swap-currency-output' ? 'To:' : 'From:'}
        </Text>
        {account && (
          <Text
            onClick={onMax}
            fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer', position: 'absolute', bottom: '-30px', marginLeft: '10px' }}
          >
            {!hideBalance && !!currency ? `Balance: ${selectedCurrencyBalance?.toSignificant(6) ?? 'Loading'}` : ' -'}
          </Text>
        )}
      </Flex>
      <InputPanel id={id}>
        <Container>
          {account && currency && showMaxButton && label !== 'To' && (
            <ButtonSquare
              onClick={onMax}
              variant="primary"
              style={{
                margin: '0px 10px 0px 10px',
                padding: '0px 10px 0px 10px',
                fontSize: '15px',
                borderRadius: '10px',
                fontWeight: 700,
                lineHeight: 0,
              }}
            >
              MAX
            </ButtonSquare>
          )}
          <RowBetween>
            <NumericalInput
              id="token-amount-input"
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </RowBetween>
        </Container>
      </InputPanel>
    </CurrencyInputContainer>
  )
}
