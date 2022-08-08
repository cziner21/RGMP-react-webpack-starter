import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import NotFound from '../404.jsx'

import {
    allMovies,
    getMoviesError,
    getMoviesStatus,
    MoviesStatuses,
    fetchMovies,
    getSearchQuery,
    setSelectedGenres,
    getMovie,
    getMoviesType,
} from '../../data/moviesSlice.js'

import { device } from '../../shared/devices.js'
import { Movie } from '../Movie/Movie.jsx'
import { AppContext } from '../MainLayout.jsx'
import Count from '../Count.jsx'

const ResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    justify-items: center;
    height: ${(props) =>
        props.currentMovie
            ? `calc(100vh - 350px - 3em - 3em - 1.2em - 1.05em)`
            : `calc(100vh - 250px - 3em - 3em - 1.2em - 1.05em - 1.4rem)`};
    overflow-y: auto;
    margin: 0 -3em;
    ::-webkit-scrollbar {
        width: 10px;
    }
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }

    @media ${device.mobileM} {
        grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.tablet} {
        grid-template-columns: repeat(3, 1fr);
    }

    @media ${device.laptop} {
        grid-template-columns: repeat(4, 1fr);
    }
`

function SearchResults() {
    const dispatch = useDispatch()
    const moviesFromRedux = useSelector(allMovies)
    const moviesStatus = useSelector(getMoviesStatus)
    const isSingleMovie = useSelector(getMoviesType)
    const error = useSelector(getMoviesError)
    const searchQuery = useSelector(getSearchQuery)

    const ctx = useContext(AppContext)

    const [searchParams, setSearchParams] = useSearchParams()
    const movieTitle = searchParams.get('title') || ''
    const movieId = searchParams.get('movie') || ''
    const movieGenre = searchParams.get('genre') || ''
    const movieSortBy = searchParams.get('sortBy') || ''
    const movieSortOrder = searchParams.get('order') || 'asc'

    useEffect(() => {
        if (moviesStatus === MoviesStatuses.idle && !isSingleMovie) {
            dispatch(fetchMovies({}))
            return
        }

        if (moviesStatus === MoviesStatuses.idle && isSingleMovie) {
            dispatch(getMovie(movieId))
            return
        }
    }, [moviesStatus, isSingleMovie, movieId, dispatch])

    useEffect(() => {
        // If there are search parameters in URL we use them, otherwise we use the parameters from redux
        let query = { ...searchQuery }

        if (movieTitle.length > 0) {
            query.search = movieTitle
            query.searchBy = 'title'
        }

        if (movieGenre.length > 0) {
            query.filter = movieGenre

            dispatch(setSelectedGenres([movieGenre]))
        }

        if (movieSortBy.length > 0) {
            query.sortBy = movieSortBy
            query.sortOrder = movieSortOrder
        }

        if (movieId.length > 0) {
            dispatch(getMovie(movieId))
            return
        }

        dispatch(fetchMovies(query))
    }, [searchQuery, movieTitle, movieId, movieGenre, movieSortBy])

    let content

    switch (moviesStatus) {
        case MoviesStatuses.loading: {
            content = <p>Loading...</p>
            break
        }
        case MoviesStatuses.succeeded: {
            if (!moviesFromRedux) {
                content = <p>Fetching data...</p>
                break
            }

            if (isSingleMovie) {
                content = (
                    <Movie
                        key={moviesFromRedux.id}
                        movie={moviesFromRedux}
                        onEditMovie={() =>
                            ctx.onHandleEditMovieClick(moviesFromRedux.id)
                        }
                        onDeleteMovie={() =>
                            ctx.onHandleDeleteMovieClick(moviesFromRedux.id)
                        }
                    />
                )
                break
            }

            content = moviesFromRedux.map((item) => (
                <Movie
                    key={item.id}
                    movie={item}
                    onEditMovie={() => ctx.onHandleEditMovieClick(item.id)}
                    onDeleteMovie={() => ctx.onHandleDeleteMovieClick(item.id)}
                />
            ))
            break
        }
    }

    if (moviesStatus === MoviesStatuses.failed) {
        return <NotFound message={error} />
    }

    return (
        <>
            <Count numberOfMovies={moviesFromRedux.length} />
            <ResultsContainer currentMovie={ctx.currentMovie}>
                {content}
            </ResultsContainer>
        </>
    )
}

export { SearchResults }
