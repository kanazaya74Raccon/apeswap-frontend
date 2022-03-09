import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useRefresh from 'hooks/useRefresh'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { useTokenPrices } from 'state/hooks'
import { Bills, State } from 'state/types'
import { fetchBillsPublicDataAsync } from '.'
import fetchBills from './fetchBills'

export const usePollBills = () => {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const { tokenPrices } = useTokenPrices()
  useEffect(() => {
    const getBills = () => {
      fetchBillsPublicDataAsync(chainId, tokenPrices)
    }
    getBills()
  }, [dispatch, tokenPrices, chainId])
}

export const useBills = (account): Bills[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    dispatch(fetchBillsPublicDataAsync(chainId, account))
  }, [account, dispatch, slowRefresh, chainId])
  const bills = useSelector((state: State) => state.bills.data)
  return bills
}
