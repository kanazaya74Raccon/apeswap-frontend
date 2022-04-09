import { Flex, InfoIcon, TooltipBubble } from '@apeswapfinance/uikit'
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

const MobileListCard: React.FC<ListCardProps> = ({
  serviceTokenDisplay,
  tag,
  title,
  cardContent,
  expandedContent,
  infoContent,
  open,
  expandedContentSize
}) => {
  const [expanded, setExpanded] = useState(open)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <Flex justifyContent="space-between" style={{ width: '100%' }}>
          <TitleContainer>
            {serviceTokenDisplay}
            {tag && <TagContainer ml="10px">{tag}</TagContainer>}
            {title}
          </TitleContainer>
          <Flex>
            {expandedContent && <DropDownIcon open={expanded} mr="20px" />}
            {infoContent && (
              <div style={{ display: 'inline-block' }}>
                <TooltipBubble body={infoContent} transformTip="translate(-82%, 50%)">
                  <InfoIcon width="25px" />
                </TooltipBubble>
              </div>
            )}
          </Flex>
        </Flex>
        <ContentContainer>{cardContent}</ContentContainer>
      </ListCardContainer>
      {expandedContent && expanded && <ListExpandedContainer size={expandedContentSize}>{expandedContent}</ListExpandedContainer>}
    </>
  )
}

export default React.memo(MobileListCard)
