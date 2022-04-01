import React, { KeyboardEvent, useCallback, useMemo, useRef, useState } from 'react'
import { Currency, ETHER, Token } from '@apeswapfinance/sdk'
import { Text, Input, Flex } from '@apeswapfinance/uikit'
import { FixedSizeList } from 'react-window'
import styled from '@emotion/styled'
import useDebounce from 'hooks/useDebounce'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAllTokens, useToken, useIsUserAddedToken, useFoundOnInactiveList } from '../../hooks/Tokens'
import { isAddress } from '../../utils'
import Column, { AutoColumn } from '../layout/Column'
import Row from '../layout/Row'
import CommonBases from './CommonBases'
import CurrencyList from './CurrencyList'
import { filterTokens, useSortedTokensByQuery } from './filtering'
import useTokenComparator from './sorting'
import ImportRow from './ImportRow'

interface CurrencySearchProps {
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency) => void
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showImportView: () => void
  setImportToken: (token: Token) => void
}

function CurrencySearch({
  selectedCurrency,
  onCurrencySelect,
  otherSelectedCurrency,
  showCommonBases,
  showImportView,
  setImportToken,
}: CurrencySearchProps) {
  const { chainId } = useActiveWeb3React()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedQuery = useDebounce(searchQuery, 200)

  const [invertSearchOrder] = useState<boolean>(false)

  const allTokens = useAllTokens()

  // if they input an address, use it
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)

  const showETH: boolean = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    return s === '' || s === 'e' || s === 'et' || s === 'eth'
  }, [debouncedQuery])

  const tokenComparator = useTokenComparator(invertSearchOrder)

  const filteredTokens: Token[] = useMemo(() => {
    return filterTokens(Object.values(allTokens), debouncedQuery)
  }, [allTokens, debouncedQuery])

  const sortedTokens: Token[] = useMemo(() => {
    return filteredTokens.sort(tokenComparator)
  }, [filteredTokens, tokenComparator])

  const filteredSortedTokens = useSortedTokensByQuery(sortedTokens, debouncedQuery)

  const handleCurrencySelect = useCallback(
    (currency: Currency) => {
      onCurrencySelect(currency)
    },
    [onCurrencySelect],
  )

  // // manage focus on modal show
  // const inputRef = useRef<HTMLInputElement>()

  // useEffect(() => {
  //   inputRef.current.focus()
  // }, [])

  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        const s = debouncedQuery.toLowerCase().trim()
        if (s === 'eth') {
          handleCurrencySelect(ETHER)
        } else if (filteredSortedTokens.length > 0) {
          if (
            filteredSortedTokens[0].symbol?.toLowerCase() === debouncedQuery.trim().toLowerCase() ||
            filteredSortedTokens.length === 1
          ) {
            handleCurrencySelect(filteredSortedTokens[0])
          }
        }
      }
    },
    [filteredSortedTokens, handleCurrencySelect, debouncedQuery],
  )

  // if no results on main list, show option to expand into inactive
  const inactiveTokens = useFoundOnInactiveList(debouncedQuery)
  const filteredInactiveTokens: Token[] = useSortedTokensByQuery(inactiveTokens, debouncedQuery)

  return (
    <div>
      <AutoColumn style={{ margin: '20px 0 20px 0' }}>
        <Row padding="0 15px 0 15px">
          <Flex alignItems="center" justifyContent="center" mb="10px" style={{ width: '100%' }}>
            <StyledInput
              id="token-search-input"
              placeholder="Search name or paste address"
              autoComplete="off"
              value={searchQuery}
              // ref={inputRef as RefObject<HTMLInputElement>}
              onChange={handleInput}
              onKeyDown={handleEnter}
              icon="search"
            />
          </Flex>
        </Row>
        {showCommonBases && (
          <CommonBases chainId={chainId} onSelect={handleCurrencySelect} selectedCurrency={selectedCurrency} />
        )}
      </AutoColumn>
      {searchToken && !searchTokenIsAdded ? (
        <Column style={{ padding: '20px 0', height: '100%' }}>
          <ImportRow token={searchToken} showImportView={showImportView} setImportToken={setImportToken} />
        </Column>
      ) : filteredSortedTokens?.length > 0 || filteredInactiveTokens?.length > 0 ? (
        <CurrencyList
          height={380}
          showETH={showETH}
          currencies={
            filteredInactiveTokens ? filteredSortedTokens.concat(filteredInactiveTokens) : filteredSortedTokens
          }
          breakIndex={inactiveTokens && filteredSortedTokens ? filteredSortedTokens.length : undefined}
          onCurrencySelect={handleCurrencySelect}
          otherCurrency={otherSelectedCurrency}
          selectedCurrency={selectedCurrency}
          fixedListRef={fixedList}
          showImportView={showImportView}
          setImportToken={setImportToken}
        />
      ) : (
        <Column style={{ padding: '20px', height: '100%' }}>
          <Text color="gray" textAlign="center" mb="20px">
            No results found
          </Text>
        </Column>
      )}
    </div>
  )
}

const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.colors.white3};
  color: ${({ theme }) => theme.colors.text};
  placeholder-color: ${({ theme }) => theme.colors.gray};
  width: 325px;
  ::placeholder {
    color: ${(props) => props.theme.colors.text};
  }

  :focus {
    box-shadow: none !important;
  }
`

export default CurrencySearch
