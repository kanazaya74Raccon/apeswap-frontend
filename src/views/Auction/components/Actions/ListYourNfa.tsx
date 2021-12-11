import React from 'react'
import { useModal } from '@apeswapfinance/uikit'
import { useProfile } from 'state/hooks'
import useListNfa from 'hooks/useListNfa'
import styled from 'styled-components'
import NfaListingModal from '../NfaListingModal'

const MoreInfo = styled.div`
  height: 35px;
  background: #ffb300;
  border-radius: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 700;
  line-height: 32.5px;
  letter-spacing: 0.05em;
  text-align: left;
  color: #fafafa;
  text-align: center;
  cursor: pointer;
  margin-right: 10px;
`

const ListYourNfa: React.FC = () => {
  const { profile } = useProfile()
  const { onListNfa } = useListNfa()
  const [onPresentNfaListingModal] = useModal(
    <NfaListingModal
      ownedNfas={profile?.ownedNfts}
      onConfirm={async (nfaIndex, auctionLength, timeToExtendVal, minTimeToExtend, minimumBid) => {
        await onListNfa(nfaIndex, auctionLength, timeToExtendVal, minTimeToExtend, minimumBid)
      }}
    />,
  )

  return <MoreInfo onClick={onPresentNfaListingModal}> LIST YOUR NFA </MoreInfo>
}

export default ListYourNfa
