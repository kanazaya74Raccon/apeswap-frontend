import React, { useState, useCallback, useEffect } from 'react'
import { useMatchBreakpoints, Text } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import TextInput from 'components/TextInput'
import useERC20Details from 'hooks/useERC20Details'
import { useToast } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import TokenDropdown from './TokenDropdown'
import { ExtendedERC20Details } from '../types'
import { PairCreationWrapper, PresaleInfoContainer, StyledText, PairContainer, StyledDescription } from './styles'

interface PairCreationProps {
  onChange: (pairCreation: ExtendedERC20Details) => void
}

const PairCreation: React.FC<PairCreationProps> = ({ onChange }) => {
  const tokenList = ['WBNB', 'BUSD']
  const [selectedToken, setSelectedToken] = useState<ExtendedERC20Details>({
    userBalance: null,
    tokenSymbol: null,
    totalSupply: null,
    tokenDecimals: null,
    tokenAddress: null,
    quoteToken: tokenList[0],
  })
  const { isMd, isSm, isXs } = useMatchBreakpoints()
  const isMobile = isMd || isSm || isXs
  const [tokenApproved, setTokenApproved] = useState(false)
  const [loadingTokenData, setLoadingTokenData] = useState(false)
  const { account } = useWeb3React()
  const accountFormated = ` ${account?.slice(0, 6)}...${account?.slice(account?.length - 4, account?.length)}`
  const { onHandleERC20Details } = useERC20Details()
  const { toastError } = useToast()
  const { isDark } = useTheme()

  const handleAddressChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const tokenValue = e.currentTarget.value
      if (tokenValue.length === 42) {
        setLoadingTokenData(true)
        onHandleERC20Details(tokenValue.toLowerCase())
          .then((resp) => {
            setSelectedToken({ ...resp, tokenAddress: tokenValue, quoteToken: selectedToken.quoteToken })
            setTokenApproved(true)
            setLoadingTokenData(false)
          })
          .catch((error) => {
            toastError('Something went wrong')
            setTokenApproved(false)
            setLoadingTokenData(false)
            console.error(error)
          })
      } else {
        setTokenApproved(false)
      }
    },
    [setSelectedToken, toastError, setTokenApproved, onHandleERC20Details, selectedToken],
  )

  useEffect(() => {
    if (tokenApproved) {
      onChange(selectedToken)
    } else {
      onChange(null)
    }
  }, [selectedToken, tokenApproved, onChange])

  return (
    <>
      <PairCreationWrapper>
        <TextInput
          placeholderText="Token Address..."
          onChange={handleAddressChange}
          size={isMobile ? 'sm' : 'lg'}
          backgroundColor={isDark ? 'rgba(65, 65, 65, 1)' : 'white'}
          load={loadingTokenData}
        />
        <TokenDropdown
          tokens={tokenList}
          onChange={(token) => setSelectedToken({ ...selectedToken, quoteToken: token })}
        />
      </PairCreationWrapper>
      {tokenApproved && (
        <>
          <PairContainer>
            <Text fontSize="18px" fontFamily="poppins">
              Apeswap pair to be created
            </Text>
            <Text color="rgba(255, 179, 0, 1)" fontSize="20px" fontFamily="poppins" bold>
              {selectedToken?.quoteToken} / {selectedToken?.tokenSymbol}
            </Text>
          </PairContainer>
          <PresaleInfoContainer>
            <StyledText wallet={accountFormated}>Presale Creator:</StyledText>
            <StyledDescription fontSize="13px">
              Please Note: This account will be the only account capable of retrieving funds raised from the SS-IAO. If
              this account gets compromised in ANY capacity, ApeSwap has no ability to help. In addition, this is a
              fully decentralized product, please make sure you understand the risks and procedures before you begin to
              deploy your SS-IAO.
            </StyledDescription>
            <StyledDescription fontSize="13px">
              You cannot make any changes once you deploy your SS-IAO, and everything is final. All details are included
              in our documentation and FAQ above.
            </StyledDescription>
          </PresaleInfoContainer>
        </>
      )}
    </>
  )
}

export default React.memo(PairCreation)
