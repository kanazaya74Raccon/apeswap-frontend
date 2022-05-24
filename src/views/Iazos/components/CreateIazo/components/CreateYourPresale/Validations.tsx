import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { IazoDefaultSettings } from 'state/types'
import getTimePeriods from 'utils/getTimePeriods'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { PresaleData, SaleInformation, DateObject, TokenSaleDetails, LiquidityLockDetails } from './types'

interface ValidationProps {
  presaleData: PresaleData
  settings: IazoDefaultSettings
  onValidationChange: (valid: boolean) => void
}

const isValidUrl = (val: string) => {
  try {
    const url = new URL(val)
    return url
  } catch {
    return false
  }
}

export const postSaleValidation = (
  t,
  data: LiquidityLockDetails,
  presalePrice: string,
): { error: string; message: string }[] => {
  const validationList: { error: string; message: string }[] = []
  const { lockLiquidity, liquidityPercent, listingPrice } = data
  const minListPrice = presalePrice && parseFloat(presalePrice) - parseFloat(presalePrice) * 0.25
  const maxListPrice = presalePrice && parseFloat(presalePrice) + parseFloat(presalePrice) * 0.5
  if (!lockLiquidity) {
    validationList.push({ error: t('Liquidity Lock Missing'), message: t('Please choose a liquidity lock time') })
  }
  if (!liquidityPercent) {
    validationList.push({
      error: t('Liquidity Percent Missing'),
      message: t('Please choose a liquidity lock percentage'),
    })
  }
  if (!listingPrice) {
    validationList.push({
      error: t('Liquidity Listing Price Missing'),
      message: t('Please choose a liquidity listing price'),
    })
  }
  if (parseFloat(listingPrice) < minListPrice) {
    validationList.push({
      error: t('Liquidity Listing Price Too Low'),
      message: t('Please choose higher your liquidity listing price'),
    })
  }
  if (parseFloat(listingPrice) > maxListPrice) {
    validationList.push({
      error: t('Liquidity Listing Price Too High'),
      message: t('Please raise your liquidity listing price'),
    })
  }
  return validationList
}

const informationValidation = (t, data: SaleInformation): { error: string; message: string }[] => {
  const validationList: { error: string; message: string }[] = []
  const { website, twitter, telegram, medium, tokenLogo } = data
  const fileExtension = tokenLogo?.name?.split('.')[tokenLogo?.name?.split('.').length - 1]
  const fileSize = tokenLogo?.size
  const acceptableFiles = ['jpg', 'svg', 'png']
  if (!website) {
    validationList.push({ error: t('Website URL Missing'), message: t('Please enter a website url') })
  }
  if (!twitter) {
    validationList.push({ error: t('Twitter URL Missing'), message: t('Please enter a twitter url') })
  }
  if (!telegram) {
    validationList.push({ error: t('Telegram URL Missing'), message: t('Please enter a telegram url') })
  }
  if (!medium) {
    validationList.push({ error: t('Medium URL Missing'), message: t('Please enter a medium url') })
  }
  if (!tokenLogo) {
    validationList.push({ error: t('Token Logo Missing'), message: t('Please upload an image') })
  }

  if (!acceptableFiles.includes(fileExtension?.toLowerCase())) {
    validationList.push({ error: t('Token Logo File Not Valid'), message: t('Please use a .jpg .png .svg instead') })
  }
  if (fileSize > 1000000) {
    validationList.push({
      error: t('Token Logo File Size To Large'),
      message: t('Please upload a file size under 1MB'),
    })
  }
  if (!isValidUrl(website)) {
    validationList.push({ error: t('Website Is Not a Valid URL'), message: t('Please enter a valid website url') })
  }
  if (!isValidUrl(twitter)) {
    validationList.push({ error: t('Twitter Is Not a Valid URL'), message: t('Please enter a valid twitter url') })
  }
  if (!isValidUrl(telegram)) {
    validationList.push({ error: t('Telegram Is Not a Valid URL'), message: t('Please enter a valid telegram url') })
  }
  if (!isValidUrl(medium)) {
    validationList.push({ error: t('Medium Is Not a Valid URL'), message: t('Please enter a valid medium url') })
  }

  return validationList
}

export const dateSelectionValidation = (
  t,
  data: DateObject,
  maxIazoLength: string,
  minIazoLength: string,
): { error: string; message: string }[] => {
  const validationList = []
  const { start, end } = data
  // Convert Date types into unix timestamp in seconds
  const startDateInSeconds = Math.floor(start.valueOf() / 1000)
  const endDateInSeconds = Math.floor(end.valueOf() / 1000)

  // Get the amount of time the IAZO will be active
  const activeTime = endDateInSeconds - startDateInSeconds

  const formattedMinTime = getTimePeriods(parseInt(minIazoLength))
  const formattedMaxTime = getTimePeriods(parseInt(maxIazoLength))

  if (activeTime < parseInt(minIazoLength)) {
    validationList.push({
      error: t('Your IAZO Length Is Too Short'),
      message: `${t('Please enter a longer IAZO time than the minimum')}: ${formattedMinTime.days}${t('days')}, ${
        formattedMinTime.hours
      }${t('hours')}, ${formattedMinTime.minutes} ${t('minutes')}`,
    })
  }
  if (activeTime > parseInt(maxIazoLength)) {
    validationList.push({
      error: t('Your IAZO Length Is Too Long'),
      message: `${t('Please enter a shorter IAZO time than the maximum')}: ${formattedMaxTime.days}${t('days')}, ${
        formattedMaxTime.hours
      }${t('hours')}, ${formattedMaxTime.minutes} ${t('minutes')}`,
    })
  }
  return validationList
}

export const presaleValidation = (t, data: TokenSaleDetails): { error: string; message: string }[] => {
  const validationList = []
  const { pricePerToken, softcap, limitPerUser, tokensForSale } = data
  if (parseFloat(softcap) > parseFloat(tokensForSale) * parseFloat(pricePerToken)) {
    validationList.push({
      error: t('Softcap Must Be Less Than Hardcap'),
      message: t('Please enter a softcap less than the hardcap'),
    })
  }
  if (!pricePerToken) {
    validationList.push({ error: t('Price Per Token Missing'), message: t('Please enter a price per token') })
  }
  if (!softcap) {
    validationList.push({ error: t('Softcap Missing'), message: t('Please enter a softcap') })
  }
  if (!limitPerUser) {
    validationList.push({ error: t('Limit Per User Missing'), message: t('Please enter a limit per user') })
  }
  if (!tokensForSale) {
    validationList.push({
      error: t('Tokens For Sale Missing'),
      message: t('Please enter the amount of tokens for sale'),
    })
  }
  return validationList
}

const tokenAmountCheck = (
  t,
  liquidityPercent: number,
  listingPrice: string,
  pricePerToken: string,
  tokensForSale: string,
  userBalance: string,
  tokenDecimals: number,
) => {
  const validationList = []
  const priceDifference = Math.abs(parseFloat(pricePerToken) / parseFloat(listingPrice))
  const tokensForLiquidity = parseFloat(tokensForSale) * priceDifference * liquidityPercent
  const totalTokens = tokensForLiquidity + parseFloat(tokensForSale)
  const formattedUserBalance = getBalanceNumber(new BigNumber(userBalance), tokenDecimals)
  if (totalTokens > formattedUserBalance) {
    validationList.push({
      error: t('Token Sale Exceeds User Balance'),
      message: t(
        'Your current tokens for sale %totalTokens% should be lower than your balance %formattedUserBalance%',
        { totalTokens, formattedUserBalance },
      ),
    })
  }
  return validationList
}

const Validations: React.FC<ValidationProps> = ({ presaleData, settings, onValidationChange }) => {
  const { datesSelected, information, postsaleDetails, presaleTokenDetails, pairCreation } = presaleData
  const { t } = useTranslation()
  const postSaleValid = postSaleValidation(t, postsaleDetails, presaleTokenDetails?.pricePerToken)
  const infoValid = informationValidation(t, information)
  const datesValid = dateSelectionValidation(t, datesSelected, settings?.maxIazoLength, settings?.minIazoLength)
  const presaleValid = presaleValidation(t, presaleTokenDetails)
  const balanceValid = tokenAmountCheck(
    t,
    postsaleDetails?.liquidityPercent,
    postsaleDetails?.listingPrice,
    presaleTokenDetails?.pricePerToken,
    presaleTokenDetails?.tokensForSale,
    pairCreation?.userBalance,
    pairCreation?.tokenDecimals,
  )
  const aggregatedErrors = [...postSaleValid, ...infoValid, ...datesValid, ...presaleValid, ...balanceValid]
  const isValid =
    postSaleValid.length === 0 &&
    infoValid.length === 0 &&
    datesValid.length === 0 &&
    presaleValid.length === 0 &&
    aggregatedErrors.length === 0

  useEffect(() => {
    onValidationChange(!isValid)
  }, [isValid, onValidationChange])

  return (
    <ValidationContainer>
      {aggregatedErrors.map((error) => (
        <ValidationText boldContent={`${error.error}:  `}>{error.message}</ValidationText>
      ))}
    </ValidationContainer>
  )
}

const ValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 286px;
  border-radius: 10px;
  margin-bottom: 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
    padding: 20px 30px 20px 70px;
  }
`

const ValidationText = styled(Text)<{ boldContent?: string }>`
  font-size: 10px;
  font-weight: 200;
  color: rgba(223, 65, 65, 1);
  line-height: 20px;
  &:before {
    font-weight: 700;
    content: '${(props) => props.boldContent}';
  }
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
    line-height: 40px;
  }
`

export default React.memo(Validations)
