import React, { useEffect } from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import useI18n from 'hooks/useI18n'
import { usePendingUsd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/farms'
import { useMasterChefAddress } from 'hooks/useAddress'
import { useMulticallContract } from 'hooks/useContract'
import CardValue from '../CardValue'

const BananaHarvestUsdBalance = () => {
  const TranslateString = useI18n()
  const { account, chainId } = useWeb3React()
  const { pending } = usePendingUsd()
  const { slowRefresh } = useRefresh()
  const multicallContract = useMulticallContract()
  const masterChefAddress = useMasterChefAddress()
  const dispatch = useDispatch()

  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(multicallContract, masterChefAddress, chainId, account))
    }
  }, [account, dispatch, slowRefresh, multicallContract, masterChefAddress, chainId])

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '60px', fontWeight: 700 }} fontFamily="poppins">
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <CardValue
      decimals={2}
      value={pending}
      prefix="~$"
      fontSize="12px"
      color="#38A611"
      text="poppins"
      fontWeight={700}
    />
  )
}

export default BananaHarvestUsdBalance
