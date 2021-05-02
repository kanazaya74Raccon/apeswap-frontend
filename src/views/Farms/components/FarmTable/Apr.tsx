import React from 'react'
import styled from 'styled-components'
import { Address } from 'config/constants/types'
import BigNumber from 'bignumber.js'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
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
}

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  color: ${({ theme }) => theme.colors.text};

  button {
    width: 20px;
    height: 20px;

    svg {
      path {
        fill: ${({ theme }) => theme.colors.textSubtle};
      }
    }
  }
`

const AprWrapper = styled.div`
  min-width: 60px;
  text-align: left;
`

const Apr: React.FC<AprProps> = ({ value, lpLabel, bananaPrice, originalValue, hideButton = false }) => {
  const TranslateString = useI18n()

  return originalValue !== 0 ? (
    <Container>
      {originalValue ? (
        <>
          {!hideButton && (
            <ApyButton lpLabel={lpLabel} rewardTokenPrice={bananaPrice} apy={new BigNumber(originalValue)} />
          )}
          <AprWrapper>{value}%</AprWrapper>
        </>
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
