import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Text, Checkbox } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import BigNumber from 'bignumber.js'
import TokenInput from './TokenInput'
import { TokenSaleDetails, ExtendedERC20Details } from '../types'

interface PresaleDataProps {
  pairTokenDetails: ExtendedERC20Details
  onChange?: (presaleDetails: TokenSaleDetails) => void
}

const LaunchPadInfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 524px;
  width: 686px;
  border-radius: 10px;
  background: #414141;
  margin-bottom: 30px;
  align-items: space-between;
  justify-content: center;
  padding: 10px;
`
const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 22px;
  line-height: 27px;
  margin-top: 15px;
`

const CheckboxContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`

const FooterContainer = styled.div`
  display: flex;
  width: 450px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
  font-weight: 400;
  margin-left: 15px;
`

const PresaleDetails: React.FC<PresaleDataProps> = ({ pairTokenDetails, onChange }) => {
  const { tokenSymbol, quoteToken, userBalance, tokenDecimals } = pairTokenDetails
  const [tokenDetails, setTokenDetails] = useState<TokenSaleDetails>()
  const balance = getBalanceNumber(new BigNumber(userBalance), tokenDecimals)

  useEffect(() => {
    onChange(tokenDetails)
  }, [tokenDetails, onChange])

  return (
    <>
      <LaunchPadInfoWrapper>
        <StyledHeader>How many {tokenSymbol} are up for presale?</StyledHeader>
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, tokensForSale: e.currentTarget.value })}
          size="xl"
          tokenSymbol={tokenSymbol}
          userBalance={balance}
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, pricePerToken: e.currentTarget.value })}
          title={`Price of 1 ${tokenSymbol}`}
          mr="12.5px"
          quoteTokenSymbol={quoteToken}
          size="md"
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, limitPerUser: e.currentTarget.value })}
          title={`${quoteToken} limit per user`}
          quoteTokenSymbol={quoteToken}
          ml="12.5px"
          size="md"
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          onChange={(e) => setTokenDetails({ ...tokenDetails, softcap: e.currentTarget.value })}
          title="Softcap"
          quoteTokenSymbol={quoteToken}
          mr="12.5px"
          size="md"
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <TokenInput
          defaultVal={(parseFloat(tokenDetails?.tokensForSale) * parseFloat(tokenDetails?.pricePerToken)).toString()}
          title="Hardcap"
          ml="12.5px"
          size="md"
          disabled
          quoteTokenSymbol={quoteToken}
          backgroundColor="rgba(51, 51, 51, 1)"
        />
        <FooterContainer>
          <CheckboxContainer>
            <Checkbox
              checked={tokenDetails?.burnRemains}
              onChange={() => setTokenDetails({ ...tokenDetails, burnRemains: !tokenDetails?.burnRemains })}
            />
          </CheckboxContainer>
          <StyledText>
            If softcap is met, but hardcap is not, burn the remaining tokens allocated to the token sale.
          </StyledText>
        </FooterContainer>
      </LaunchPadInfoWrapper>
    </>
  )
}

export default React.memo(PresaleDetails)
