import React, { useState } from 'react'
import { Button, Modal, AutoRenewIcon, Text } from '@apeswapfinance/uikit'
import Image from 'views/Nft/components/Image'
import styled from 'styled-components'
import ModalActions from 'components/ModalActions'
import { useProfile } from 'state/hooks'
import UnderlinedButton from 'components/UnderlinedButton'
import { useTranslation } from '../../../contexts/Localization'

interface DepositModalProps {
  tier: number
  onConfirm: (ids: number[]) => void
  onDismiss?: () => void
}

const OwnedNfaWrapper = styled.div`
  width: 305px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  align-self: center;
  margin-bottom: 10px;
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueries.lg} {
    width: 405px;
  }
`

const Nfa = styled.div<{ active: boolean }>`
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px ${(props) => (props.active ? '15px #ffb300' : '2px black')};
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
`

const DepositModal: React.FC<DepositModalProps> = ({ onConfirm, onDismiss, tier }) => {
  const { profile } = useProfile()
  const ownedFilteredNfas = profile?.ownedNfts?.filter((nfa) => {
    return nfa.attributes.rarityTierNumber === tier
  })
  const [selectedNfas, setSelectedNfas] = useState([])
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()

  const handleNfaChange = (index) => {
    if (selectedNfas.includes(index)) {
      setSelectedNfas(selectedNfas.filter((i) => i !== index))
    } else {
      setSelectedNfas([...selectedNfas, index])
    }
  }

  return (
    <Modal title={`${t('Deposit')} ${t('Tier')} ${tier} ${t('NFAs')}`} onDismiss={onDismiss}>
      <Text marginBottom="20px">
        {t('NFAs Selected')}:
        {selectedNfas?.map((index) => {
          return ` ${index},`
        })}
      </Text>
      <OwnedNfaWrapper>
        {ownedFilteredNfas?.length !== 0 || ownedFilteredNfas === undefined ? (
          ownedFilteredNfas?.map((nfa) => {
            return (
              <Nfa onClick={() => handleNfaChange(nfa.index)} active={selectedNfas?.includes(nfa.index)}>
                <Image src={nfa.image} alt={nfa.name} rarityTier={nfa.attributes.rarityTierNumber} />
              </Nfa>
            )
          })
        ) : (
          <Text marginBottom="20px">{t('You do not have any tier %tier% NFAs in your wallet', { tier })} 😢</Text>
        )}
      </OwnedNfaWrapper>
      <ModalActions>
        <Button
          fullWidth
          disabled={pendingTx || selectedNfas?.length === 0}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(selectedNfas)
            setPendingTx(false)
            onDismiss()
          }}
          endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
          style={{
            borderRadius: '10px',
          }}
        >
          {pendingTx ? t('Pending Confirmation') : t('Confirm')}
        </Button>
        <UnderlinedButton text={t('Cancel')} handleClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

export default DepositModal
