import React from 'react'
import styled from 'styled-components'

import { Button, AddMovieButton } from './Button.jsx'
import Search from './Search.jsx'
import Brand from './Brand.jsx'
import { device } from '../shared/devices.js'
import img from '../../asetts/movieposters.jpg'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em 3em;
    height: 250px;
`

const HeaderBackground = styled.img`
    opacity: 0.4;
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    background-image: url(${img});
    background-color: #232323;
    width: 100%;
    height: 250px;
`

const HeaderContent = styled.div`
    position: relative;
`

const SearchLabel = styled.h1`
    text-transform: uppercase;
    font-size: 2em;
    color: #ffffff;

    @media ${device.laptop} {
        font-size: 3em;
    }
`

const SearchWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
`

function Header() {
    return (
        <HeaderContainer>
            <HeaderBackground></HeaderBackground>
            <HeaderContent>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Brand />
                    <AddMovieButton>+ Add movie</AddMovieButton>
                </div>
                <SearchWrapper>
                    <SearchLabel>Find your movie</SearchLabel>
                    <Search />
                </SearchWrapper>
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header
