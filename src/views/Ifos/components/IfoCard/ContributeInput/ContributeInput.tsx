import React, { useState } from 'react'
import { ButtonSquare, Flex } from '@apeswapfinance/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'

import { Label, Box, ContributeButton, ContributeInput, Container } from './styles'
import useIAODeposit from '../../../hooks/useIAODeposit'

interface Props {
  currency: string
  contract: any
  notLp?: boolean
  currencyAddress: string
  disabled?: boolean
  tokenBalance: BigNumber
}

const ContributeInputComponent: React.FC<Props> = ({ currency, contract, currencyAddress, disabled, tokenBalance }) => {
  const [value, setValue] = useState('')
  const balance = Number(getFullDisplayBalance(tokenBalance)).toFixed(4)

  const { pendingTx, handleDeposit, isAmountValid } = useIAODeposit(contract, currencyAddress, tokenBalance)

  const useMax = () => {
    const bnbReduction = new BigNumber(0.01)
    const bigBalance = new BigNumber(balance)
    setValue(
      currency === 'BNB'
        ? (bigBalance > bnbReduction ? bigBalance.minus(bnbReduction).toFixed() : 0).toString()
        : balance,
    )
  }

  return (
    <Box>
      <table width="100%">
        <thead>
          <th>
            <Flex justifyContent="space-between" px="8px">
              <Label>BALANCE: </Label>
              <Label>
                {balance} {currency}
              </Label>
            </Flex>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              <Container>
                <ContributeInput
                  value={value}
                  scale="lg"
                  type="number"
                  min="0"
                  step="0.01"
                  onChange={(e) => setValue(e.currentTarget.value)}
                  style={{
                    width: 'inherit',
                  }}
                />
                <ButtonSquare
                  onClick={useMax}
                  style={{
                    margin: 'auto 10px auto 10px',
                    padding: '0px 10px 0px 10px',
                    fontSize: '15px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    lineHeight: 0,
                  }}
                >
                  MAX
                </ButtonSquare>
              </Container>
              <ContributeButton
                disabled={disabled || pendingTx || !isAmountValid(value)}
                onClick={() => handleDeposit(value, currency)}
              >
                CONTRIBUTE
              </ContributeButton>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}

export default ContributeInputComponent
