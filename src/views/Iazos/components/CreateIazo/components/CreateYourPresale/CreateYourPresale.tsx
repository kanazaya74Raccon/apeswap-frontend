import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import { IazoDefaultSettings } from 'state/types'
import { PresaleData } from './types'
import PairCreation from './PairCreation/PairCreation'
import DateSelection from './DateSelection/DateSelection'
import PresaleDetails from './PresaleDetails/PresaleDetails'
import PostSaleDetails from './PostSaleDetails/PostSaleDetails'
import SaleReview from './SaleReview/SaleReview'
import Information from './Information/Information'
import Actions from './Actions'

interface Stepper {
  pairCreated: boolean
  datesSelected: boolean
  presaleDetailsSet: boolean
  postsaleDetailsSet: boolean
  informationStepCompleted: boolean
}

interface CreateIazoProps {
  settings: IazoDefaultSettings
}

const CreateIazo: React.FC<CreateIazoProps> = ({ settings }) => {
  const { baseFee, iazoTokenFee } = settings !== null && settings
  const { account } = useWeb3React()
  const [presaleData, setPresaleData] = useState<PresaleData>()
  const [stepper, setStepper] = useState<Stepper>({
    pairCreated: false,
    datesSelected: false,
    presaleDetailsSet: false,
    postsaleDetailsSet: false,
    informationStepCompleted: false,
  })

  const presaleStepsCompleted =
    stepper.pairCreated && stepper.datesSelected && stepper.presaleDetailsSet && stepper.postsaleDetailsSet

  const onPairCreation = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, pairCreation: val }))
    setStepper((prevState) => ({ ...prevState, pairCreated: val && true }))
  }, [])

  const onDateSelection = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, datesSelected: val }))
    setStepper((prevState) => ({ ...prevState, datesSelected: val && true }))
  }, [])

  const onPresaleDetails = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, presaleTokenDetails: val }))
    setStepper((prevState) => ({ ...prevState, presaleDetailsSet: val && true }))
  }, [])

  const onPostsaleDetails = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, postsaleDetails: val }))
    setStepper((prevState) => ({ ...prevState, postsaleDetailsSet: val && true }))
  }, [])

  const onInformation = useCallback((val) => {
    setPresaleData((prevState) => ({ ...prevState, information: val }))
    setStepper((prevState) => ({ ...prevState, informationStepCompleted: val && true }))
  }, [])

  return (
    <LaunchPadInfoWrapper>
      <StyledHeader>Create Your Presale</StyledHeader>
      {account ? (
        <PairCreation onChange={onPairCreation} />
      ) : (
        <>
          <br />
          <UnlockButton />
          <br />
        </>
      )}
      {stepper.pairCreated && (
        <>
          <PresaleDetails onChange={onPresaleDetails} pairTokenDetails={presaleData.pairCreation} />
          <DateSelection onChange={onDateSelection} />
          <PostSaleDetails
            onChange={onPostsaleDetails}
            quoteTokenSymbol={presaleData.pairCreation.quoteToken}
            presalePrice={presaleData?.presaleTokenDetails?.pricePerToken}
          />
        </>
      )}
      {presaleStepsCompleted && (
        <>
          <SaleReview
            presaleDetails={presaleData.presaleTokenDetails}
            postsaleDetails={presaleData.postsaleDetails}
            pairDetails={presaleData.pairCreation}
            iazoTokenFee={iazoTokenFee}
            baseFee={baseFee}
          />
          <Information onChange={onInformation} />
        </>
      )}
      {presaleStepsCompleted && stepper.informationStepCompleted && (
        <Actions presaleData={presaleData} settings={settings} />
      )}
    </LaunchPadInfoWrapper>
  )
}

const LaunchPadInfoWrapper = styled.div`
  width: 300px;
  border-radius: 10px;
  background: ${(props) => (props.theme.isDark ? '#333333' : '#E5E5E5')};
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
  }
`
const StyledHeader = styled(Text)`
  font-family: Poppins;
  font-size: 24px;
  font-weight: 700;
  font-style: normal;
  line-height: 27px;
  padding-top: 25px;
`

export default CreateIazo
