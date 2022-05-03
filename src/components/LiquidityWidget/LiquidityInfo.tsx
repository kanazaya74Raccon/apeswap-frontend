import React from 'react'
import { Currency, Percent, Price } from '@apeswapfinance/sdk'
import { Text, Flex, Box } from 'theme-ui'
import { ONE_BIPS } from 'config/constants'
import { Field } from 'state/mint/actions'
import styles from './styles'

interface LiquidityInfoProps {
  currencies: { [field in Field]?: Currency }
  noLiquidity?: boolean
  poolTokenPercentage?: Percent
  price?: Price
  chainId?: number
}

const LiquidityInfo: React.FC<LiquidityInfoProps> = ({
  currencies,
  noLiquidity,
  poolTokenPercentage,
  price,
  chainId,
}) => {
  return (
    <Box as="ul" sx={{ marginY: '30px' }}>
      <Flex as="li" sx={styles.row}>
        <Text sx={styles.text}>
          {`${currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''} per ${
            currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''
          }`}
        </Text>
        <Text sx={styles.text}>{price?.toSignificant(6) ?? '-'}</Text>
      </Flex>
      <Flex as="li" sx={styles.row}>
        <Text sx={styles.text}>Share of Pool</Text>
        <Text sx={styles.text}>
          {noLiquidity && price
            ? '100'
            : (poolTokenPercentage?.lessThan(ONE_BIPS) ? '<0.01' : poolTokenPercentage?.toFixed(2)) ?? '0'}
          %
        </Text>
      </Flex>
      <Flex as="li" sx={styles.row}>
        <Text sx={styles.text}>
          {`${currencies[Field.CURRENCY_A]?.getSymbol(chainId) ?? ''} per ${
            currencies[Field.CURRENCY_B]?.getSymbol(chainId) ?? ''
          }`}
        </Text>
        <Text sx={styles.text}>{price?.invert()?.toSignificant(6) ?? '-'}</Text>
      </Flex>
    </Box>
  )
}

export default LiquidityInfo
