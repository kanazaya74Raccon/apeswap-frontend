import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Spinner, Flex } from '@apeswapfinance/uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/layout/Page'
import { useFetchNfas, useNfas } from 'state/hooks'
import SortNfts from './components/SortNfts'
import OwnedNfts from './components/OwnedNft'

const StyledHero = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Header = styled.div`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) =>
    theme.isDark ? 'url(/images/banners/list-night.svg)' : 'url(/images/banners/list.svg)'};
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    padding-left: 24px;
    padding-right: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 300px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 300px !important;
  color: ${({ theme }) => theme.colors.text};

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 36px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 44px;
    max-width: 500px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

const StyledAnchor = styled.a`
  font-weight: 800;
`

const Nft = () => {
  useFetchNfas()
  const { nfas, isInitialized } = useNfas()
  const { t } = useTranslation()

  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" color="white">
            {t('Non Fungible Apes')}
          </StyledHeading>
          <StyledHeading as="h1" color="white" style={{ marginBottom: '8px' }}>
            {t('Collection')}
          </StyledHeading>
        </HeadingContainer>
      </Header>

      <Page>
        <StyledHero>
          <Text style={{ color: 'subtle', paddingTop: '10px', textDecoration: 'underline' }}>
            <StyledAnchor
              href="https://github.com/ApeSwapFinance/non-fungible-apes"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('More Info')}
            </StyledAnchor>
          </Text>
          <OwnedNfts />
          <Text fontSize="25px" style={{ textDecoration: 'underline', marginTop: '25px', color: 'subtle' }}>
            <StyledAnchor
              href="https://nftkey.app/collections/nfas/?nfasTab=forSale"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('Check out the NFA aftermarket on NFTKEY!')}
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
