import React, { useCallback, useState } from 'react'
import { Currency, Token } from '@apeswapfinance/sdk'
import { InjectedModalProps, Heading, Button, Modal } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import usePrevious from 'hooks/usePreviousValue'
import { TokenList } from '@uniswap/token-lists'
import CurrencySearch from './CurrencySearch'
import ImportToken from './ImportToken'
import Manage from './Manage'
import ImportList from './ImportList'
import { CurrencyModalView } from './types'

const Footer = styled.div`
  width: 100%;
  text-align: center;
`

const StyledModalContainer = styled.div`
  max-width: 420px;
  width: 100%;
  z-index: 101;
`

const StyledModalBody = styled(Modal)`
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

interface CurrencySearchModalProps extends InjectedModalProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
}

export default function CurrencySearchModal({
  onDismiss = () => null,
  onCurrencySelect,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases = false,
}: CurrencySearchModalProps) {
  const [modalView, setModalView] = useState<CurrencyModalView>(CurrencyModalView.search)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      console.log(currency)
      onDismiss()
      onCurrencySelect(currency)
    },
    [onDismiss, onCurrencySelect],
  )

  // for token import view
  const prevView = usePrevious(modalView)

  // used for import token flow
  const [importToken, setImportToken] = useState<Token | undefined>()

  // used for import list
  const [importList, setImportList] = useState<TokenList | undefined>()
  const [listURL, setListUrl] = useState<string | undefined>()

  const config = {
    [CurrencyModalView.search]: { title: 'Select a Token', onBack: undefined },
    [CurrencyModalView.manage]: { title: 'Manage', onBack: () => setModalView(CurrencyModalView.search) },
    [CurrencyModalView.importToken]: {
      title: 'Import Tokens',
      onBack: () =>
        setModalView(prevView && prevView !== CurrencyModalView.importToken ? prevView : CurrencyModalView.search),
    },
    [CurrencyModalView.importList]: { title: 'Import List', onBack: () => setModalView(CurrencyModalView.search) },
  }

  return (
    <StyledModalContainer>
      <StyledModalBody title="Tokens" onDismiss={onDismiss} bodyPadding="none">
        {modalView === CurrencyModalView.search ? (
          <CurrencySearch
            onCurrencySelect={handleCurrencySelect}
            selectedCurrency={selectedCurrency}
            otherSelectedCurrency={otherSelectedCurrency}
            showCommonBases={showCommonBases}
            showImportView={() => setModalView(CurrencyModalView.importToken)}
            setImportToken={setImportToken}
          />
        ) : modalView === CurrencyModalView.importToken && importToken ? (
          <ImportToken tokens={[importToken]} handleCurrencySelect={handleCurrencySelect} />
        ) : modalView === CurrencyModalView.importList && importList && listURL ? (
          <ImportList list={importList} listURL={listURL} onImport={() => setModalView(CurrencyModalView.manage)} />
        ) : modalView === CurrencyModalView.manage ? (
          <Manage
            setModalView={setModalView}
            setImportToken={setImportToken}
            setImportList={setImportList}
            setListUrl={setListUrl}
          />
        ) : (
          ''
        )}
        {modalView === CurrencyModalView.search && (
          <Footer>
            <Button
              variant="text"
              onClick={() => setModalView(CurrencyModalView.manage)}
              className="list-token-manage-button"
              margin="10px 0 10px 0"
            >
              Manage Tokens
            </Button>
          </Footer>
        )}
      </StyledModalBody>
    </StyledModalContainer>
  )
}
