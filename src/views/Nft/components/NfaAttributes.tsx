import React from 'react'
import { Nft } from 'config/constants/types'
import styled from 'styled-components'
import nfaAttributes from 'config/constants/nfaAttributes'

const AttributesHolder = styled.div`
  ${({ theme }) => theme.mediaQueries.xs} {
    width: 350px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 450px;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 30px;
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

export interface Nfa {
  nfa: Nft
}

const NfaAttributes: React.FC<Nfa> = ({ nfa }) => {
  const { baseColor, faceColor, frames, mouths, eyes, hats } = nfa.attributes
  const base = nfaAttributes.find((attrib) => attrib.id === baseColor)
  const face = nfaAttributes.find((attrib) => attrib.id === faceColor)
  const frame = nfaAttributes.find((attrib) => attrib.id === frames)
  const mouth = nfaAttributes.find((attrib) => attrib.id === mouths)
  const eye = nfaAttributes.find((attrib) => attrib.id === eyes)
  const hat = nfaAttributes.find((attrib) => attrib.id === hats)

  return (
    <AttributesHolder>
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
    </AttributesHolder>
  )
}

export default NfaAttributes
