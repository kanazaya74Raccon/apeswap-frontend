import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import { Text, Button, AutoRenewIcon } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useRemoveAuction from 'hooks/useRemoveAuction'
import Image from '../../../Nft/components/Image'

interface QueuedCardProps {
  nfa: Nft
  seller: string
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
  top: 10px;
  border-radius: 45px 0px 0px 0px;
  ${({ theme }) => theme.mediaQueries.lg} {
    height: 200px;
    width: 200px;
    left: 15px;
    top: 17px;
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
    top: 50px;
    font-size: 20px;
  }
`

const NameText = styled(Text)`
  position: absolute;
  top: 0px;
  font-size: 25px;
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 20px;
    font-size: 20px;
  }
`

const RemoveButton = styled(Button)`
  position: absolute;
  top: 75px;
  font-size: 15px;
  background-color: #ff6347;
  color: white;
  padding: 15px;
  border: none;
  border-radius: 10px;
  :hover {
    background-color: red !important;
  }
  :focus {
    outline: none !important;
    box-shadow: none !important;
    background: red;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    top: 100px;
    font-size: 15px;
  }
`

const QueuedCard: React.FC<QueuedCardProps> = ({ nfa, seller }) => {
  const { account } = useWeb3React()
  const { onRemoveAuction } = useRemoveAuction()
  const [pendingTx, setPendingTx] = useState(null)

  const handleRemoveAuction = useCallback(async () => {
    setPendingTx(true)
    await onRemoveAuction(nfa.index)
    setPendingTx(false)
  }, [setPendingTx, onRemoveAuction, nfa])

  return (
    <Card>
      <TextHolder>
        <ComingSoon>Coming Soon</ComingSoon>
        <NameText>#{nfa.index}</NameText>
        {account === seller && (
          <RemoveButton
            disabled={pendingTx}
            onClick={handleRemoveAuction}
            endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
          >
            Remove
          </RemoveButton>
        )}
      </TextHolder>
      <NfaImageHolder>
        <Image src={nfa.image} rarityTier={nfa.attributes.rarityTierNumber} alt={nfa.name} borderRadius="10px" />
      </NfaImageHolder>
    </Card>
  )
}

export default QueuedCard
