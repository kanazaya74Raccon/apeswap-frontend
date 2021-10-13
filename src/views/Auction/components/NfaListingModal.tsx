import React, { useCallback, useState, useEffect } from 'react'
import { Button, Modal, AutoRenewIcon, Text, Card } from '@apeswapfinance/uikit'
import { useNfaAllowance } from 'hooks/useAllowance'
import { getAuctionAddress } from 'utils/addressHelpers'
import { useAuctionApprove } from 'hooks/useApprove'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import Image from 'views/Nft/components/Image'
import ModalActions from 'components/ModalActions'
// import Input from 'components/Input'
// import Slider from 'components/Slider'
// import getTimePeriods from 'utils/getTimePeriods'
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

// const MinimumBidWrapper = styled.div`
//   display: flex;
//   width: 100%;
//   flex-direction: row;
// `

// const BnbLogo = styled.div`
//   background-image: url(/images/rounded-bnb-sm.svg);
//   background-size: cover;
//   background-position: center;
//   width: 18px;
//   height: 18px;
//   z-index: 1;
//   margin-left: 5px;
//   margin-top: 2px;

const TimeText = styled(Text)`
  font-family: poppins;
  font-weight: 400;
  font-size: 16px;
  align-self: center;
  text-align: center;
`

// const formatListingTime = (listingTime: any): string => {
//   const formatHours = listingTime.hours < 10 ? `0${listingTime.hours}` : listingTime.hours.toString()
//   const formatMinutes = listingTime.minutes < 10 ? `0${listingTime.minutes}` : listingTime.minutes.toString()
//   const formatSeconds = listingTime.seconds < 10 ? `0${listingTime.seconds.toFixed(0)}` : listingTime.seconds.toFixed(0)
//   return `${formatHours}:${formatMinutes}:${formatSeconds}`
// }

const NfaListingModal: React.FC<NfaListingModalProps> = ({ onConfirm, onDismiss, ownedNfas }) => {
  const auctionAddress = getAuctionAddress()
  const allowance = useNfaAllowance(auctionAddress)
  const onApprove = useAuctionApprove().onApprove
  const [approved, setApproved] = useState(true)
  const [nfaIndex, setNfaIndex] = useState(null)
  const [auctionLength, setAuctionLength] = useState(86400)
  const [timeToExtendVal, setTimeToExtendVal] = useState(1800)
  const [minTimeToExtend, setMinTimeToExtend] = useState(21600)
  const [minimumBid, setMinimumBid] = useState('1')
  const [pendingTx, setPendingTx] = useState(false)
  const [pendingApprove, setPendingApprove] = useState(false)
  const TranslateString = useI18n()
  // const auctionLengthFormat = formatListingTime(getTimePeriods(auctionLength))
  // const timeToExtendValFormat = formatListingTime(getTimePeriods(timeToExtendVal))
  // const minTimeToExtendFormat = formatListingTime(getTimePeriods(minTimeToExtend))

  useEffect(() => {
    if (allowance !== null) {
      setApproved(allowance)
    }
  }, [allowance, setApproved])

  // const handleChange = useCallback(
  //   (e: React.FormEvent<HTMLInputElement>) => {
  //     setMinimumBid(e.currentTarget.value)
  //   },
  //   [setMinimumBid],
  // )

  // const handleTimeVal = useCallback(
  //   (value: number) => {
  //     if (value < minTimeToExtend) {
  //       setAuctionLength(value)
  //       setMinTimeToExtend(value)
  //     } else {
  //       setAuctionLength(value)
  //     }
  //   },
  //   [minTimeToExtend, setMinTimeToExtend],
  // )

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
    <Modal title={`${TranslateString(316, 'Put Your NFA up for Auction!')}`} onDismiss={onDismiss}>
      <DescriptionWrapper>
        <Text textAlign="center"> Welcome to the Self-Serve Auction House! </Text>
        <TimeText> (The Rules are the Same) </TimeText>
        <Text textAlign="center" marginTop="10px">
          Auction Start Length
        </Text>
        <TimeText> 24 Hours </TimeText>
        <Text textAlign="center" marginTop="10px">
          How the Clock Works
        </Text>
        <TimeText>
          During the last 6 hours each bid extends the clock by 30 minutes. The clock will never increase over 6 hours.
        </TimeText>
        <Text textAlign="center" marginTop="10px">
          Auction Order
        </Text>
        <TimeText>NFAs will be auctioned in the order they are submitted.</TimeText>
        <Text textAlign="center" marginTop="10px">
          Cancel Your Listing
        </Text>
        <TimeText>You may cancel your entry any time before your auction begins.</TimeText>
        <Text textAlign="center" marginTop="10px">
          Proceeds
        </Text>
        <TimeText>95% goes to the seller, 4% goes to future staking pools, and 1% is the ApeSwap fee.</TimeText>
        <Text textAlign="center" marginTop="10px">
          Auction Order
        </Text>
        <TimeText>
          NFAs will be auctioned in the order they are entered, you may cancel your entry at any time before your
          auction begins.
        </TimeText>
        <Text textAlign="center" marginTop="10px">
          NFA selected: {nfaIndex}
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
          <TimeText marginBottom="20px">You do not have any NFAs in your wallet 😢</TimeText>
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
            {pendingTx ? TranslateString(488, 'Pending Confirmation') : TranslateString(464, 'List NFA')}
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
