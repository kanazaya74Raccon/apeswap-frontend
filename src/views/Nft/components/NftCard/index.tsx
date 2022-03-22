import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, Heading } from '@apeswapfinance/uikit'
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
      <Card>
        <Image src={image} alt={name} originalLink={image} rarityTier={attributes.rarityTierNumber} />
        <Box>
          <Header>
            <Heading>
              {name} - #{pad(`${index}`, '4')}
            </Heading>
          </Header>
        </Box>
      </Card>
    </Link>
  )
}

export default NftCard
