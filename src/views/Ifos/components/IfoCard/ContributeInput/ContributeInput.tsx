import React, { useState } from 'react'
import { Flex } from '@apeswapfinance/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'

import { Label, Box, ContributeButton, ContributeInput } from './styles'
import useIAODeposit from '../../../hooks/useIAODeposit'

interface Props {
  currency: string
  contract: any
  notLp?: boolean
  currencyAddress: string
  disabled?: boolean
}

const ContibuteInput: React.FC<Props> = ({ currency, contract, currencyAddress, disabled }) => {
  const [value, setValue] = useState('')
  const tokenBalance = useTokenBalance(currencyAddress)
  const balance = Number(getFullDisplayBalance(tokenBalance)).toFixed(4)

  const { pendingTx, handleDeposit, isAmountValid } = useIAODeposit(contract, currencyAddress, tokenBalance)

  return (
    <Box>
      <table>
        <thead>
          <th>
            <Flex justifyContent="space-between" px="8px">
              <Label>BALANCE: </Label>
              <Label>
                {balance} {currency}
              </Label>
            </Flex>
          </th>
          <th> </th>
        </thead>
        <tbody>
          <tr>
            <td>
              <ContributeInput
                value={value}
                scale="lg"
                type="number"
                min="0"
                step="0.01"
                onChange={(e) => setValue(e.currentTarget.value)}
              />
            </td>
            <td>
              <ContributeButton disabled={disabled || pendingTx || !isAmountValid(value)} variant="yellow" onClick={() => handleDeposit(value)}>
                CONTRIBUTE
              </ContributeButton>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}

export default ContibuteInput
