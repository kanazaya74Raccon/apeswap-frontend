import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonSquare } from '@apeswapfinance/uikit'
import useCreateIazo from 'views/Iazos/hooks/useCreateIazo'
import tokens from 'config/constants/tokens'
import { useNetworkChainId } from 'state/hooks'
import BigNumber from 'bignumber.js'
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
  const { tokenAddress, quoteToken } = pairCreation
  const { burnRemains, pricePerToken, hardcap, softcap, busdLimitPerUser, tokensForSale } = presaleTokenDetails
  const { start, end } = datesSelected
  const { lockLiquidity, liquidityPercent, listingPrice } = postsaleDetails
  const formattedPricePerToken = new BigNumber(pricePerToken).times(new BigNumber(10).pow(18)).toString()
  const formattedMaxSpend = new BigNumber(busdLimitPerUser).times(new BigNumber(10).pow(18)).toString()
  const formattedHardcap = new BigNumber(parseFloat(tokensForSale) * parseFloat(pricePerToken))
    .times(new BigNumber(10).pow(18))
    .toString()
  const formattedSoftcap = new BigNumber(softcap).times(new BigNumber(10).pow(18)).toString()
  const formattedLiquidityPercent = liquidityPercent * 1000
  const startDateInSeconds = Math.floor(start.valueOf() / 1000)
  const endDateInSeconds = Math.floor(end.valueOf() / 1000)
  const activeTime = endDateInSeconds - startDateInSeconds
  const quoteTokenAddress =
    quoteToken.toLowerCase() === 'bnb' ? ZERO_ADDRESS : tokens[quoteToken.toLowerCase()].address[chainId]
  const postListingPrice =
    listingPrice === pricePerToken ? 0 : new BigNumber(listingPrice).times(new BigNumber(10).pow(18)).toString()
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
  console.log(quoteTokenAddress)

  const onCreateIazo = useCreateIazo(tokenAddress, quoteTokenAddress, burnRemains, unitParams).onCreateIazo

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
