// import { apiBaseUrl } from 'hooks/api'
import { IazoSocialInfo, IazoFeeInfo, IazoTimeInfo, IazoStatus, Iazo, IazoTokenInfo } from 'state/types'

const getIazosFromApi = async () => {
  const apiBaseUrl = 'https://apeswap-api-development.herokuapp.com'
  try {
    const response = await fetch(`${apiBaseUrl}/iazo`)
    const statRes = await response.json()
    console.log(statRes)
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    console.error(error)
    return null
  }
}

const getIazoFromApi = async (address: string) => {
  const apiBaseUrl = 'https://apeswap-api-development.herokuapp.com'
  console.log(`${apiBaseUrl}/iazo/${address}`)
  try {
    const response = await fetch(`${apiBaseUrl}/iazo/${address}`)
    const statRes = await response.json()
    if (statRes.statusCode === 500) {
      return null
    }
    return statRes
  } catch (error) {
    console.error(error)
    return null
  }
}

const formatIazoData = (iazo): Iazo => {
  const iazoSocialInfo: IazoSocialInfo = {
    twitter: iazo.twitter,
    telegram: iazo.telegram,
    medium: iazo.medium,
    whitepaper: iazo.whitepaper,
    website: iazo.website,
    description: iazo.description,
    tokenImage: iazo.pathImage,
  }

  const timeInfo: IazoTimeInfo = {
    startTime: iazo.startDate,
    activeTime: iazo.duration,
    lockPeriod: iazo.lockTime,
  }

  const feeInfo: IazoFeeInfo = {
    feeAddress: null,
    baseFee: null,
    iazoTokenFee: null,
  }

  const status: IazoStatus = {
    lpGenerationComplete: null,
    forceFailed: null,
    totalBaseCollected: null,
    totalTokensSold: null,
    totalTokensWithdraw: null,
    totalBaseWithdraw: null,
    numBuyers: null,
  }

  const baseToken: IazoTokenInfo = {
    address: iazo.token2,
    name: null,
    symbol: null,
    decimals: null,
  }

  const iazoToken: IazoTokenInfo = {
    address: iazo.token1,
    name: null,
    symbol: null,
    decimals: null,
    totalSupply: null,
  }

  return {
    iazoContractAddress: iazo.iazoAddress,
    iazoOwnerAddress: iazo.owner,
    tokenPrice: iazo.pricePresale,
    amount: iazo.totalPresale,
    hardcap: iazo.hardcap,
    softcap: iazo.softcap,
    maxSpendPerBuyer: iazo.limitDefault,
    liquidityPercent: iazo.percentageLock,
    listingPrice: iazo.priceListing,
    burnRemain: iazo.burnRemaining,
    feeInfo,
    timeInfo,
    status,
    baseToken,
    iazoToken,
    socialInfo: iazoSocialInfo,
  }
}
const fetchIazosFromApi = async (): Promise<Iazo[]> => {
  const iazos = await getIazosFromApi()

  const formattedIazos = iazos.map((iazo) => {
    return formatIazoData(iazo)
  })
  return formattedIazos
}

export const fetchIazoFromApi = async (address: string): Promise<Iazo[]> => {
  const iazos = await getIazoFromApi(address)
  const formattedIazos = iazos.map((iazo) => {
    return formatIazoData(iazo)
  })
  return formattedIazos
}

export default fetchIazosFromApi
