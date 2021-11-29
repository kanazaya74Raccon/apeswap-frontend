import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { PresaleData, SaleInformation, DateObject, TokenSaleDetails, LiquidityLockDetails } from './types'

interface ValidationProps {
  presaleData: PresaleData
  onValidationChange: (valid: boolean) => void
}

const ValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 286px;
  border-radius: 10px;
  border-radius: 10px;
  margin-bottom: 35px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 686px;
    padding: 20px 30px 20px 70px;
  }
`

const ValidationText = styled(Text)<{ boldContent?: string }>`
  font-family: poppins;
  font-weight: 400;
  font-size: 10px;
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

const isValidUrl = (val: string) => {
  try {
    const url = new URL(val)
    return url
  } catch {
    return false
  }
  return true
}

const postSaleValidation = (data: LiquidityLockDetails): { error: string; message: string }[] => {
  const validationList: { error: string; message: string }[] = []
  const { lockLiquidity, liquidityPercent, listingPrice } = data
  if (!lockLiquidity) {
    validationList.push({ error: 'Liquidity Lock Missing', message: 'Please choose a liquidity lock time' })
  }
  if (!liquidityPercent) {
    validationList.push({ error: 'Liquidity Percent Missing', message: 'Please choose a liquidity lock percentage' })
  }
  if (!listingPrice) {
    validationList.push({
      error: 'Liquidity Listing Price Missing',
      message: 'Please choose a liquidity listing price',
    })
  }
  return validationList
}

const informationValidation = (data: SaleInformation): { error: string; message: string }[] => {
  const validationList: { error: string; message: string }[] = []
  const { website, twitter, telegram, medium, tokenLogo } = data
  const fileExtension = tokenLogo?.name?.split('.')[tokenLogo?.name?.split('.').length - 1]
  const fileSize = tokenLogo?.size
  const acceptableFiles = ['jpg', 'svg', 'png']
  console.log(tokenLogo)
  if (!website) {
    validationList.push({ error: 'Website URL Missing', message: 'Please enter a website url' })
  }
  if (!twitter) {
    validationList.push({ error: 'Twitter URL Missing', message: 'Please enter a twitter url' })
  }
  if (!telegram) {
    validationList.push({ error: 'Telegram URL Missing', message: 'Please enter a telegram url' })
  }
  if (!medium) {
    validationList.push({ error: 'Medium URL Missing', message: 'Please enter a medium url' })
  }
  if (!tokenLogo) {
    validationList.push({ error: 'Token Logo Missing', message: 'Please upload an image' })
  }

  if (!acceptableFiles.includes(fileExtension?.toLowerCase())) {
    validationList.push({ error: 'Token Logo File Not Valid', message: 'Please use a .jpg .png .svg instead' })
  }
  if (fileSize > 1000000) {
    validationList.push({ error: 'Token Logo File Size To Large', message: 'Please upload a file size under 1MB' })
  }
  if (!isValidUrl(website)) {
    validationList.push({ error: 'Website Is Not a Valid URL', message: 'Please enter a valid website url' })
  }
  if (!isValidUrl(twitter)) {
    validationList.push({ error: 'Twitter Is Not a Valid URL', message: 'Please enter a valid twitter url' })
  }
  if (!isValidUrl(telegram)) {
    validationList.push({ error: 'Telegram Is Not a Valid URL', message: 'Please enter a valid telegram url' })
  }
  if (!isValidUrl(medium)) {
    validationList.push({ error: 'Medium Is Not a Valid URL', message: 'Please enter a valid medium url' })
  }

  return validationList
}

const dateSelectionValidation = (data: DateObject): { error: string; message: string }[] => {
  const validationList = []
  const { start, end } = data
  return validationList
}

const presaleValidation = (data: TokenSaleDetails): { error: string; message: string }[] => {
  const validationList = []
  const { pricePerToken, softcap, limitPerUser, tokensForSale } = data
  if (parseFloat(softcap) > parseFloat(tokensForSale) * parseFloat(pricePerToken)) {
    validationList.push({
      error: 'Softcap Must Be Less Than Hardcap',
      message: 'Please enter a softcap less than the hardcap',
    })
  }
  if (!pricePerToken) {
    validationList.push({ error: 'Price Per Token Missing', message: 'Please enter a price per token' })
  }
  if (!softcap) {
    validationList.push({ error: 'Softcap Missing', message: 'Please enter a softcap' })
  }
  if (!limitPerUser) {
    validationList.push({ error: 'Limit Per User Missing', message: 'Please enter a limit per user' })
  }
  if (!tokensForSale) {
    validationList.push({ error: 'Tokens For Sale Missing', message: 'Please enter the amount of tokens for sale' })
  }
  return validationList
}

const Validations: React.FC<ValidationProps> = ({ presaleData, onValidationChange }) => {
  const { datesSelected, information, postsaleDetails, presaleTokenDetails } = presaleData
  const postSaleValid = postSaleValidation(postsaleDetails)
  const infoValid = informationValidation(information)
  const datesValid = dateSelectionValidation(datesSelected)
  const presaleValid = presaleValidation(presaleTokenDetails)
  const aggregatedErrors = [...postSaleValid, ...infoValid, ...datesValid, ...presaleValid]
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
        <ValidationText boldContent={`${error.error}:`}>
          {'  '}
          {error.message}
        </ValidationText>
      ))}
    </ValidationContainer>
  )
}

export default React.memo(Validations)
