import React from 'react'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'
import Image from '../../../Nft/components/Image'

interface QueuedCardProps {
  nfa: Nft
}

const Card = styled.div`
  width: 300px;
  height: 435px;
  border-radius: 10px;
  opacity: 0.7;
  background-color: ${({ theme }) => theme.colors.card};
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 420px;
    height: 235px;
  }
`

const NfaImageHolder = styled.div`
  position: absolute;
  height: 150px;
  width: 280px;
  left: 10px;
  margin-bottom: 265px;
  border-radius: 45px 0px 0px 0px;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 200px;
    width: 200px;
    left: 15px;
    margin-bottom: 0px;
  }
`

const TextHolder = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 300px;
  left: 0px;
  width: 300px;
  height: 200px;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 20px;
    left: 225px;
    width: 180px;
    height: 200px;
  }
`

const ComingSoon = styled(Text)`
  position: absolute;
  top: 30px;
  font-size: 25px;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 30px;
    font-size: 20px;
  }
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
