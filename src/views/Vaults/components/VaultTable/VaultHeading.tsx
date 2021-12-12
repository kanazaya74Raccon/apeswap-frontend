import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'
import Tooltip from 'components/Tooltip/Tooltip'

export interface PoolProps {
  token0?: string
  token1?: string
  isPair?: boolean
  image?: string
  isBurning?: boolean
}

const IconImage = styled(Image)`
  width: 24px;
  height: 24px;
  align: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 57px;
    height: 57px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
`

const TitleContainer = styled.div`
  display: flex;
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

const VaultHeading: React.FunctionComponent<PoolProps> = ({ token0, token1, isPair, image, isBurning }) => {
  return (
    <Container>
      <StyledBackground>
        {isPair ? (
          <>
            <IconImage
              src={`/images/tokens/${image || `${token1}.svg`}`}
              alt={token1}
              width={50}
              height={50}
              marginLeft="7.5px"
            />
            <IconImage
              src={`/images/tokens/${token0}.svg`}
              alt={token0}
              width={25}
              height={25}
              marginLeft="-15px"
              marginTop="30px"
            />
            <IconImage src="/images/arrow.svg" alt="arrow" width={10} height={10} marginRight="8px" marginLeft="8px" />
            <IconImage src={`/images/tokens/${image || `${token1}.svg`}`} alt={token1} width={50} height={50} />
            <IconImage
              src={`/images/tokens/${token0}.svg`}
              alt={token0}
              width={25}
              height={25}
              marginLeft="-15px"
              marginRight="7.5px"
              marginTop="30px"
            />
          </>
        ) : (
          <>
            <IconImage
              src={`/images/tokens/${image || `${token0}.svg`}`}
              alt={token0}
              width={48}
              height={48}
              marginLeft="7.5px"
            />
            <IconImage src="/images/arrow.svg" alt="arrow" width={10} height={10} marginLeft="8px" marginRight="2px" />
            <IconImage
              src={`/images/tokens/${image || `${token0}.svg`}`}
              alt={token0}
              width={48}
              height={48}
              marginRight="15px"
            />
          </>
        )}
      </StyledBackground>
      <TitleContainer>
        <Text fontSize="20px" fontFamily="Titan One">
          {isPair ? `${token1}-${token0}` : token0}{' '}
        </Text>
        {isBurning && <Tooltip content="Burns at least 50% of every harvest in the form of $BANANA">🔥</Tooltip>}
      </TitleContainer>
    </Container>
  )
}

export default VaultHeading
