import React from 'react'
import styled from 'styled-components'
import { Heading } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import nfts from 'config/constants/nfts'
import NftProvider from './contexts/NftProvider'
import SortNfts from './components/SortNfts'
import OwnedNfts from './components/OwnedNft'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Nft = () => {
  const TranslateString = useI18n()

  return (
    <NftProvider>
      <Page>
        <StyledHero>
          <Heading as="h1" size="xxl" color="secondary" mb="24px">
            Non Fungible Apes
          </Heading>
          <OwnedNfts />
          <Heading as="h1" size="lg" color="secondary" paddingTop="25px" style={{ textDecoration: 'underline' }}>
            <a
              href="https://treasureland.market/#/nft-market/apeswap?sellingType=0&priceType=0&title=0&sortValue=1&page=1&project=21"
              target="_blank"
              rel="noopener noreferrer"
            >
              {TranslateString(999, 'Sales open on April 17th at 17:00 UTC on Treasureland')}
            </a>
          </Heading>
        </StyledHero>
        <SortNfts nftSet={nfts} />
      </Page>
    </NftProvider>
  )
}

export default Nft
