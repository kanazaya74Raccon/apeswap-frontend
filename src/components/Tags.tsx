import React from 'react'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon } from '@apeswapfinance/uikit'

const CoreTag = () => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon />}>
    Core
  </Tag>
)

const ApeZone = () => (
  <Tag variant="primary" outline startIcon={<CommunityIcon />}>
    ApeZone
  </Tag>
)

const CommunityTag = () => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon />}>
    Community
  </Tag>
)

const BinanceTag = () => (
  <Tag variant="binance" outline startIcon={<BinanceIcon />}>
    Binance
  </Tag>
)

const DualTag = (props) => (
  <Tag variant="textSubtle" outline {...props}>
    Dual
  </Tag>
)

export { CoreTag, CommunityTag, BinanceTag, ApeZone, DualTag }
