import React from 'react'
import styled from 'styled-components'
import { Nft } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'

interface MobileHeaderProps {
  nfa: Nft
}

const HeaderWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 70px;
  left: 25px;
  top: 350px;
`

const NfaName = styled(Text)`
  font-size: 22px;
  line-height: 22.77px;
`
const NfaTitle = styled(Text)`
  font-size: 14px;
  line-height: 21px;
  font-family: Poppins;
  font-style: normal;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 0px;
`

const MobileHeader: React.FC<MobileHeaderProps> = ({ nfa }) => {
  return (
    <HeaderWrapper>
      <NfaName>
        {nfa.name} #{nfa.index}
      </NfaName>
      <NfaTitle>{nfa.attributes.rarityTierName}</NfaTitle>
    </HeaderWrapper>
  )
}

export default MobileHeader
