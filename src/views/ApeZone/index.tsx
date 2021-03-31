import React from 'react'
import { Heading } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import { TranslateString } from 'utils/translateTextHelpers'
import Zone from './Zone'

const ApeZone = () => {
  return (
    <Page>
      <Heading size="xl">{TranslateString(999, 'ApeZone')}</Heading>
      <Heading color="secondary" size="lg">
        GOLDEN BANANA
      </Heading>
      <Heading color="contrast" size="lg">
        Pay a 30% burn fee to get your hands into golden BANANA
      </Heading>
      <Zone />
    </Page>
  )
}

export default ApeZone
