import { InfoIcon, TooltipBubble } from '@apeswapfinance/uikit'
import { Flex } from '@ape.swap/uikit'
import React, { useState } from 'react'
import { ContentContainer, DropDownIcon, ListCardContainer, ListExpandedContainer, styles } from './styles'
import { ListCardProps } from './types'

const MobileListCard: React.FC<ListCardProps> = ({
  serviceTokenDisplay,
  tag,
  title,
  cardContent,
  expandedContent,
  infoContent,
  infoContentPosition,
  open,
  expandedContentSize,
}) => {
  const [expanded, setExpanded] = useState(open)
  return (
    <>
      <ListCardContainer onClick={() => setExpanded((prev) => !prev)}>
        <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Flex sx={styles.titleContainer}>
            {serviceTokenDisplay}
            <Flex sx={{ flexDirection: 'column', marginLeft: '10px' }}>
              {tag}
              {title}
            </Flex>
          </Flex>
          <Flex>
            {expandedContent && <DropDownIcon open={expanded} mr="20px" />}
            {infoContent && (
              <div style={{ display: 'inline-block' }}>
                <TooltipBubble body={infoContent} transformTip={infoContentPosition || 'translate(-82%, 50%)'}>
                  <InfoIcon width="25px" />
                </TooltipBubble>
              </div>
            )}
          </Flex>
        </Flex>
        <ContentContainer>{cardContent}</ContentContainer>
      </ListCardContainer>
      {expandedContent && expanded && (
        <ListExpandedContainer size={expandedContentSize}>{expandedContent}</ListExpandedContainer>
      )}
    </>
  )
}

export default React.memo(MobileListCard)
