import React from 'react'
import { Modal, ModalProps, Text } from '@apeswapfinance/uikit'
import MoonPayIframe from './MoonFrame'

export default function MoonPayModal({ onDismiss }: ModalProps) {
  return (
    <Modal title="Fiat On Ramp" minWidth="400px" onDismiss={onDismiss}>
      <Text mb="12px">Top up with Moonpay</Text>
      <MoonPayIframe />
    </Modal>
  )
}
