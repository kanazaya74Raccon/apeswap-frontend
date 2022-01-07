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

  const { pendingTx, handleDeposit } = useIAODeposit(contract, currencyAddress, tokenBalance);

  return (
    <Box>
      <Flex flexDirection="column">
        <Flex justifyContent="space-between" px="8px">
          <Label>BALANCE:</Label>
          <Label>
            {balance} {currency}
          </Label>
        </Flex>
        <ContributeInput value={value} scale="lg" type="number" onChange={(e) => setValue(e.currentTarget.value)} />
      </Flex>
      <ContributeButton disabled={disabled || pendingTx} variant="yellow" onClick={() => handleDeposit(value)}>
        CONTRIBUTE
      </ContributeButton>
    </Box>
  )
}

export default ContibuteInput
