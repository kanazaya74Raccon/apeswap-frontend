import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, ButtonSquare } from '@apeswapfinance/uikit'
import { useHistory } from 'react-router-dom'
import useCreateIazo from 'views/Iazos/hooks/useCreateIazo'
import tokens from 'config/constants/tokens'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import useCreateIazoApi from 'views/Iazos/hooks/useCreateIazoApi'
import { Token } from 'config/constants/types'
import { useToast } from 'state/hooks'
import { PresaleData } from '../types'

interface CreatePresaleProps {
  presaleData: PresaleData
  disabled: boolean
}

const StyledButton = styled(ButtonSquare)`
  height: 40px;
  width: 135px;
  font-size: 14px;
  font-family: Poppins;
  font-weight: 700;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 200px;
    height: 50px;
    font-size: 16px;
  }
`

const CreatePresale: React.FC<CreatePresaleProps> = ({ presaleData, disabled }) => {
  const { chainId, account } = useWeb3React()
  const history = useHistory()
  const { toastSuccess, toastError } = useToast()
  const { datesSelected, pairCreation, postsaleDetails, presaleTokenDetails, information } = presaleData
  const { tokenAddress, quoteToken, tokenDecimals, tokenSymbol } = pairCreation
  const { burnRemains, pricePerToken, softcap, limitPerUser, tokensForSale } = presaleTokenDetails
  const { website, whitepaper, twitter, telegram, medium, description, tokenLogo } = information
  const { start, end } = datesSelected
  const { lockLiquidity, liquidityPercent, listingPrice } = postsaleDetails
  const quoteTokenObject: Token = tokens[quoteToken.toLowerCase()]

  // Format token price
  // TOKEN_PRICE = BASE_TOKEN_AMOUNT * 10**(18 - iazoTokenDecimals)
  const formatTokenPriceToBaseToken = new BigNumber(pricePerToken).times(
    new BigNumber(10).pow(quoteTokenObject.decimals),
  )
  const formattedPricePerToken = formatTokenPriceToBaseToken.times(new BigNumber(10).pow(18 - tokenDecimals)).toString()

  // Format max spend of the quote token per user
  const formattedMaxSpend = new BigNumber(limitPerUser)
    .times(new BigNumber(10).pow(quoteTokenObject?.decimals))
    .toString()

  // Format hardcap and softcap for the contract
  const formattedHardcap = new BigNumber(tokensForSale).times(new BigNumber(10).pow(tokenDecimals)).toString()

  const formattedSoftcap = new BigNumber(softcap).times(new BigNumber(10).pow(quoteTokenObject?.decimals)).toString()

  const hardcapForApi = parseFloat(tokensForSale) * parseFloat(pricePerToken)

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
  const formatListingPriceToBaseToken = new BigNumber(listingPrice).times(
    new BigNumber(10).pow(quoteTokenObject.decimals),
  )

  const postListingPrice =
    listingPrice === pricePerToken
      ? 0
      : formatListingPriceToBaseToken.times(new BigNumber(10).pow(18 - tokenDecimals)).toString()

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
  // Data to post to API
  const apiObject = new FormData()
  apiObject.append('file', tokenLogo)
  apiObject.append('token1', quoteTokenAddress)
  apiObject.append('token2', tokenAddress)
  apiObject.append('owner', account)
  apiObject.append('startDate', startDateInSeconds.toString())
  apiObject.append('endDate', endDateInSeconds.toString())
  apiObject.append('duration', activeTime.toString())
  apiObject.append('totalPresale', formattedHardcap)
  apiObject.append('pricePresale', formattedPricePerToken)
  apiObject.append('limitDefault', formattedMaxSpend)
  apiObject.append('softcap', formattedSoftcap)
  apiObject.append('hardcap', hardcapForApi.toString())
  apiObject.append('burnRemaining', burnRemains ? '1' : '0')
  apiObject.append('percentageLock', formattedLiquidityPercent.toString())
  apiObject.append('priceListing', postListingPrice.toString())
  apiObject.append('lockTime', lockLiquidity.toString())
  apiObject.append('website', website)
  apiObject.append('whitepaper', whitepaper)
  apiObject.append('twitter', twitter)
  apiObject.append('telegram', telegram)
  apiObject.append('medium', medium)
  apiObject.append('description', description)
  apiObject.append('pathImage', tokenSymbol)

  const onCreateIazo = useCreateIazo(tokenAddress, quoteTokenAddress, burnRemains, unitParams).onCreateIazo
  const onCreateIazoApi = useCreateIazoApi().onCreateIazoApi

  const [pendingTrx, setPendingTrx] = useState(false)

  return (
    <>
      <StyledButton
        onClick={async () => {
          setPendingTrx(true)
          await onCreateIazo()
            .then((resp) => {
              console.log(resp)
              const iazoAddress = resp.events.IAZOCreated.returnValues.newIAZO
              apiObject.append('iazoAddress', iazoAddress)
              onCreateIazoApi(apiObject).then((apiResp: any) => {
                if (apiResp.status === 201) {
                  history.push('/ss-iao')
                  toastSuccess('Your SS-IAO was successfully created!')
                } else {
                  toastError('Your SS-IAO encountered an error. Please contact the ApeSwap team for help.')
                }
              })
            })
            .catch((e) => {
              console.error(e)
            })

          setPendingTrx(false)
        }}
        disabled={pendingTrx || disabled}
        endIcon={pendingTrx && <AutoRenewIcon spin color="currentColor" />}
      >
        CREATE PRESALE
      </StyledButton>
    </>
  )
}

export default CreatePresale
