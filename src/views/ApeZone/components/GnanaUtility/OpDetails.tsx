import React from 'react'
import { LegacySvgProps } from '@apeswapfinance/uikit'
import useI18n from 'hooks/useI18n'

import { OpCon, OpDesc, OpDescCon, OpHeading, OpHeadingCon, AnchorTag, ActionButton } from './styles'

interface OpDetailsProps {
  Icon?: LegacySvgProps
  Title: string
  Desc: string
  onAction?: () => void
  ActionTitle: string
  OpStyle?: Record<string, unknown>
  type?: string
  actionHref?: string
}

export const OpDetails: React.FC<OpDetailsProps> = ({
  Icon,
  Title,
  Desc,
  onAction,
  ActionTitle,
  OpStyle,
  actionHref,
  ...props
}) => {
  const TranslateString = useI18n()

  return (
    <OpCon style={{ ...OpStyle }} {...props}>
      {Icon}

      <OpHeadingCon>
        <OpHeading>{Title}</OpHeading>
      </OpHeadingCon>

      <OpDescCon>
        <OpDesc>{Desc}</OpDesc>
      </OpDescCon>

      <AnchorTag href={actionHref}>
        <ActionButton onClick={onAction} fullWidth fontSize="14px">
          {TranslateString(292, ActionTitle)}
        </ActionButton>
      </AnchorTag>
    </OpCon>
  )
}

export default OpDetails
