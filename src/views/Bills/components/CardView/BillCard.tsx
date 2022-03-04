import { Flex } from '@apeswapfinance/uikit'
import ListViewContent from 'components/ListViewContent'
import React from 'react'
import { StyledButton } from '../styles'
import { BillsImage, CardContainer } from './styles'

const BillCard: React.FC = () => {
  return (
    <>
      <CardContainer>
        <BillsImage />
        <Flex padding="0px 20px" alignItems="center" justifyContent="space-around" style={{ height: '75px', width: '100%' }}>
          <ListViewContent title="Banana Bill" value="BANANA-BNB" height={50} width={120}/>
          <ListViewContent title="Claimable" value="0.2929" height={50} justifyContent="flex-end" />
        </Flex>
        <StyledButton>Claim</StyledButton>
      </CardContainer>
    </>
  )
}

export default React.memo(BillCard)
