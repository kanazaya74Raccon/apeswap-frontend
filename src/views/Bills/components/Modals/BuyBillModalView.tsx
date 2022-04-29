import React, { useState } from 'react'
import { Flex, Modal, Text } from '@apeswapfinance/uikit'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { Bills } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import getTimePeriods from 'utils/getTimePeriods'
import ReactPlayer from 'react-player'
import BigNumber from 'bignumber.js'
import {
  ActionButtonsContainer,
  BillDescriptionContainer,
  BillsImage,
  BillTitleContainer,
  BillValueTextWrapper,
  ModalBodyContainer,
  StyledExit,
  StyledHeadingText,
  TopDescriptionText,
} from './styles'
import Actions from '../Actions'
import UserBillModalView from './UserBillModalView'

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
}

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, bill }) => {
  const { chainId } = useActiveWeb3React()
  const {
    token,
    quoteToken,
    earnToken,
    billType,
    lpToken,
    price,
    userData,
    contractAddress,
    index,
    discount,
    earnTokenPrice,
  } = bill
  const discountEarnTokenPrice = earnTokenPrice - earnTokenPrice * (parseFloat(discount) / 100)
  const [value, setValue] = useState('')
  const [billId, setBillId] = useState('')
  const [loading, setLoading] = useState(false)
  const bigValue = new BigNumber(value).times(new BigNumber(10).pow(18))
  const vestingTime = getTimePeriods(parseInt(bill.vestingTime), true)
  const billValue = bigValue.div(new BigNumber(price))?.toFixed(3)

  const onHandleValueChange = (val: string) => {
    setValue(val)
  }
  const onHandleReturnedBillId = async (id: string) => {
    setBillId(id)
  }
  return (
    <Modal onDismiss={onDismiss} maxWidth="1200px">
      {billId ? (
        <UserBillModalView bill={bill} billId={billId} onDismiss={onDismiss} />
      ) : (
        <ModalBodyContainer>
          <StyledExit onClick={onDismiss}>x</StyledExit>
          <Flex alignItems="center" justifyContent="center">
            {loading && !billId ? (
              <BillsImage>
                <ReactPlayer playing muted loop url="videos/bills-video.mp4" height="100%" width="100%" />
              </BillsImage>
            ) : (
              <BillsImage image="images/hidden-bill.png" />
            )}
          </Flex>
          <BillDescriptionContainer p="20px 0px" minHeight={450}>
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
                  <Flex flexDirection="column">
                    <StyledHeadingText ml="10px" bold>
                      {lpToken.symbol}
                    </StyledHeadingText>
                    <TopDescriptionText ml="12px">
                      Vesting Term: {`${vestingTime.days}d, ${vestingTime.minutes}h, ${vestingTime.seconds}m`}
                    </TopDescriptionText>
                  </Flex>
                </Flex>
              </BillTitleContainer>
              <Flex flexDirection="column" mt={25}>
                <Flex style={{ width: '250px' }}>
                  <TopDescriptionText>
                    {earnToken.symbol} Market Price{' '}
                    <span style={{ textDecoration: 'line-through' }}>${earnTokenPrice?.toFixed(3)}</span>
                  </TopDescriptionText>
                </Flex>
                <Flex alignItems="center">
                  <ServiceTokenDisplay token1={earnToken.symbol} />
                  <StyledHeadingText ml="10px" bold>
                    ${discountEarnTokenPrice.toFixed(3)} ({discount}% Discount)
                  </StyledHeadingText>
                </Flex>
              </Flex>
            </Flex>
            <Flex flexDirection="column">
              <ActionButtonsContainer>
                <Actions
                  token={token}
                  quoteToken={quoteToken}
                  lpToken={lpToken}
                  userLpValue={userData?.stakingTokenBalance}
                  allowance={userData?.allowance}
                  billAddress={contractAddress[chainId]}
                  billIndex={index}
                  disabled={billValue === 'NaN' || parseFloat(billValue) < 0.01}
                  onValueChange={onHandleValueChange}
                  onBillId={onHandleReturnedBillId}
                  onTransactionSubmited={(trxSent) => setLoading(trxSent)}
                />
              </ActionButtonsContainer>
              {new BigNumber(userData?.allowance).gt(0) && (
                <BillValueTextWrapper>
                  <Text fontSize="14px">
                    Bill Value:{' '}
                    <span style={{ fontWeight: 700 }}>
                      {billValue === 'NaN' ? '0' : billValue} {earnToken?.symbol}
                    </span>
                  </Text>
                </BillValueTextWrapper>
              )}
            </Flex>
          </BillDescriptionContainer>
        </ModalBodyContainer>
      )}
    </Modal>
  )
}

export default React.memo(BuyBillModalView)
