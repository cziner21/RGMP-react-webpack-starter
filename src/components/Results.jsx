import React, { useContext } from 'react'
import styled from 'styled-components'

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
    const ctx = useContext(AppContext)

    return (
        <ResultsContainer currentMovie={ctx.currentMovie}>
            {movies.map((item) => (
                <Movie
                    key={item.id}
                    movie={item}
                    onEditMovie={() => onEditMovie(item.id)}
                    onDeleteMovie={() => onDeleteMovie(item.id)}
                />
            ))}
        </ResultsContainer>
    )
}

export { SearchResults }
