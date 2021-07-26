import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuctions } from 'state/hooks'
import SwiperCore, { Keyboard, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
// import { useGetSortedRounds } from 'state/hooks'
import { AuctionsOverall } from 'state/types'
import 'swiper/swiper.min.css'
// import RoundCard from './components/RoundCard'
// import Menu from './components/Menu'
import useSwiper from 'hooks/useSwiper'
import AuctionCard from './AuctionCard'
// import useOnNextRound from 'hooks/useOnNextRound'
import WalletNft from '../../Nft/components/WalletNft'
import Image from '../../Nft/components/Image'

SwiperCore.use([Keyboard, Mousewheel])

interface PositionProps {
  auctions: AuctionsOverall
}

const StyledSwiper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  align-items: center;
  .swiper-wrapper {
    display: flex;
    align-items: center;
    padding-bottom: 25px;
    padding-top: 25px;
  }
  .swiper-slide {
    width: auto;
  }
`

const Positions: React.FC<PositionProps> = ({ auctions }) => {
  const { setSwiper } = useSwiper()
  const indexLoad = auctions?.activeAuctionId - 1
  const [initialIndex, setInitialIndex] = useState(indexLoad)
  const live = true
  useEffect(() => {
    setInitialIndex(indexLoad)
  }, [indexLoad])

  return (
    <div>
      {/* <Menu /> */}
      <StyledSwiper>
        <Swiper
          initialSlide={initialIndex}
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView="auto"
          freeMode
          freeModeSticky
          centeredSlides
          freeModeMomentumRatio={0.25}
          freeModeMomentumVelocityRatio={0.5}
          keyboard
          resizeObserver
        >
          {auctions?.auctions.map((auction) => (
            <SwiperSlide key={auction.auctionId}>
              <AuctionCard
                activeAuctionId={auctions.activeAuctionId}
                auction={auction}
                minIncrementAmount={auctions.minIncrementAmount}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </StyledSwiper>
    </div>
  )
}

// {nft.index !== 10 ? (
//     <div style={{ height: '250px', width: '250px', opacity: 0.4 }}>
//       <Image src={nft.image} rarityTier={nft.attributes.rarityTierNumber} alt={nft.name} />
//     </div>
//   ) : (
//     <div style={{ height: '400px', width: '400px', opacity: 1 }}>
//       <Image src={nft.image} rarityTier={nft.attributes.rarityTierNumber} alt={nft.name} />
//     </div>
//   )}

export default Positions
