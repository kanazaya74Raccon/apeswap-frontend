import { Interface } from '@ethersproject/abi'
import { multicallDynamicAbi } from '@defifofum/multicall'
import multicallABI from 'config/abi/Multicall.json'
import { ethers } from 'ethers'
import { getMulticallAddress } from './addressHelper'
import getProvider from './getProvider'

interface Call {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
}

const multicall = async (chainId: number, abi: any[], calls: Call[]) => {
  const multicallAddress = getMulticallAddress(chainId)
  const provider = getProvider(chainId)
  const multi = new ethers.Contract(multicallAddress, multicallABI, provider)
  const itf = new Interface(abi)
  const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
  const { returnData } = await multi.aggregate(calldata)
  const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call))
  return res
}

// interface DynamicCall extends Call {

// }

export const dynamicMulticall = async (chainId: number, abis: any[], calls: Call[]) => {
  const provider = getProvider(chainId)
  const itf = new Interface(abis)
  const callData = calls.map((call) => {
    return { ...call, functionName: call.name, abi: [abis.find((item) => item.name === call.name)] }
  })
  const returnData = await multicallDynamicAbi('https://bsc-dataseed.binance.org/', callData)
  console.log(returnData)
}

export default multicall
