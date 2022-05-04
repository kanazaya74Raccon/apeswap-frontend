import React from 'react'
import styled from 'styled-components'
import { Text, Spinner, Flex } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Banner from 'components/Banner'
import Page from 'components/layout/Page'
import { useFetchNfas, useNfas } from 'state/hooks'
import SortNfts from './components/SortNfts'
import OwnedNfts from './components/OwnedNft'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const StyledAnchor = styled.a`
  font-weight: 800;
`

const Nft = () => {
  useFetchNfas()
  const { nfas, isInitialized } = useNfas()
  const TranslateString = useI18n()

  return (
    <>
      <Page>
        <Banner
          banner="nfa-collection"
          link="https://apeswap.gitbook.io/apeswap-finance/product-and-features/collect/non-fungible-apes-nfas"
          title="Nfa Collection"
          margin="0 0 20px 0"
        />
        <StyledHero>
          <Text style={{ color: 'subtle', paddingTop: '10px', textDecoration: 'underline' }}>
            <StyledAnchor
              href="https://github.com/ApeSwapFinance/non-fungible-apes"
              target="_blank"
              rel="noopener noreferrer"
            >
              {TranslateString(999, 'More Info')}
            </StyledAnchor>
          </Text>
          <OwnedNfts />
          <Text fontSize="25px" style={{ textDecoration: 'underline', marginTop: '25px', color: 'subtle' }}>
            <StyledAnchor
              href="https://nftkey.app/collections/nfas/?nfasTab=forSale"
              target="_blank"
              rel="noopener noreferrer"
            >
              {TranslateString(999, 'Check out the NFA aftermarket on NFTKEY!')}
            </StyledAnchor>
          </Text>
        </StyledHero>
        {isInitialized ? (
          <SortNfts nftSet={nfas} />
        ) : (
          <Flex alignItems="center" justifyContent="center">
            <Spinner />
          </Flex>
        )}
      </Page>
    </>
  )
}

export default Nft
