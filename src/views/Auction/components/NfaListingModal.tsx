import React, { useCallback, useState, useEffect } from 'react'
import { Button, Modal, AutoRenewIcon, Text } from '@apeswapfinance/uikit'
import { useNfaAllowance } from 'hooks/useAllowance'
import { getAuctionAddress } from 'utils/addressHelpers'
import { useAuctionApprove } from 'hooks/useApprove'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import Image from 'views/Nft/components/Image'
import ModalActions from 'components/ModalActions'
import Input from 'components/Input'
import Slider from 'components/Slider'
import getTimePeriods from 'utils/getTimePeriods'
import useI18n from '../../../hooks/useI18n'

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

const Nfa = styled.div<{ active: boolean }>`
  width: 80px;
  height: 80px;
  box-shadow: 0px 0px ${(props) => (props.active ? '15px #ffb300' : '2px black')};
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 15px;
`

const MinimumBidWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
`

const BnbLogo = styled.div`
  background-image: url(/images/rounded-bnb-sm.svg);
  background-size: cover;
  background-position: center;
  width: 18px;
  height: 18px;
  z-index: 1;
  margin-left: 5px;
  margin-top: 2px;
`

const TimeText = styled(Text)`
  font-family: poppins;
  font-weight: 700;
  font-size: 16px;
`

const formatListingTime = (listingTime: any): string => {
  const formatHours = listingTime.hours < 10 ? `0${listingTime.hours}` : listingTime.hours.toString()
  const formatMinutes = listingTime.minutes < 10 ? `0${listingTime.minutes}` : listingTime.minutes.toString()
  const formatSeconds = listingTime.seconds < 10 ? `0${listingTime.seconds.toFixed(0)}` : listingTime.seconds.toFixed(0)
  return `${formatHours}:${formatMinutes}:${formatSeconds}`
}

const NfaListingModal: React.FC<NfaListingModalProps> = ({ onConfirm, onDismiss, ownedNfas }) => {
  const auctionAddress = getAuctionAddress()
  const allowance = useNfaAllowance(auctionAddress)
  const onApprove = useAuctionApprove().onApprove
  const [approved, setApproved] = useState(true)
  const [nfaIndex, setNfaIndex] = useState(null)
  const [auctionLength, setAuctionLength] = useState(21600 / 2)
  const [timeToExtendVal, setTimeToExtendVal] = useState(1800 / 2)
  const [minTimeToExtend, setMinTimeToExtend] = useState(21600 / 4)
  const [minimumBid, setMinimumBid] = useState('1')
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingApprove, setPendingApprove] = useState(false)
  const TranslateString = useI18n()
  const auctionLengthFormat = formatListingTime(getTimePeriods(auctionLength))
  const timeToExtendValFormat = formatListingTime(getTimePeriods(timeToExtendVal))
  const minTimeToExtendFormat = formatListingTime(getTimePeriods(minTimeToExtend))

  useEffect(() => {
    if (allowance !== null) {
      setApproved(allowance)
    }
  }, [allowance, setApproved])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setMinimumBid(e.currentTarget.value)
    },
    [setMinimumBid],
  )

  const handleTimeVal = useCallback(
    (value: number) => {
      if (value < minTimeToExtend) {
        setAuctionLength(value)
        setMinTimeToExtend(value)
      } else {
        setAuctionLength(value)
      }
    },
    [minTimeToExtend, setMinTimeToExtend],
  )

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
      console.error(e)
    }
  }, [onApprove, setApproved])

  return (
    <Modal title={`${TranslateString(316, 'List Your NFA!')}`} onDismiss={onDismiss}>
      <Text> The default settings are the recommended auction settings. </Text>
      <TimeText marginTop="20px">NFA selected: {nfaIndex}</TimeText>
      <OwnedNfaWrapper>
        {ownedNfas ? (
          ownedNfas?.map((nfa) => {
            return (
              <Nfa onClick={() => setNfaIndex(nfa.index)} active={nfaIndex === nfa.index}>
                <Image src={nfa.image} alt={nfa.name} rarityTier={nfa.attributes.rarityTierNumber} />
              </Nfa>
            )
          })
        ) : (
          <Text marginBottom="20px">You do not have any NFAs in your wallet 😢</Text>
        )}
      </OwnedNfaWrapper>
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
      <ModalActions>
        <Button fullWidth variant="secondary" onClick={onDismiss}>
          {TranslateString(462, 'Cancel')}
        </Button>
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
          >
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'Confirm')}
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
          >
            {TranslateString(462, 'Approve')}
          </Button>
        )}
      </ModalActions>
    </Modal>
  )
}

export default NfaListingModal
