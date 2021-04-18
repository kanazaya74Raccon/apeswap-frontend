import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, CardBody, Button, Text, BananaIcon, BananaPairIcon, Flex } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { ethers } from 'ethers'
import TokenInput from 'components/TokenInput'
import useTokenBalance from 'hooks/useTokenBalance'
import styled from 'styled-components'
import { getBananaAddress, getGoldenBananaAddress } from 'utils/addressHelpers'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'
import CardValue from 'views/Home/components/CardValue'

const StyledCard = styled(Card)`
  overflow: visible;
`

const StyledBanana = styled(BananaIcon)`
  width: 100px;
  position: absolute;
  right: -15px;
  bottom: -25px;
  z-index: 100;
  transform: rotate(-50deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
`

const StyledBananaPair = styled(BananaPairIcon)`
  width: 80px;
  position: absolute;
  left: -20px;
  bottom: -10px;
  z-index: 100;
  transform: rotate(80deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
`

const StyledButton = styled(Button)`
  background: #ffb300;
  border-radius: 10px;
  box-shadow: none;
  margin-left: 0px;
`

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
    <StyledCard>
      <CardBody>
        <StyledBanana />
        <StyledBananaPair />
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
          <StyledButton disabled={processing} variant="success" fullWidth margin="10px" onClick={buy}>
            BUY
          </StyledButton>
        ) : (
          <StyledButton margin="10px" fullWidth disabled={isApproving} onClick={handleApprove}>
            APPROVE CONTRACT
          </StyledButton>
        )}
        <Flex flexDirection="column" alignItems="center">
          <CardValue fontSize="13px" decimals={4} value={goldenBananaBalance} prefix="GNANA" fontFamily="poppins"/>
          <Text fontSize="11px" fontFamily="poppins">* Current max buy is {MAX_BUY} at a time</Text>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default BuyCard
