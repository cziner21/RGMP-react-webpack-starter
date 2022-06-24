import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { SortBy } from './SortBy.jsx'

import { allGenres, getSelectedGenres } from '../data/moviesSlice.js'

const FilterWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    align-items: center;
`

const Genre = styled.span`
    text-transform: uppercase;
    color: ${(props) => (props.isSelected ? '#f65261' : '#ffffff')};
`

function ResultsFilter(props) {
    const genres = useSelector(allGenres)
    const seletedGenres = useSelector(getSelectedGenres)

    return (
        <FilterWrapper>
            {genres.map((genre) => (
                <Genre
                    key={genre}
                    isSelected={genre === seletedGenres[0]}
                    onClick={() => props.onSelectGenre(genre)}
                >
                    {genre}
                </Genre>
            ))}

            <SortBy
                onOptionSelected={(id) => props.onOptionSelected(id)}
                selectedSortByOption={props.selectedSortByOption}
            />
        </FilterWrapper>
    )
}

ResultsFilter.PropTypes = {
    selectedGenre: PropTypes.oneOf(allGenres),
    selectedSortByOption: PropTypes.string.isRequired,
    onSelectGenre: PropTypes.func.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
}

export { ResultsFilter }
