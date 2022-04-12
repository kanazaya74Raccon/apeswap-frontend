import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useTokenPrices } from 'state/hooks'
import { Bills, State } from 'state/types'
import { fetchBillsPublicDataAsync, fetchBillsUserDataAsync, fetchUserOwnedBillsDataAsync } from '.'

export const usePollBills = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { tokenPrices } = useTokenPrices()
  useEffect(() => {
    dispatch(fetchBillsPublicDataAsync(chainId, tokenPrices))
  }, [dispatch, tokenPrices, chainId])
}

export const usePollUserBills = (): Bills[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  useEffect(() => {
    if (account) {
      dispatch(fetchBillsUserDataAsync(chainId, account))
      dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  const bills = useSelector((state: State) => state.bills.data)
  return bills
}

export const useBills = (): Bills[] => {
  const bills = useSelector((state: State) => state.bills.data)
  return bills
}
