import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'

import { setSearchParams, defaultSearchParams } from '../data/moviesSlice'

import StyledInput from './Input.jsx'
import { Button } from './Button.jsx'

const SearchBar = styled.div`
    display: flex;

    & input {
        margin-right: 0.5em;
    }
`

function Search() {
    const dispatch = useDispatch()

    const handleButtonClicked = (value) => {
        console.log(`Search button clicked ${value}`)
        dispatch(
            setSearchParams({
                ...defaultSearchParams,
                search: value,
                searchBy: 'title',
            })
        )
    }

    return (
        <SearchBar>
            <Formik
                initialValues={{
                    search: '',
                }}
            >
                <Form style={{ display: 'contents' }}>
                    <StyledInput
                        name="search"
                        placeholder={'What do you want to watch?'}
                        onEnterPressed={(value) => handleButtonClicked(value)}
                    />
                </Form>
            </Formik>
            <Button onClick={() => handleButtonClicked()}>Search</Button>
        </SearchBar>
    )
}

export default Search
