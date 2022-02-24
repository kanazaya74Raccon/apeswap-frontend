import { Flex, Text } from '@apeswapfinance/uikit'
import React from 'react'
import { TitleText, ListViewContentContainer, IconImage, ValueText } from './styles'

interface ListViewContentProps {
  title: string
  value: string
  value2?: string
  valueIcon?: string
  value2Icon?: string
  mb?: number
  width?: number
}

const ListViewContent: React.FC<ListViewContentProps> = ({
  title,
  value,
  value2,
  valueIcon,
  value2Icon,
  mb,
  width,
}) => {
  return (
    <ListViewContentContainer mb={mb} width={width}>
      <TitleText>{title}</TitleText>
      <Flex alignItems="center">
        {valueIcon && <IconImage src={valueIcon} alt={valueIcon} />} <ValueText bold>{value}</ValueText>
      </Flex>
      <Flex alignItems="center">
        {value2Icon && <IconImage src={value2Icon} alt={value2Icon} />} {value2 && <ValueText bold>{value2}</ValueText>}
      </Flex>
    </ListViewContentContainer>
  )
}

export default React.memo(ListViewContent)
