import { Flex, InfoIcon, Text } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import {
  ContentContainer,
  DropDownIcon,
  ListCardContainer,
  ListExpandedContainer,
  TagContainer,
  TitleContainer,
  TitleText,
} from './styles'
import { ListCardProps } from './types'

const MobileListCard: React.FC<ListCardProps> = ({ serviceTokenDisplay, tag, title, cardContent, expandedContent }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <Flex justifyContent="space-between" style={{ width: '100%' }}>
          <TitleContainer>
            {serviceTokenDisplay}
            {tag && <TagContainer ml="10px">{tag}</TagContainer>}
            <TitleText bold ml="10px">
              {title}
            </TitleText>
          </TitleContainer>
          <Flex>
            <DropDownIcon open={expanded} mr="20px"/>
            <InfoIcon width="25px" />
          </Flex>
        </Flex>
        <ContentContainer>{cardContent}</ContentContainer>
      </ListCardContainer>
      {expanded && <ListExpandedContainer>{expandedContent}</ListExpandedContainer>}
    </>
  )
}

export default React.memo(MobileListCard)
