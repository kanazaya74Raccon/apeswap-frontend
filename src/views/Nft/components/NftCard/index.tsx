import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Button,
  ChevronUpIcon,
  ChevronDownIcon,
  Text,
  CardFooter,
  useModal,
} from '@apeswapfinance/uikit'
import { useProfile } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Nft } from 'config/constants/types'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'
import TransferNftModal from '../TransferNftModal'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const DetailsButton = styled(Button).attrs({ variant: 'text', fullWidth: true })`
  height: auto;
  padding: 16px 24px;

  &:hover:not(:disabled):not(:active) {
    background-color: transparent;
  }

  &:focus:not(:active) {
    box-shadow: none;
  }
`

const InfoBlock = styled.div`
  padding: 24px;
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const { isInitialized, getTokenIds, reInitialize } = useContext(NftProviderContext)
  const { profile } = useProfile()
  const { index, name, image, attributes } = nft
  const Icon = isOpen ? ChevronUpIcon : ChevronDownIcon

  const handleClick = async () => {
    setIsOpen(!isOpen)
  }

  const handleSuccess = () => {
    reInitialize()
  }

  const pad = (n, width) => {
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  }

  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenId={nft.index} onSuccess={handleSuccess} />,
  )

  return (
    <Card>
      <Image src={image} alt={name} originalLink={image} rarityTier={attributes.rarityTierNumber} />
      <CardBody>
        <Header>
          <Heading>
            {name} - #{pad(`${index}`, '4')}
          </Heading>
        </Header>
        {profile?.ownedNfts.indexOf(nft) >= 0 && (
          <Button fullWidth variant="primary" mt="24px" onClick={onPresentTransferModal}>
            {TranslateString(999, 'Transfer')}
          </Button>
        )}
      </CardBody>
      <CardFooter p="0">
        <DetailsButton endIcon={<Icon width="24px" color="primary" />} onClick={handleClick}>
          {TranslateString(999, 'Details')}
        </DetailsButton>
        {isOpen && (
          <InfoBlock>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Base - {attributes.baseColor}
            </Text>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Eyes - {attributes.eyes}
            </Text>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Face - {attributes.faceColor}
            </Text>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Frame - {attributes.frames}
            </Text>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Hat - {attributes.hats}
            </Text>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Mouth - {attributes.mouths}
            </Text>
            <Text as="p" color="textSubtle" style={{ textAlign: 'left' }}>
              Overall Rarity Rank - {attributes.rarityOverallRank} / 1000
            </Text>
          </InfoBlock>
        )}
      </CardFooter>
    </Card>
  )
}

export default NftCard
