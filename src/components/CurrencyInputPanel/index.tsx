import React from 'react'
import { Currency, Pair } from '@apeswapfinance/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex, ButtonSquare, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'

import { RowBetween } from '../layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ removeLiquidity: boolean }>`
  display: flex;s
  justify-content: flex-start;
  background-color: ${({ theme }) => (theme.isDark ? '#424242' : 'rgba(230, 230, 230, 1)')};
  height: 75px;
  width: 310px;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ removeLiquidity }) => (removeLiquidity ? '300px' : '244px')}};
  }
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
const Container = styled.div<{ removeLiquidity: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 310px;
  height: 75px;
  background-color: ${({ theme }) => (theme.isDark ? '#424242' : 'rgba(230, 230, 230, 1)')};
  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ removeLiquidity }) => (removeLiquidity ? '300px' : '340px')}};
  }
`

const CurrencyInputContainer = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? '#383838' : '#F0F0F0')};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 45px 0px 25px 0px;
  height: 263px;
  width: 330px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 155px;
    width: 640px;
    flex-direction: row;
    padding: 0px 15px 0px 15px;
  }
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
  removeLiquidity?: boolean
  addLiquidity?: boolean
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
  removeLiquidity,
  addLiquidity,
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
          removeLiquidity={removeLiquidity}
          onClick={() => {
            if (!disableCurrencySelect) {
              onPresentCurrencyModal()
            }
          }}
        >
          <Flex alignItems="center" justifyContent="flex-start" style={{ width: '100%' }}>
            {pair ? (
              <div style={{ paddingLeft: '10px' }}>
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={30} margin />
              </div>
            ) : currency ? (
              <CurrencyLogo currency={currency} size="50px" style={{ margin: '0 0px 0 10px' }} />
            ) : null}
            {pair ? (
              <Text id="pair" bold fontSize="19px">
                {pair?.token0.getSymbol(chainId)}-{pair?.token1.getSymbol(chainId)}
              </Text>
            ) : (
              <Text id="pair" fontSize="21px" bold style={{ marginLeft: '10px' }}>
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
            {!disableCurrencySelect && (
              <ArrowDropDownIcon width="13px" style={{ position: 'absolute', right: '15px' }} />
            )}
          </Flex>
        </CurrencySelectButton>
        {!removeLiquidity && !addLiquidity && (
          <Text
            onClick={onMax}
            fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer', position: 'absolute', top: '-30px', marginLeft: '10px' }}
          >
            {id === 'swap-currency-output' ? 'To:' : 'From:'}
          </Text>
        )}
        {account && (
          <Text
            onClick={onMax}
            fontSize="14px"
            style={{ display: 'inline', cursor: 'pointer', position: 'absolute', bottom: '-30px', marginLeft: '10px' }}
          >
            {!hideBalance && !!currency
              ? removeLiquidity
                ? `LP Balance: ${selectedCurrencyBalance?.toSignificant(6) ?? 'Loading'}`
                : `Balance: ${selectedCurrencyBalance?.toSignificant(6) ?? 'Loading'}`
              : ' -'}
          </Text>
        )}
      </Flex>
      <InputPanel id={id}>
        <Container removeLiquidity={removeLiquidity}>
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
              removeLiquidity={removeLiquidity}
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
            />
          </RowBetween>
          {removeLiquidity && account && (
            <Text
              fontSize="14px"
              style={{
                position: 'absolute',
                bottom: '-30px',
                marginLeft: '-120px',
              }}
            >
              {!hideBalance && !!currency && value
                ? `LP to Remove: ${
                    selectedCurrencyBalance?.toSignificant(6)
                      ? (parseFloat(selectedCurrencyBalance?.toSignificant(6)) * (parseInt(value) / 100)).toFixed(6)
                      : 'Loading'
                  }`
                : '-'}
            </Text>
          )}
        </Container>
      </InputPanel>
    </CurrencyInputContainer>
  )
}
