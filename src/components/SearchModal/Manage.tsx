import React, { useState } from 'react'
import { Token } from '@apeswapfinance/sdk'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { TokenList } from '@uniswap/token-lists'
import ManageLists from './ManageLists'
import ManageTokens from './ManageTokens'
import { CurrencyModalView } from './types'

const StyledButtonMenu = styled(ButtonMenu)`
  width: 100%;
`

export default function Manage({
  setModalView,
  setImportList,
  setImportToken,
  setListUrl,
}: {
  setModalView: (view: CurrencyModalView) => void
  setImportToken: (token: Token) => void
  setImportList: (list: TokenList) => void
  setListUrl: (url: string) => void
}) {
  const [showLists, setShowLists] = useState(true)
  return (
    <div>
      <StyledButtonMenu activeIndex={showLists ? 0 : 1} onClick={() => setShowLists((prev) => !prev)} variant="subtle">
        <ButtonMenuItem>Lists</ButtonMenuItem>
        <ButtonMenuItem>Tokens</ButtonMenuItem>
      </StyledButtonMenu>
      {showLists ? (
        <ManageLists setModalView={setModalView} setImportList={setImportList} setListUrl={setListUrl} />
      ) : (
        <ManageTokens setModalView={setModalView} setImportToken={setImportToken} />
      )}
    </div>
  )
}
