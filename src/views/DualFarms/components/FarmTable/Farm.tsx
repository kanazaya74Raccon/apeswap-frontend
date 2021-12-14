import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'
import { Token } from 'config/constants/types'

export interface FarmProps {
  label: string
  pid: number
  stakeTokens?: { token0: Token; token1?: Token }
  rewardTokens?: { token0: Token; token1?: Token }
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 57px;
    height: 57px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const StyledBackground = styled.div`
  width: 150px;
  height: 60px;
  background: rgb(255, 179, 0, 0.4);
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`

const Farm: React.FunctionComponent<FarmProps> = ({ stakeTokens, rewardTokens, label }) => {
  return (
    <Container>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${stakeTokens?.token1?.symbol}.svg`}
          alt={stakeTokens?.token1?.symbol}
          width={50}
          height={50}
          marginLeft="7.5px"
        />
        <IconImage
          src={`/images/tokens/${stakeTokens?.token0?.symbol}.svg`}
          alt={stakeTokens?.token0?.symbol}
          width={25}
          height={25}
          marginLeft="-15px"
          marginTop="30px"
        />
        <IconImage src="/images/arrow.svg" alt="arrow" width={10} height={10} marginLeft="8px" marginRight="8px" />
        <IconImage
          src={`/images/tokens/${rewardTokens?.token0?.symbol}.svg`}
          alt={rewardTokens?.token0?.symbol}
          width={27}
          height={27}
          marginRight="-5px"
          marginBottom="22.5px"
        />
        <IconImage
          src={`/images/tokens/${rewardTokens?.token1?.symbol}.svg`}
          alt={rewardTokens?.token1?.symbol}
          width={27}
          height={27}
          marginTop="22.5px"
          marginRight="7.5px"
        />
      </StyledBackground>
      <div>
        <Text fontSize="20px" fontFamily="Titan One">
          {label}
        </Text>
      </div>
    </Container>
  )
}

export default Farm
