import React from 'react'
import styled from 'styled-components'

interface AboutProps {
  description: string
}

const AboutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  color: white;
  font-family: Poppins;
  line-height: 25px;
  font-weight: 500;
  font-size: 14px;
  width: 300px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 0px 0px 10px 10px;
  padding: 40px 10px 40px 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 796px;
    padding: 80px 60px 80px 60px;
    font-size: 16px;
  }
`
const About: React.FC<AboutProps> = ({ description }) => {
  return <AboutWrapper>{description}</AboutWrapper>
}

export default About
