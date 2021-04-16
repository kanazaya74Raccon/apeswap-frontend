import React from 'react'
import styled from 'styled-components'
import { BaseLayout, Button, Flex, Heading, Image, LinkExternal, Text } from '@apeswapfinance/uikit'
import { zoneIfo } from 'config/constants'
import useI18n from 'hooks/useI18n'
import Container from 'components/layout/Container'
import IfoCard from '../../../Ifos/components/IfoCard'
import Title from '../../../Ifos/components/Title'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 39px;
`
const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = zoneIfo.find((ifo) => ifo.isActive)

const Iao = () => {
  const TranslateString = useI18n()

  return (
    <Container>
      <Heading size="xl">{TranslateString(594, 'Golden Banana IAO')}</Heading>
      <div>
        <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
        <Title mb="16px">{TranslateString(594, 'Before Sale')}:</Title>
        <List>
          <li>{TranslateString(596, 'Be ready to pay a 30% fee to buy GNANA')}</li>
          <li>{TranslateString(598, 'Purcharse GNANA using BANANA')}</li>
        </List>
        <Text fontSize="11px">
          * Remember buying GNANA means you lose 30% of your BANANA when making the purcharse (1.3:1 ratio)
        </Text>
        <Title mb="16px">{TranslateString(600, 'During Sale')}:</Title>
        <List>
          <li>{TranslateString(602, 'While the sale is live, commit your GNANA tokens to buy the IAO tokens')}</li>
        </List>
        <Title mb="16px">{TranslateString(604, 'After Sale')}:</Title>
        <List>
          <li>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
          <li>{TranslateString(608, 'Done!')}</li>
        </List>
        <Text fontSize="11px">* You can redeem your BANANA back at a 1:1 ratio</Text>
        <Text as="div" pt="16px" mb="16px">
          <Button
            as="a"
            variant="secondary"
            href="https://obiedobo.gitbook.io/apeswap-finance/initial-ape-offerings-iao"
          >
            {TranslateString(610, 'Read more')}
          </Button>
        </Text>
      </div>
      <IfoCard ifo={activeIfo} />
      <Wrapper>
        <Image src="/images/ape.png" alt="iao ape" width={537} height={361} />
      </Wrapper>
    </Container>
  )
}

export default Iao
