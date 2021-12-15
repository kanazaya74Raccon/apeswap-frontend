import React, { useState } from 'react'
import { Button, Text, Flex, Modal, InjectedModalProps, Checkbox, ButtonSquare } from '@apeswapfinance/uikit'
import { useExpertModeManager } from 'state/user/hooks'

interface ExpertModalProps extends InjectedModalProps {
  setShowConfirmExpertModal: (boolean) => void
  setShowExpertModeAcknowledgement: (boolean) => void
}

const ExpertModal: React.FC<ExpertModalProps> = ({ setShowConfirmExpertModal, setShowExpertModeAcknowledgement }) => {
  const [, toggleExpertMode] = useExpertModeManager()
  const [isRememberChecked, setIsRememberChecked] = useState(false)

  return (
    <div style={{ zIndex: 101, maxWidth: '360px' }}>
      <Modal
        title="Expert Mode"
        onBack={() => setShowConfirmExpertModal(false)}
        onDismiss={() => setShowConfirmExpertModal(false)}
      >
        <Text>
          Expert mode turns off the Confirm transaction prompt, and allows high slippage trades that often result in bad
          rates and lost funds
        </Text>
        <Text mb="24px">Only use this mode if you know what you’re doing</Text>
        <Flex alignItems="center" mb="24px">
          <Checkbox
            name="confirmed"
            type="checkbox"
            checked={isRememberChecked}
            onChange={() => setIsRememberChecked(!isRememberChecked)}
            scale="sm"
          />
          <Text ml="10px" color="textSubtle" style={{ userSelect: 'none' }}>
            Don’t show this again
          </Text>
        </Flex>
        <ButtonSquare
          mb="10px"
          fullWidth
          id="confirm-expert-mode"
          style={{ fontSize: '16px', fontWeight: 700 }}
          onClick={() => {
            // eslint-disable-next-line no-alert
            if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
              toggleExpertMode()
              setShowConfirmExpertModal(false)
              if (isRememberChecked) {
                setShowExpertModeAcknowledgement(false)
              }
            }
          }}
        >
          Turn On Expert Mode
        </ButtonSquare>
        <ButtonSquare
          fullWidth
          style={{
            fontSize: '16px',
            fontWeight: 700,
            backgroundColor: 'rgb(0,0,0,0)',
            border: '1px solid rgba(255, 179, 0, 1)',
          }}
          onClick={() => {
            setShowConfirmExpertModal(false)
          }}
        >
          Cancel
        </ButtonSquare>
      </Modal>
    </div>
  )
}

export default ExpertModal
