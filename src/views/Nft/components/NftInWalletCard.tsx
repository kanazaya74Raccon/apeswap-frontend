import React from 'react'
import { Card, Heading, Text } from '@apeswapfinance/uikit'
import { Box } from 'theme-ui'
import { useTranslation } from 'contexts/Localization'
import CardContent from './CardContent'

const NftInWalletCard = () => {
  const { t } = useTranslation()

  return (
    <Card>
      <Box>
        <CardContent imgSrc="/images/present.svg">
          <Heading mb="8px">{t('NFT in wallet')}</Heading>
          <Text>{t('Trade in your NFT for BANANA, or just keep it for your collection.')}</Text>
        </CardContent>
      </Box>
    </Card>
  )
}

export default NftInWalletCard
