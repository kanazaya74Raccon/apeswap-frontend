import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import nfts from 'config/constants/nfts'
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
    <Page>
      <StyledHero>
        <img src="/images/ape-banner.png" alt="lottery intro" />
        <Text style={{ color: 'subtle', paddingTop: '10px', textDecoration: 'underline' }}>
          <a href="https://github.com/ApeSwapFinance/non-fungible-apes" target="_blank" rel="noopener noreferrer">
            {TranslateString(999, 'More Info')}
          </a>
        </Text>
        <OwnedNfts />
        <Text fontSize="25px" style={{ textDecoration: 'underline', marginTop: '25px', color: 'subtle' }}>
          <a href="https://nftkey.app/collections/nfas/?nfasTab=forSale" target="_blank" rel="noopener noreferrer">
            {TranslateString(999, 'Checkout the NFA aftermarket on NFTKEY!')}
          </a>
        </Text>
      </StyledHero>
      <SortNfts nftSet={nfts} />
    </Page>
  )
}

export default Nft
