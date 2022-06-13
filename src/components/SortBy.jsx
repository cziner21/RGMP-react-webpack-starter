import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { sortByOptions } from '../data/sortByOptions'
import Select from './Select.jsx'

const Container = styled.div`
    display: flex;
    align-items: center;
`

const StyledLabel = styled.label`
    text-transform: uppercase;
    color: #555555;
    margin-right: 1em;
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
            (x) => x.id === props.selectedSortByOption.id
        )
        const remainingOptions = sortByOptions.filter(
            (x) => x.id !== props.selectedSortByOption.id
        )

        setFilteredSortByOptions([first, ...remainingOptions])
    }

    if (!props.selectedSortByOption) {
        return null
    }

    return (
        <Container>
            <StyledLabel>Sort by</StyledLabel>

            <Select
                selectedItem={props.selectedSortByOption.name}
                items={filteredSortByOptions}
                onItemClicked={(id) => props.onOptionSelected(id)}
            />
        </Container>
    )
}

SortBy.PropTypes = {
    selectedSortByOption: PropTypes.any.isRequired,
    onOptionSelected: PropTypes.func.isRequired,
}

export { SortBy }
