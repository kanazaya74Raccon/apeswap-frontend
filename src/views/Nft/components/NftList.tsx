import React from 'react'
import { Nft } from 'config/constants/types'
import NftCard from './NftCard'
import NftGrid from './NftGrid'

interface NftListProps {
  nftSet: Nft[]
}

const NftList: React.FC<NftListProps> = ({ nftSet }) => {
  return (
    <>
      <NftGrid>
        {nftSet.map((nft) => (
          <div key={nft.index}>
            <NftCard nft={nft} />
          </div>
        ))}
      </NftGrid>
    </>
  )
}

export default NftList
