import React from 'react'
import { Currency, CurrencyAmount, Fraction, Percent } from '@apeswapfinance/sdk'
import { Button, Text } from '@apeswapfinance/uikit'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import { RowBetween, RowFixed } from '../../components/layout/Row'
import { CurrencyLogo } from '../../components/Logo'
import { Field } from '../../state/mint/actions'

function ConfirmAddModalBottom({
  noLiquidity,
  price,
  currencies,
  parsedAmounts,
  poolTokenPercentage,
  onAdd,
}: {
  noLiquidity?: boolean
  price?: Fraction
  currencies: { [field in Field]?: Currency }
  parsedAmounts: { [field in Field]?: CurrencyAmount }
  poolTokenPercentage?: Percent
  onAdd: () => void
}) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()
  return (
    <>
      <RowBetween>
        <Text>{`${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} Deposited`}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_A]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>{`${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} Deposited`}</Text>
        <RowFixed>
          <CurrencyLogo currency={currencies[Field.CURRENCY_B]} style={{ marginRight: '8px' }} />
          <Text>{parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)}</Text>
        </RowFixed>
      </RowBetween>
      <RowBetween>
        <Text>Rates</Text>
        <Text>
          {`1 ${currencies[Field.CURRENCY_A]?.getSymbol(chainId)} = ${price?.toSignificant(4)} ${currencies[
            Field.CURRENCY_B
          ]?.getSymbol(chainId)}`}
        </Text>
      </RowBetween>
      <RowBetween style={{ justifyContent: 'flex-end' }}>
        <Text>
          {`1 ${currencies[Field.CURRENCY_B]?.getSymbol(chainId)} = ${price?.invert().toSignificant(4)} ${currencies[
            Field.CURRENCY_A
          ]?.getSymbol(chainId)}`}
        </Text>
      </RowBetween>
      <RowBetween>
        <Text>Share of Pool:</Text>
        <Text>{noLiquidity ? '100' : poolTokenPercentage?.toSignificant(4)}%</Text>
      </RowBetween>
      <Button fullWidth onClick={onAdd} mt="25px" style={{ height: '50px', fontSize: '20px' }}>
        {noLiquidity ? t('Create Pool & Supply') : t('Confirm Supply')}
      </Button>
    </>
  )
}

export default ConfirmAddModalBottom
