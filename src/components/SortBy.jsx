import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { sortByOptions } from '../data/sortByOptions'

const StyledLabel = styled.label`
    text-transform: uppercase;
    color: #555555;
    margin-right: 2em;
`

function SortBy(props) {
    const [filteredSortByOptions, setFilteredSortByOptions] = useState([])

    useEffect(() => {
        filterSortByOptions()
    }, [])

    useEffect(() => {
        filterSortByOptions()
    }, [props.selectedSortByOption])

    const filterSortByOptions = () => {
        if (!props.selectedSortByOption) {
            setFilteredSortByOptions(sortByOptions)
            return
        }

        const first = sortByOptions.find(
            (x) => x.id === props.selectedSortByOption
        )
        const remainingOptions = sortByOptions.filter(
            (x) => x.id !== props.selectedSortByOption
        )

        setFilteredSortByOptions([first, ...remainingOptions])
    }

    return (
        <div>
            <StyledLabel>Sort by</StyledLabel>
            <select name="sort-by">
                {filteredSortByOptions.map((x) => (
                    <option
                        key={x.id}
                        value={x.id}
                        onClick={props.onOptionSelected(x.id)}
                    >
                        {x.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

SortBy.PropTypes = {
    selectedSortByOption: PropTypes.string.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
}

export { SortBy }
