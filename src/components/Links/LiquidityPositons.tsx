import React from 'react'
import { ArrowDropUpIcon, Flex, Text } from '@apeswapfinance/uikit'
import { Link } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'

const LiquidityPositionLink = () => {
  const { t } = useTranslation()
  return (
    <Link to="/pool">
      <Flex justifyContent="flex-start" margin="0px 30px 0px 26px">
        <ArrowDropUpIcon width="11px" style={{ transform: 'rotate(270deg)', marginRight: '10px' }} />
        <Text fontSize="13px">{t('See your Liquidity Positons')}</Text>
      </Flex>
    </Link>
  )
}

export default LiquidityPositionLink
