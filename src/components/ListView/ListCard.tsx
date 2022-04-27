import { InfoIcon, TooltipBubble } from '@apeswapfinance/uikit'
import React, { useState } from 'react'
import {
  ContentContainer,
  DropDownIcon,
  ListCardContainer,
  ListExpandedContainer,
  TagContainer,
  TitleContainer,
} from './styles'
import { ListCardProps } from './types'

const ListCard: React.FC<ListCardProps> = ({
  serviceTokenDisplay,
  tag,
  title,
  cardContent,
  expandedContent,
  infoContent,
  infoContentPosition,
  open,
}) => {
  const [expanded, setExpanded] = useState(open)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <TitleContainer>
          {serviceTokenDisplay}
          {tag && <TagContainer ml="10px">{tag}</TagContainer>}
          {title}
        </TitleContainer>
        <ContentContainer>{cardContent}</ContentContainer>
        {expandedContent && <DropDownIcon open={expanded} mr="30px" />}
        {infoContent && (
          <div style={{ display: 'inline-block' }}>
            <TooltipBubble
              placement="bottomRight"
              body={infoContent}
              transformTip={infoContentPosition || 'translate(-82%, 40%)'}
            >
              <InfoIcon width="25px" />
            </TooltipBubble>
          </div>
        )}
      </ListCardContainer>
      {expandedContent && expanded && <ListExpandedContainer>{expandedContent}</ListExpandedContainer>}
    </>
  )
}

export default React.memo(ListCard)
