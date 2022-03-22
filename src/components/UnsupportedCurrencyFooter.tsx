import React from 'react'
import { Currency, Token } from '@apeswapfinance/sdk'
import { Button, Text, Modal, useModal, ModalProps, Link } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { AutoRow } from 'components/layout/Row'
import { AutoColumn } from 'components/layout/Column'
import { CurrencyLogo } from 'components/Logo'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getEtherscanLink } from 'utils'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { useUnsupportedTokens } from '../hooks/Tokens'

interface Props extends ModalProps {
  currencies: (Currency | undefined)[]
}

const DetailsFooter = styled.div`
  padding: 8px 0;
  width: 100%;
  max-width: 400px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white4};
  text-align: center;
`

const UnsupportedModal: React.FC<Props> = ({ currencies, onDismiss }) => {
  const { chainId } = useActiveWeb3React()
  const tokens =
    chainId && currencies
      ? currencies.map((currency) => {
          return wrappedCurrency(currency, chainId)
        })
      : []

  const unsupportedTokens: { [address: string]: Token } = useUnsupportedTokens()

  return (
    <Modal title="Unsupported Assets" onDismiss={onDismiss}>
      <AutoColumn gap="lg">
        {tokens.map((token) => {
          return (
            token &&
            unsupportedTokens &&
            Object.keys(unsupportedTokens).includes(token.address) && (
              <AutoColumn key={token.address?.concat('not-supported')} gap="10px">
                <AutoRow gap="5px" align="center">
                  <CurrencyLogo currency={token} size="24px" />
                  <Text>{token.symbol}</Text>
                </AutoRow>
                {chainId && (
                  <Link external small color="primaryDark" href={getEtherscanLink(token.address, 'address', chainId)}>
                    {token.address}
                  </Link>
                )}
              </AutoColumn>
            )
          )
        })}
        <AutoColumn gap="lg">
          <Text>
            Some assets are not available through this interface because they may not work well with our smart contract
            or we are unable to allow trading for legal reasons.
          </Text>
        </AutoColumn>
      </AutoColumn>
    </Modal>
  )
}

export default function UnsupportedCurrencyFooter({ currencies }: { currencies: (Currency | undefined)[] }) {
  const [onPresentModal] = useModal(<UnsupportedModal currencies={currencies} />)

  return (
    <DetailsFooter>
      <Button variant="text" onClick={onPresentModal}>
        Read more about unsupported assets
      </Button>
    </DetailsFooter>
  )
}
