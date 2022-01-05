import React, { useCallback, useMemo, useState } from 'react'
import {
  Heading,
  Card,
  CardBody,
  Button,
  Text,
  BananaGoldenIcon,
  BananaGoldenPairIcon,
  Flex,
  Checkbox,
} from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { ethers } from 'ethers'
import TokenInput from 'components/TokenInput'
import useTokenBalance from 'hooks/useTokenBalance'
import { useBananaAddress } from 'hooks/useAddress'
import styled from 'styled-components'
import { getFullDisplayBalance } from 'utils/formatBalance'
import CardValue from 'views/Home/components/CardValue'
import { useWeb3React } from '@web3-react/core'

const StyledCard = styled(Card)`
  overflow: visible;
`

const StyledBanana = styled(BananaGoldenIcon)`
  width: 60px;
  position: absolute;
  right: -5px;
  bottom: -15px;
  z-index: 100;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100px;
    right: -15px;
    bottom: -25px;
  }
`

const StyledBananaPair = styled(BananaGoldenPairIcon)`
  width: 60px;
  position: absolute;
  left: -15px;
  bottom: -5px;
  z-index: 100;
  transform: rotate(80deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 80px;
    left: -20px;
    bottom: -10px;
  }
`
const StyledText = styled(Text)`
  z-index: 199;
`
const StyledButton = styled(Button)`
  background: #ffb300;
  border-radius: 10px;
  box-shadow: none;
  margin-left: 0px;
`

const BuyCard = () => {
  const MAX_BUY = 50
  const [val, setVal] = useState('1')
  const [unlimited, setUnlimited] = useState(false)
  const gnanaVal = parseFloat(val) * 0.7
  const [processing, setProcessing] = useState(false)
  const treasuryContract = useTreasury()
  const { handleBuy } = useBuyGoldenBanana()
  const bananaBalance = useTokenBalance(useBananaAddress())
  const { toastSuccess } = useToast()
  const bananaContract = useBanana()
  const { account } = useWeb3React()

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bananaBalance)
  }, [bananaBalance])

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBalance)
  const displayMax = unlimited ? 'unlimited' : MAX_BUY

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (!unlimited && parseInt(e.currentTarget.value) > MAX_BUY) return
      setVal(e.currentTarget.value)
    },
    [setVal, unlimited],
  )

  const buy = useCallback(async () => {
    try {
      setProcessing(true)
      await handleBuy(val)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
      console.warn(e)
    }
  }, [handleBuy, val])

  const handleCheckbox = useCallback(() => {
    setUnlimited(!unlimited)
    if (unlimited) setVal('1')
  }, [unlimited, setUnlimited])

  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBalance) < MAX_BUY || unlimited ? fullBalance : MAX_BUY
    setVal(max.toString())
  }, [fullBalance, unlimited, setVal])

  const { isApproving, isApproved, handleApprove } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await bananaContract.methods.allowance(loadedAccount, treasuryContract.options.address).call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        console.warn(error)
        return false
      }
    },
    onApprove: () => {
      return bananaContract.methods
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
        <Heading color="contrast" size="xl" fontFamily="Titan One">
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
          <StyledButton disabled={disabled} variant="success" fullWidth margin="10px" onClick={buy}>
            BUY
          </StyledButton>
        ) : (
          <StyledButton margin="10px" fullWidth disabled={isApproving} onClick={handleApprove}>
            APPROVE CONTRACT
          </StyledButton>
        )}
        <Flex flexDirection="column" alignItems="center" mb="10px">
          <CardValue fontSize="13px" decimals={4} value={gnanaVal} prefix="OUTPUT GNANA" fontFamily="Titan One" />
          <Text fontSize="11px">* Current max buy is {displayMax}</Text>
          <StyledText fontSize="11px" fontFamily="Titan One">
            <Checkbox id="checkbox" scale="sm" checked={unlimited} onChange={handleCheckbox} />I understand that each GNANA token transfer costs 2% and want to enable unlimited buy.
          </StyledText>
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default React.memo(BuyCard)
