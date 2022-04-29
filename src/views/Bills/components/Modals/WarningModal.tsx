import { WarningIcon } from '@ape.swap/uikit'
import { Checkbox, Flex, Modal, ModalFooter, Text, useModal } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { Bills } from 'state/types'
import { StyledButton } from '../styles'
import BuyBillModalView from './BuyBillModalView'

interface TransferBillModalProps {
  onDismiss: () => void
  bill?: Bills
}

const WarningModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill }) => {
  const [confirmBuy, setConfirmBuy] = useState(false)
  const { index } = bill
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
        <Flex ml="30px" flexDirection="column">
          <Flex>
            <Text style={{ fontWeight: 600 }}>
              The {bill.earnToken.symbol} you recieve from this {bill.token.symbol}-{bill.quoteToken.symbol} Treasury
              Bill at a <span style={{ color: 'rgba(223, 65, 65, 1)' }}>{bill.discount}%</span> discount rate is priced
              at <span style={{ textDecoration: 'underline' }}>${bill?.priceUsd}</span>, which is higher than the
              current market rate of{' '}
              <span style={{ textDecoration: 'underline' }}>${bill?.earnTokenPrice?.toFixed(3)} </span>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="20px" alignItems="center">
        <Checkbox onClick={() => setConfirmBuy((prev) => !prev)} />
        <Text ml="10px" fontSize="12px" bold>
          I understand that I am purchasing {bill.earnToken.symbol} at a price above the current market rate, and would
          like to continue.
        </Text>
      </Flex>
      <ModalFooter onDismiss={onDismiss}>
        <StyledButton onClick={onPresentBuyBillsModal} disabled={!confirmBuy}>
          Continue
        </StyledButton>
      </ModalFooter>
    </Modal>
  )
}

export default React.memo(WarningModal)
