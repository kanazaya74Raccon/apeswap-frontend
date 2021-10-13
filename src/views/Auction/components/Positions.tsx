import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import SwiperCore, { Keyboard, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AuctionsOverall } from 'state/types'
import 'swiper/swiper.min.css'
import useSwiper from 'hooks/useSwiper'
import AuctionCard from './AuctionCard'

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
  const indexLoad = auctions?.auctions?.findIndex((curAuction) => curAuction.auctionId === auctions?.activeAuctionId)
  const [initialIndex, setInitialIndex] = useState(indexLoad === -1 ? auctions?.auctions?.length - 2 : indexLoad)
  useEffect(() => {
    setInitialIndex(indexLoad)
  }, [indexLoad])

  return (
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
              minIncrementPercentage={auctions.minIncrementPercentage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledSwiper>
  )
}

export default Positions
