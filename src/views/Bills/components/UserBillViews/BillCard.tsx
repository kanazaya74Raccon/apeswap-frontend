import { Flex, Skeleton } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import ListViewContent from 'components/ListViewContent'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { Bills } from 'state/types'
import 'swiper/swiper.min.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getBalanceNumber } from 'utils/formatBalance'
import Claim from '../Actions/Claim'
import { BillCardsContainer, BillsImage, CardContainer } from './styles'

const BillCard: React.FC<{ bills: Bills[]; ml?: string }> = ({ bills, ml }) => {
  const { chainId } = useActiveWeb3React()
  const ownedBillsAmount = 2 // bills?.flatMap((bill) => (bill?.userOwnedBillsData ? bill?.userOwnedBillsData : []))?.length
  const billsCardView = bills
    .flatMap((bill) => {
      const ownedBills = bill?.userOwnedBillsData
      return ownedBills?.map((ownedBill, i) => {
        const pendingRewards = getBalanceNumber(
          new BigNumber(ownedBill.pendingRewards),
          bill?.earnToken?.decimals,
        )?.toFixed(4)
        const ownedBillNftData = bill?.userOwnedBillsNftData ? bill?.userOwnedBillsNftData[i] : null
        return (
          <SwiperSlide style={{ maxWidth: '270px', height: '307px' }} key={ownedBill.id}>
            <CardContainer ml={ml} key={ownedBill.id}>
              {ownedBillNftData?.image ? (
                <BillsImage image={ownedBillNftData.image} />
              ) : (
                <Skeleton width="270px" height="159px" />
              )}
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
              <Claim billAddress={bill.contractAddress[chainId]} billIds={[ownedBill.id]} />
            </CardContainer>
          </SwiperSlide>
        )
      })
    })
    ?.slice(0, 2)

  return (
    <BillCardsContainer>
      <Swiper
        id="serviceSwiper"
        initialSlide={0}
        spaceBetween={15.5}
        slidesPerView="auto"
        loopedSlides={4}
        loop={false}
        centeredSlides
        resizeObserver
        lazy
        breakpoints={{
          480: {
            centeredSlides: false,
          },
        }}
      >
        {billsCardView}
        {ownedBillsAmount < 4 && (
          <SwiperSlide style={{ maxWidth: '270px', height: '307px' }}>
            <CardContainer />
          </SwiperSlide>
        )}
      </Swiper>
    </BillCardsContainer>
  )
}

export default React.memo(BillCard)
