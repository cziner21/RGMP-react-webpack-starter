import React from 'react'
import styled from 'styled-components'

import { device } from '../shared/devices.js'
import { Movie } from './Movie/Movie.jsx'

const ResultsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-column-gap: 1em;
    grid-row-gap: 2em;
    justify-items: center;
    height: calc(100vh - 250px - 3em - 3em - 2.2em);
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
    return (
        <ResultsContainer>
            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />

            <Movie
                title="Pulp Fiction"
                genre={['Drama', 'Crime']}
                releaseDate={1994}
            />
        </ResultsContainer>
    )
}

export { SearchResults }
