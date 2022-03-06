import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Modal, InjectedModalProps, ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import {
  useExpertModeManager,
  useUserExpertModeAcknowledgementShow,
  useUserSingleHopOnly,
  useUserRecentTransactions,
} from 'state/user/hooks'
import { useSwapActionHandlers } from 'state/swap/hooks'
import { useTranslation } from 'contexts/Localization'
import TransactionSettings from './TransactionSettings'
import ExpertModal from './ExpertModal'

const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const [showConfirmExpertModal, setShowConfirmExpertModal] = useState(false)
  const [showExpertModeAcknowledgement, setShowExpertModeAcknowledgement] = useUserExpertModeAcknowledgementShow()
  const [expertMode, toggleExpertMode] = useExpertModeManager()
  const [singleHopOnly, setSingleHopOnly] = useUserSingleHopOnly()
  const [recentTransactions, setRecentTransactions] = useUserRecentTransactions()
  const { onChangeRecipient } = useSwapActionHandlers()
  const { t } = useTranslation()

  if (showConfirmExpertModal) {
    return (
      <ExpertModal
        setShowConfirmExpertModal={setShowConfirmExpertModal}
        onDismiss={onDismiss}
        setShowExpertModeAcknowledgement={setShowExpertModeAcknowledgement}
      />
    )
  }

  const handleExpertModeToggle = () => {
    if (expertMode) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else if (!showExpertModeAcknowledgement) {
      onChangeRecipient(null)
      toggleExpertMode()
    } else {
      setShowConfirmExpertModal(true)
    }
  }

  return (
    <div style={{ zIndex: 101, width: '360px' }}>
      <Modal title={t('Transaction Settings')} onDismiss={onDismiss}>
        <ScrollableContainer>
          <TransactionSettings />
          <Flex justifyContent="space-between" alignItems="center" mb="24px" mt="5px">
            <Flex alignItems="center">
              <Text>{t('Recent Transactions')}</Text>
            </Flex>
            <ButtonMenu
              activeIndex={recentTransactions ? 0 : 1}
              size="sm"
              variant="yellow"
              onClick={() => {
                setRecentTransactions(!recentTransactions)
              }}
            >
              <ButtonMenuItem id="toggle-expert-mode-button" fontSize="12px">
                {t('YES')}
              </ButtonMenuItem>
              <ButtonMenuItem id="toggle-expert-mode-button" fontSize="12px">
                {t('NO')}
              </ButtonMenuItem>
            </ButtonMenu>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mb="24px">
            <Flex alignItems="center">
              <Text>{t('Expert Mode')}</Text>
            </Flex>
            <ButtonMenu activeIndex={expertMode ? 0 : 1} size="sm" variant="yellow" onClick={handleExpertModeToggle}>
              <ButtonMenuItem id="toggle-expert-mode-button" fontSize="12px">
                {t('YES')}
              </ButtonMenuItem>
              <ButtonMenuItem id="toggle-expert-mode-button" fontSize="12px">
                {t('NO')}
              </ButtonMenuItem>
            </ButtonMenu>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mb="22px">
            <Flex alignItems="center">
              <Text>{t('Disable Multihops')}</Text>
            </Flex>
            <ButtonMenu
              activeIndex={singleHopOnly ? 0 : 1}
              size="sm"
              variant="yellow"
              onClick={() => {
                setSingleHopOnly(!singleHopOnly)
              }}
            >
              <ButtonMenuItem id="toggle-disable-multihop-button" fontSize="12px">
                {t('YES')}
              </ButtonMenuItem>
              <ButtonMenuItem id="toggle-disable-multihop-button" fontSize="12px">
                {t('NO')}
              </ButtonMenuItem>
            </ButtonMenu>
          </Flex>
        </ScrollableContainer>
      </Modal>
    </div>
  )
}

export default SettingsModal
