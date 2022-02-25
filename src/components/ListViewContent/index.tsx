import { Flex, HelpIcon, Skeleton, Text } from '@apeswapfinance/uikit'
import React from 'react'
import { TitleText, ListViewContentContainer, IconImage, ValueText, ValueSkeleton } from './styles'
import { ListViewContentProps } from './types'

const ListViewContent: React.FC<ListViewContentProps> = ({
  title,
  value,
  value2,
  value2Secondary,
  valueIcon,
  value2Icon,
  mb,
  ml,
  width,
  height,
  lineHeight,
  toolTip,
  aprCalculator,
}) => {
  return (
    <ListViewContentContainer mb={mb} ml={ml} width={width} height={height}>
      <Flex>
        <TitleText lineHeight={lineHeight}>
          {title} {toolTip && <HelpIcon width="12px" />}
        </TitleText>
        {aprCalculator}
      </Flex>
      <Flex alignItems="center">
        {valueIcon && <IconImage src={valueIcon} alt={valueIcon} />}{' '}
        <ValueText bold lineHeight={lineHeight}>
          {value.includes('NaN') || value.includes('undefined') ? <ValueSkeleton /> : value}
        </ValueText>
      </Flex>
      <Flex alignItems="center">
        {value2Icon && <IconImage src={value2Icon} alt={value2Icon} />}{' '}
        {value2 && (
          <ValueText bold={!value2Secondary} value2Secondary={value2Secondary} lineHeight={lineHeight}>
            {value2.includes('NaN') || value2.includes('undefined') ? <ValueSkeleton /> : value2}
          </ValueText>
        )}
      </Flex>
    </ListViewContentContainer>
  )
}

export default React.memo(ListViewContent)
