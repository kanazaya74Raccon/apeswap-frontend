import React from 'react'
import styled from 'styled-components'
import { Heading } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import NftList from './components/NftList'
import NftProvider from './contexts/NftProvider'
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
          <Heading as="h2" size="lg" color="secondary" paddingTop='25px'>
            {TranslateString(999, 'The first 130!')}
          </Heading>
        </StyledHero>
        <NftList />
      </Page>
    </NftProvider>
  )
}

export default Nft
