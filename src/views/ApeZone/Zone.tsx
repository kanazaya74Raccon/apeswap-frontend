import React, { useState } from 'react'
import Page from 'components/layout/Page'
import Spacer from 'components/Spacer'
import Banner from 'components/Banner'
import GnanaUtility from './components/GnanaUtility/GnanaUtility'
import GnanaDisclaimers from './components/GnanaDisclaimers/GnanaDisclaimers'
import ConvertCard from './components/ConvertCard'
import ReturnCard from './components/ReturnCard'
import {
  PaddedCard,
  TopCon,
  Warning,
  CenterCard,
  OuterContent,
  OuterContentText,
  InnerContent,
  InnerContentText,
  Cards,
  ReadMore,
  WarningHeader,
} from './styles'

const Zone = () => {
  const [readingMore, setReadingMore] = useState(false)

  const toggleReadMore = () => {
    setReadingMore(!readingMore)
  }

  return (
    <>
      <Page width='1130px'>
        <Banner banner="gnana" title='Golden Banana' margin="0px 0px 20px 0px" maxWidth={1130}/>
        <PaddedCard>
          <TopCon>
            <Warning />
            <CenterCard>
              <WarningHeader as="h1">WARNING</WarningHeader>
              {!readingMore && <ReadMore onClick={toggleReadMore}>Read More</ReadMore>}

              <InnerContent readingMore={readingMore}>
                <InnerContentText>
                  Converting GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This
                  means that for every 1 BANANA you trade in, you will receive 0.7 GNANA
                </InnerContentText>
              </InnerContent>
            </CenterCard>
            <Warning />
          </TopCon>

          <OuterContent readingMore={readingMore}>
            <OuterContentText>
              Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means that
              for every 1 BANANA you trade in, you will receive 0.7 GNANA
            </OuterContentText>
          </OuterContent>
        </PaddedCard>

        <Cards id="convert">
          <ConvertCard fromToken="BANANA" toToken="GNANA" />
          <ReturnCard fromToken="GNANA" toToken="BANANA" />
        </Cards>

        <GnanaUtility />
        <GnanaDisclaimers />

        <Spacer size="lg" />
        <Spacer size="md" />
      </Page>
    </>
  )
}
export default React.memo(Zone)
