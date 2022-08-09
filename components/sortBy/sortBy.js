import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { sortByOptions } from '../../pages/api/sortByOptions'
import Select from '../select/select'

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
    if (!props.selectedSortByOption) {
        return null
    }

    return (
        <Container>
            <StyledLabel>Sort by</StyledLabel>

            <Select
                selectedItem={props.selectedSortByOption}
                items={sortByOptions}
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
