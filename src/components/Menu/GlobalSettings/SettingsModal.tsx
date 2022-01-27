import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Flex, Modal, InjectedModalProps, ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import { useExpertModeManager, useUserExpertModeAcknowledgementShow, useUserSingleHopOnly } from 'state/user/hooks'
import { useSwapActionHandlers } from 'state/swap/hooks'
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
  const { onChangeRecipient } = useSwapActionHandlers()

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
    <div style={{ zIndex: 101, maxWidth: '420px' }}>
      <Modal title="Transaction Settings" onDismiss={onDismiss}>
        <ScrollableContainer>
          <TransactionSettings />
          <Flex justifyContent="space-between" alignItems="center" mb="24px">
            <Flex alignItems="center">
              <Text>Expert Mode</Text>
            </Flex>
            <ButtonMenu activeIndex={expertMode ? 0 : 1} size="sm" variant="yellow" onClick={handleExpertModeToggle}>
              <ButtonMenuItem id="toggle-expert-mode-button" fontSize="14px">
                YES
              </ButtonMenuItem>
              <ButtonMenuItem id="toggle-expert-mode-button" fontSize="14px">
                NO
              </ButtonMenuItem>
            </ButtonMenu>
          </Flex>
          <Flex justifyContent="space-between" alignItems="center" mb="24px">
            <Flex alignItems="center">
              <Text>Disable Multihops</Text>
            </Flex>
            <ButtonMenu
              activeIndex={singleHopOnly ? 0 : 1}
              size="sm"
              variant="yellow"
              onClick={() => {
                setSingleHopOnly(!singleHopOnly)
              }}
            >
              <ButtonMenuItem id="toggle-disable-multihop-button" fontSize="14px">
                YES
              </ButtonMenuItem>
              <ButtonMenuItem id="toggle-disable-multihop-button" fontSize="14px">
                NO
              </ButtonMenuItem>
            </ButtonMenu>
          </Flex>
        </ScrollableContainer>
      </Modal>
    </div>
  )
}

export default SettingsModal
