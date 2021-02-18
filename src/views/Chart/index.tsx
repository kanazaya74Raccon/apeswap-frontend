import React from 'react'
import { Heading } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import { TranslateString } from 'utils/translateTextHelpers'
import Chart from './Chart'

const Teams = () => {
  return (
    <Page>
      <Heading size="xl">{TranslateString(999, 'Chart')}</Heading>
      <Chart />
    </Page>
  )
}

export default Teams
