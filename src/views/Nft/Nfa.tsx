import React from 'react'
import Page from 'components/layout/Page'
import styled from 'styled-components'
import { Text, Button, useModal } from '@apeswapfinance/uikit'
import { Link, Redirect, useParams } from 'react-router-dom'
import PageLoader from 'components/PageLoader'
import nfts from 'config/constants/nfts'
import nfaAttributes from 'config/constants/nfaAttributes'
import useI18n from 'hooks/useI18n'
import Image from './components/Image'

const NfaHolder = styled.div`
  width: 450px;
  //   border: 1px solid red;
`

const PageHolder = styled.div`
  //   border: 1px solid red;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`

const DetailsHolder = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  padding-left: 100px;
  padding-right: 50px;
  //   border: 1px solid red;
  align-items: center;
`

const AttributesHolder = styled.div`
  width: 450px;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`
const Attribute = styled.div`
  height: 30px;
  background-color: ${(props) => props.theme.colors};
  color: ${(props) => props.theme.colors.textSubtle};
  box-shadow: 0px 0px 2px ${(props) => props.theme.colors.textSubtle};
  margin: 7px;
  padding: 0px 5px 0 5px;
  font-size: 15px;
  line-height: 30px;
  font-family: ${(props) => props.theme.fontFamily.poppins};
`

const ToolTipText = styled.span`
  visibility: hidden;
  width: 110px;
  background-color: ${(props) => props.theme.colors};
  color: ${(props) => props.theme.colors.textSubtle};
  box-shadow: 0px 0px 2px ${(props) => props.theme.colors.textSubtle};
  font-family: ${(props) => props.theme.fontFamily.poppins};
  text-align: center;
  border-radius: 6px;
  padding: 6.5px;

  /* Position the tooltip */
  position: absolute;
  z-index: 100;
`

const ToolTip = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${ToolTipText} {
    visibility: visible;
  }
`

const Nfa = () => {
  const { id: idStr }: { id: string } = useParams()
  const id = Number(idStr)
  const TranslateString = useI18n()
  const nfa = nfts.find((nft) => nft.index === id)
  const { baseColor, faceColor, frames, mouths, eyes, hats } = nfa.attributes
  const base = nfaAttributes.find((attrib) => attrib.id === baseColor)
  const face = nfaAttributes.find((attrib) => attrib.id === faceColor)
  const frame = nfaAttributes.find((attrib) => attrib.id === frames)
  const mouth = nfaAttributes.find((attrib) => attrib.id === mouths)
  const eye = nfaAttributes.find((attrib) => attrib.id === eyes)
  const hat = nfaAttributes.find((attrib) => attrib.id === hats)
  //   if (!isValidTeamId) {
  //     return <Redirect to="/404" />
  //   }

  //   if (team) {
  //     return <PageLoader />
  //   }

  return (
    <Page>
      <PageHolder>
        <NfaHolder>
          <Image src={nfa.image} alt="" originalLink="" rarityTier={nfa.attributes.rarityTierNumber} />
          <AttributesHolder>
            {/* <Attribute>{base.category}: {base.id} | Occurance: {base.occurance}/1000</Attribute> */}
            <ToolTip>
              <Attribute>
                {base.category}: {base.id}
                <ToolTipText>Occurance {base.occurance} of 1000</ToolTipText>
              </Attribute>
            </ToolTip>
            <ToolTip>
              <Attribute>
                {face.category}: {face.id}
                <ToolTipText>Occurance {face.occurance} of 1000</ToolTipText>
              </Attribute>
            </ToolTip>
            <ToolTip>
              <Attribute>
                {frame.category}: {frame.id}
                <ToolTipText>Occurance {frame.occurance} of 1000</ToolTipText>
              </Attribute>
            </ToolTip>
            <ToolTip>
              <Attribute>
                {mouth.category}: {mouth.id}
                <ToolTipText>Occurance {mouth.occurance} of 1000</ToolTipText>
              </Attribute>
            </ToolTip>
            <ToolTip>
              <Attribute>
                {eye.category}: {eye.id}
                <ToolTipText>Occurance {eye.occurance} of 1000</ToolTipText>
              </Attribute>
            </ToolTip>
            <ToolTip>
              <Attribute>
                {hat.category}: {hat.id}
                <ToolTipText>Occurance {hat.occurance} of 1000</ToolTipText>
              </Attribute>
            </ToolTip>
            {/* <Attribute>Rarity Rank: {nfa.attributes.rarityOverallRank} </Attribute>
            <Attribute>Rarity Level: {nfa.attributes.rarityTierNumber} </Attribute>
            <Attribute>Rarity Name: {nfa.attributes.rarityTierName} </Attribute> */}
          </AttributesHolder>
        </NfaHolder>
        <DetailsHolder>
          <Text fontSize="32px" color="primary">
            {TranslateString(999, `${nfa.name} ${nfa.index}`)}
          </Text>
          <Text fontFamily="poppins" fontSize="20px" color="textSubtle"> 
            {TranslateString(999, nfa.attributes.rarityTierName)}
          </Text>
          <Text fontFamily="poppins" fontSize="20px" color="textSubtle">
            {TranslateString(999, `Level ${nfa.attributes.rarityTierNumber} | Rarity ${nfa.attributes.rarityOverallRank} / 1000`)}
          </Text>
          <br />
          <Text fontFamily="poppins" fontSize="26px" color="textSubtle">
            {TranslateString(999, 'Last sold for: xxxx')}
          </Text>
          <Text fontFamily="poppins" fontSize="26px" color="textSubtle">
            {TranslateString(999, 'Currently for sale')}
          </Text>
        </DetailsHolder>
      </PageHolder>
    </Page>
  )
}

export default Nfa
