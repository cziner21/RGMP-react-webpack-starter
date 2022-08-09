import React, { useContext } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { SortBy } from '../sortBy/sortBy'
import { AppContext } from '../mainLayout/mainLayout'

import { allGenres, getSelectedGenres } from '../../pages/api/moviesSlice'

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

function ResultsFilter() {
    const genres = useSelector(allGenres)
    const seletedGenres = useSelector(getSelectedGenres)

    const ctx = useContext(AppContext)

    return (
        <FilterWrapper>
            {genres.map((genre) => (
                <Genre
                    key={genre}
                    isSelected={genre === seletedGenres[0]}
                    onClick={() => ctx.onHandleGenreSelect(genre)}
                >
                    {genre}
                </Genre>
            ))}

            <SortBy
                onOptionSelected={(id) => ctx.onHandleSortingChanged(id)}
                selectedSortByOption={ctx.selectedSortByOption}
            />
        </FilterWrapper>
    )
}

export { ResultsFilter }
