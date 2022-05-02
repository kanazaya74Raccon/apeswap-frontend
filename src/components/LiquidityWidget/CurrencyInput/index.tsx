import React, { useEffect, useState } from 'react'
import { Currency, Pair, Token } from '@apeswapfinance/sdk'
import { Button, Text, useModal, Flex, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import CurrencySearchModal from '../../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../../Logo'
import { RowBetween } from '../../layout/Row'
import NumericalInput from './NumericalInput'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ removeLiquidity: boolean }>`
  display: flex;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.white4};
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white4} !important;
  }
`
const InputPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 10px;
  z-index: 1;
`
const Container = styled.div<{ removeLiquidity: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.white4};
`

const CurrencyInputContainer = styled.div<{ removeLiquidity: boolean }>`
  background-color: ${({ theme }) => theme.colors.white4};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
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
  isLp?: boolean
  showCommonBases?: boolean
  removeLiquidity?: boolean
  addLiquidity?: boolean
}
export default function CurrencyInputPanelLiquidity({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  isLp = false,
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
  const [tokenPrice, setTokenPrice] = useState<number>(null)
  const isNative = currency?.symbol === 'ETH'

  useEffect(() => {
    const fetchTokenPrice = async () => {
      const tokenPriceReturned = await getTokenUsdPrice(
        chainId,
        currency instanceof Token ? currency?.address : '',
        currency?.decimals,
        isLp,
        isNative,
      )
      setTokenPrice(tokenPriceReturned)
    }
    fetchTokenPrice()
  }, [currency, chainId, isLp, isNative])

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )

  return (
    <CurrencyInputContainer removeLiquidity={removeLiquidity}>
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
              <CurrencyLogo currency={currency} size="36px" style={{ margin: '0 0px 0 10px' }} />
            ) : null}
            {pair ? (
              <Text id="pair" bold fontSize="19px">
                {pair?.token0.getSymbol(chainId)}-{pair?.token1.getSymbol(chainId)}
              </Text>
            ) : (
              <Text id="pair" fontSize="16px" bold style={{ marginLeft: '10px' }}>
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
            {!disableCurrencySelect && <ArrowDropDownIcon width="8px" style={{ marginLeft: '10px' }} />}
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
      </Flex>
      <InputPanel id={id}>
        <Container removeLiquidity={removeLiquidity}>
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
        </Container>
      </InputPanel>
    </CurrencyInputContainer>
  )
}
