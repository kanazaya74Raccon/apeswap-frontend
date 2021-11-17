import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonSquare } from '@apeswapfinance/uikit'
import useCreateIazo from 'views/Iazos/hooks/useCreateIazo'
import tokens from 'config/constants/tokens'
import { useNetworkChainId } from 'state/hooks'
import BigNumber from 'bignumber.js'
import { Token } from 'config/constants/types'
import { ZERO_ADDRESS } from 'config'
import { PresaleData } from '../types'

interface CreatePresaleProps {
  presaleData: PresaleData
}

const StyledButton = styled(ButtonSquare)`
  height: 50px;
  width: 200px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 700;
`

const CreatePresale: React.FC<CreatePresaleProps> = ({ presaleData }) => {
  const chainId = useNetworkChainId()
  const { datesSelected, pairCreation, postsaleDetails, presaleTokenDetails } = presaleData
  const { tokenAddress, quoteToken, tokenDecimals } = pairCreation
  const { burnRemains, pricePerToken, softcap, limitPerUser, tokensForSale } = presaleTokenDetails
  const { start, end } = datesSelected
  const { lockLiquidity, liquidityPercent, listingPrice } = postsaleDetails
  const quoteTokenObject: Token = tokens[quoteToken.toLowerCase()]

  // Format token price
  // TOKEN_PRICE = BASE_TOKEN_AMOUNT * 10**(18 - iazoTokenDecimals)
  const formattedPricePerToken =
    tokenDecimals === 18
      ? new BigNumber(pricePerToken).times(new BigNumber(10).pow(18)).toString()
      : new BigNumber(pricePerToken).times(new BigNumber(10).pow(18 - tokenDecimals)).toString()

  console.log(formattedPricePerToken)

  // Format max spend of the quote token per user
  const formattedMaxSpend = new BigNumber(limitPerUser)
    .times(new BigNumber(10).pow(quoteTokenObject?.decimals))
    .toString()

  // Format hardcap and softcap for the contract
  const formattedHardcap = new BigNumber(tokensForSale).times(new BigNumber(10).pow(tokenDecimals)).toString()

  const formattedSoftcap = new BigNumber(softcap).times(new BigNumber(10).pow(quoteTokenObject?.decimals)).toString()

  // Format liquidity percent to be readable
  const formattedLiquidityPercent = liquidityPercent * 1000

  // Convert Date types into unix timestamp in seconds
  const startDateInSeconds = Math.floor(start.valueOf() / 1000)
  const endDateInSeconds = Math.floor(end.valueOf() / 1000)

  // Get the amount of time the IAZO will be active
  const activeTime = endDateInSeconds - startDateInSeconds

  // Get quote/base token address
  const quoteTokenAddress = quoteTokenObject.address[chainId]

  // Calculate post listing price
  const postListingPrice =
    listingPrice === pricePerToken ? 0 : new BigNumber(listingPrice).times(new BigNumber(10).pow(18)).toString()

  // IAZO unit params
  const unitParams = [
    formattedPricePerToken,
    formattedHardcap,
    formattedSoftcap,
    startDateInSeconds,
    activeTime,
    lockLiquidity,
    formattedMaxSpend,
    formattedLiquidityPercent,
    postListingPrice,
  ]

  const onCreateIazo = useCreateIazo(tokenAddress, quoteTokenAddress, burnRemains, unitParams).onCreateIazo

  console.log(formattedHardcap)

  return (
    <>
      <StyledButton
        onClick={async () => {
          try {
            await onCreateIazo()
          } catch (e) {
            console.log(e)
          }
        }}
      >
        CREATE PRESALE
      </StyledButton>
    </>
  )
}

export default CreatePresale
