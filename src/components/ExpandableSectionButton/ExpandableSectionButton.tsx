import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { ArrowDropDownIcon, ArrowDropUpIcon, Text } from '@apeswapfinance/uikit'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  const { t } = useTranslation()
  return (
    <Wrapper aria-label={t('Hide or show expandable content')} role="button" onClick={() => onClick()}>
      <Text color="primary">{expanded ? t('Hide') : t('Details')}</Text>
      {expanded ? <ArrowDropUpIcon width="24px" /> : <ArrowDropDownIcon width="24px" />}
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
