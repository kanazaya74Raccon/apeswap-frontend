import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@apeswapfinance/uikit'
import { Nft } from 'config/constants/types'
import InfoRow from '../InfoRow'
import Image from '../Image'
import { NftProviderContext } from '../../contexts/NftProvider'

interface NftCardProps {
  nft: Nft
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const { reInitialize } = useContext(NftProviderContext)
  const { index, name, image, attributes } = nft

  const pad = (n, width) => {
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
  }

  return (
    <Link to={`/nft/${index}`}>
      <Card>
        <Image src={image} alt={name} originalLink={image} rarityTier={attributes.rarityTierNumber} />
        <CardBody>
          <Header>
            <Heading>
              {name} - #{pad(`${index}`, '4')}
            </Heading>
          </Header>
        </CardBody>
      </Card>
    </Link>
  )
}

export default NftCard
