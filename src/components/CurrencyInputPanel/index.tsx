import React, { useEffect, useState, useMemo } from 'react'
import { Currency, Pair, Token } from '@apeswapfinance/sdk'
import { Button, Text, useModal, Flex, ArrowDropDownIcon, useMatchBreakpoints } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getTokenUsdPrice } from 'utils/getTokenUsdPrice'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'
import { registerToken } from '../../utils/wallet'

import { RowBetween } from '../layout/Row'
import { Input as NumericalInput } from './NumericalInput'
import { WrappedTokenInfo } from '../../state/lists/hooks'

const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ removeLiquidity: boolean }>`
  display: flex;
  justify-content: flex-start;
  background-color: ${({ theme }) => theme.colors.white4};
  height: 75px;
  width: 310px;
  padding: 0;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white2} !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ removeLiquidity }) => (removeLiquidity ? '300px' : '244px')};
  } ;
`
const InputPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  border-radius: 20px;
  z-index: 1;
`
const Container = styled.div<{ removeLiquidity: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 310px;
  height: 75px;
  background-color: ${({ theme }) => theme.colors.white4};

  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ removeLiquidity }) => (removeLiquidity ? '300px' : '340px')};
  } ;
`

const CurrencyInputContainer = styled.div<{ removeLiquidity: boolean; orders: boolean }>`
  background-color: ${({ theme }) => theme.colors.white3};
  border-radius: ${({ orders }) => (orders ? '0px' : '20px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  ${({ orders }) => (orders ? 'flex-end' : 'center')};
  padding: ${({ removeLiquidity }) => (removeLiquidity ? '25px 0px 40px 0px' : '45px 0px 25px 0px')};
  height: 263px;
  width: 330px;
  ${({ theme }) => theme.mediaQueries.md} {
    height: ${({ orders }) => (orders ? '125px' : '155px')};
    width: 100%;
    flex-direction: row;
    padding: 0px 15px 0px 15px;
    align-items: ${({ orders }) => (orders ? 'flex-end' : 'center')};
  }
`

const CurrencySymbol = styled.div`
  opacity: 0.5;
  line-height: 24px;
  margin-right: 20px;
`

const MetaMaskLogo = styled.img`
  display: inline;
  cursor: pointer;
  position: absolute;
  bottom: -30px;
  marginleft: 10px;
  width: 20px;
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
  disableInput?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  otherCurrency?: Currency | null
  id: string
  isLp?: boolean
  showCommonBases?: boolean
  removeLiquidity?: boolean
  addLiquidity?: boolean
  orders?: boolean
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
  disableInput = false,
  isLp = false,
  hideBalance = false,
  pair = null, // used for double token logo
  otherCurrency,
  id,
  showCommonBases,
  removeLiquidity,
  addLiquidity,
  orders,
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const [tokenPrice, setTokenPrice] = useState<number>(null)
  const isNative = currency?.symbol === 'ETH'
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

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

  const addToMetaMask = () => {
    registerToken(
      currency instanceof Token ? currency?.address : '',
      currency?.symbol,
      currency?.decimals,
      currency instanceof WrappedTokenInfo ? currency?.tokenInfo.logoURI : '',
    ).then(() => '')
  }

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )

  const currencySymbol = useMemo(() => {
    return currency && currency.symbol && currency.symbol.length > 20
      ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)}`
      : currency?.getSymbol(chainId)
  }, [currency, chainId])

  return (
    <CurrencyInputContainer removeLiquidity={removeLiquidity} orders={orders}>
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
                    {t('Select a token')}
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
            {id === 'swap-currency-input' && `${t('From')}:`}
            {id === 'swap-currency-output' && `${t('To')}:`}
            {id === 'orders-currency-input' && `${t('Swap')}:`}
            {id === 'orders-currency-output' && `${t('For')}:`}
          </Text>
        )}

        {account && !isNative && (
          <MetaMaskLogo onClick={addToMetaMask} src="/images/metamask-fox.svg" alt="Add to MetaMask" />
        )}

        {account && (
          <Text
            onClick={onMax}
            fontSize="14px"
            style={{
              display: 'inline',
              cursor: 'pointer',
              position: 'absolute',
              bottom: '-30px',
              marginLeft: `${!isNative ? '30px' : '0px'}`,
            }}
          >
            {!hideBalance && !!currency
              ? removeLiquidity
                ? t('LP Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? 'Loading' })
                : t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? 'Loading' })
              : ' -'}
          </Text>
        )}
        {isMobile && (
          <Text
            fontSize="14px"
            style={{
              display: 'inline',
              position: 'absolute',
              bottom: '-30px',
              right: '10px',
            }}
          >
            {!hideBalance && !!currency && value
              ? isLp
                ? `~ $${(
                    tokenPrice *
                    (parseFloat(selectedCurrencyBalance?.toSignificant(6)) * (parseInt(value) / 100))
                  )?.toFixed(2)}`
                : `~ $${(tokenPrice * parseFloat(value))?.toFixed(2)}`
              : ' -'}
          </Text>
        )}
      </Flex>
      <InputPanel id={id}>
        <Container removeLiquidity={removeLiquidity}>
          {account && currency && showMaxButton && label !== 'To' && !orders && (
            <Button
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
              {t('MAX')}
            </Button>
          )}
          <RowBetween>
            <NumericalInput
              id="token-amount-input"
              removeLiquidity={removeLiquidity}
              disabled={disableInput}
              value={value}
              onUserInput={(val) => {
                onUserInput(val)
              }}
              align={orders ? 'left' : 'right'}
            />
            {orders && <CurrencySymbol>{currencySymbol}</CurrencySymbol>}
          </RowBetween>
          {removeLiquidity && account && (
            <Text
              fontSize="14px"
              style={{
                position: 'absolute',
                bottom: '-30px',
                left: '10px',
              }}
            >
              {!hideBalance && !!currency && value
                ? `${t('LPs to Remove')}: ${
                    selectedCurrencyBalance?.toSignificant(6)
                      ? (parseFloat(selectedCurrencyBalance?.toSignificant(6)) * (parseInt(value) / 100)).toFixed(6)
                      : t('Loading')
                  }`
                : '-'}
            </Text>
          )}
          {!isMobile && (
            <Text
              fontSize="14px"
              style={{
                display: 'inline',
                position: 'absolute',
                bottom: '-30px',
                right: '10px',
              }}
            >
              {!hideBalance && !!currency && value
                ? isLp
                  ? `~ $${(
                      tokenPrice *
                      (parseFloat(selectedCurrencyBalance?.toSignificant(6)) * (parseInt(value) / 100))
                    )?.toFixed(2)}`
                  : `~ $${(tokenPrice * parseFloat(value))?.toFixed(2)}`
                : ' -'}
            </Text>
          )}
        </Container>
      </InputPanel>
    </CurrencyInputContainer>
  )
}
