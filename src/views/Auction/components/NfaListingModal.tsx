import React, { useCallback, useState, useEffect } from 'react'
import { Button, Modal, AutoRenewIcon, Text } from '@apeswapfinance/uikit'
import { useNfaAllowance } from 'hooks/useAllowance'
import { useAuctionApprove } from 'hooks/useApprove'
import { useAuctionAddress } from 'hooks/useAddress'
import styled from 'styled-components'
import UnderlinedButton from 'components/UnderlinedButton'
import Image from 'views/Nft/components/Image'
import ModalActions from 'components/ModalActions'
import { useTranslation } from 'contexts/Localization'
import { Nft } from '../../../config/constants/types'

interface NfaListingModalProps {
  onConfirm: (
    nfaIndex: number,
    auctionLength: number,
    timeToExtendVal: number,
    minTimeToExtend: number,
    minimumBid: string,
  ) => void
  onDismiss?: () => void
  ownedNfas: Nft[]
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

const DescriptionWrapper = styled.div`
  width: 305px;
  display: flex;
  flex-direction: column;
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
  border-radius: 20px;
`

const NfaBackground = styled.div`
  margin-top: 10px;
  background: ${(props) => (props.theme.isDark ? 'rgb(250, 250, 250, 0.1)' : 'rgb(250, 250, 250)')};
  border-radius: 30px;
`

const TimeText = styled(Text)`
  font-weight: 400;
  font-size: 16px;
  align-self: center;
  text-align: center;
`

const NfaListingModal: React.FC<NfaListingModalProps> = ({ onConfirm, onDismiss, ownedNfas }) => {
  const auctionAddress = useAuctionAddress()
  const allowance = useNfaAllowance(auctionAddress)
  const { onApprove } = useAuctionApprove()
  const [approved, setApproved] = useState(true)
  const [nfaIndex, setNfaIndex] = useState(null)
  const auctionLength = 86400
  const timeToExtendVal = 1800
  const minTimeToExtend = 21600
  const minimumBid = '.9'
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingApprove, setPendingApprove] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (allowance !== null) {
      setApproved(allowance)
    }
  }, [allowance, setApproved])

  const handleApprove = useCallback(async () => {
    try {
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setApproved(false)
      } else {
        setApproved(true)
      }
    } catch (e) {
      console.warn(e)
    }
  }, [onApprove, setApproved])

  return (
    <Modal title={`${t('Put Your NFA up for Auction!')}`} onDismiss={onDismiss}>
      <DescriptionWrapper>
        <Text textAlign="center"> {t('Welcome to the Self-Serve Auction House!')} </Text>
        <TimeText> ({t('The Rules are the Same')}) </TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('Auction Start Length')}
        </Text>
        <TimeText> 24 Hours </TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('How the Clock Works')}
        </Text>
        <TimeText>
          {t(
            'During the last 6 hours each bid extends the clock by 30 minutes. The clock will never increase over 6 hours.',
          )}
        </TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('All Sales are Final')}
        </Text>
        <TimeText>
          {t('When the auction ends the NFA will be sent to the highest bidder. No ifs, ands, or buts!')}
        </TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('Proceeds')}
        </Text>
        <TimeText>{t('95% goes to the seller, 4% goes to future staking pools, and 1% is the ApeSwap fee.')}</TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('Auction Order')}
        </Text>
        <TimeText>{t('NFAs will be auctioned in the order they are submitted.')}</TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('Cancel Your Listing')}
        </Text>
        <TimeText>{t('You may cancel your entry any time before your auction begins.')}</TimeText>
        <Text textAlign="center" marginTop="10px">
          {t('NFA selected')}: {nfaIndex}
        </Text>
        {ownedNfas ? (
          <NfaBackground>
            <OwnedNfaWrapper>
              {ownedNfas?.map((nfa) => {
                return (
                  <Nfa onClick={() => setNfaIndex(nfa.index)} active={nfaIndex === nfa.index}>
                    <Image
                      src={nfa.image}
                      alt={nfa.name}
                      rarityTier={nfa.attributes.rarityTierNumber}
                      borderRadius="20px"
                    />
                  </Nfa>
                )
              })}
            </OwnedNfaWrapper>
          </NfaBackground>
        ) : (
          <TimeText marginBottom="20px">{t('You do not have any NFAs in your wallet')} 😢</TimeText>
        )}
      </DescriptionWrapper>

      {/* 

      Commenting this out for now because we might use it in the future

      <TimeText>Auction Length: {auctionLengthFormat}</TimeText>
      <Slider value={auctionLength} onChange={(e) => handleTimeVal(e)} max={21600} min={300} size={15} />
      <TimeText>Time To Extend: {timeToExtendValFormat}</TimeText>
      <Slider value={timeToExtendVal} onChange={(e) => setTimeToExtendVal(e)} max={1800} min={0} size={15} />
      <TimeText>Minimum Extend Time: {minTimeToExtendFormat}</TimeText>
      <Slider value={minTimeToExtend} onChange={(e) => setMinTimeToExtend(e)} max={auctionLength} min={0} size={15} />
      <MinimumBidWrapper>
        <TimeText marginBottom="10px">Minimum Bid</TimeText>
        <BnbLogo />
      </MinimumBidWrapper>
      <Input value={minimumBid} onChange={handleChange} /> 
      
      */}
      <ModalActions>
        {approved ? (
          <Button
            fullWidth
            disabled={pendingTx || nfaIndex === null}
            onClick={async () => {
              setPendingTx(true)
              await onConfirm(nfaIndex, auctionLength, timeToExtendVal, minTimeToExtend, minimumBid)
              setPendingTx(false)
              onDismiss()
            }}
            endIcon={pendingTx && <AutoRenewIcon spin color="currentColor" />}
            style={{
              borderRadius: '10px',
            }}
          >
            {pendingTx ? t('Pending Confirmation') : t('List NFA')}
          </Button>
        ) : (
          <Button
            fullWidth
            disabled={pendingApprove}
            onClick={async () => {
              setPendingApprove(true)
              await handleApprove()
              setPendingApprove(false)
            }}
            endIcon={pendingApprove && <AutoRenewIcon spin color="currentColor" />}
            style={{
              borderRadius: '10px',
            }}
          >
            {t('Approve')}
          </Button>
        )}
        <UnderlinedButton text={t('Cancel')} handleClick={onDismiss} />
      </ModalActions>
    </Modal>
  )
}

export default NfaListingModal
