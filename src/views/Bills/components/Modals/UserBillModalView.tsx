import React from 'react'
import { Flex, Modal, Skeleton, Text, useModal } from '@apeswapfinance/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Bills } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BillsSpinner from 'components/BillsSpinner'
import BigNumber from 'bignumber.js'
import {
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
import Claim from '../Actions/Claim'
import VestedTimer from '../VestedTimer'
import TransferBillModal from './TransferBillModal'
import { StyledButton } from '../styles'

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
  billId: string
}

const BILL_ATTRIBUTES = ['The Trend', 'The Legend', 'The Location', 'The Moment', 'The Innovation']

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, bill, billId }) => {
  const { chainId } = useActiveWeb3React()
  const { token, quoteToken, earnToken, billType, lpToken, index, userOwnedBillsData, userOwnedBillsNftData } = bill
  const userOwnedBill = userOwnedBillsData?.find((b) => parseInt(b.id) === parseInt(billId))
  const userOwnedBillNftData = userOwnedBillsNftData?.find((b) => parseInt(b.tokenId) === parseInt(billId))
  const pending = getBalanceNumber(new BigNumber(userOwnedBill?.payout), bill?.earnToken?.decimals)?.toFixed(4)
  const pendingUsd = (parseFloat(pending) * bill?.earnTokenPrice)?.toFixed(2)
  const claimable = getBalanceNumber(new BigNumber(userOwnedBill?.pendingRewards), bill?.earnToken?.decimals)?.toFixed(
    4,
  )
  const attributes = userOwnedBillNftData?.attributes?.filter((attrib) => BILL_ATTRIBUTES.includes(attrib.trait_type))
  const claimableUsd = (parseFloat(claimable) * bill?.earnTokenPrice)?.toFixed(2)
  const [onPresentTransferBillModal] = useModal(
    <TransferBillModal bill={bill} billId={billId} onDismiss={onDismiss} />,
    true,
    true,
    `transferModal${billId}-${index}`,
  )
  return (
    <Modal onDismiss={onDismiss} maxWidth="1200px">
      <Container>
        <ModalBodyContainer>
          <StyledExit onClick={onDismiss}>x</StyledExit>
          {userOwnedBillNftData?.image ? (
            <BillsImage image={userOwnedBillNftData?.image} />
          ) : (
            <Flex alignItems="center" justifyContent="center">
              <BillsImage image="images/hidden-bill.png" />
              <div style={{ position: 'absolute' }}>
                <BillsSpinner />
              </div>
            </Flex>
          )}
          <BillDescriptionContainer minHeight={360}>
            <Flex flexDirection="column">
              <BillTitleContainer>
                <TopDescriptionText>{billType}</TopDescriptionText>
                <Flex alignItems="center">
                  <ServiceTokenDisplay
                    token1={token.symbol}
                    token2={quoteToken.symbol}
                    token3={earnToken.symbol}
                    billArrow
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
              {attributes
                ? attributes.map((attrib) => {
                    return (
                      <GridTextValContainer>
                        <Text fontSize="12px">{attrib?.trait_type}</Text>
                        <Text fontSize="12px" bold>
                          {attrib?.value}
                        </Text>
                      </GridTextValContainer>
                    )
                  })
                : BILL_ATTRIBUTES.map((attrib) => {
                    return (
                      <GridTextValContainer>
                        <Text fontSize="12px">{attrib}</Text>
                        <Skeleton width="150px" />
                      </GridTextValContainer>
                    )
                  })}
            </Flex>
            <UserActionButtonsContainer>
              <Claim billAddress={bill.contractAddress[chainId]} billIds={[billId]} buttonSize={218} />
              <StyledButton onClick={onPresentTransferBillModal} style={{ width: '218px' }}>
                Transfer
              </StyledButton>
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
                <ServiceTokenDisplay token1={earnToken.symbol} size={25} />
                <StyledHeadingText ml="10px" bold>
                  {claimable && claimable !== 'NaN' ? (
                    `${claimable} ($${claimableUsd})`
                  ) : (
                    <Skeleton width="150px" height="32.5px" animation="waves" />
                  )}
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
                <ServiceTokenDisplay token1={earnToken.symbol} size={25} />
                <StyledHeadingText ml="10px" bold>
                  {pending && pending !== 'NaN' ? (
                    `${pending} ($${pendingUsd})`
                  ) : (
                    <Skeleton width="150px" height="32.5px" animation="waves" />
                  )}
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
