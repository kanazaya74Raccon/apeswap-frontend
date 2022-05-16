import React from 'react'
import { LiquidityWidget } from 'components/LiquidityWidget'
import { Modal, ModalHeader, Heading, Link } from '@ape.swap/uikit'
import { HelpIcon, ModalProvider } from '@apeswapfinance/uikit'
import { Flex } from 'theme-ui'
import { merge } from 'lodash'
import { useTranslation } from 'contexts/Localization'

interface LiquidityModalProps {
  widgetProps?: Record<string, any>
  modalProps?: Record<string, any>
  handleClose?: () => void
}

const LiquidityModal: React.FC<LiquidityModalProps> = ({ widgetProps, handleClose, modalProps: newModalProps }) => {
  const { t } = useTranslation()
  const modalProps = {
    minWidth: '385px',
    maxWidth: '385px',
    style: {
      zIndex: 20,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
  }

  return (
    <ModalProvider>
      <Modal open {...merge(modalProps, newModalProps)}>
        <ModalHeader>
          <Flex
            sx={{
              Svg: {
                marginLeft: 0,
                marginRight: '11px',
              },
              flexDirection: 'row-reverse',
            }}
          >
            <Link
              href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/exchange/liquidity"
              target="_blank"
              textAlign="center"
            >
              <HelpIcon width="20px" style={{ marginLeft: '10px' }} />
            </Link>
            <Heading sx={{ fontSize: '22px', lineHeight: '33px' }} as="h4">
              {t('Add Liquidity')}
            </Heading>
          </Flex>
        </ModalHeader>
        <LiquidityWidget {...widgetProps} onCancel={handleClose} />
      </Modal>
    </ModalProvider>
  )
}

export default LiquidityModal
