import React, { useContext } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import { AddMovieButton, SearchButton } from '../button/button'
import Search from '../searchBar/searchBar'
import Brand from '../brand/brand'
import Details from '../movie/details/details'
import { device } from '../../shared/devices'

import { AppContext } from '../mainLayout/mainLayout'

const HeaderBackground = (props) => {
    return (
        <Image
            style={{
                backgroundSize: 'cover',
                backgroundColor: '#232323',
                left: '0',
                top: '0',
                position: 'absolute',
                opacity: '0.4',
            }}
            src={'/public/movieposters.jpg'}
            alt={'movieposters'}
            width={'100%'}
            height={250}
        />
    )
}

// const HeaderBackground = styled.img`
//     opacity: ${(props) => (props.currentMovie ? 1 : 0.4)};
//     position: absolute;
//     left: 0;
//     top: 0;
//     background-size: cover;
//     background-image: ${(props) =>
//         props.currentMovie ? `none` : `url(/movieposters.jpg)`};
//     background-color: #232323;
//     width: 100%;
//     height: ${(props) => (props.currentMovie ? `350px` : `250px`)};
// `

const SearchWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
`

function Header({ onAddMovie }) {
    const ctx = useContext(AppContext)

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1em 3em',
                height: '250px',
            }}
        >
            <HeaderBackground />
            <div
                style={{
                    position: 'relative',
                }}
            >
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

                <div
                    style={{
                        width: '70%',
                        margin: '0 auto',
                    }}
                >
                    <h1
                        style={{
                            textTransform: 'uppercase',
                            fontSize: '2em',
                            color: '#ffffff',
                            letterSpacing: '0.1em',
                        }}
                    >
                        Find your movie
                    </h1>
                    <Search />
                </div>
            </div>
        </div>
    )
}

export default Header
