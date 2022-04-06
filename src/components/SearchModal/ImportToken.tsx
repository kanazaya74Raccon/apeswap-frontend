import React, { useState } from 'react'
import { Token, Currency } from '@apeswapfinance/sdk'
import { Button, Text, ErrorIcon, Flex, Checkbox, Link, Tag } from '@apeswapfinance/uikit'
import { AutoColumn } from 'components/layout/Column'
import { useAddUserToken } from 'state/user/hooks'
import { getEtherscanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCombinedInactiveList } from 'state/lists/hooks'
import { ListLogo } from 'components/Logo'

interface ImportProps {
  tokens: Token[]
  handleCurrencySelect?: (currency: Currency) => void
}

function ImportToken({ tokens, handleCurrencySelect }: ImportProps) {
  const { chainId } = useActiveWeb3React()

  const [confirmed, setConfirmed] = useState(false)

  const addToken = useAddUserToken()

  // use for showing import source on inactive tokens
  const inactiveTokenList = useCombinedInactiveList()

  return (
    <div style={{ padding: '20px 20px 20px 20px' }}>
      <AutoColumn gap="lg">
        <Text textAlign="center">
          <h1 style={{ fontSize: '20px' }}>Trade at your own risk!</h1>
          ApeSwap is a Decentralized Exchange. By nature, this means anyone can create a token and add liquidity.
          Unlisted tokens may unfortunately be a scam.
          <br />
          <br />
          Are you a project owner?
          <br />
          <a
            href="apeswap.click/partners"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'underline' }}
          >
            Apply to be listed today!
          </a>
        </Text>

        {tokens.map((token) => {
          const list = chainId && inactiveTokenList?.[chainId]?.[token.address]?.list
          const address = token.address ? `${truncateHash(token.address)}` : null
          return (
            <div key={token.address}>
              {list !== undefined ? (
                <Tag
                  variant="success"
                  outline
                  startIcon={list.logoURI && <ListLogo logoURI={list.logoURI} size="12px" />}
                >
                  via {list.name}
                </Tag>
              ) : (
                <Tag variant="danger" outline startIcon={<ErrorIcon color="error" />}>
                  Unknown Source
                </Tag>
              )}
              <Flex alignItems="center">
                <Text mr="8px">{token.name}</Text>
                <Text>({token.symbol})</Text>
              </Flex>
              {chainId && (
                <Flex>
                  <Text mr="10px">{address}</Text>
                  <Link href={getEtherscanLink(token.address, 'address', chainId)} external>
                    <Text bold>View on explorer</Text>
                  </Link>
                </Flex>
              )}
            </div>
          )
        })}

        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center" onClick={() => setConfirmed(!confirmed)}>
            <Checkbox
              scale="sm"
              name="confirmed"
              type="checkbox"
              checked={confirmed}
              onChange={() => setConfirmed(!confirmed)}
            />
            <Text ml="8px" style={{ userSelect: 'none' }}>
              I understand
            </Text>
          </Flex>
          <Button
            variant="danger"
            disabled={!confirmed}
            onClick={() => {
              tokens.map((token) => addToken(token))
              if (handleCurrencySelect) {
                handleCurrencySelect(tokens[0])
              }
            }}
            className=".token-dismiss-button"
          >
            Import
          </Button>
        </Flex>
      </AutoColumn>
    </div>
  )
}

export default ImportToken
