import React from 'react'
import { SvgProps, Heading, Text, ButtonSquare } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

interface OpConProps {
  type?: string
}

const OpCon = styled.div<OpConProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  padding-top: 1em;
  padding-bottom: 1em;
  border-radius: 22px;
  height: 325px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;

  ${({ theme }) => theme.mediaQueries.md} {
    background: ${({ theme }) => (theme.isDark ? '#0B0B0B' : '#F0F0F0')};
  }
`
const ImgBorder = styled.div`
  width: 95px;
  height: 95px;
  max-width: 95px;
  max-height: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: radial-gradient(
    108.59% 108.6% at 6.38% 83.17%,
    #ffe988 0%,
    #ba801e 25%,
    #fbec83 50%,
    #ba801f 75%,
    #ffe97f 100%
  );
  margin-bottom: 1em;
`
const ImgCon = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: ${({ theme }) => (theme.isDark ? '#212121' : theme.colors.white)};
  display: flex;
  justify-content: center;
  align-items: center;
`
const OpHeadingCon = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  margin-bottom: 0.5em;
`
const OpHeading = styled(Heading)`
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  line-height: 22px;

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 18px;
  }
`
const OpDescCon = styled.div`
  height: 30px;
  margin-bottom: 1em;
`
const OpDesc = styled(Text)`
  font-size: 12px;
  text-align: center;
  font-weight: 600;
`
const ActionButton = styled(ButtonSquare)`
  padding-right: 0.1em;
  padding-left: 0.1em;
  width: 90%;
  font-weight: 700;
`
interface OpDetailsProps {
  Icon?: SvgProps
  Title: string
  Desc: string
  onAction: () => void
  ActionTitle: string
  OpStyle?: Record<string, unknown>
  type?: string
}

export const OpDetails: React.FC<OpDetailsProps> = ({
  Icon,
  Title,
  Desc,
  onAction,
  ActionTitle,
  OpStyle,
  ...props
}) => {
  const TranslateString = useI18n()

  return (
    <OpCon style={{ ...OpStyle }} {...props}>
      <ImgBorder>
        <ImgCon>{Icon}</ImgCon>
      </ImgBorder>

      <OpHeadingCon>
        <OpHeading>{Title}</OpHeading>
      </OpHeadingCon>

      <OpDescCon>
        <OpDesc>{Desc}</OpDesc>
      </OpDescCon>

      <ActionButton onClick={onAction} fullWidth fontSize="14px">
        {TranslateString(292, ActionTitle)}
      </ActionButton>
    </OpCon>
  )
}

export default OpDetails
