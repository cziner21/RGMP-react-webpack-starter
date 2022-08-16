import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'

import NotFound from '../404/404'

import {
    BASE_URL,
    // allMovies,
    // getMoviesError,
    // getMoviesStatus,
    // MoviesStatuses,
    // fetchMovies,
    // getSearchQuery,
    // setSelectedGenres,
    // getMovie,
    // getMoviesType,
} from '../../pages/api/moviesSlice'

import { device } from '../../shared/devices'
import { Movie } from '../movie/movie'
import { AppContext } from '../mainLayout/mainLayout'
import Count from '../count/count'

const ResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    justify-items: center;
    height: calc(100vh - 250px - 3em - 3em - 1.2em - 1.05em - 1.4rem);
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

function SearchResults({ data }) {
    //const dispatch = useDispatch()
    // const router = useRouter()

    //const moviesFromRedux = useSelector(allMovies)
    // const moviesStatus = useSelector(getMoviesStatus)
    // const isSingleMovie = useSelector(getMoviesType)
    // const error = useSelector(getMoviesError)
    // const searchQuery = useSelector(getSearchQuery)

    //const ctx = useContext(AppContext)

    //const [searchParams, setSearchParams] = useSearchParams()
    //console.log(router)
    // const title = router.query['title'] || ''
    // const movie = router.query['movie'] || ''
    // const genre = router.query['genre'] || ''
    // const sortBy = router.query['sortBy'] || ''
    // const order = router.query['order'] || 'asc'

    // useEffect(() => {
    //     if (moviesStatus === MoviesStatuses.idle && !isSingleMovie) {
    //         dispatch(fetchMovies({}))
    //         return
    //     }

    //     if (moviesStatus === MoviesStatuses.idle && isSingleMovie) {
    //         dispatch(getMovie(movieId))
    //         return
    //     }
    // }, [moviesStatus, isSingleMovie, allMovies, dispatch])

    // useEffect(() => {
    //     // If there are search parameters in URL we use them, otherwise we use the parameters from redux
    //     let query = { ...searchQuery }

    //     if (title.length > 0) {
    //         query.search = title
    //         query.searchBy = 'title'
    //     }

    //     if (genre.length > 0) {
    //         query.filter = genre

    //         dispatch(setSelectedGenres([genre]))
    //     }

    //     if (sortBy.length > 0) {
    //         query.sortBy = sortBy
    //         query.sortOrder = order
    //     }

    //     if (movie.length > 0) {
    //         dispatch(getMovie(movie))
    //         return
    //     }

    //     console.log(query)

    //     dispatch(fetchMovies(query))
    // }, [searchQuery, title, movie, genre, sortBy])

    let content

    if (!data) {
        return <NotFound />
    }

    if (data?.length === 0) {
        content = <p>LOADING...</p>
    }

    if (data?.length === 1) {
        content = (
            <Link href={`/movie/${data[0].id}`}>
                <a
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <Movie
                        key={data[0].id}
                        movie={data[0]}
                        onEditMovie={() => {}}
                        onDeleteMovie={() => {}}
                    />
                </a>
            </Link>
        )
    }

    if (data?.length > 1) {
        content = data.map((item) => (
            <Link href={`/movie/${item.id}`}>
                <a
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                >
                    <Movie
                        key={item.id}
                        movie={item}
                        onEditMovie={() => {}}
                        onDeleteMovie={() => {}}
                    />
                </a>
            </Link>
        ))
    }

    return (
        <>
            <Count numberOfMovies={data?.length} />

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gridColumnGap: '1em',
                    gridRowGap: '2em',
                    justifyItems: 'center',
                    height: 'calc(100vh - 250px - 3em - 3em - 1.2em - 1.05em - 1.4rem)',
                    overflowY: 'auto',
                    margin: '0 -3em',
                }}
            >
                {content}
            </div>
        </>
    )
}

export { SearchResults }
