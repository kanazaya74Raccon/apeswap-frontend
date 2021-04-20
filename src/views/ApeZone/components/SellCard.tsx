import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, CardBody, Button, BananaGoldenIcon, BananaGoldenPairIcon , Flex } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useGoldenBanana, useTreasury } from 'hooks/useContract'
import { useSellGoldenBanana } from 'hooks/useGoldenBanana'
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

const StyledBanana = styled(BananaGoldenIcon)`
  width: 70px;
  position: absolute;
  top: -20px;
  left: -10px;
  z-index: 100;
  transform: rotate(180deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 110px;
    top: -30px;
    left: -20px;
  }
`

const StyledBananaPair = styled(BananaGoldenPairIcon)`
  width: 60px;
  position: absolute;
  right: -5px;
  bottom: -5px;
  z-index: 100;
  transform: rotate(0deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100px;
    right: -10px;
    bottom: -5px;
  }
`

const StyledButton = styled(Button)`
  background: #ffb300;
  border-radius: 10px;
  box-shadow: none;
  margin-left: 0px;
`

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
      toastSuccess('Approved!')
    },
  })

  return (
    <StyledCard>
      <CardBody>
        <StyledBanana />
        <StyledBananaPair />
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
          <StyledButton disabled={processing} variant="danger" fullWidth margin="10px" onClick={sell}>
            SELL
          </StyledButton>
        ) : (
          <StyledButton mt="8px" fullWidth disabled={isApproving} onClick={handleApprove}>
            APPROVE CONTRACT
          </StyledButton>
        )}
      </CardBody>
      <Flex justifyContent="center" mb="10px">
        <CardValue fontSize="13px" decimals={4} value={bananaBalance} prefix="BANANA" fontFamily="poppins" />
      </Flex>
    </StyledCard>
  )
}

export default SellCard
