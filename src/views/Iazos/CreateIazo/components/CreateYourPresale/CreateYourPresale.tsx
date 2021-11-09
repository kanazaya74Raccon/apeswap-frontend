import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import TextInput from 'components/TextInput'
import PairCreation, { ExtendedERC20Details } from './PairCreation/PairCreation'
import DateSelection from './DateSelection/DateSelection'
import PresaleDetails from './PresaleDetails/PresaleDetails'
import PostSaleDetails from './PostSaleDetails/PostSaleDetails'

interface Stepper {
  pairCreated: boolean
  datesSelected: boolean
  presaleDetailsSet: boolean
}

interface PresaleData {
  pairCreation: ExtendedERC20Details
  datesSelected: Date[]
}

const LaunchPadInfoWrapper = styled.div`
  width: 796px;
  border-radius: 10px;
  background: #333333;
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`
const StyledHeader = styled(Text)`
  font-family: Titan One;
  font-size: 24px;
  font-style: normal;
  line-height: 27px;
  color: #ffffff;
  padding-top: 25px;
`

const StyledText = styled(Text)`
  color: #ffffff;
  text-align: start;
  padding: 20px 15px 10px 20px;
`

const HeaderWrapper = styled.div<{ opened?: boolean }>`
  height: 35px;
  width: 100%;
  left: 356px;
  top: 458px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) => props.opened && '0px 3px 7px #333333'};
`

export default function CreateYourPresale(): JSX.Element {
  const [presaleData, setPresaleData] = useState<PresaleData>()
  const [stepper, setStepper] = useState<Stepper>({
    pairCreated: false,
    datesSelected: true,
    presaleDetailsSet: true,
  })

  const onPairCreation = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, pairCreation: val }))
    setStepper((prevState) => ({ ...prevState, pairCreated: val && true }))
  }, [])
  const onPresaleDetails = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, pairCreation: val }))
    setStepper((prevState) => ({ ...prevState, pairCreated: val && true }))
  }, [])

  return (
    <LaunchPadInfoWrapper>
      <StyledHeader>Create Your Presale</StyledHeader>
      <PairCreation onChange={onPairCreation} />
      {stepper.datesSelected && <DateSelection />}
      {stepper.pairCreated && <PresaleDetails pairTokenDetails={presaleData.pairCreation} />}
      <PostSaleDetails />
    </LaunchPadInfoWrapper>
  )
}
