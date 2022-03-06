import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Modal, Button, Flex, LinkExternal } from '@apeswapfinance/uikit'
import BalanceInput from 'components/Input/BalanceInput'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTokenBalance from 'hooks/useTokenBalance'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { ZERO_ADDRESS } from 'config'
import track from 'utils/track'
import { useTranslation } from 'contexts/Localization'

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
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const balance = getFullDisplayBalance(useTokenBalance(currencyAddress))

  const deposit = async () => {
    const depositValue = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
    if (currencyAddress === ZERO_ADDRESS) {
      return contract.depositNative().send({ from: account, value: depositValue })
    }
    return contract.deposit(depositValue).send({ from: account })
  }

  return (
    <Modal title={`${t('Contribute')} ${currency}`} onDismiss={onDismiss}>
      <BalanceInput
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        symbol={currency}
        max={balance}
        onSelectMax={() => setValue(balance.toString())}
      />
      <Flex justifyContent="space-between" mb="24px">
        <Button fullWidth variant="secondary" onClick={onDismiss} mr="8px">
          {t('Cancel')}
        </Button>
        <Button
          fullWidth
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await deposit()
            const amount = new BigNumber(value).times(new BigNumber(10).pow(18)).toString()
            track({
              event: 'iao',
              chain: chainId,
              data: {
                amount,
                cat: 'buy',
                contract: contract.address,
              },
            })
            setPendingTx(false)
            onDismiss()
          }}
        >
          {t('Confirm')}
        </Button>
      </Flex>
      {!notLp && (
        <LinkExternal
          href="https://dex.apeswap.finance/#/add/ETH/0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95"
          style={{ margin: 'auto' }}
        >
          {`${t('Get')} ${currency}`}
        </LinkExternal>
      )}
    </Modal>
  )
}

export default ContributeModal
