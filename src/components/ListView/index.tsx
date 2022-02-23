import React from 'react'
import styled from 'styled-components'
import ListViewContent from 'components/ListViewContent'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import ListCard from './ListCard'
import { ListViewContainer } from './styles'

// interface LabelProps {
//   text?: string
//   isFinished?: boolean
// }

const ListView: React.FC = () => {
  return (
    <ListViewContainer>
      <ListCard
        serviceTokenDisplay={
          <ServiceTokenDisplay
            token1="https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/AAVE.svg"
            token2="/images/tokens/banana.svg"
            token3="/images/tokens/banana.svg"
            stakeLp
          />
        }
        tag="PRO"
        title="BANANA-BNB"
        cardContent={
          <>
            <ListViewContent title="APY" value="100%" width={35} />
            <ListViewContent
              title="APY"
              value="100%"
              value2="100%"
              valueIcon="/images/tokens/banana.svg"
              value2Icon="/images/swap-icon.svg"
              width={35}
            />
            <ListViewContent title="Liquidity" value="$100,000,000" />
            <ListViewContent title="Earned" value="0.00" />
          </>
        }
        expandedContent={<></>}
      />
      <ListCard
        serviceTokenDisplay={
          <ServiceTokenDisplay
            token1="https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/AAVE.svg" 
            token2="/images/tokens/banana.svg"
            token3="/images/tokens/banana.svg"
            stakeLp
          />
        }
        title="BANANA-BNB"
        cardContent={
          <>
            <ListViewContent title="APY" value="100%" width={35} />
            <ListViewContent
              title="APY"
              value="100%"
              value2="100%"
              valueIcon="/images/tokens/banana.svg"
              value2Icon="/images/swap-icon.svg"
              width={35}
            />
            <ListViewContent title="Liquidity" value="$20,000,000" />
            <ListViewContent title="Earned" value="1000000.0000" />
          </>
        }
        expandedContent={<></>}
      />{' '}
      {/* <ListCard /> */}
      {/* <ListCard />
      <ListCard />
      <ListCard />
      <ListCard />
      <ListCard /> */}
    </ListViewContainer>
  )
}

export default React.memo(ListView)
