import { useState, useEffect } from 'react'
import ifoLinearAbi from 'config/abi/ifoLinear.json'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import multicall from 'utils/multicall'
import { getBalanceNumber } from 'utils/formatBalance'
import { Contract } from 'ethers'

export interface Props {
  address: string
  currency: string
  currencyAddress: string
  contract: Contract
  tokenDecimals: number
  notLp?: boolean
  refetch?: boolean
}

function useUserInfo(contract: Contract, tokenDecimals: number, address: string, refetch?: boolean) {
  const [userTokenStatus, setUserTokenStatus] = useState({
    stakeTokenHarvest: 0,
    offeringTokenTotalHarvest: 0,
    offeringTokenInitialHarvest: 0,
    offeringTokensVested: 0,
    offeringTokenVestedHarvest: 0,
  })
  const [userInfo, setUserInfo] = useState({
    amount: 0,
    refundingAmount: 0,
    offeringAmount: 0,
    refunded: false,
    hasHarvestedInitial: false,
    lastBlockHarvested: 0,
    offeringTokensClaimed: 0,
  })
  const { fastRefresh } = useRefresh()
  const { account, chainId } = useActiveWeb3React()

  useEffect(() => {
    const fetch = async () => {

      const calls = [
        {
          address,
          name: 'userTokenStatus',
          params: [account],
        },
        {
          address,
          name: 'userInfo',
          params: [account],
        },
        {
          address,
          name: 'getRefundingAmount',
          params: [account],
        },
        {
          address,
          name: 'getOfferingAmount',
          params: [account],
        },
      ]

      try {
        const [userTokens, userInfos, refundingAmount, offeringAmount] = await multicall(
          chainId,
          ifoLinearAbi,
          calls,
        )
        setUserTokenStatus({
          stakeTokenHarvest: getBalanceNumber(new BigNumber(userTokens?.stakeTokenHarvest.toString()), tokenDecimals),
          offeringTokenTotalHarvest: getBalanceNumber(
            new BigNumber(userTokens?.offeringTokenTotalHarvest?.toString()),
            tokenDecimals,
          ),
          offeringTokenInitialHarvest: getBalanceNumber(
            new BigNumber(userTokens?.offeringTokenInitialHarvest?.toString()),
            tokenDecimals,
          ),
          offeringTokenVestedHarvest: getBalanceNumber(
            new BigNumber(userTokens?.offeringTokenVestedHarvest?.toString()),
            tokenDecimals,
          ),
          offeringTokensVested: getBalanceNumber(
            new BigNumber(userTokens?.offeringTokensVested?.toString()),
            tokenDecimals,
          ),
        })
        setUserInfo({
          amount: getBalanceNumber(new BigNumber(userInfos?.amount.toString())),
          refundingAmount: getBalanceNumber(new BigNumber(refundingAmount.toString())),
          offeringAmount: getBalanceNumber(new BigNumber(offeringAmount.toString()), tokenDecimals),
          offeringTokensClaimed: getBalanceNumber(
            new BigNumber(userInfos?.offeringTokensClaimed?.toString()),
            tokenDecimals,
          ),
          lastBlockHarvested: new BigNumber(userInfos?.offeringTokenInitialHarvest?.toString()).toNumber(),
          refunded: userInfos?.refunded,
          hasHarvestedInitial: userInfos?.hasHarvestedInitial,
        })
      } catch (e) {
        console.error('Multicall error', e, { address, account, chainId })
      }
    }

    if (address && account) {
      fetch()
    }
  }, [account, contract, address, refetch, fastRefresh, chainId, tokenDecimals])

  return {
    userTokenStatus,
    userInfo,
  }
}

export default useUserInfo
