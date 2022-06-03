import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Genres from '../data/genres'

const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Genre = styled.span`
    text-transform: uppercase;
`

function ResultsFilter() {
    return (
        <FilterWrapper>
            {Genres.map((genre) => (
                <Genre key={genre}>{genre}</Genre>
            ))}
        </FilterWrapper>
    )
}

ResultsFilter.PropTypes = {
    selectedGenre: PropTypes.oneOf(Genres),
}

export { ResultsFilter }
