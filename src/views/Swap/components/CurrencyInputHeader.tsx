import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, Heading, IconButton, Text, useModal } from '@apeswapfinance/uikit'
import { useExpertModeManager } from 'state/user/hooks'

interface Props {
  title: string
  subtitle: string
  noConfig?: boolean
  isChartDisplayed?: boolean
}

const CurrencyInputContainer = styled(Flex)`
  align-items: center;
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.background};
`

const NavHolder = styled.div`
  position: relative;
  height: 38px;
  width: 254px;
  margin-left: 20px;
`

const NavButton = styled.div<{ left?: string; right?: string; active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 36px;
  border-radius: 20px;
  padding: 0px 40px 0px 40px;
  color: ${(props) => (props.active ? 'white' : 'rgba(122, 122, 122, 1)')};
  background-color: ${(props) => (props.active ? 'rgba(255, 179, 0, 1)' : 'rgba(240, 240, 240, .6)')};
  z-index: ${(props) => (props.active ? 1 : 0)};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`

const CurrencyInputHeader: React.FC<Props> = ({ title, subtitle }) => {
  const [expertMode] = useExpertModeManager()

  return (
    <CurrencyInputContainer>
      <NavHolder>
        <NavButton left="0" active>
          SWAP
        </NavButton>
        <NavButton right="0" active={false}>
          LIQUIDITY
        </NavButton>
      </NavHolder>
    </CurrencyInputContainer>
  )
}

export default CurrencyInputHeader
