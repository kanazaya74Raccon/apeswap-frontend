import React, { useState } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@apeswapfinance/uikit'
import BalanceInput from 'components/Input/BalanceInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { ZERO_ADDRESS } from 'config'

interface Props {
  currency: string
  contract: any
  notLp?: boolean
  currencyAddress: string
  onDismiss?: () => void
}

const ContributeModal: React.FC<Props> = ({ currency, contract, currencyAddress, onDismiss, notLp }) => {
  const [value, setValue] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const balance = getFullDisplayBalance(useTokenBalance(currencyAddress))

  const deposit = async () => {
    const depositValue = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
    if (currencyAddress === ZERO_ADDRESS) {
      return contract.methods.depositBNB().send({ from: account, value: depositValue })
    }
    return contract.methods.deposit(depositValue).send({ from: account })
  }

  return (
    <Modal title={`Contribute ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          Cancel
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await deposit()
            setPendingTx(false)
            onDismiss()
          }}
        >
          Confirm
        </Button>
      </Flex>
      {!notLp && (
        <LinkExternal
          href="https://dex.apeswap.finance/#/add/ETH/0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95"
          style={{ margin: 'auto' }}
        >
          {`Get ${currency}`}
        </LinkExternal>
      )}
    </Modal>
  )
}

export default ContributeModal
