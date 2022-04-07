import React from 'react'
import { Button, Flex, HelpIcon, LinkExternal, Modal, Text, TooltipBubble, useModal } from '@apeswapfinance/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Bills } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import {
  ActionButtonsContainer,
  BillDescriptionContainer,
  BillFooterContentContainer,
  BillsFooterContainer,
  BillsImage,
  BillTitleContainer,
  GridTextValContainer,
  ModalBodyContainer,
  StyledExit,
  StyledHeadingText,
  TopDescriptionText,
  Container,
  UserActionButtonsContainer,
} from './styles'
import Actions from '../Actions'
import { buyBillGridText } from './constants'
import Claim from '../Actions/Claim'
import VestedTimer from '../VestedTimer'
import TransferBillModal from './TransferBillModal'
import { StyledButton } from '../styles'

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
  billId: string
}

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, bill, billId }) => {
  const { chainId } = useActiveWeb3React()
  const { token, quoteToken, earnToken, billType, lpToken, price, priceUsd, userData, contractAddress, index } = bill
  const userOwnedBill = userData?.bills?.find((b) => parseInt(b.id) === parseInt(billId))
  const pending = getBalanceNumber(new BigNumber(userOwnedBill?.payout), bill?.earnToken?.decimals)?.toFixed(4)
  const pendingUsd = (parseFloat(pending) * bill?.earnTokenPrice)?.toFixed(2)
  const claimable = getBalanceNumber(new BigNumber(userOwnedBill?.pendingRewards), bill?.earnToken?.decimals)?.toFixed(
    4,
  )
  const claimableUsd = (parseFloat(claimable) * bill?.earnTokenPrice)?.toFixed(2)
  const [onPresentTransferBillModal] = useModal(
    <TransferBillModal bill={bill} billId={billId} onDismiss={() => console.log('')} />,
    true,
    true,
    `transferModal${billId}`,
  )
  return (
    <Modal onDismiss={onDismiss} maxWidth="1200px">
      <Container>
        <ModalBodyContainer>
          <StyledExit onClick={onDismiss}>x</StyledExit>
          <BillsImage />
          <BillDescriptionContainer>
            <Flex flexDirection="column">
              <BillTitleContainer>
                <TopDescriptionText>{billType}</TopDescriptionText>
                <Flex alignItems="center">
                  <ServiceTokenDisplay
                    token1={token.symbol}
                    token2={quoteToken.symbol}
                    token3={earnToken.symbol}
                    stakeLp
                  />
                  <StyledHeadingText ml="10px" bold>
                    {lpToken.symbol}
                  </StyledHeadingText>
                  <Text ml={10}>#{userOwnedBill?.id}</Text>
                </Flex>
              </BillTitleContainer>
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
            <UserActionButtonsContainer>
              <Claim billAddress={bill.contractAddress[chainId]} billIds={[billId]} />
              <StyledButton onClick={onPresentTransferBillModal}>Transfer</StyledButton>
            </UserActionButtonsContainer>
          </BillDescriptionContainer>
        </ModalBodyContainer>
        <BillsFooterContainer>
          <BillFooterContentContainer>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '100%' }}
            >
              <TopDescriptionText width="auto">Fully Vested</TopDescriptionText>
              <StyledHeadingText ml="10px" bold>
                <VestedTimer
                  lastBlockTimestamp={userOwnedBill?.lastBlockTimestamp}
                  vesting={userOwnedBill?.vesting}
                  userModalFlag
                />
              </StyledHeadingText>
            </Flex>
          </BillFooterContentContainer>
          <BillFooterContentContainer>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '100%' }}
            >
              <TopDescriptionText width="auto">Claimable</TopDescriptionText>
              <Flex>
                <ServiceTokenDisplay token1={earnToken.symbol} />
                <StyledHeadingText ml="10px" bold>
                  {claimable} (${claimableUsd})
                </StyledHeadingText>
              </Flex>
            </Flex>
          </BillFooterContentContainer>
          <BillFooterContentContainer>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '100%' }}
            >
              <TopDescriptionText width="auto">Pending</TopDescriptionText>
              <Flex>
                <ServiceTokenDisplay token1={earnToken.symbol} />
                <StyledHeadingText ml="10px" bold>
                  {pending} (${pendingUsd})
                </StyledHeadingText>
              </Flex>
            </Flex>
          </BillFooterContentContainer>
        </BillsFooterContainer>
      </Container>
    </Modal>
  )
}

export default React.memo(BuyBillModalView)
