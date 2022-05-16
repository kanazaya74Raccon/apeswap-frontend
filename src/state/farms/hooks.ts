import BigNumber from 'bignumber.js'
import { CHAIN_ID } from 'config/constants/chains'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useFarmLpAprs, useLpTokenPrices, usePriceBananaBusd } from 'state/hooks'
import { Farm, FarmsState, State } from 'state/types'
import { fetchFarmsPublicDataAsync, fetchFarmUserDataAsync } from '.'

export const usePollFarms = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { lpTokenPrices } = useLpTokenPrices()
  // Made a string because hooks will refresh bignumbers
  const bananaPrice = usePriceBananaBusd().toString()
  const farmLpAprs = useFarmLpAprs()

  useEffect(() => {
    const fetchFarms = () => {
      if (chainId === CHAIN_ID.BSC) {
        dispatch(fetchFarmsPublicDataAsync(chainId, lpTokenPrices, new BigNumber(bananaPrice), farmLpAprs))
      }
    }
    fetchFarms()
  }, [dispatch, chainId, lpTokenPrices, bananaPrice, farmLpAprs])
}

export const useFarms = (account): Farm[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    if (account && (chainId === CHAIN_ID.BSC || chainId === CHAIN_ID.BSC_TESTNET)) {
      dispatch(fetchFarmUserDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm?.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm?.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm?.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm?.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

export const useFarmTags = () => {
  const { tags }: FarmsState = useSelector((state: State) => state.farms)
  console.log('hooks-farm-tags:::', tags)

  return { farmTags: tags }
}


// setFarmTagsAsync - Suppose to make a call with the chainId

// or better yet ->

// const tagResult = farmTagsResult.data

// [chainId].tags

// Then in the component (pass in the chainId like this):

// tagResult[chainId].farms
