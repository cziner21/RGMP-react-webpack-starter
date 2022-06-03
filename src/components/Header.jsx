import React from 'react'
import styled from 'styled-components'

import { Button, AddMovieButton } from './Button.jsx'
import Search from './Search.jsx'

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
    font-size: 3em;
    color: #ffffff;
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
                    <div style={{ color: '#f65261' }}>
                        <strong>netflix</strong>roulette
                    </div>
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
