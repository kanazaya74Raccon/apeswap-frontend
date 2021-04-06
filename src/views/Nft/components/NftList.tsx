import React from 'react'
import orderBy from 'lodash/orderBy'
import nfts from 'config/constants/nfts'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

const NftList = () => {
  return (
    <NftGrid>
      {nfts.slice(0, 129).map((nft) => (
        <div key={nft.name}>
          <NftCard nft={nft} />
        </div>
      ))}
    </NftGrid>
  )
}

export default NftList
