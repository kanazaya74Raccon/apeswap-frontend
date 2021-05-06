import React from 'react'
import styled from 'styled-components'
import { useFarmUser } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { Text, Image } from '@apeswapfinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'

export interface FarmProps {
  label: string
  pid: number
  image?: string
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
  margin-right: 20px;
`

const StyledBackground = styled.div`
width: 100px;
height: 60px;
background: rgb(255, 179, 0, .4);
border-radius: 20px;
display: flex;
justify-content: center;
margin-right: 20px;
`

const Farm: React.FunctionComponent<FarmProps> = ({ image, label, pid }) => {
  const { stakedBalance } = useFarmUser(pid)
  const TranslateString = useI18n()
  const rawStakedBalance = getBalanceNumber(stakedBalance)

  return (
    <Container>
      <StyledBackground>
      <IconImage src={`/images/farms/${image}.svg`} alt="icon" width={57} height={57} />
      </StyledBackground>
      <div>
        <Text fontSize="20px" bold>{label}</Text>
      </div>
    </Container>
  )
}

export default Farm
