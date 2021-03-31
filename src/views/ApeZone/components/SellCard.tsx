import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, CardBody, Button } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useGoldenBanana, useTreasury } from 'hooks/useContract'
import { useSellGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { ethers } from 'ethers'
import TokenInput from 'components/TokenInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBananaAddress, getGoldenBananaAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import CardValue from 'views/Home/components/CardValue'

const SellCard = ({ account }) => {
  const [val, setVal] = useState('1')
  const [processing, setProcessing] = useState(false)
  const treasuryContract = useTreasury()
  const { handleSell } = useSellGoldenBanana()
  const goldenBananaBalance = useTokenBalance(getGoldenBananaAddress())
  const bananaBalance = getBalanceNumber(useTokenBalance(getBananaAddress()), 18)

  const { toastSuccess } = useToast()
  const goldenBananaContract = useGoldenBanana()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(goldenBananaBalance)
  }, [goldenBananaBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const sell = useCallback(async () => {
    try {
      setProcessing(true)
      await handleSell(val)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
      console.error(e)
    }
  }, [handleSell, val])

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  const { isApproving, isApproved, handleApprove } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await goldenBananaContract.methods
          .allowance(loadedAccount, treasuryContract.options.address)
          .call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        console.error(error)
        return false
      }
    },
    onApprove: () => {
      return goldenBananaContract.methods
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
          Sell
        </Heading>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol="GNANA"
        />
        {isApproved ? (
          <Button disabled={processing} variant="danger" fullWidth margin="10px" onClick={sell}>
            Sell
          </Button>
        ) : (
          <Button mt="8px" fullWidth disabled={isApproving} onClick={handleApprove}>
            Approve Contract
          </Button>
        )}
        <CardValue fontSize="26px" decimals={4} value={bananaBalance} prefix="BANANA" />
      </CardBody>
    </Card>
  )
}

export default SellCard
