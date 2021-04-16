import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, CardBody, Button, Text } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { ethers } from 'ethers'
import TokenInput from 'components/TokenInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBananaAddress, getGoldenBananaAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import CardValue from 'views/Home/components/CardValue'

const BuyCard = ({ account }) => {
  const MAX_BUY = 50
  const [val, setVal] = useState('1')
  const [processing, setProcessing] = useState(false)
  const treasuryContract = useTreasury()
  const { handleBuy } = useBuyGoldenBanana()
  const bananaBalance = useTokenBalance(getBananaAddress())
  const goldenBananaBalance = getBalanceNumber(useTokenBalance(getGoldenBananaAddress()), 18)

  const { toastSuccess } = useToast()
  const bananaContract = useBanana()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bananaBalance)
  }, [bananaBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (parseInt(e.currentTarget.value) > MAX_BUY) return
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const buy = useCallback(async () => {
    try {
      setProcessing(true)
      await handleBuy(val)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
      console.error(e)
    }
  }, [handleBuy, val])

  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBalance) < MAX_BUY ? fullBalance : MAX_BUY
    setVal(max.toString())
  }, [fullBalance, setVal])

  const { isApproving, isApproved, handleApprove } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await bananaContract.methods.allowance(loadedAccount, treasuryContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        console.error(error)
        return false
      }
    },
    onApprove: () => {
      return bananaContract.methods
        .approve(treasuryContract.options.address, ethers.constants.MaxUint256)
        .send({ from: account })
    },
    onSuccess: async () => {
      toastSuccess('Profile created!')
    },
  })
  return (
    <Card>
      <CardBody>
        <Heading color="contrast" size="xl">
          Buy
        </Heading>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol="BANANA"
        />
        {isApproved ? (
          <Button disabled={processing} variant="success" fullWidth margin="10px" onClick={buy}>
            Buy
          </Button>
        ) : (
          <Button margin="10px" fullWidth disabled={isApproving} onClick={handleApprove}>
            Approve Contract
          </Button>
        )}
        <CardValue fontSize="26px" decimals={4} value={goldenBananaBalance} prefix="GNANA" />
        <Text fontSize="11px">* Current max buy is {MAX_BUY} at a time</Text>
      </CardBody>
    </Card>
  )
}

export default BuyCard
