import styled from 'styled-components'
import { Card, Text, Checkbox, Heading, ArrowDropDownIcon } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'

interface LabelProps {
  active?: boolean
}

export const ControlContainer = styled(Card)`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  justify-content: center;
  flex-direction: column;
  overflow: visible;
  padding-bottom: 10px;
  transform: translateY(-85px);
  z-index: ${({ theme }) => theme.zIndices.dropdown};

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    height: 59px;
    padding: 0px;
    justify-content: flex-start;
    padding-left: 50px;
    transform: translateY(-60px);
  }
`

export const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  cursor: pointer;

  ${Text} {
    margin-left: 4px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 8px;
    }
  }
`

export const LabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  > ${Text} {
    font-size: 12px;
  }

  margin-left: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    margin-left: 0px;
    align-items: center;
  }
`

export const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: flex-start;
  display: flex;
  align-items: flex-end;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    justify-content: center;
    align-items: center;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

export const HeadingContainer = styled.div`
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
`

export const Header = styled.div`
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: ${({ theme }) => (theme.isDark ? 'url(/images/farm-night.svg)' : 'url(/images/farm-day.svg)')};
  background-repeat: no-repeat;
  background-size: cover;
  height: 250px;
  background-position: center;

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
    height: 300px;
  }
`

export const StyledText = styled(Text)`
  font-weight: 600;
  font-size: 12px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 15px !important;
  }
`

interface CheckboxProps {
  checked?: boolean
}

export const StyledCheckbox = styled(Checkbox)<CheckboxProps>`
  height: 21px;
  width: 21px;
`

export const StyledImage = styled.img`
  height: 187px;
  width: 134px;
  position: absolute;
  right: 0px;
  bottom: 51px;

  @media screen and (min-width: 340px) {
    right: 20px;
  }

  ${({ theme }) => theme.mediaQueries.xs} {
    bottom: 51px;
    right: 0px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 0px;
    right: 0px;
  }
`

export const ContainerLabels = styled.div`
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin-top: 24px;
  height: 32px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-85px);

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-top: 34px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
  }
`

export const StyledLabelContainerHot = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 38px;
    margin: 0px;
  }
`

export const StyledLabelContainerLP = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 169px;
    margin: 0px;
  }
`

export const StyledLabelContainerAPR = styled.div`
  cursor: pointer;

  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 365px;
    margin: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 409px;
  }
`

export const StyledLabelContainerLiquidity = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    position: absolute;
    top: 6px;
    left: 500px;
    margin: 0px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 621px;
  }
`

export const StyledLabelContainerEarned = styled.div`
  cursor: pointer;
  ${({ theme }) => theme.mediaQueries.xs} {
    margin-left: 5px;
    margin-right: 5px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 35px;
    margin-right: 35px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0px;
    position: absolute;
    top: 6px;
    left: 651px;
  }
  ${({ theme }) => theme.mediaQueries.xl} {
    left: 801px;
  }
`

export const CardContainer = styled.div`
  margin-top: 17px;

  transform: translateY(-85px);
  ${({ theme }) => theme.mediaQueries.md} {
    transform: translateY(-60px);
  }
`

export const ButtonCheckWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  width: 100%;
  margin-right: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: fit-content;
  }
`

export const StyledHeading = styled(Heading)`
  font-size: 30px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 30px;
    max-width: 240px !important;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

export const StyledPage = styled(Page)`
  padding-left: 5px;
  padding-right: 5px;
  width: 100vw;

  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

export const StyledLabel = styled.div<LabelProps>`
  display: flex;
  color: ${({ theme, active }) => (active ? '#FFFFFF' : theme.colors.primary)};
  padding: 4px 12px;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  border-radius: ${({ active }) => active && '50px'};
  background-color: ${({ active }) => active && '#FFB300'};
`

interface DropdownProps {
  down?: boolean
}

export const StyledArrowDropDownIcon = styled(ArrowDropDownIcon)<DropdownProps>`
  color: white;
  transform: ${({ down }) => (!down ? 'rotate(180deg)' : 'rotate(0)')};
  margin-left: 7px;
  margin-top: 2px;
  /* 'rotate(180deg)' : 'rotate(0)'; */
`

export const FlexLayout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    width: 100%;
    margin-bottom: 32px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  border: 1px solid green;
  & :nth-child(1) {
    border: 1px solid red;
  }
`
