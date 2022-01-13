import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, CardBody, Button, Text, Flex, Checkbox } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { ethers } from 'ethers'
import TokenInput from 'components/TokenInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { useBananaAddress } from 'hooks/useAddress'
import styled from 'styled-components'
import { getFullDisplayBalance } from 'utils/formatBalance'
import CardValue from 'views/Home/components/CardValue'
import { useWeb3React } from '@web3-react/core'

interface XCardProps {
  header: string
  fromToken: string
  toToken: string
  inputVal: string
  handleSelectMax: () => void
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void
  fullBalance: string
}

const StyledCard = styled(Card)`
  overflow: visible;
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  padding: 10px;
`
const HeaderCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  padding-top: 10px;
  padding-bottom: 5px;
`
const Header = styled(Heading)`
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;
`
const TokensDisplay = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.yellow};
  text-transform: uppercase;
`
const ContentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  margin-top: 10px;
  padding: 10px 10px;
`

const ExchangeCard: React.FC<XCardProps> = ({
  header,
  fromToken,
  toToken,
  inputVal,
  handleSelectMax,
  handleChange,
  fullBalance,
}) => {
  return (
    <StyledCard>
      <HeaderCard>
        <Header>{header}</Header>
        <TokensDisplay>
          {fromToken} &gt; {toToken}
        </TokensDisplay>
      </HeaderCard>

      <ContentCard>
        <TokenInput
          value={inputVal}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={fromToken}
        />
      </ContentCard>
    </StyledCard>
  )
}

export default ExchangeCard
