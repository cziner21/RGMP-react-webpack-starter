import React, { useContext } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import { AddMovieButton, SearchButton } from '../button/button'
import Search from '../searchBar/searchBar'
import Brand from '../brand/brand'
import Details from '../movie/details/details'
import { device } from '../../shared/devices'

import { AppContext } from '../mainLayout/mainLayout'

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
        props.currentMovie ? `none` : `url(/movieposters.jpg)`};
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

                <SearchWrapper>
                    <SearchLabel>Find your movie</SearchLabel>
                    <Search />
                </SearchWrapper>
            </HeaderContent>
        </HeaderContainer>
    )
}

export default Header
