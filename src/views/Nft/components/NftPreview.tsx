import React from 'react'
import orderBy from 'lodash/orderBy'
import { Card, CardBody, Heading } from '@apeswapfinance/uikit'
import Container from 'components/layout/Container'
import nfts from 'config/constants/nfts'
import NftGrid from './NftGrid'
import PleaseWaitCard from './PleaseWaitCard'
import Image from './Image'

const NftPreview = () => {
  return (
    <Container>
      <PleaseWaitCard />
      <NftGrid>
        {orderBy(nfts, 'index').map((nft) => (
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
