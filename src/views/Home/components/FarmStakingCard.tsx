import React, { useState, useCallback, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import {
  Heading,
  Button,
  Card,
  CardBody,
  BananaIcon,
  BananaPairIcon,
  Text,
  ArrowForwardIcon,
} from '@apeswapfinance/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'

import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from './UnlockButton'
import BananaHarvestBalance from './BananaHarvestBalance'
import BananaHarvestUsdBalance from './BananaHarvestUsdBalance'
import BananaWalletUsdBalance from './BananaWalletUsdBalance'
import BananaWalletBalance from './BananaWalletBalance'
import CardHeader from './CardHeader'

const StyledFarmStakingCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  width: 100%;
  min-height: 250px;
  text-align: center;
  overflow: visible;
  margin-left: auto;
  margin-right: auto;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const FlexRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = styled.div`
  color: #ffb300;
  font-size: 12px;
  margin-left: 2px;
`

const Actions = styled.div`
  position: absolute;
  bottom: 0px;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const StyledTextLock = styled(Text)`
  margin-top: 10px;
  font-size: 28px;

  ${({ theme }) => theme.mediaQueries.lg} {
    flex-direction: row;
    margin-top: 50px;
  }
`

const StyledButton = styled(Button)`
  background: #ffb300;
  border-radius: 10px;
  border: 0px;
  width: 220px;
  height: 50px;
`

const StyledBanana = styled(BananaIcon)`
  width: 90px;
  position: absolute;
  left: 0px;
  top: -20px;
  z-index: 100;
  transform: rotate(100deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
`

const StyledBanana2 = styled(BananaIcon)`
  width: 70px;
  position: absolute;
  bottom: -20px;
  left: 30px;
  z-index: 100;
  transform: rotate(10deg);
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
`

const StyledBananaPair = styled(BananaPairIcon)`
  width: 90px;
  position: absolute;
  right: -10px;
  top: 15px;
  z-index: 100;
  filter: drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.25));
`

const StyledLabel = styled(Label)`
  font-family: Poppins;
  font-weight: 700;
`

const HarvestDiv = styled.div`
  padding-bottom: 50px;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)

  const rewardRef = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')

  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const onReward = useReward(
    rewardRef,
    useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid)).onReward,
  )

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      setTypeOfReward('rewardBanana')
      await onReward()
    } catch (error) {
      setTypeOfReward('error')
      rewardRef.current?.rewardMe()
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>
      <CardHeader>
        <StyledBanana />
        <StyledBanana2 />
        <StyledBananaPair />
        <Heading size="lg" mb="0px" color="white">
          {TranslateString(542, 'Farms &')}
          <br />
          {TranslateString(542, 'Staking')}
        </Heading>
      </CardHeader>
      <CardBody>
        {account ? (
          <HarvestDiv>
            <Block>
              <BananaHarvestBalance />
              <FlexRow>
                <BananaHarvestUsdBalance />
                <StyledLabel>{TranslateString(544, ' total harvest value')}</StyledLabel>
              </FlexRow>
            </Block>
            <Block>
              <BananaWalletBalance />
              <FlexRow>
                <BananaWalletUsdBalance />
                <StyledLabel>{TranslateString(546, 'in BANANA in Wallet')}</StyledLabel>
              </FlexRow>
            </Block>
          </HarvestDiv>
        ) : (
          <FlexRow>
            <StyledTextLock>LOCKED</StyledTextLock>
          </FlexRow>
        )}
        <Actions>
          {account ? (
            <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
              <StyledButton
                id="harvest-all"
                disabled={balancesWithValue.length <= 0 || pendingTx}
                onClick={harvestAllFarms}
                fullWidth
              >
                {pendingTx
                  ? TranslateString(548, 'COLLECTING BANANA')
                  : TranslateString(999, `HARVEST ALL (${balancesWithValue.length})`)}
              </StyledButton>
            </Reward>
          ) : (
            <UnlockButton fullWidth />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard
