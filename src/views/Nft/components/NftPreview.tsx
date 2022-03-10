import React from 'react'
import orderBy from 'lodash/orderBy'
import { Card, CardBody, Heading } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import { useFetchNfas, useNfas } from 'state/hooks'
import NftGrid from './NftGrid'
import PleaseWaitCard from './PleaseWaitCard'
import Image from './Image'

const NftPreview = () => {
  useFetchNfas()
  const { nfas } = useNfas()
  return (
    <Container>
      <PleaseWaitCard />
      <NftGrid>
        {orderBy(nfas, 'index').map((nft) => (
          <div key={nft.name}>
            <Card>
              <Image src={nft.image} alt={nft.name} rarityTier={nft.attributes.rarityTierNumber} />
              <CardBody>
                <Heading>{nft.name}</Heading>
              </CardBody>
            </Card>
          </div>
        ))}
      </NftGrid>
    </Container>
  )
}

export default NftPreview
