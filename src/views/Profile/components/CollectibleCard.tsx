import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@apeswapfinance/uikit'
import { Nft } from 'config/constants/types'

interface CollectibleCardProps {
  nft: Nft
}

const PreviewImage = styled.img`
  border-radius: 4px;
  margin-bottom: 8px;
`

const CollectibleCard: React.FC<CollectibleCardProps> = ({ nft }) => {
  return (
    <div>
      <PreviewImage src={`/images/nfts/${nft.image}`} />
      <Heading as="h5" size="sm" mb="8px">
        {nft.name}
      </Heading>
      <Text as="p" fontSize="12px" color="textSubtle">
        {nft.attributes}
      </Text>
    </div>
  )
}

export default CollectibleCard
