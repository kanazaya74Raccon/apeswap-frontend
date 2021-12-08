import React from 'react'
import styled from 'styled-components'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'

export interface AprProps {
  value: string
  multiplier: string
  lpLabel: string
  tokenAddress?: Address
  quoteTokenAddress?: Address
  bananaPrice: BigNumber
  originalValue: number
  hideButton?: boolean
  addLiquidityUrl?: string
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: #ffb300;
      }
    }
  }

  width: 184px;
`

const AprWrapper = styled.div`
  text-align: left;
  font-size: 20px;
  font-weight: 200;
  font-family: 'Titan One';
`

const Apr: React.FC<AprProps> = ({
  value,
  lpLabel,
  bananaPrice,
  originalValue,
  hideButton = true,
  addLiquidityUrl,
}) => {
  const TranslateString = useI18n()

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <Flex justifyContent="center">
          <AprWrapper>{value}%</AprWrapper>
          {hideButton && (
            <ApyButton
              lpLabel={lpLabel}
              rewardTokenPrice={bananaPrice}
              apy={new BigNumber(originalValue)}
              addLiquidityUrl={addLiquidityUrl}
            />
          )}
        </Flex>
      ) : (
        <AprWrapper>{TranslateString(656, 'Loading...')}</AprWrapper>
      )}
    </Container>
  ) : (
    <Container>
      <AprWrapper>{originalValue}%</AprWrapper>
    </Container>
  )
}

export default Apr
