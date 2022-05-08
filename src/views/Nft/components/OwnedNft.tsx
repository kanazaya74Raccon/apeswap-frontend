import React from 'react'
import { Card, Text } from '@apeswapfinance/uikit'
import { useProfile } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import WalletNft from './WalletNft'

const OwnedNfts = () => {
  const { t } = useTranslation()
  const { profile } = useProfile()
  return (
    <>
      {profile?.ownedNfts && (
        <>
          <Text fontSize="25px" style={{ color: 'subtle', paddingTop: '25px' }} fontWeight={800}>
            {t('Your Apes')}
          </Text>
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
                <WalletNft key={nft.name} nft={nft} />
              </div>
            ))}
          </Card>
        </>
      )}
    </>
  )
}

export default OwnedNfts
