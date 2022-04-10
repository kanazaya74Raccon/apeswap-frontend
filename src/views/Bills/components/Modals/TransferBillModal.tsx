import { Checkbox, Flex, Input, Modal, ModalFooter, Text } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import React, { useState } from 'react'
import { Bills } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import Transfer from '../Actions/Transfer'
import VestedTimer from '../VestedTimer'
import { TopDescriptionText } from './styles'

interface TransferBillModalProps {
  onDismiss: () => void
  bill?: Bills
  billId?: string
}

const TransferBillModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill, billId }) => {
  const [confirmSend, setConfirmSend] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const { earnToken, lpToken, billNftAddress, userOwnedBillsData } = bill
  const userOwnedBill = userOwnedBillsData?.find((b) => parseInt(b.id) === parseInt(billId))
  const pending = getBalanceNumber(new BigNumber(userOwnedBill?.payout), bill?.earnToken?.decimals)?.toFixed(4)
  return (
    <Modal onDismiss={onDismiss} maxWidth="385px" title="Transfer Bill">
      <Flex mt="30px">
        <Text bold> Transfering: </Text>
      </Flex>
      <Flex mt="30px" flexDirection="column" alignItems="center" mr="10px">
        <Text bold fontSize="25px">
          {lpToken.symbol} #{userOwnedBill?.id}
        </Text>
        <Flex mt="5px">
          <Flex mr="20px" flexDirection="column">
            <TopDescriptionText textAlign="center">Vesting time</TopDescriptionText>
            <VestedTimer
              lastBlockTimestamp={userOwnedBill?.lastBlockTimestamp}
              vesting={userOwnedBill?.vesting}
              transferModalFlag
            />
          </Flex>
          <Flex ml="20px" flexDirection="column">
            <TopDescriptionText textAlign="center">Pending</TopDescriptionText>
            <Flex>
              <ServiceTokenDisplay token1={earnToken.symbol} size={20} />
              <Text bold ml="5px">
                {pending}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="30px" flexDirection="column">
        <Text bold>Recieving Address:</Text>
        <Input
          mt="10px"
          size="lg"
          placeholder="Paste the address here"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          style={{ width: '345px', border: 'none' }}
        />
      </Flex>
      <Text mt="30px" fontSize="12px" style={{ color: 'rgba(223, 65, 65, 1)' }}>
        <Text bold style={{ color: 'rgba(223, 65, 65, 1)' }} fontSize="13px">
          WARNING
        </Text>
        When transfering the NFT all pending rewards will also be transfered to the receiver address.
      </Text>
      <Flex mt="20px" alignItems="center">
        <Checkbox onClick={() => setConfirmSend((prev) => !prev)} />
        <Text ml="10px" fontSize="12px">
          I understand the new wallet gains ownership of all unclaimed assets.
        </Text>
      </Flex>
      <ModalFooter onDismiss={onDismiss}>
        <Transfer billNftAddress={billNftAddress} billId={billId} toAddress={toAddress} disabled={!confirmSend} />
      </ModalFooter>
    </Modal>
  )
}

export default React.memo(TransferBillModal)
