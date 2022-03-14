import { Flex } from '@apeswapfinance/uikit'
import ListViewMenu from 'components/ListViewMenu'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { usePollBills, useBills } from 'state/bills/hooks'
import BillsListView from './components/BillsListView'
import CardView from './components/CardView'
import { Header, HeadingContainer, StyledHeading } from './styles'

const Bills: React.FC = () => {
  usePollBills()
  const bills = useBills()
  console.log(bills)
  return (
    <>
      <Header>
        <HeadingContainer>
          <StyledHeading as="h1" mb="12px" mt={0} fontWeight={800}>
            Treasury Bills
          </StyledHeading>
        </HeadingContainer>
      </Header>
      <Flex justifyContent="center" style={{ position: 'relative', top: '30px', width: '100%' }}>
        <Flex flexDirection="column" alignSelf="center" style={{ maxWidth: '1130px', width: '100%' }}>
          <ListViewMenu
            onHandleQueryChange={(s) => s}
            onSetSortOption={(s) => s}
            onSetStake={(s) => s}
            stakedOnly={false}
            query=""
          />
          <CardView />
          <BillsListView bills={bills} />
        </Flex>
      </Flex>
      <br /> <br />
      <br /> <br />
      <br /> <br />
    </>
  )
}

export default React.memo(Bills)
