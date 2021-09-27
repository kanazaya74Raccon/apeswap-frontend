import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, Image } from '@apeswapfinance/uikit'
import { ifosConfig, zoneIfo } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 60px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const IfoHeading = styled(Heading)`
  margin-top: 32px;
`
/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)
const zoneActiveIfo = zoneIfo.find((ifo) => ifo.isActive)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <IfoCards isSingle={false}>
        <IfoCard ifo={activeIfo} />
        <IfoCard ifo={zoneActiveIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <div>
          <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
          <IfoHeading mb="16px">{TranslateString(594, 'Before Sale')}:</IfoHeading>
          <List>
            <li>{TranslateString(596, 'Get BNB or GNANA tokens')}</li>
          </List>
          <IfoHeading mb="16px">{TranslateString(600, 'During Sale')}:</IfoHeading>
          <List>
            <li>{TranslateString(602, 'While the sale is live, commit your BNB tokens to buy the IAO tokens')}</li>
          </List>
          <IfoHeading mb="16px">{TranslateString(604, 'After Sale')}:</IfoHeading>
          <List>
            <li>
              {TranslateString(
                606,
                'Immediately after sale: You may claim your refund and 25% of your offering tokens',
              )}
            </li>
            <li>{TranslateString(606, '30 days after sale: You may claim another 25% of your offering tokens')}</li>
            <li>{TranslateString(606, '60 days after sale: You may claim another 25% of your offering tokens')}</li>
            <li>{TranslateString(606, '90 days after sale: You may claim the final 25% of your offering tokens')}</li>
          </List>
          <Text as="div" pt="16px">
            <Button
              as="a"
              variant="secondary"
              href="https://apeswap.gitbook.io/apeswap-finance/initial-ape-offerings-iao"
            >
              {TranslateString(610, 'Read more')}
            </Button>
          </Text>
        </div>
        <div>
          <Image src="/images/ape.png" alt="iao ape" width={537} height={370} responsive />
          <div>
            <Title as="h2">{TranslateString(512, 'Want to launch your own IAO?')}</Title>
            <Text mb={3}>
              {TranslateString(
                514,
                'Launch your project with ApeSwap, Binance Smart Chain’s most-loved AMM project, to bring your token directly to the most active and rapidly growing ape community on BSC.',
              )}
            </Text>
            <Button as="a" href="https://forms.gle/5vN1kgX5wSK6PLJn7" external>
              {TranslateString(516, 'Apply to launch')}
            </Button>
          </div>
        </div>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
