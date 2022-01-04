import React, { useState } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Button, Flex, Text, Input } from '@apeswapfinance/uikit'
import { ZERO_ADDRESS } from 'config'
import track from 'utils/track'
import { CHAIN_ID } from 'config/constants'
import { getFullDisplayBalance } from 'utils/formatBalance'
import useTokenBalance from 'hooks/useTokenBalance'

interface Props {
  currency: string
  contract: any
  notLp?: boolean
  currencyAddress: string
  disabled?: boolean
}

const Label = styled(Text)`
  font-size: 12px;
  font-weight: 500;
`

const Box = styled(Flex)`
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 12px;
`

const ContributeButton = styled(Button)`
  margin-top: 18px;
`

const ContributeInput = styled(Input)`
  background-color: ${({ theme }) => (theme.isDark ? '#424242' : '#e5e5e5')};
`

const ContibuteInput: React.FC<Props> = ({ currency, contract, currencyAddress, disabled }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const tokenBalance = useTokenBalance(currencyAddress)
  const balance = getFullDisplayBalance(tokenBalance)

  const deposit = async () => {
    const depositValue = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
    if (currencyAddress === ZERO_ADDRESS) {
      return contract.methods.depositNative().send({ from: account, value: depositValue })
    }
    return contract.methods.deposit(depositValue).send({ from: account })
  }

  const validate = () => {
    const bigAmount = new BigNumber(value).times(new BigNumber(10).pow(18))

    return bigAmount.isGreaterThan(0) && bigAmount.isLessThanOrEqualTo(tokenBalance)
  }

  const handleContributeClick = async () => {
    if (!validate()) return

    setPendingTx(true)

    try {
      await deposit()
      const amount = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
      track({
        event: 'iao',
        chain: CHAIN_ID,
        data: {
          amount,
          cat: 'buy',
          contract: contract.address,
        },
      })
    } catch (e) {
      console.error('Deposit error', e);
    }
    setPendingTx(false)
  }

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
      <ContributeButton disabled={disabled || pendingTx} variant="yellow" onClick={handleContributeClick}>
        CONTRIBUTE
      </ContributeButton>
    </Box>
  )
}

export default ContibuteInput
