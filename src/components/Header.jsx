import React, { useContext } from 'react'
import styled from 'styled-components'

import { Button, AddMovieButton, SearchButton } from './Button.jsx'
import Search from './Search.jsx'
import Brand from './Brand.jsx'
import Details from './Movie/Details.jsx'
import { device } from '../shared/devices.js'
import img from '../../asetts/movieposters.jpg'
import { AppContext } from './MainLayout.jsx'

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em 3em;
    height: ${(props) => (props.currentMovie ? `350px` : `250px`)};
`

const HeaderBackground = styled.img`
    opacity: ${(props) => (props.currentMovie ? 1 : 0.4)};
    position: absolute;
    left: 0;
    top: 0;
    background-size: cover;
    background-image: ${(props) =>
        props.currentMovie ? `none` : `url(${img})`};
    background-color: #232323;
    width: 100%;
    height: ${(props) => (props.currentMovie ? `350px` : `250px`)};
`

const HeaderContent = styled.div`
    position: relative;
`

export const SearchLabel = styled.h1`
    text-transform: uppercase;
    font-size: 2em;
    color: #ffffff;
    letter-spacing: 0.1em;

    @media ${device.laptop} {
        font-size: 3em;
    }
`

const SearchWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
`

function Header({ onAddMovie }) {
    const ctx = useContext(AppContext)

    return (
        <HeaderContainer currentMovie={ctx.currentMovie}>
            <HeaderBackground
                currentMovie={ctx.currentMovie}
            ></HeaderBackground>
            <HeaderContent>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Brand />
                    {ctx.currentMovie ? (
                        <SearchButton
                            onClick={() => ctx.onSetCurrentMovie(null)}
                        >
                            🔎
                        </SearchButton>
                    ) : (
                        <AddMovieButton onClick={() => onAddMovie()}>
                            + Add movie
                        </AddMovieButton>
                    )}
                </div>
                {ctx.currentMovie ? (
                    <Details />
                ) : (
                    <SearchWrapper>
                        <SearchLabel>Find your movie</SearchLabel>
                        <Search />
                    </SearchWrapper>
                )}
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header
