import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, Text, Button, Flex, Checkbox } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

import { getFullDisplayBalance } from 'utils/formatBalance'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useBanana, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { useBananaAddress } from 'hooks/useAddress'
import useTokenBalance from 'hooks/useTokenBalance'

import TokenInput from 'components/TokenInput'
import CardValue from 'views/Home/components/CardValue'

interface ConvertCardType {
  fromToken: string
  toToken: string
}

const StyledCard = styled(Card)`
  overflow: visible;
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  padding: 10px;
`
const HeaderCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  padding-top: 10px;
  padding-bottom: 5px;
`
const Header = styled(Heading)`
  font-size: 25px;
  font-weight: 700;
  text-transform: uppercase;
`
const TokensDisplay = styled(Text)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.yellow};
  text-transform: uppercase;
`
const ContentCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  margin-top: 10px;
  padding: 10px;
`
const StyledButton = styled(Button)`
  background: #ffb300;
  border-radius: 10px;
  box-shadow: none;
  text-transform: uppercase;
  margin-top: 15px;
`
const StyledText = styled(Text)`
  z-index: 199;
  margin-left: 10px;
`

const NewCheckBox = styled(Checkbox)`
  background: #fff;
  width: 50px;
  height: 40px;
`

const CheckBoxSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`

const ConvertCard: React.FC<ConvertCardType> = ({ fromToken, toToken }) => {
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

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bananaBalance)
  }, [bananaBalance])

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

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBalance)

  const displayMax = unlimited ? 'unlimited' : MAX_BUY

  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBalance) < MAX_BUY || unlimited ? fullBalance : MAX_BUY
    setVal(max.toString())
  }, [fullBalance, unlimited, setVal])

  const handleCheckBox = useCallback(() => {
    setUnlimited(!unlimited)
    if (unlimited) setVal('1')
  }, [unlimited, setUnlimited])

  return (
    <StyledCard>
      <HeaderCard>
        <Header>CONVERT</Header>
        <TokensDisplay>
          {fromToken} &gt; {toToken}
        </TokensDisplay>
      </HeaderCard>

      <ContentCard>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol={fromToken}
        />
        {isApproved ? (
          <StyledButton disabled={disabled} variant="success" margin="10px" onClick={buy}>
            CONVERT
          </StyledButton>
        ) : (
          <StyledButton margin="10px" disabled={isApproving} onClick={handleApprove}>
            APPROVE CONTRACT
          </StyledButton>
        )}

        <Flex flexDirection="column" alignItems="center" mb="10px">
          <CardValue
            top="10px"
            fontWeight={700}
            fontSize="16px"
            decimals={4}
            value={gnanaVal}
            prefix={`OUTPUT ${toToken}`}
          />

          <Text fontSize="12px" fontWeight={500}>
            *Current max buy is {displayMax}
          </Text>

          <CheckBoxSection>
            <NewCheckBox id="checkbox" scale="md" checked={unlimited} onChange={handleCheckBox} />
            <StyledText fontSize="12px" fontWeight={500}>
              I understand what I am doing and want to enable unlimited buy.
            </StyledText>
          </CheckBoxSection>
        </Flex>
      </ContentCard>
    </StyledCard>
  )
}

export default React.memo(ConvertCard)
