import React from 'react'
import { Flex, Modal, Text } from '@apeswapfinance/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Bills } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import {
  BillDescriptionContainer,
  BillsImage,
  BillTitleContainer,
  GridTextValContainer,
  ModalBodyContainer,
  TopDescriptionText,
} from './styles'
import { buyBillGridText } from './constants'

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
}

const BillModalView: React.FC<BillModalProps> = ({ onDismiss, bill }) => {
  const { token, quoteToken, earnToken, billType, lpToken, price, priceUsd } = bill
  const formatedLpPrice = getBalanceNumber(new BigNumber(price))
  return (
    <Modal title="" onDismiss={onDismiss} bodyPadding="5px 20px">
      <ModalBodyContainer>
        <BillsImage />
        <BillDescriptionContainer>
          <BillTitleContainer>
            <TopDescriptionText>{billType}</TopDescriptionText>
            <Flex alignItems="center">
              <ServiceTokenDisplay token1={token.symbol} token2={quoteToken.symbol} token3={earnToken.symbol} stakeLp />
              <Text ml="10px" bold>
                {lpToken.symbol}
              </Text>
            </Flex>
          </BillTitleContainer>
          <Flex flexDirection="column">
            <TopDescriptionText>Price {formatedLpPrice}</TopDescriptionText>
            <Flex alignItems="center">
              <ServiceTokenDisplay token1={token.symbol} token2={quoteToken.symbol} noEarnToken />
              <Text ml="10px" bold>
                {formatedLpPrice}
              </Text>
              <Text ml="10px">{`(${priceUsd})`}</Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            {buyBillGridText.map((text, i) => {
              return (
                <GridTextValContainer>
                  <Text fontSize="12px">{text}</Text>
                  <Text fontSize="12px" bold>
                    0
                  </Text>
                </GridTextValContainer>
              )
            })}
          </Flex>
          <Flex style={{ height: '50px' }}>s</Flex>
        </BillDescriptionContainer>
      </ModalBodyContainer>
    </Modal>
  )
}

export default React.memo(BillModalView)
