import React from 'react'
import Page from 'components/layout/Page'
import { useGetNfaSales } from 'hooks/api'
import { usePriceBnbBusd } from 'state/hooks'
import styled from 'styled-components'
import { Text, Button } from '@apeswapfinance/uikit'
import { Link, Redirect, useParams } from 'react-router-dom'
import nfts from 'config/constants/nfts'
import useI18n from 'hooks/useI18n'
import NfaAttributes from './components/NfaAttributes'
import Image from './components/Image'

const NfaImageHolder = styled.div`
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.xs} {
    height: 335px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 435px;
  }
`

const NfaHolder = styled.div`
  margin-top: 35px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 350px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 450px;
  }
`

const PageHolder = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  justify-content: center;
`

const DetailsHolder = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.card};
  box-shadow: 0px 0px 10px ${(props) => props.theme.colors.textSubtle};
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 0px;
    width: 350px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 25px;
    width: 450px;
  }
  align-items: center;
`

const SalesContainer = styled.div`
  display: grid;
  grid-template-columns: 125px 90px 140px;
  grid-column-gap: 8px;
  width: 400px;
  height: 35px;
  align-self: center;
`

const SalesItem = styled.div`
  align-self: center;
  justify-self: right;
  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 14px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
  }
  color: ${(props) => props.theme.colors.textSubtle};
  font-family: ${(props) => props.theme.fontFamily.poppins};
`

const Nfa = () => {
  const { id: idStr }: { id: string } = useParams()
  const id = Number(idStr)
  const TranslateString = useI18n()
  const nfa = nfts.find((nft) => nft.index === id)
  const bnbPrice = usePriceBnbBusd()
  const sale = useGetNfaSales(id)

  const bigNumber = (num) => {
    return num / 1e18
  }

  const getUsd = (num) => {
    return (bnbPrice.c[0] * bigNumber(num)).toFixed(2)
  }

  if (!nfa) {
    return <Redirect to="/404" />
  }

  return (
    <Page>
      <Link to="/nft">
        <Button size="sm" style={{ marginTop: '25px' }}>
          {TranslateString(999, 'Back')}
        </Button>
      </Link>
      <PageHolder>
        <NfaHolder>
          <NfaImageHolder>
            <Image src={nfa.image} alt="" originalLink="" rarityTier={nfa.attributes.rarityTierNumber} />
          </NfaImageHolder>
          <NfaAttributes nfa={nfa} />
        </NfaHolder>
        <DetailsHolder>
          <Text fontSize="32px" color="primary">
            {TranslateString(999, `${nfa.name} ${nfa.index}`)}
          </Text>
          <Text fontFamily="poppins" fontSize="20px" color="textSubtle">
            {TranslateString(999, nfa.attributes.rarityTierName)}
          </Text>
          <Text fontFamily="poppins" fontSize="20px" color="textSubtle">
            {TranslateString(
              999,
              `Level ${nfa.attributes.rarityTierNumber} | Rarity ${nfa.attributes.rarityOverallRank} / 1000`,
            )}
          </Text>
          <a
            href={`https://nftkey.app/collections/nfas/ape-details/?tokenId=${id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text fontFamily="poppins" fontSize="20px" color="textSubtle" style={{ textDecoration: 'underline' }}>
              {TranslateString(999, 'Marketplace')}
            </Text>
          </a>
          {sale?.length > 0 && (
            <Text fontFamily="poppins" fontSize="23px" color="textSubtle" style={{ margin: '35px 0px 15px 0px' }}>
              {TranslateString(999, 'Previous Sales')}
            </Text>
          )}
          {sale?.map((transaction) => (
            <a
              href={`https://bscscan.com/tx/${transaction.transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
              key={transaction.transactionHash}
            >
              <SalesContainer>
                <SalesItem key={transaction.tokenId}>${getUsd(transaction.value)} USD</SalesItem>
                <SalesItem key={transaction.value}>{bigNumber(transaction.value)} BNB</SalesItem>
                <SalesItem key={transaction.blockNumber}>{transaction.blockNumber} Block</SalesItem>
              </SalesContainer>
            </a>
          ))}
        </DetailsHolder>
      </PageHolder>
    </Page>
  )
}

export default Nfa
