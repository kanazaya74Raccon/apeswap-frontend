import React from 'react'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'
import Image from '../../../Nft/components/Image'

interface QueuedCardProps {
  nfa: Nft
}

const Card = styled.div`
  width: 420px;
  height: 235px;
  border-radius: 10px;
  opacity: 0.7;
  background-color: ${({ theme }) => theme.colors.card};
  display: flex;
  align-items: center;
`

const NfaImageHolder = styled.div`
  position: absolute;
  height: 200px;
  width: 200px;
  left: 15px;
  border-radius: 45px 0px 0px 0px;
`

const TextHolder = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 20px;
  left: 225px;
  width: 180px;
  height: 200px;
`

const ComingSoon = styled(Text)`
  position: absolute;
  top: 30px;
  font-size: 20px;
`

const QueuedCard: React.FC<QueuedCardProps> = ({ nfa }) => {
  return (
    <Card>
      <TextHolder>
        <ComingSoon>Coming Soon</ComingSoon>
      </TextHolder>
      <NfaImageHolder>
        <Image src={nfa.image} rarityTier={nfa.attributes.rarityTierNumber} alt={nfa.name} borderRadius="10px" />
      </NfaImageHolder>
    </Card>
  )
}

export default QueuedCard
