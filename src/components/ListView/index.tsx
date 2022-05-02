import React from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import ListCard from './ListCard'
import { ListViewContainer } from './styles'
import MobileListCard from './MobileListCard'
import { ExtendedListViewProps } from './types'
import useIsMobile from '../../hooks/useIsMobile'

const ListView: React.FC<{ listViews: ExtendedListViewProps[] }> = ({ listViews }) => {
  const isMobile = useIsMobile()
  return (
    <ListViewContainer>
      {listViews.map((view) => {
        return isMobile ? (
          <MobileListCard
            serviceTokenDisplay={
              <ServiceTokenDisplay
                token1={view.tokens.token1}
                token2={view.tokens.token2}
                token3={view.tokens?.token3}
                token4={view.tokens?.token4}
                billArrow={view?.billArrow}
                stakeLp
                dualEarn={view.tokens?.token4 != null}
              />
            }
            tag={view?.tag}
            title={view.title}
            cardContent={view.cardContent}
            expandedContent={view.expandedContent}
            infoContent={view.infoContent}
            key={view.id}
            open={view?.open}
            expandedContentSize={view?.expandedContentSize}
          />
        ) : (
          <ListCard
            serviceTokenDisplay={
              <ServiceTokenDisplay
                token1={view.tokens.token1}
                token2={view.tokens.token2}
                token3={view.tokens?.token3}
                token4={view.tokens?.token4}
                billArrow={view?.billArrow}
                stakeLp
                dualEarn={view.tokens?.token4 != null}
              />
            }
            tag={view?.tag}
            title={view.title}
            cardContent={view.cardContent}
            expandedContent={view.expandedContent}
            infoContent={view.infoContent}
            key={view.id}
            open={view?.open}
          />
        )
      })}
    </ListViewContainer>
  )
}

export default React.memo(ListView)
