import { InfoIcon, TooltipBubble } from '@apeswapfinance/uikit'
import { Flex } from '@ape.swap/uikit'
import React, { useState } from 'react'
import { ContentContainer, DropDownIcon, ListCardContainer, ListExpandedContainer, styles } from './styles'
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
        <Flex sx={styles.titleContainer}>
          {serviceTokenDisplay}
          <Flex sx={{ flexDirection: 'row', marginLeft: '10px' }}>
            {tag}
            {title}
          </Flex>
        </Flex>
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
