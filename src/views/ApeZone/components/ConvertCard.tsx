import React, { useCallback, useMemo, useState } from 'react'
import { Text, Checkbox } from '@apeswapfinance/uikit'
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

import {
  FlexSection,
  CheckBoxCon,
  CBS,
  HeaderCard,
  Header,
  TokensDisplay,
  ContentCard,
  StyledButton,
  StyledText,
  StyledCard,
} from './styles'

interface ConvertCardType {
  fromToken: string
  toToken: string
}

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

  const { isApproving, isApproved, handleApprove } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await bananaContract.allowance(loadedAccount, treasuryContract.address)
        const currentAllowance = new BigNumber(response.toString())
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return bananaContract.approve(treasuryContract.address, ethers.constants.MaxUint256).then((trx) => trx.wait())
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

        <FlexSection flexDirection="column" alignItems="center" mb="10px">
          <CardValue
            top="10px"
            fontWeight={700}
            fontSize="16px"
            decimals={4}
            value={gnanaVal}
            prefix={`OUTPUT ${toToken}`}
          />

          <Text fontSize="12px" fontWeight={500}>
            *Current max conversion is {displayMax}
          </Text>

          <CBS>
            <CheckBoxCon>
              <Checkbox id="checkbox" scale="md" checked={unlimited} onChange={handleCheckBox} />
            </CheckBoxCon>
            <StyledText fontSize="12px" fontWeight={500}>
              I understand what I am doing and want to enable unlimited conversion.
            </StyledText>
          </CBS>
        </FlexSection>
      </ContentCard>
    </StyledCard>
  )
}

export default React.memo(ConvertCard)
