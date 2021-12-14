import React from 'react'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import { BLOCK_EXPLORER, NETWORK_LABEL } from 'config/constants/chains'
import { useWeb3React } from '@web3-react/core'
import { LinkExternal, Text, Flex } from '@apeswapfinance/uikit'
import { useNetworkChainId } from 'state/hooks'
import { DualFarm } from 'state/types'
import { getBalanceNumber } from 'utils/formatBalance'
import StakedAction from './StakedAction'

export interface ActionPanelProps {
  farm: DualFarm
}

export interface InfoPropsContainer {
  liquidityDigits: number
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 340px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 401px;
  }
`

const StyledLinkExternal = styled(LinkExternal)`
  font-weight: 400;
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 10px;
`

const ActionContainer = styled.div`
  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    align-items: center;
    flex-grow: 1;
    flex-basis: 0;
  }
`

const InfoContainer = styled.div<InfoPropsContainer>`
  width: ${({ liquidityDigits }) =>
    (liquidityDigits === 8 && '265px') || (liquidityDigits === 7 && '255px') || (liquidityDigits === 6 && '238px')};

  ${({ theme }) => theme.mediaQueries.xl} {
    width: ${({ liquidityDigits }) =>
      (liquidityDigits === 8 && '315px') || (liquidityDigits === 7 && '300px') || (liquidityDigits === 6 && '280px')};
  }
`

const ValueContainer = styled.div`
  display: block;
`

const ValueContainerNoneLarge = styled.div`
  display: block;

  ${({ theme }) => theme.mediaQueries.lg} {
    display: none;
  }
`

const ValueWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const StakedText = styled(Text)`
  font-weight: 700;
  margin-left: 60px;
  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 85px;
  }
`

const StakedValueText = styled(Text)`
  margin-left: 60px;
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 85px;
  }
`

const ActionPanel: React.FunctionComponent<ActionPanelProps> = ({ farm }) => {
  const TranslateString = useI18n()
  const chainId = useNetworkChainId()
  const { account } = useWeb3React()

  const blockExplorer = `${BLOCK_EXPLORER[chainId]}/address/${farm?.stakeTokenAddress}`

  const miniChefEarnings = getBalanceNumber(farm?.userData?.miniChefEarnings, farm?.rewardTokens?.token0?.decimals)
  const rewarderEarnings = getBalanceNumber(farm?.userData?.rewarderEarnings, farm?.rewardTokens?.token1?.decimals)

  const rawStakedBalance = getBalanceNumber(farm?.userData?.stakedBalance)
  const totalStakedValue = farm?.stakeTokenPrice * rawStakedBalance

  const number = parseInt(farm?.totalStaked)
  const liquidityDigits = Math.round(number).toString().length

  return (
    <>
      <Container>
        <Flex>
          <InfoContainer liquidityDigits={liquidityDigits}>
            <ValueContainer>
              <ValueWrapper>
                <StyledText fontSize="12px">Reward Tokens</StyledText>
                <StyledText fontSize="12px">
                  {`${farm?.rewardTokens?.token0?.symbol} & ${farm?.rewardTokens?.token1?.symbol}`}
                </StyledText>
              </ValueWrapper>
              <ValueWrapper>
                <StyledText fontSize="12px">{farm?.rewardTokens?.token0?.symbol} Earned:</StyledText>
                <StyledText fontSize="12px" color="green">
                  {miniChefEarnings ? miniChefEarnings.toFixed(4) : '0'}
                </StyledText>
              </ValueWrapper>
              <ValueWrapper>
                <StyledText fontSize="12px">{farm?.rewardTokens?.token1?.symbol} Earned:</StyledText>
                <StyledText fontSize="12px" color="green">
                  {rewarderEarnings ? rewarderEarnings.toFixed(4) : '0'}
                </StyledText>
              </ValueWrapper>
            </ValueContainer>
            <ValueContainer>
              <ValueWrapper>
                <StyledText fontSize="12px">{TranslateString(999, 'Stake:')}</StyledText>
                <LinkExternal href={BASE_ADD_LIQUIDITY_URL}>
                  <StyledText fontSize="12px">{farm.stakeTokens.token0.symbol}</StyledText>
                </LinkExternal>
              </ValueWrapper>
              <ValueWrapper>
                <StyledText fontSize="12px">Staked Amount</StyledText>
                <StyledText fontSize="12px">{rawStakedBalance ? rawStakedBalance.toFixed(10) : '0'}</StyledText>
              </ValueWrapper>
            </ValueContainer>
          </InfoContainer>
          <Flex flexDirection="column">
            {account && rawStakedBalance !== 0 && (
              <>
                <StakedText fontSize="12px">Staked</StakedText>
                <StakedValueText color="green" fontSize="20px">
                  ${totalStakedValue.toFixed(2)}
                </StakedValueText>
              </>
            )}
          </Flex>
          <ValueContainerNoneLarge>
            <ValueWrapper>
              <StyledText fontSize="12px">{TranslateString(736, 'APR:')}</StyledText>
            </ValueWrapper>
          </ValueContainerNoneLarge>
          <ActionContainer>
            <StakedAction {...farm} />
          </ActionContainer>
        </Flex>
      </Container>
      <StyledLinkExternal href={blockExplorer} fontFamily="Titan One">
        {TranslateString(999, `View on ${NETWORK_LABEL[chainId]}Scan`)}
      </StyledLinkExternal>
    </>
  )
}

export default ActionPanel
