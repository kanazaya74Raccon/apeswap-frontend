import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import LuanchpadInfo from './components/LaunchpadInfo/LaunchpadInfo'
import CreateYourPresale from './components/CreateYourPresale/CreateYourPresale'

const LaunchPadWrapper = styled.div`
    border-radius: 20px;
    background: #222222;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const TopNavWrapper = styled.div`
    position: relative;
    height: 60px;
    width: 856px;
    border-radius: 20px 20px 0px 0px;
    display: flex;
    align-items: center;
    padding-left: 30px;
    background: #333333;
    z-index: 0;
`

const TopNavMonkey = styled.div`
    position: absolute;
    height: 60px;
    width: 100px;
    right: 20px;
    overflow: hidden;
    background: url(/images/header-ape.svg) no-repeat 0px 10px;
    opacity: 0.2;
    z-index: 0;
`

const HeaderWrapper = styled.div`
    width: 100%;
    display: flex;
    height: 60px;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
`

const StyledHeader = styled(Text)`
    font-family: Titan One;
    font-size: 45px;
    font-style: normal;
    line-height: 52px;
    color: #ffffff;
`

const BackWrapper = styled.div`
    z-index: 1;
    display: flex;
`

const StyledText = styled(Text)`
    color: #ffffff;
`

const BackArrow = styled.img`
    cursor: pointer;
    margin-right: 20px;
`

export default function CreateIazo(): JSX.Element {
    return (
        <LaunchPadWrapper>
            <TopNavWrapper>
                <TopNavMonkey />
                <Link to="/ilo">
                    <BackWrapper>
                        <BackArrow src="/images/left-arrow.svg" />
                        <StyledText>Back to Ape Launchpad</StyledText>
                    </BackWrapper>
                </Link>
            </TopNavWrapper>
            <HeaderWrapper>
                <StyledHeader>Create</StyledHeader>
            </HeaderWrapper>
            <LuanchpadInfo />
            <CreateYourPresale />
        </LaunchPadWrapper>
    )
}
