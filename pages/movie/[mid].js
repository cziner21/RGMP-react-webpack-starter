import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import axios from 'axios'

import { BASE_URL } from '../api/moviesSlice'

import NotFound from '../../components/404/404'
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

const getMovie = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        debugger
        return response
    } catch (error) {
        return error.message
    }
}

export async function getServerSideProps(context) {
    const { params } = context

    const response = await getMovie(params.mid)

    return {
        props: {
            data: response.data,
        },
    }
}

const MoviePage = ({ data }) => {
    const { query } = useRouter()

    if (!data) {
        return <NotFound />
    }

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <CoverImage imagePath={data?.poster_path} />
                <div
                    style={{
                        marginLeft: '2em',
                        color: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        maxWidth: '70%',
                    }}
                >
                    <div className="flex align-items-center">
                        <Title>{data?.title}</Title>
                        <div
                            style={{
                                marginLeft: '1em',
                                borderRadius: '50%',
                                height: '40px',
                                width: '40px',
                                padding: '1em',
                                border: 'solid 2px #ffffff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                color: '#ffffff',
                            }}
                        >
                            {data?.vote_average}
                        </div>
                    </div>
                    <MovieGenres genres={data?.genres} />
                    <div
                        style={{
                            marginTop: '1em',
                        }}
                    >
                        <div
                            style={{
                                color: '#f65261',
                                marginRight: '2em',
                            }}
                        >
                            {data?.release_date}
                        </div>
                        <Duration>{data?.runtime} min</Duration>
                    </div>
                    <Description data-cy="movie-description">
                        {data?.overview}
                    </Description>
                </div>
            </div>
        </Container>
    )
}

export default MoviePage
