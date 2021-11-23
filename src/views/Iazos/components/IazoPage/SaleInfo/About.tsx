import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

interface AboutProps {
  description: string
}

const AboutWrapper = styled.div`
  display: flex;
  width: 796px;
  margin-bottom: 20px;
  background: ${(props) => (props.theme.isDark ? ' rgba(51, 51, 51, 1)' : 'rgba(240, 240, 240, 1)')};
  border-radius: 0px 0px 10px 10px;
  padding: 80px 60px 80px 60px;
  align-items: center;
  justify-content: center;
`

const About: React.FC<AboutProps> = ({ description }) => {
  return (
    <AboutWrapper>
      <Text fontFamily="poppins" fontSize="18px">
        {description}
      </Text>
    </AboutWrapper>
  )
}

export default About
