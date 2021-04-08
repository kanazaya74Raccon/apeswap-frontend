import React, { useState, useContext } from 'react'
import { Heading, Card } from '@apeswapfinance/uikit'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import WalletNft from './WalletNft'

const OwnedNfts = () => {
  const TranslateString = useI18n()
  const { profile } = useProfile()
  return (
    <>
      {profile?.ownedNfts && (
        <>
          <Heading as="h1" size="lg" color="secondary" paddingTop="25px">
            {TranslateString(999, 'Your Apes')}
          </Heading>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignContent: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
            padding="25px"
            marginTop="10px"
            marginBottom="10px"
          >
            {profile.ownedNfts.map((nft) => (
              <div key={nft.name}>
                <WalletNft nft={nft} />
              </div>
            ))}
          </Card>
        </>
      )}
    </>
  )
}

export default OwnedNfts
