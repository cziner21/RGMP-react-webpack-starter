import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { useSearchParams } from 'react-router-dom'

import { setSearchQuery, defaultSearchParams } from '../data/moviesSlice'

import StyledInput from './Input.jsx'
import { Button } from './Button/Button.jsx'
import { useEffect } from 'react'

const SearchBar = styled.div`
    display: flex;

    & input {
        margin-right: 0.5em;
    }
`

function Search() {
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()

    const handleButtonClicked = (value) => {
        console.log(`Search button clicked ${value}`)
        dispatch(
            setSearchQuery({
                ...defaultSearchParams,
                search: value,
                searchBy: 'title',
            })
        )

        setSearchParams({ title: value })
    }

    const searchTerm = searchParams.get('title') || ''

    // useEffect(() => {
    //     if (searchTerm.length > 0) {
    //         dispatch(
    //             setSearchQuery({
    //                 ...defaultSearchParams,
    //                 search: searchTerm,
    //                 searchBy: 'title',
    //             })
    //         )
    //     }
    // }, [searchTerm])

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
                        value={searchTerm}
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
