import { Text } from '@apeswapfinance/uikit'
import BillsDiagram from 'components/MarketingModalContent/Bills/BillsDiagram'
import ReactPlayer from 'react-player'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { BillDiagramContainer, BillGifContainer, DescriptionContainer, FirstTimeCardContainer } from './styles'

const FirstTimeCard: React.FC = () => {
  const { t } = useTranslation()
  return (
    <FirstTimeCardContainer>
      <BillGifContainer>
        <ReactPlayer playing muted loop url="videos/bills-video.mp4" height="100%" width="100%" playsInline />
      </BillGifContainer>
      <DescriptionContainer>
        <Text bold mb="0px" fontSize="22px">
          {t('Information')}
        </Text>
        <Text fontSize="12px" style={{ lineHeight: '15px' }}>
          {t(
            'Treasury Bills allows users to access tokens at a discount in exchange for their liquidity provider (LP) tokens. Each Treasury Bill is a unique NFT that represents the contract and its respective reward tokens, which vest over a certain amount of time.',
          )}
          <br /> <br />
          {t('For more info, visit the Treasury Bills page in our Documentation.')} <br /> <br />
          <Text fontSize="12px" bold>
            {t('HOW IT WORKS')}:
          </Text>
        </Text>
        <BillDiagramContainer>
          <BillsDiagram />
        </BillDiagramContainer>
      </DescriptionContainer>
    </FirstTimeCardContainer>
  )
}

export default React.memo(FirstTimeCard)
