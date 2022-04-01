import { Flex, Text } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import ListViewContent from 'components/ListViewContent'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import React from 'react'
import { Bills } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import useClaimBill from 'views/Bills/hooks/useClaimBill'
import { StyledButton } from '../styles'
import {
  BillGifContainer,
  BillGifImage,
  BillsImage,
  CardContainer,
  DescriptionContainer,
  FirstTimeCardContainer,
} from './styles'

const FirstTimeCard: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  return (
    <FirstTimeCardContainer>
      <BillGifContainer>
        <BillGifImage />
      </BillGifContainer>
      <DescriptionContainer>
        <Text bold mb="10px" fontSize="22px">
          Information
        </Text>
        <Text fontSize="12px">
          Treasury Bills allow users to purchase tokens at a discount in exchange for their liquidity provider (LP)
          tokens. Each Treasury Bill is a unique NFT that represents the purchased tokens, which vest over a certain
          amount of time.
          <br /> <br />
          For more info, visit the Treasury Bills page in our Documentation. <br /> <br />
          <Text fontSize="12px" bold>
            HOW IT WORKS:
          </Text>
        </Text>
      </DescriptionContainer>
    </FirstTimeCardContainer>
  )
}

export default React.memo(FirstTimeCard)
