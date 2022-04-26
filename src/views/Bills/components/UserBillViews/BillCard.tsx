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
import { StyledButton } from '../styles'
import BillModal from '../Modals'

const BillCard: React.FC<{ bills: Bills[]; ml?: string }> = ({ bills, ml }) => {
  const { chainId } = useActiveWeb3React()
  const scrollDown = () => window.scrollBy({ top: 500, behavior: 'smooth' })
  const ownedBillsAmount = bills
    ?.flatMap((bill) => (bill?.userOwnedBillsData ? bill?.userOwnedBillsData : []))
    .filter((b) => parseFloat(b.pendingRewards) > 0)?.length
  const billsCardView = bills
    .flatMap((bill) => {
      const ownedBills = bill?.userOwnedBillsData
      return ownedBills?.flatMap((ownedBill, i) => {
        if (parseFloat(ownedBill.pendingRewards) === 0 && parseFloat(ownedBill.payout) === 0) {
          return []
        }
        const pendingRewards = getBalanceNumber(
          new BigNumber(ownedBill.pendingRewards),
          bill?.earnToken?.decimals,
        )?.toFixed(4)
        const ownedBillNftData = bill?.userOwnedBillsNftData ? bill?.userOwnedBillsNftData[i] : null
        return (
          <SwiperSlide style={{ maxWidth: '270px', height: '307px' }} key={ownedBill.id}>
            <CardContainer ml={ml} key={ownedBill.id}>
              {ownedBillNftData?.image ? (
                <BillModal bill={bill} billId={ownedBill.id} billCardImage={ownedBillNftData?.image} />
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
              <Claim
                billAddress={bill.contractAddress[chainId]}
                billIds={[ownedBill.id]}
                pendingRewards={ownedBill?.pendingRewards}
              />
            </CardContainer>
          </SwiperSlide>
        )
      })
    })
    ?.slice(0, 4)

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
            <CardContainer>
              <BillsImage image="images/hidden-bill.png" />
              <Flex
                padding="0px 15px"
                alignItems="center"
                justifyContent="space-between"
                style={{ height: '75px', width: '100%' }}
              >
                <ListViewContent
                  title="Treasury Bill"
                  value="Want more?"
                  height={50}
                  width={150}
                  justifyContent="flex-start"
                />
              </Flex>
              <StyledButton onClick={scrollDown}>BUY BELOW</StyledButton>
            </CardContainer>
          </SwiperSlide>
        )}
      </Swiper>
    </BillCardsContainer>
  )
}

export default React.memo(BillCard)
