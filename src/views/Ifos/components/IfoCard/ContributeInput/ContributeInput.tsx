import React, { useState } from 'react'
import { Flex } from '@apeswapfinance/uikit'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useTranslation } from 'contexts/Localization'
import BigNumber from 'bignumber.js'

import { Label, Box, ContributeButton, ContributeInput } from './styles'
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
  const { t } = useTranslation()

  const { pendingTx, handleDeposit, isAmountValid } = useIAODeposit(contract, currencyAddress, tokenBalance)

  return (
    <Box>
      <table>
        <thead>
          <th>
            <Flex justifyContent="space-between" px="8px">
              <Label>{t('BALANCE')}: </Label>
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
              <ContributeButton
                disabled={disabled || pendingTx || !isAmountValid(value)}
                onClick={() => handleDeposit(value, currency)}
              >
                {t('CONTRIBUTE')}
              </ContributeButton>
            </td>
          </tr>
        </tbody>
      </table>
    </Box>
  )
}

export default ContributeInputComponent
