import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SortBy } from './SortBy.jsx'
import Genres from '../data/genres'

const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
`

const Genre = styled.span`
    text-transform: uppercase;
`

function ResultsFilter(props) {
    return (
        <FilterWrapper>
            {Genres.map((genre, index) => (
                <Genre key={genre} onClick={() => props.onSelectGenre(index)}>
                    {genre}
                </Genre>
            ))}

            <SortBy
                onOptionSelected={(id) => props.onOptionSelected(id)}
                selectedSortByOption={'name'}
            />
        </FilterWrapper>
    )
}

ResultsFilter.PropTypes = {
    selectedGenre: PropTypes.oneOf(Genres),
    selectedSortByOption: PropTypes.string.isRequired,
    onSelectGenre: PropTypes.func.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
}

export { ResultsFilter }
