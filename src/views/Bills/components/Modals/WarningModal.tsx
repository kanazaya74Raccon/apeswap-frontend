import { WarningIcon } from '@ape.swap/uikit'
import { Checkbox, Flex, Input, Modal, ModalFooter, Text, useModal } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import React, { useState } from 'react'
import { Bills } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import Transfer from '../Actions/Transfer'
import { StyledButton } from '../styles'
import VestedTimer from '../VestedTimer'
import BuyBillModalView from './BuyBillModalView'
import { TopDescriptionText } from './styles'

interface TransferBillModalProps {
  onDismiss: () => void
  bill?: Bills
}

const WarningModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill }) => {
  const [confirmBuy, setConfirmBuy] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const { earnToken, lpToken, billNftAddress, userOwnedBillsData, index } = bill
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView bill={bill} onDismiss={null} />,
    true,
    true,
    `billsModal${index}`,
  )

  return (
    <Modal onDismiss={onDismiss} maxWidth="385px">
      <Flex alignItems="center" justifyContent="center" mt="10px">
        <Text bold fontSize="35px">
          <WarningIcon width="25px" mr="10px" color="error" />
          WARNING
          <WarningIcon width="25px" ml="10px" color="error" />
        </Text>
      </Flex>
      <Flex mt="30px" mb="30px" flexDirection="column" alignItems="center" mr="10px">
        <Flex mt="5px">
          <Flex ml="20px" flexDirection="column">
            <Flex>
              <Text ml="5px" style={{ fontWeight: 600 }}>
                Buying a {bill.token.symbol}-{bill.quoteToken.symbol} Bill at a{' '}
                <span style={{ color: 'rgba(223, 65, 65, 1)' }}>{bill.discount}%</span> discount rate will purchase{' '}
                {bill.earnToken.symbol} at a premium price{' '}
                <span style={{ textDecoration: 'underline' }}>${bill?.priceUsd}</span> vs market rate{' '}
                <span style={{ textDecoration: 'underline' }}>${bill?.earnTokenPrice?.toFixed(3)} </span>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="20px" alignItems="center">
        <Checkbox onClick={() => setConfirmBuy((prev) => !prev)} />
        <Text ml="10px" fontSize="12px" bold>
          I understand that I will be buying {bill.earnToken.symbol} for a premium.
        </Text>
      </Flex>
      <ModalFooter onDismiss={onDismiss}>
        <StyledButton onClick={onPresentBuyBillsModal} disabled={!confirmBuy}>
          Confirm
        </StyledButton>
      </ModalFooter>
    </Modal>
  )
}

export default React.memo(WarningModal)
