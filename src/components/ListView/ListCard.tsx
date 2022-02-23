import { Flex, Text } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import { ContentContainer, DropDownIcon, ListCardContainer, ListExpandedContainer, TagContainer } from './styles'

interface ListCardProps {
  serviceTokenDisplay: React.ReactNode
  tag?: string
  title: string
  cardContent: React.ReactNode
  expandedContent: React.ReactNode
}

const ListCard: React.FC<ListCardProps> = ({ serviceTokenDisplay, tag, title, cardContent, expandedContent }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <Flex alignItems="center">
          {serviceTokenDisplay}
          {tag && <TagContainer ml="10px">{tag}</TagContainer>}
          <Text bold ml="10px">
            {title}
          </Text>
        </Flex>
        <ContentContainer>{cardContent}</ContentContainer>
        <DropDownIcon open={expanded} />
      </ListCardContainer>
      {expanded && <ListExpandedContainer>{expandedContent}</ListExpandedContainer>}
    </>
  )
}

export default React.memo(ListCard)
