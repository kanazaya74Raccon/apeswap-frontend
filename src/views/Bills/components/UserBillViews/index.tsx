import React, { useState } from 'react'
import { ArrowDropLeftIcon, ArrowDropRightIcon, Checkbox, Flex, Text } from '@apeswapfinance/uikit'
import SwiperProvider from 'contexts/SwiperProvider'
import { Bills } from 'state/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BillCard from './BillCard'
import { Container } from '../styles'
import UserBillListView from './UserBillListView'
import FirstTimeCard from './FirstTimeCard'
import { HeadingContainer } from './styles'

const UserBillViews: React.FC<{ bills: Bills[] }> = ({ bills }) => {
  const { account } = useActiveWeb3React()
  const userOwnedBills = bills?.filter((bill) => bill?.userData?.bills.length > 0)
  const ownedBillsAmount = bills?.flatMap((bill) => (bill?.userData?.bills ? bill?.userData?.bills : [])).length
  const [showAll, setShowAll] = useState(false)
  return (
    <Container>
      {!account || ownedBillsAmount === 0 ? (
        <FirstTimeCard />
      ) : !showAll ? (
        <>
          <Flex justifyContent="space-between" margin="15px 10px">
            <Text>Your Treasury Bills ({ownedBillsAmount})</Text>
          </Flex>
          <SwiperProvider>
            <BillCard bills={userOwnedBills} />
          </SwiperProvider>
          <Flex justifyContent="center" margin="15px 10px">
            <Text onClick={() => setShowAll((prev) => !prev)} bold style={{ cursor: 'pointer' }}>
              List View <ArrowDropRightIcon width="8px" ml="5px" />
            </Text>
          </Flex>
        </>
      ) : (
        <Flex flexDirection="column" mb="50px">
          <HeadingContainer>
            <Text
              onClick={() => setShowAll((prev) => !prev)}
              bold
              style={{ cursor: 'pointer', minWidth: '70px', gridArea: 'back' }}
            >
              <ArrowDropLeftIcon width="8px" mr="5px" /> Back
            </Text>
            <Text textAlign="center" style={{ width: '100%', gridArea: 'all-bills' }}>
              All Your Treasury Bills
            </Text>
            <Flex style={{ minWidth: '140px', gridArea: 'expired' }}>
              <Text mr="12.5px">Show expired</Text>
              <Checkbox />
            </Flex>
          </HeadingContainer>
          <UserBillListView bills={userOwnedBills} />
        </Flex>
      )}
    </Container>
  )
}

export default React.memo(UserBillViews)
