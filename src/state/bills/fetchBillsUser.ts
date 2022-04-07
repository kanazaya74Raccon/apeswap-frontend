import bills from 'config/constants/bills'
import erc20ABI from 'config/abi/erc20.json'
import billAbi from 'config/abi/bill.json'
import multicall from 'utils/multicall'
import BigNumber from 'bignumber.js'
import getBillNftData from './getBillNftData'

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

export const fetchUserOwnedBillNftData = async (ids: string[]) => {
  const billNftData = ids?.map(async (id) => {
    return { id, data: await getBillNftData(id) }
  })
  return Promise.all(billNftData)
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
  const pendingRewardsCall = await multicall(chainId, billAbi, billsPendingRewardCall)
  const ids = billDataCalls.map((b) => {
    return b.params[0].toString()
  })
  const billNftData = await fetchUserOwnedBillNftData(ids)
  console.log(billNftData)

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
