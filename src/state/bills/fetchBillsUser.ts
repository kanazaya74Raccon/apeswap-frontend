import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import masterChefABI from 'config/abi/masterchef.json'
import bills from 'config/constants/bills'
import erc20ABI from 'config/abi/erc20.json'
import billAbi from 'config/abi/bill.json'
import { QuoteToken } from 'config/constants/types'
import { getMasterChefAddress } from 'utils/addressHelper'
import { getContract } from 'utils/getContract'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import getProvider from 'utils/getProvider'

export const fetchBillsAllowance = async (chainId: number, account) => {
  const calls = bills.map((b) => ({
    address: b.lpToken.address[chainId],
    name: 'allowance',
    params: [account, b.contractAddress[chainId]],
  }))
  const allowances = await multicall(chainId, erc20ABI, calls)
  return bills.reduce((acc, bill, index) => ({ ...acc, [bill.index]: new BigNumber(allowances[index]).toString() }), {})
}

export const fetchUserBalances = async (chainId: number, account) => {
  const calls = bills.map((b) => ({
    address: b.lpToken.address[chainId],
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(chainId, erc20ABI, calls)
  const tokenBalances = bills.reduce(
    (acc, bill, index) => ({ ...acc, [bill.index]: new BigNumber(tokenBalancesRaw[index]).toString() }),
    {},
  )

  return tokenBalances
}

export const fetchUserOwnedBills = async (chainId: number, account: string) => {
  const billIdCalls = bills.map((b) => ({
    address: b.contractAddress[chainId],
    name: 'getBillIds',
    params: [account],
  }))
  const billIds = await multicall(chainId, billAbi, billIdCalls)
  const billsPendingRewardCall = []
  const billDataCalls = []
  billIds.map((idArray, index) =>
    idArray[0].map(
      (id: BigNumber) =>
        id.gt(0) &&
        (billDataCalls.push({ address: bills[index].contractAddress[chainId], name: 'billInfo', params: [id] }),
        billsPendingRewardCall.push({
          address: bills[index].contractAddress[chainId],
          name: 'pendingPayoutFor',
          params: [id],
        })),
    ),
  )

  const billData = await multicall(chainId, billAbi, billDataCalls)
  console.log(billData)
  const pendingRewardsCall = await multicall(chainId, billAbi, billsPendingRewardCall)
  console.log(pendingRewardsCall)

  return billDataCalls.map((b, index) => {
    return {
      address: b.address,
      id: b.params[0].toString(),
      payout: billData[index][0].toString(),
      vesting: billData[index][1].toString(),
      lastBlockTimestamp: billData[index][2].toString(),
      truePricePaid: billData[index][3].toString(),
      pendingRewards: pendingRewardsCall[index][0].toString(),
    }
  })
}

// export const fetchUserStakeBalances = async (chainId: number, account) => {
//   const masterChefAddress = getMasterChefAddress(chainId)
//   const masterChefContract = getContract(masterChefABI, masterChefAddress, chainId)
//   const calls = nonMasterPools.map((p) => ({
//     address: p.contractAddress[chainId],
//     name: 'userInfo',
//     params: [account],
//   }))
//   const userInfo = await multicall(chainId, sousChefABI, calls)
//   const stakedBalances = nonMasterPools.reduce(
//     (acc, pool, index) => ({
//       ...acc,
//       [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
//     }),
//     {},
//   )

//   const { amount: masterPoolAmount } = await masterChefContract.userInfo('0', account)

//   return { ...stakedBalances, 0: new BigNumber(masterPoolAmount.toString()).toJSON() }
// }

// export const fetchUserPendingRewards = async (chainId: number, account) => {
//   const masterChefAddress = getMasterChefAddress(chainId)
//   const masterChefContract = getContract(masterChefABI, masterChefAddress, chainId)
//   const calls = nonMasterPools.map((p) => ({
//     address: p.contractAddress[chainId],
//     name: 'pendingReward',
//     params: [account],
//   }))
//   const res = await multicall(chainId, sousChefABI, calls)
//   const pendingRewards = nonMasterPools.reduce(
//     (acc, pool, index) => ({
//       ...acc,
//       [pool.sousId]: new BigNumber(res[index]).toJSON(),
//     }),
//     {},
//   )

//   const pendingReward = await masterChefContract.pendingCake('0', account)

//   return { ...pendingRewards, 0: new BigNumber(pendingReward.toString()).toJSON() }
// }
