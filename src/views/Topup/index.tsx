import React from 'react'
import { Button, Flex, useModal } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import useTopup from 'hooks/useTopup'
import MoonPayIframe from './MoonFrame'
import MoonPayModal from './MoonpayModal'

export default function Topup() {
  const { onTopup } = useTopup()
  const [onPresentModal] = useModal(<MoonPayModal />)

  return (
    <Page>
      <Flex justifyContent="center" mb="20px" mt="20px">
        <Button onClick={() => onTopup()} margin="10px">
          Top Up
        </Button>
        <Button onClick={() => onPresentModal()} margin="10px">
          Modal
        </Button>
      </Flex>
      <MoonPayIframe />
    </Page>
  )
}
