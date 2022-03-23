import React from 'react'
import styled from '@emotion/styled'
import { BlockIcon, CheckmarkCircleIcon, Flex, Link, OpenNewIcon, AutoRenewIcon } from '@apeswapfinance/uikit'
import { TransactionDetails } from 'state/transactions/reducer'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getEtherscanLink } from 'utils'

interface TransactionRowProps {
  txn: TransactionDetails
}

const TxnIcon = styled(Flex)`
  align-items: center;
  flex: none;
  width: 22px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 24px;
  }
`

const Summary = styled.div`
  flex: 1;
  padding: 0 8px;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const TxnLink = styled(Link)`
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  margin-bottom: 16px;
  width: 100%;

  &:hover {
    text-decoration: none;
  }
`

const renderIcon = (txn: TransactionDetails) => {
  if (!txn.receipt) {
    return <AutoRenewIcon spin width="24px" />
  }

  return txn.receipt?.status === 1 || typeof txn.receipt?.status === 'undefined' ? (
    <CheckmarkCircleIcon color="success" width="24px" />
  ) : (
    <BlockIcon color="failure" width="24px" />
  )
}

const TransactionRow: React.FC<TransactionRowProps> = ({ txn }) => {
  const { chainId } = useActiveWeb3React()

  if (!txn) {
    return null
  }

  return (
    <Flex alignItems="center" mb='10px'>
      <TxnIcon color="white">{renderIcon(txn)}</TxnIcon>
      <Summary>{txn.summary ?? txn.hash}</Summary>
      <a href={getEtherscanLink(txn.hash, 'transaction', chainId)} target="_blank" rel="noopener noreferrer">
        <TxnIcon>
          <OpenNewIcon width="24px" color="#FFB300" />
        </TxnIcon>
      </a>
    </Flex>
  )
}

export default TransactionRow
