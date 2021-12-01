import React from 'react'
import styled from 'styled-components'
import { Image, useMatchBreakpoints } from '@apeswapfinance/uikit'

interface StatsImageCard {
  type: string
  image: string
  token0?: string
  token1?: string
}

const IconImage = styled(Image)`
  align: center;
  width: 40px;
  height: 40px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 70px;
    height: 70px;
  }
`

const IconQuoteToken = styled(Image)`
  align: center;
  width: 20px;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 35px;
    height: 35px;
  }
`

const IconArrow = styled(Image)`
  align: center;
  width: 5px;
  height: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 10px;
    height: 10px;
  }
`

const StyledBackground = styled.div`
  width: 150px;
  height: 110px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
  background: rgb(255, 179, 0, 0.4);
`

const StatsImageCard: React.FC<StatsImageCard> = ({ type, image, token0, token1 }) => {
  const { isXl: isDesktop } = useMatchBreakpoints()

  return (
    <>
      {type === 'pool' ? (
        <Image
          src={type === 'pool' ? `/images/tokens/${image}` : `/images/farms/${image}.svg`}
          alt={image}
          width={64}
          height={64}
        />
      ) : (
        <StyledBackground>
          <IconImage
            src={`/images/tokens/${image || `${token1}.svg`}`}
            alt={token1}
            width={50}
            height={50}
            marginLeft="7.5px"
          />
          <IconQuoteToken
            src={`/images/tokens/${token0}.svg`}
            alt={token0}
            width={30}
            height={30}
            marginLeft={isDesktop ? '-20px' : '-13px'}
            marginTop={isDesktop ? '45px' : '30px'}
          />
          <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} marginRight="8px" marginLeft="8px" />
          <IconImage src="/images/tokens/banana.svg" alt="banana" width={50} height={50} marginRight="7.5px" />
        </StyledBackground>
      )}
    </>
  )
}

export default React.memo(StatsImageCard)
