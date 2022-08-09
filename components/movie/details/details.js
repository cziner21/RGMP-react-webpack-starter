import React, { useContext } from 'react'
import styled from 'styled-components'

import CoverImage from '../image/image'
import { AppContext } from '../../mainLayout/mainLayout'

import { Title } from '../title/title'
import MovieGenres from '../genres/genres'

const Wrapper = styled.div`
    display: flex;
`

const Content = styled.div`
    margin-left: 2em;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    max-width: 70%;
`

const Rating = styled.div`
    margin-left: 1em;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    padding: 1em;
    border: solid 2px #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: #ffffff;
`

const ReleaseDate = styled.span`
    color: #f65261;
    margin-right: 2em;
`

const Duration = styled.span`
    color: #f65261;
`

const Description = styled.div`
    margin-top: 1em;
`

function Details() {
    const ctx = useContext(AppContext)

    return (
        <Wrapper>
            <CoverImage imagePath={ctx.currentMovie.poster_path} />
            <Content>
                <div className="flex align-items-center">
                    <Title>{ctx.currentMovie.title}</Title>
                    <Rating>{ctx.currentMovie.vote_average}</Rating>
                </div>
                <MovieGenres genres={ctx.currentMovie.genres} />
                <div
                    style={{
                        marginTop: '1em',
                    }}
                >
                    <ReleaseDate>{ctx.currentMovie.release_date}</ReleaseDate>
                    <Duration>{ctx.currentMovie.runtime} min</Duration>
                </div>
                <Description data-cy="movie-description">
                    {ctx.currentMovie.overview}
                </Description>
            </Content>
        </Wrapper>
    )
}

export default Details
