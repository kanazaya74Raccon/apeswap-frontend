import React, { useContext } from 'react'
import { Nft } from 'config/constants/types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, Button, useModal } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'
import Image from './Image'
import TransferNftModal from './TransferNftModal'
import { NftProviderContext } from '../contexts/NftProvider'

interface NftCardProps {
  nft: Nft
}

const CardFlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`

const CardFlip = styled.div`
  position: relative;
  &:hover ${CardFlipInner} {
    transform: rotateY(180deg);
  }
  width: 350px;
  height: 425px;
  perspective: 1000px;
  align-self: center;
  margin: 10px;
`

const CardFlipFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: ${(props) => props.theme.colors};
  border: 2.5px solid ${(props) => props.theme.colors.primary};
  z-index: -1;
`

const CardFlipBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: ${(props) => props.theme.colors};
  border: 2.5px solid ${(props) => props.theme.colors.primary};
  transform: rotateY(180deg);
  z-index: -1;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 10px;
  justify-content: space-between;
  margin-top: 10px;
`

const WalletNft: React.FC<NftCardProps> = ({ nft }) => {
  const TranslateString = useI18n()
  const { reInitialize } = useContext(NftProviderContext)
  const nfaAttributes = [
    'Face',
    'Base',
    'Frame',
    'Mouth',
    'Eyes',
    'Hat',
    'Rarity Score',
    'Rarity Tier Number',
    'Rarity Tier Name',
    'Rarity Overall Rank',
  ]

  const handleSuccess = () => {
    reInitialize()
  }

  const [onPresentTransferModal] = useModal(
    <TransferNftModal nft={nft} tokenId={nft.index} onSuccess={handleSuccess} />,
  )

  const pad = (n, width) => {
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  }

  return (
    <CardFlip>
      <CardFlipInner>
        <Link to={`/nft/${nft.index}`}>
          <CardFlipFront>
            <Image src={nft.image} alt={nft.image} rarityTier={nft.attributes.rarityTierNumber} />
            <Text fontSize="20px" paddingTop="20px" color="subtle" fontFamily="Titan One">
              {nft.name} - #{pad(`${nft.index}`, '4')}
            </Text>
          </CardFlipFront>
        </Link>
        <CardFlipBack>
          <Link to={`/nft/${nft.index}`}>
            {Object.keys(nft.attributes).map((key, index) => (
              <Row key={key}>
                <Text as="p" color="subtle" style={{ paddingLeft: '10px', textAlign: 'left' }} fontFamily="Titan One">
                  {nfaAttributes[index]}:
                </Text>
                <Text as="p" color="subtle" style={{ paddingRight: '10px', textAlign: 'right' }} fontFamily="Titan One">
                  {nft.attributes[key]}
                </Text>
              </Row>
            ))}
          </Link>
          <Button
            variant="primary"
            style={{
              position: 'absolute',
              borderRadius: '0px',
              width: '100%',
              height: '50px',
              left: '0',
              bottom: '0',
            }}
            onClick={onPresentTransferModal}
          >
            {TranslateString(999, 'Transfer')}
          </Button>
        </CardFlipBack>
      </CardFlipInner>
    </CardFlip>
  )
}

export default WalletNft
