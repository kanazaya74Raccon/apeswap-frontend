import React, { useEffect, useState } from 'react'
import Page from 'components/layout/Page'
import { apiBaseUrl } from 'hooks/api'
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
  width: 450px;
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
  color: ${(props) => props.theme.colors.textSubtle};
  font-family: ${(props) => props.theme.fontFamily.poppins};
`

export interface SaleHistory {
  from: string
  to: string
  tokenId: number
  value: string
  transactionHash: string
  blockNumber: number
}

const Nfa = () => {
  const [sale, setSale] = useState<SaleHistory[] | null>(null)
  const { id: idStr }: { id: string } = useParams()
  const id = Number(idStr)
  const TranslateString = useI18n()
  const nfa = nfts.find((nft) => nft.index === id)
  const bnbPrice = usePriceBnbBusd()

  const bigNumber = (num) => {
    return num / 1e18
  }

  const getUsd = (num) => {
    return (bnbPrice.c[0] * bigNumber(num)).toFixed(2)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/nfas/history/${id}`)
        const responsedata: SaleHistory[] = await response.json()
        setSale(responsedata)
      } catch (error) {
        console.error('Unable to fetch data:', error)
      }
    }
    fetchData()
  }, [setSale, id])

  if (!nfa) {
    return <Redirect to="/404" />
  }

  return (
    <Page>
      <PageHolder>
        <NfaHolder>
          <NfaImageHolder>
            <Image src={nfa.image} alt="" originalLink="" rarityTier={nfa.attributes.rarityTierNumber} />
          </NfaImageHolder>
          <NfaAttributes nfa={nfa} />
          <Link to="/nft">
            <Button size="sm" style={{ marginTop: '30px' }}>
              {TranslateString(999, 'Back')}
            </Button>
          </Link>
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
            <a href={`https://bscscan.com/tx/${transaction.transactionHash}`} target="_blank" rel="noopener noreferrer">
              <SalesContainer>
                <SalesItem>${getUsd(transaction.value)} USD</SalesItem>
                <SalesItem>{bigNumber(transaction.value)} BNB</SalesItem>
                <SalesItem>{transaction.blockNumber} Block</SalesItem>
              </SalesContainer>
            </a>
          ))}
        </DetailsHolder>
      </PageHolder>
    </Page>
  )
}

export default Nfa
