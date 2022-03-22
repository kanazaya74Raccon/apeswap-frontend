import { InfoIcon } from '@apeswapfinance/uikit'
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

const ListCard: React.FC<ListCardProps> = ({ serviceTokenDisplay, tag, title, cardContent, expandedContent }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <TitleContainer>
          {serviceTokenDisplay}
          {tag && <TagContainer ml="10px">{tag}</TagContainer>}
          <TitleText bold ml="10px">
            {title}
          </TitleText>
        </TitleContainer>
        <ContentContainer>{cardContent}</ContentContainer>
        <DropDownIcon open={expanded} mr="10px" />
        <InfoIcon width="25px" />
      </ListCardContainer>
      {expanded && <ListExpandedContainer>{expandedContent}</ListExpandedContainer>}
    </>
  )
}

export default React.memo(ListCard)
