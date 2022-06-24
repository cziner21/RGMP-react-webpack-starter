import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import {
    allMovies,
    getMoviesError,
    getMoviesStatus,
    MoviesStatuses,
    fetchMovies,
    getSearchParams,
} from '../data/moviesSlice.js'

import { device } from '../shared/devices.js'
import { Movie } from './Movie/Movie.jsx'
import { AppContext } from './App.js'

const ResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    justify-items: center;
    height: ${(props) =>
        props.currentMovie
            ? `calc(100vh - 350px - 3em - 3em - 1.2em - 1.05em)`
            : `calc(100vh - 250px - 3em - 3em - 1.2em - 1.05em)`};
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

function SearchResults({ movies, onEditMovie, onDeleteMovie }) {
    const dispatch = useDispatch()
    const moviesFromRedux = useSelector(allMovies)
    const moviesStatus = useSelector(getMoviesStatus)
    const error = useSelector(getMoviesError)
    const searchParams = useSelector(getSearchParams)

    const ctx = useContext(AppContext)

    useEffect(() => {
        if (moviesStatus === MoviesStatuses.idle) {
            dispatch(fetchMovies({}))
        }
    }, [moviesStatus, dispatch])

    useEffect(() => {
        console.log(searchParams)
        dispatch(fetchMovies(searchParams))
    }, [searchParams])

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

            content = moviesFromRedux.map((item) => (
                <Movie
                    key={item.id}
                    movie={item}
                    onEditMovie={() => onEditMovie(item.id)}
                    onDeleteMovie={() => onDeleteMovie(item.id)}
                />
            ))
            break
        }
        case MoviesStatuses.failed: {
            content = <p>{error}</p>
            break
        }
    }

    return (
        <ResultsContainer currentMovie={ctx.currentMovie}>
            {content}
        </ResultsContainer>
    )
}

export { SearchResults }
