import iazoAbi from 'config/abi/iazo.json'
import iazoExposerAbi from 'config/abi/iazoExposer.json'
import erc20Abi from 'config/abi/erc20.json'
import { getIazoExposerAddress, getMulticallAddress } from 'utils/addressHelper'
import multicallABI from 'config/abi/Multicall.json'
import { getContract } from 'utils/web3'
import multicall from 'utils/multicall'
import { IazoFeeInfo, IazoTimeInfo, IazoStatus, Iazo, IazoTokenInfo } from 'state/types'
import BigNumber from 'bignumber.js'

// Not being used anymore, but keeping just in case we need to flip if the API goes down

const fetchIazoData = async (chainId: number, address: string): Promise<Iazo> => {
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const calls = [
    { address, name: 'FEE_INFO' },
    { address, name: 'IAZO_INFO' },
    { address, name: 'IAZO_TIME_INFO' },
    { address, name: 'STATUS' },
  ]
  const [feeInfo, iazoInfo, iazoTimeInfo, status] = await multicall(multicallContract, iazoAbi, calls)

  const baseTokenAddress = iazoInfo[2].toString()
  const iazoTokenAddress = iazoInfo[1].toString()

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
    totalSupply: iazoTokenTotalSupply.toString(),
  }

  return {
    iazoContractAddress: address,
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
    iazoState: null,
    timeInfo: iazoTimeInfoData,
    status: iazoStatusData,
    baseToken: baseTokenData,
    iazoToken: iazoTokenData,
  }
}

const fetchAllIazos = async (chainId: number): Promise<Iazo[]> => {
  const iazoExposerAddress = getIazoExposerAddress(chainId)
  const multicallContractAddress = getMulticallAddress(chainId)
  const multicallContract = getContract(multicallABI, multicallContractAddress, chainId)
  const amountOfIazos = await multicall(multicallContract, iazoExposerAbi, [
    { address: iazoExposerAddress, name: 'IAZOsLength' },
  ])
  const listOfIazoAddresses = await multicall(
    multicallContract,
    iazoExposerAbi,
    [...Array(new BigNumber(amountOfIazos).toNumber())].map((e, i) => {
      return { address: iazoExposerAddress, name: 'IAZOAtIndex', params: [i] }
    }),
  )

  return Promise.all(
    listOfIazoAddresses.map(async (address) => {
      return fetchIazoData(chainId, address[0])
    }),
  )
}

export default fetchAllIazos
