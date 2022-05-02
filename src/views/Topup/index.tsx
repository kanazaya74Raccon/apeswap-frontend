import React from 'react'
import { Button, Flex } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import useTopup from 'hooks/useTopup'

export default function Topup() {
  const { onTopup } = useTopup()

  return (
    <Page>
      <Flex justifyContent="center" mb="20px" mt="20px">
        <Button onClick={() => onTopup()}>Top Up</Button>
      </Flex>
    </Page>
  )
}
