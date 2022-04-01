import { Flex } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import ListViewContent from 'components/ListViewContent'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useSwiper from 'hooks/useSwiper'
import React from 'react'
import { Bills } from 'state/types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBalanceNumber } from 'utils/formatBalance'
import Claim from '../Actions/Claim'
import { BillCardsContainer, BillsImage, CardContainer } from './styles'

const BillCard: React.FC<{ bills: Bills[]; ml?: string }> = ({ bills, ml }) => {
  const { swiper, setSwiper } = useSwiper()
  const { chainId } = useActiveWeb3React()
  const ownedBillsAmount = bills?.flatMap((bill) => (bill?.userData?.bills ? bill?.userData?.bills : [])).length
  const billsCardView = bills
    .flatMap((bill) => {
      const ownedBills = bill?.userData?.bills
      return ownedBills?.map((ownedBill) => {
        const pendingRewards = getBalanceNumber(
          new BigNumber(ownedBill.pendingRewards),
          bill?.earnToken?.decimals,
        )?.toFixed(4)
        return (
          // <SwiperSlide style={{ border: '1px solid red', maxWidth: '270px' }} key={ownedBill.id}>
          <CardContainer ml={ml}>
            <BillsImage />
            <Flex
              padding="0px 15px"
              alignItems="center"
              justifyContent="space-between"
              style={{ height: '75px', width: '100%' }}
            >
              <ListViewContent title="Banana Bill" value={bill.lpToken.symbol} height={50} width={120} />
              <ListViewContent
                title="Claimable"
                value={pendingRewards}
                height={50}
                width={60}
                justifyContent="flex-end"
              />
            </Flex>
            <Claim billAddress={bill.contractAddress[chainId]} billId={ownedBill.id} />
          </CardContainer>

          // {/* </SwiperSlide> */}
        )
      })
    })
    ?.slice(0, 4)
  return (
    <BillCardsContainer>
      {/* <Swiper
        id="serviceSwiper"
        initialSlide={0}
        onSwiper={setSwiper}
        spaceBetween={0}
        slidesPerView="auto"
        loopedSlides={4}
        loop
        centeredSlides
        resizeObserver
        lazy
        breakpoints={{
          480: {
            centeredSlides: false,
          },
        }}
      > */}
      {billsCardView}
      {ownedBillsAmount < 4 && <CardContainer />}
      {/* </Swiper> */}
    </BillCardsContainer>
  )
}

export default React.memo(BillCard)
