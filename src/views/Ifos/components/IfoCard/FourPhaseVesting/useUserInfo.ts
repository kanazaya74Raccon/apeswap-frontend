import { useState, useEffect } from 'react'
import ifoAbi from 'config/abi/ifo.json'
import multicallABI from 'config/abi/Multicall.json'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useRefresh from 'hooks/useRefresh'
import { getMulticallAddress } from 'utils/addressHelper'
import { useNetworkChainId } from 'state/hooks'
import multicall from 'utils/multicall'
import { Contract } from 'web3-eth-contract'
import { getContract } from 'utils/web3'
import useBlock from 'hooks/useBlock'
import { BSC_BLOCK_TIME } from 'config'

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
  const chainId = useNetworkChainId()
  const currentBlock = useBlock()
  const multicallAddress = getMulticallAddress(chainId)
  const { fastRefresh } = useRefresh()
  const { account } = useWeb3React()

  const [offeringTokenBalance, setOfferingTokenBalance] = useState(new BigNumber(0))
  const [userTokenStatus, setUserTokenStatus] = useState({
    stakeTokenHarvest: new BigNumber(0),
    offeringTokenHarvest: new BigNumber(0),
    offeringTokensVested: new BigNumber(0),
  })
  const [userInfo, setUserInfo] = useState({
    amount: new BigNumber(0),
    refunded: false,
    refundingAmount: new BigNumber(0),
  })
  const [userHarvestedFlags, setUserHarvestedFlags] = useState([true, true, true, true])
  const [harvestBlockReleases, setHarvestBlockReleases] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
  })

  useEffect(() => {
    const fetch = async () => {
      const multicallContract = getContract(multicallABI, multicallAddress, chainId)
      if (!address || !account) return

      const calls = [
        {
          address,
          name: 'getOfferingAmount',
          params: [account],
        },
        {
          address,
          name: 'getRefundingAmount',
          params: [account],
        },
        {
          address,
          name: 'userInfo',
          params: [account],
        },
        {
          address,
          name: 'userTokenStatus',
          params: [account],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 0],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 1],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 2],
        },
        {
          address,
          name: 'hasHarvested',
          params: [account, 3],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [0],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [1],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [2],
        },
        {
          address,
          name: 'harvestReleaseBlocks',
          params: [3],
        },
      ]

      try {
        const [
          balance,
          refundingAmount,
          userinfo,
          userTokens,
          harvestOneFlag,
          harvestTwoFlag,
          harvestThreeFlag,
          harvestFourFlag,
          harvestOneBlock,
          harvestTwoBlock,
          harvestThreeBlock,
          harvestFourBlock,
        ] = await multicall(multicallContract, ifoAbi, calls)

        setOfferingTokenBalance(new BigNumber(balance))

        // Get block release times in seconds
        setHarvestBlockReleases({
          one: (harvestOneBlock - currentBlock) * BSC_BLOCK_TIME,
          two: (harvestTwoBlock - currentBlock) * BSC_BLOCK_TIME,
          three: (harvestThreeBlock - currentBlock) * BSC_BLOCK_TIME,
          four: (harvestFourBlock - currentBlock) * BSC_BLOCK_TIME,
        })

        setUserHarvestedFlags([harvestOneFlag[0], harvestTwoFlag[0], harvestThreeFlag[0], harvestFourFlag[0]])

        setUserTokenStatus(userTokens)
        setUserInfo({
          amount: new BigNumber(userinfo.amount || 0),
          refunded: userinfo.refunded,
          refundingAmount: new BigNumber(refundingAmount || 0),
        })
      } catch (e) {
        console.error('Multicall error', e, { address, account, chainId, multicallAddress })
      }
    }

    if (address && account) {
      fetch()
    }
  }, [account, contract, address, refetch, fastRefresh, multicallAddress, chainId, tokenDecimals, currentBlock])

  return {
    userTokenStatus,
    userInfo,
    harvestBlockReleases,
    userHarvestedFlags,
    offeringTokenBalance,
  }
}

export default useUserInfo
