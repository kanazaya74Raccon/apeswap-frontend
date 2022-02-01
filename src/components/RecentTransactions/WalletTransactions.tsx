import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Flex, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { AppDispatch } from 'state'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { clearAllTransactions } from 'state/transactions/actions'
import { Wrapper } from 'views/Swap/components/styleds'
import { orderBy } from 'lodash'
import { AppBody } from 'components/App'
import TransactionRow from './TransactionRow'

const Title = styled(Text)`
  font-size: 16px;
  margin-left: 5px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
`

const WalletTransactions: React.FC = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const allTransactions = useAllTransactions()
  const sortedTransactions = orderBy(Object.values(allTransactions).filter(isTransactionRecent), 'addedTime', 'desc')

  const handleClearAll = () => {
    if (chainId) {
      dispatch(clearAllTransactions({ chainId }))
    }
  }

  return (
    <div style={{ marginTop: '10px' }}>
      <AppBody>
        <Wrapper>
          <Flex alignItems="center" justifyContent="space-between" mb="24px">
            <Title textTransform="uppercase" bold>
              Recent Transactions
            </Title>
            {sortedTransactions.length > 0 && (
              <Button onClick={handleClearAll} variant="text" px="0" padding={10}>
                <Text>Clear all</Text>
              </Button>
            )}
          </Flex>
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((txn) => <TransactionRow key={txn.hash} txn={txn} />)
          ) : (
            <Text textAlign="center">No recent transactions</Text>
          )}
        </Wrapper>
      </AppBody>
    </div>
  )
}

export default WalletTransactions
