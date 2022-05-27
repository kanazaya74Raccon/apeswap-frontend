/** @jsxImportSource theme-ui */
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Heading } from '@ape.swap/uikit'
import { Nft } from 'config/constants/types'
import { Box } from 'theme-ui'
import InfoRow from '../InfoRow'
import Image from '../Image'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const { index, name, image, attributes } = nft

  const pad = (n, width) => {
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  }

  return (
    <Link to={`/nft/${index}`}>
      <Card sx={{ borderRadius: '10px', overflow: 'hidden' }}>
        <Image src={image} alt={name} originalLink={image} rarityTier={attributes.rarityTierNumber} />
        <Box sx={{ height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Header>
            <Heading as="h5" sx={{ textAlign: 'center' }}>
              {name} - #{pad(`${index}`, '4')}
            </Heading>
          </Header>
        </Box>
      </Card>
    </Link>
  )
}

export default NftCard
