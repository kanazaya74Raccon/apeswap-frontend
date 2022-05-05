import React, { useState } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import { useWeb3React } from '@web3-react/core'
import { Button, Input, Modal, Text } from '@apeswapfinance/uikit'
import { Nft } from 'config/constants/types'
import { useTranslation } from 'contexts/Localization'
import { useNonFungibleApes } from 'hooks/useContract'
import UnderlinedButton from 'components/UnderlinedButton'
import InfoRow from './InfoRow'

interface TransferNftModalProps {
  nft: Nft
  tokenId: number
  onSuccess: () => any
  onDismiss?: () => void
}

const Value = styled(Text)`
  font-weight: 300;
`

const ModalContent = styled.div`
  margin-bottom: 16px;
`

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 8px;
  margin-top: 24px;
`

const TransferNftModal: React.FC<TransferNftModalProps> = ({ nft, tokenId, onDismiss }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const nonFungibleApesContract = useNonFungibleApes()

  const handleConfirm = async () => {
    try {
      const isValidAddress = Web3.utils.isAddress(value)

      if (!isValidAddress) {
        setError(t('Please enter a valid wallet address'))
      } else {
        setIsLoading(true)
        await nonFungibleApesContract['safeTransferFrom(address,address,uint256)'](account, value, tokenId).then(
          (trx) => {
            return trx.wait()
          },
        )
        setIsLoading(false)
        onDismiss()
      }
    } catch (err) {
      console.warn('Unable to transfer NFT:', err)
      setIsLoading(false)
    }
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(inputValue)
  }

  return (
    <Modal title={t('Transfer NFT')} onDismiss={onDismiss}>
      <ModalContent>
        {error && (
          <Text color="error" mb="8px">
            {error}
          </Text>
        )}
        <InfoRow>
          <Text>{t('Transferring')}:</Text>
          <Value>{`1x "${nft.name}" NFT`}</Value>
        </InfoRow>
        <Label htmlFor="transferAddress">{t('Receiving address')}:</Label>
        <Input
          id="transferAddress"
          name="address"
          type="text"
          placeholder={t('Paste address')}
          value={value}
          onChange={handleChange}
          isWarning={error}
          disabled={isLoading}
        />
      </ModalContent>
      <Actions>
        <Button fullWidth onClick={handleConfirm} disabled={!account || isLoading || !value}>
          {t('Confirm')}
        </Button>
        <UnderlinedButton text={t('Cancel')} handleClick={onDismiss} />
      </Actions>
    </Modal>
  )
}

export default TransferNftModal
