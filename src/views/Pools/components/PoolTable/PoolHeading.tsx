import React from 'react'
import styled from 'styled-components'
import { Text, Image } from '@apeswapfinance/uikit'

export interface PoolProps {
  stakeToken?: string
  earnToken?: string
  earnTokenImage?: string
  isLp?: boolean
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

const PoolHeading: React.FunctionComponent<PoolProps> = ({ stakeToken, earnToken, earnTokenImage, isLp = false }) => {
  const splitStakeToken = stakeToken.split('-')
  return (
    <Container>
      <StyledBackground>
        {!isLp ? (
          <IconImage
            src={`/images/tokens/${stakeToken}.svg`}
            alt={stakeToken}
            width={50}
            height={50}
            marginLeft="7.5px"
          />
        ) : (
          <>
            <IconImage
              src={`/images/tokens/${splitStakeToken[0]}.svg`}
              alt={splitStakeToken[0]}
              width={50}
              height={50}
              marginLeft="7.5px"
            />
            <IconImage
              src={`/images/tokens/${splitStakeToken[1]}.svg`}
              alt={splitStakeToken[1]}
              width={25}
              height={25}
              marginLeft="-15px"
              marginTop="30px"
            />
          </>
        )}
        <IconImage src="/images/arrow.svg" alt="arrow" width={10} height={10} />
        <IconImage
          src={`/images/tokens/${earnTokenImage || `${earnToken}.svg`}`}
          alt={earnToken}
          width={50}
          height={50}
          marginRight="7.5px"
        />
      </StyledBackground>
      <div>
        <Text fontSize="20px" fontWeight={800}>
          {earnToken}
        </Text>
      </div>
    </Container>
  )
}

export default PoolHeading
