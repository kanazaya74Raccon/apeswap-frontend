import iazoAbi from 'config/abi/iazo.json'
import iazoExposerAbi from 'config/abi/iazoExposer.json'
import iazoSettingsAbi from 'config/abi/iazoSettings.json'
import erc20Abi from 'config/abi/erc20.json'
import { getIazoExposerAddress, getIazoSettingsAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'
import {
  IazoFeeInfo,
  IazoTimeInfo,
  IazoStatus,
  Iazo,
  IazoOverall,
  IazoDefaultSettings,
  IazoTokenInfo,
} from 'state/types'
import BigNumber from 'bignumber.js'

const fetchIazoData = async (id: string, address: string): Promise<Iazo> => {
  const calls = [
    { address, name: 'FEE_INFO' },
    { address, name: 'IAZO_INFO' },
    { address, name: 'IAZO_TIME_INFO' },
    { address, name: 'STATUS' },
  ]
  const [feeInfo, iazoInfo, iazoTimeInfo, status] = await multicall(iazoAbi, calls)

  const baseTokenAddress = iazoInfo[2].toString()
  const iazoTokenAddress = iazoInfo[1].toString()

  const erc20Calls = [
    { address: baseTokenAddress, name: 'name' },
    { address: baseTokenAddress, name: 'symbol' },
    { address: baseTokenAddress, name: 'decimals' },
    { address: iazoTokenAddress, name: 'name' },
    { address: iazoTokenAddress, name: 'symbol' },
    { address: iazoTokenAddress, name: 'decimals' },
  ]

  const [baseTokenName, baseTokenSymbol, baseTokenDecimals, iazoTokenName, iazoTokenSymbol, iazoTokenDecimals] =
    await multicall(erc20Abi, erc20Calls)

  const feeInfoData: IazoFeeInfo = {
    feeAddress: feeInfo[0].toString(),
    baseFee: feeInfo[1].toString(),
    iazoTokenFee: feeInfo[2].toString(),
  }

  const iazoTimeInfoData: IazoTimeInfo = {
    startTime: iazoTimeInfo[0].toString(),
    activeTime: iazoTimeInfo[1].toString(),
    lockPeriod: iazoTimeInfo[2].toString(),
  }

  const iazoStatusData: IazoStatus = {
    lpGenerationComplete: status[0].toString(),
    forceFailed: status[1].toString(),
    totalBaseCollected: status[2].toString(),
    totalTokensSold: status[3].toString(),
    totalTokensWithdraw: status[4].toString(),
    totalBaseWithdraw: status[5].toString(),
    numBuyers: status[6].toString(),
  }

  const baseTokenData: IazoTokenInfo = {
    address: baseTokenAddress.toString(),
    name: baseTokenName.toString(),
    symbol: baseTokenSymbol.toString(),
    decimals: baseTokenDecimals.toString(),
  }

  const iazoTokenData: IazoTokenInfo = {
    address: iazoTokenAddress.toString(),
    name: iazoTokenName.toString(),
    symbol: iazoTokenSymbol.toString(),
    decimals: iazoTokenDecimals.toString(),
  }

  return {
    iazoContractAddress: address,
    iazoId: id,
    iazoOwnerAddress: iazoInfo[0].toString(),
    iazoSaleInNative: iazoInfo[3].toString(),
    tokenPrice: iazoInfo[4].toString(),
    amount: iazoInfo[5].toString(),
    hardcap: iazoInfo[6].toString(),
    softcap: iazoInfo[7].toString(),
    maxSpendPerBuyer: iazoInfo[8].toString(),
    liquidityPercent: iazoInfo[9].toString(),
    listingPrice: iazoInfo[10].toString(),
    burnRemain: iazoInfo[11].toString(),
    feeInfo: feeInfoData,
    timeInfo: iazoTimeInfoData,
    status: iazoStatusData,
    baseToken: baseTokenData,
    iazoToken: iazoTokenData,
  }
}

const fetchAllIazos = async (): Promise<IazoOverall> => {
  const iazoExposerAddress = getIazoExposerAddress()
  const iazoSettingsAddress = getIazoSettingsAddress()
  const amountOfIazos = await multicall(iazoExposerAbi, [{ address: iazoExposerAddress, name: 'IAZOsLength' }])
  const listOfIazoAddresses = await multicall(
    iazoExposerAbi,
    [...Array(new BigNumber(amountOfIazos).toNumber())].map((e, i) => {
      return { address: iazoExposerAddress, name: 'IAZOAtIndex', params: [i] }
    }),
  )
  const fetchIazoDefaultSettings = await multicall(iazoSettingsAbi, [
    { address: iazoSettingsAddress, name: 'SETTINGS' },
  ])
  const iazoDefaultSettings = fetchIazoDefaultSettings[0]
  const iazoDefaultSettingsData: IazoDefaultSettings = {
    adminAddress: iazoDefaultSettings[0].toString(),
    feeAddress: iazoDefaultSettings[1].toString(),
    burnAddress: iazoDefaultSettings[2].toString(),
    baseFee: iazoDefaultSettings[3].toString(),
    maxBaseFee: iazoDefaultSettings[4].toString(),
    iazoTokenFee: iazoDefaultSettings[5].toString(),
    maxIazoTokenFee: iazoDefaultSettings[6].toString(),
    nativeCreationFee: iazoDefaultSettings[7].toString(),
    minIazoLength: iazoDefaultSettings[8].toString(),
    maxIazoLength: iazoDefaultSettings[9].toString(),
    minLockPeriod: iazoDefaultSettings[10].toString(),
  }

  return {
    iazoDefaultSettings: iazoDefaultSettingsData,
    iazos: await Promise.all(
      listOfIazoAddresses.map(async (address, i) => {
        return fetchIazoData(i.toString(), address[0])
      }),
    ),
  }
}

export default fetchAllIazos
