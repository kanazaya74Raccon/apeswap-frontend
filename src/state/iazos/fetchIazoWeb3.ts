import iazoAbi from 'config/abi/iazo.json'
import iazoSettingsAbi from 'config/abi/iazoSettings.json'
import erc20Abi from 'config/abi/erc20.json'
import { getIazoSettingsAddress, getMulticallAddress } from 'utils/addressHelper'
import multicallABI from 'config/abi/Multicall.json'
import { getContract } from 'utils/web3'
import multicall from 'utils/multicall'
import { IazoFeeInfo, IazoStatus, IazoDefaultSettings, IazoTokenInfo } from 'state/types'

const fetchIazoDefaultSettings = async (chainId: number) => {
  const iazoSettingsAddress = getIazoSettingsAddress(chainId)
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const fetchIazoDefaultSetting = await multicall(multicallContract, iazoSettingsAbi, [
    { address: iazoSettingsAddress, name: 'SETTINGS' },
  ])
  const iazoDefaultSettings = fetchIazoDefaultSetting[0]
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
  return iazoDefaultSettingsData
}

export const fetchIazoTokenDetails = async (chainId: number, iazoTokenAddress: string, baseTokenAddress: string) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const erc20Calls = [
    { address: baseTokenAddress, name: 'name' },
    { address: baseTokenAddress, name: 'symbol' },
    { address: baseTokenAddress, name: 'decimals' },
    { address: iazoTokenAddress, name: 'name' },
    { address: iazoTokenAddress, name: 'symbol' },
    { address: iazoTokenAddress, name: 'decimals' },
    { address: iazoTokenAddress, name: 'totalSupply' },
  ]

  const [
    baseTokenName,
    baseTokenSymbol,
    baseTokenDecimals,
    iazoTokenName,
    iazoTokenSymbol,
    iazoTokenDecimals,
    iazoTokenTotalSupply,
  ] = await multicall(multicallContract, erc20Abi, erc20Calls)

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
    totalSupply: iazoTokenTotalSupply.toString(),
  }

  return { baseToken: baseTokenData, iazoToken: iazoTokenData }
}

export const fetchIazoStatusInfo = async (chainId: number, address: string) => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const calls = [
    { address, name: 'FEE_INFO' },
    { address, name: 'STATUS' },
  ]
  const [feeInfo, status] = await multicall(multicallContract, iazoAbi, calls)

  const feeInfoData: IazoFeeInfo = {
    feeAddress: feeInfo[0].toString(),
    baseFee: feeInfo[1].toString(),
    iazoTokenFee: feeInfo[2].toString(),
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

  console.log('AT THIS')

  return { feeInfo: feeInfoData, status: iazoStatusData }
}

export default fetchIazoDefaultSettings
