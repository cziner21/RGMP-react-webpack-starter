import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { AppContext } from '../../components/mainLayout/mainLayout'
import Container from '../../components/container/container'
import CoverImage from '../../components/movie/image/image'
import { Title } from '../../components/movie/manage/manage'
import MovieGenres from '../../components/movie/genres/genres'
//import Details from '../components/movie/details/details'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
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

const MoviePage = () => {
    const ctx = useContext(AppContext)
    const { query } = useRouter()

    if (!ctx.currentMovie) {
        return <></>
    }

    return (
        <Container>
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
                        <ReleaseDate>
                            {ctx.currentMovie.release_date}
                        </ReleaseDate>
                        <Duration>{ctx.currentMovie.runtime} min</Duration>
                    </div>
                    <Description data-cy="movie-description">
                        {ctx.currentMovie.overview}
                    </Description>
                </Content>
            </Wrapper>
        </Container>
    )
}

export default MoviePage
