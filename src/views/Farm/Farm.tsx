import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'

import useFarm from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import useSushi from '../../hooks/useSushi'

import { getMasterChefContract } from '../../sushi/utils'
import { getContract } from '../../utils/erc20'

import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Farm: React.FC = () => {
  const { farmId } = useParams()

  console.log(farmId)
  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
    tokenSymbol
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
    tokenSymbol: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sushi = useSushi()
  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const { onRedeem } = useRedeem(getMasterChefContract(sushi))

  const lpTokenName = useMemo(() => {
    return lpToken.toUpperCase()
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])


  return (
    <>
      <Image src={require(`../../assets/img/category-${tokenSymbol.toLocaleLowerCase() || 'cake'}.png`)}/>
      <Title>Stake FLIP tokens to stack CAKE</Title>
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake
              lpContract={lpContract}
              pid={pid}
              tokenName={lpToken.toUpperCase()}
            />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          ⭐️ Every time you stake and unstake FLIP tokens, the contract will
          automagically harvest CAKE rewards for you!
        </StyledInfo>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const Image = styled.img`
  width: 160px;
  margin-top: 30px;
`

const Title= styled.div`
  color:#7645D9;
  font-size:29px;
  width: 50vw;
  text-align: center;
  font-weight: 900;
  margin: 50px;
`


const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

export default Farm
