import React, { useCallback, useMemo, useState } from 'react'
import { Heading, Card, Text, Button, Flex, Checkbox } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

import { getFullDisplayBalance } from 'utils/formatBalance'
import useApproveTransaction from 'hooks/useApproveTransaction'
import { useGoldenBanana, useTreasury } from 'hooks/useContract'
import { useSellGoldenBanana } from 'hooks/useGoldenBanana'
import { useToast } from 'state/hooks'
import { useGoldenBananaAddress } from 'hooks/useAddress'
import useTokenBalance from 'hooks/useTokenBalance'

import TokenInput from 'components/TokenInput'
import CardValue from 'views/Home/components/CardValue'

interface ReturnCardType {
  fromToken: string
  toToken: string
}

const StyledCard = styled(Card)`
  overflow: visible;
  border-radius: 10px;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  padding: 10px;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-top: 0px;
    margin-left: 10px;
  }
`
const HeaderCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
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
  border-radius: 10px;
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
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: unset;
    visibility: hidden;
  }
`

const FlexSection = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.sm} {
    height: 120px;
  }
`

const ReturnCard: React.FC<ReturnCardType> = ({ fromToken, toToken }) => {
  const [val, setVal] = useState('1')
  const [processing, setProcessing] = useState(false)
  const treasuryContract = useTreasury()
  const { toastSuccess } = useToast()
  const { account } = useWeb3React()
  const valBanana = parseFloat(val) * 0.98
  const { handleSell } = useSellGoldenBanana()
  const goldenBananaBalance = useTokenBalance(useGoldenBananaAddress())
  const goldenBananaContract = useGoldenBanana()

  const { isApproving, isApproved, handleApprove } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await goldenBananaContract.methods
          .allowance(loadedAccount, treasuryContract.options.address)
          .call()
        const currentAllowance = new BigNumber(response)
        return currentAllowance.gt(0)
      } catch (error) {
        console.warn(error)
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
      console.warn(e)
    }
  }, [handleSell, val])

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBalance)

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <StyledCard>
      <HeaderCard>
        <Header>RETURN</Header>
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
          <StyledButton disabled={disabled} variant="danger" margin="10px" onClick={sell}>
            RETURN
          </StyledButton>
        ) : (
          <StyledButton margin="10px" disabled={isApproving} onClick={handleApprove}>
            APPROVE CONTRACT
          </StyledButton>
        )}

        <FlexSection flexDirection="column" alignItems="center" mb="10px">
          <CardValue
            top="10px"
            fontWeight={700}
            fontSize="16px"
            decimals={4}
            value={valBanana}
            prefix={`OUTPUT ${toToken}`}
          />

          <Text fontSize="12px" fontWeight={500}>
            *After 2% reflect fees
          </Text>

          <CheckBoxSection>
            <NewCheckBox id="checkbox" scale="md" />
            <StyledText fontSize="12px" fontWeight={500}>
              I understand what I am doing and want to enable unlimited buy.
            </StyledText>
          </CheckBoxSection>
        </FlexSection>
      </ContentCard>
    </StyledCard>
  )
}

export default React.memo(ReturnCard)
