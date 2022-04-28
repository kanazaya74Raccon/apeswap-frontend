import { Order } from '@autonomylabs/limit-stop-orders'
import { formatUnits } from '@ethersproject/units'
import React from 'react'
import styled from 'styled-components'
import { Button, Flex, Text, InfoIcon, TooltipBubble, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { Token } from '@apeswapfinance/sdk'
import { CurrencyLogo } from 'components/Logo'
import { AutoRow } from 'components/layout/Row'
import useAutonomyOrdersLib from 'hooks/useAutonomyOrdersLib'

const OrderRowWrapper = styled(Flex)`
  position: relative;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.white4};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.dividerColor}`};
  justify-content: space-between;
  align-items: center;
  &:first-child {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  &:last-child {
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: none;
  }
`

const OrderColWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`

const OrderCol = styled(Flex)`
  min-width: 130px;
  margin-bottom: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0;
  }
`

const TokenText = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
`

const TooltipIcon = styled('div')`
  display: 'inline-block';
  position: absolute;
  top: 20px;
  right: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    position: relative;
    top: unset;
    right: unset;
  }
`

interface IOrderRowProps {
  order: Order
  tokenPair: {
    input: Token
    output: Token
  }
}

const TooltipContent = ({ order }: { order: Order }) => {
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="12px">Placed:</Text>
        <Text fontSize="12px" bold>
          {order.time}
        </Text>
      </Flex>
      {order.updateTime !== 'null' && (
        <Flex justifyContent="space-between" alignItems="center" mt={1}>
          <Text fontSize="12px">{order.status === 'executed' ? 'Closed:' : 'Cancelled:'}</Text>
          <Text fontSize="12px" bold>
            {order.updateTime}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export default function OrderRow({ order, tokenPair }: IOrderRowProps) {
  const inputAmount = formatUnits(order.inputAmount, tokenPair.input?.decimals)
  const outputAmount = formatUnits(order.outputAmount, tokenPair.output?.decimals)

  const autonomyOrdersLib = useAutonomyOrdersLib()
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs

  const handleCancel = React.useCallback(async () => {
    if (autonomyOrdersLib) {
      await autonomyOrdersLib.cancelOrder(order)
    }
  }, [autonomyOrdersLib, order])

  return (
    <OrderRowWrapper>
      <TooltipIcon>
        <TooltipBubble
          placement={isMobile ? 'topRight' : 'topLeft'}
          body={<TooltipContent order={order} />}
          transformTip={isMobile ? 'translate(calc(-100% + 45px), -100%)' : 'translate(-22px, -100%)'}
          width="300px"
        >
          <InfoIcon width="25px" />
        </TooltipBubble>
      </TooltipIcon>
      <OrderColWrapper>
        <OrderCol flexDirection="column">
          <Text fontSize="12px" color="gray">
            Swap
          </Text>
          <Text fontSize="16px" bold>
            {(+inputAmount).toFixed(6)}
          </Text>
          <AutoRow gap="5px" align="center">
            <CurrencyLogo currency={tokenPair.input} size="12px" />
            <TokenText fontSize="12px" color="#ffb300" style={{ opacity: 0.8 }}>
              {tokenPair.input?.symbol}
            </TokenText>
          </AutoRow>
        </OrderCol>
        <OrderCol flexDirection="column">
          <Text fontSize="12px" color="gray">
            For
          </Text>
          <Text fontSize="16px" bold>
            {(+outputAmount).toFixed(6)}
          </Text>
          <AutoRow gap="5px" align="center">
            <CurrencyLogo currency={tokenPair.output} size="12px" />
            <TokenText fontSize="12px" color="#ffb300" style={{ opacity: 0.8 }}>
              {tokenPair.output?.symbol}
            </TokenText>
          </AutoRow>
        </OrderCol>
      </OrderColWrapper>
      <OrderColWrapper>
        <OrderCol flexDirection="column">
          <Text fontSize="12px" color="gray">
            At
          </Text>
          <Text fontSize="16px" bold>
            {(+outputAmount / +inputAmount).toFixed(6)}
          </Text>
          <TokenText fontSize="12px" style={{ opacity: 0.8 }}>
            {tokenPair.output?.symbol} / {tokenPair.input?.symbol}
          </TokenText>
        </OrderCol>
        {order.status === 'open' && <Button onClick={handleCancel}>Cancel</Button>}
      </OrderColWrapper>
    </OrderRowWrapper>
  )
}
