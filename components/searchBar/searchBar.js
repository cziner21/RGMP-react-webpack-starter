import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import { useRouter } from 'next/router'

import {
    setSearchQuery,
    defaultSearchParams,
} from '../../pages/api/moviesSlice'

import StyledInput from '../input/input'
import { Button } from '../button/button'

const SearchBar = styled.div`
    display: flex;
    & input {
        margin-right: 0.5em;
    }
`

function Search() {
    const dispatch = useDispatch()
    const router = useRouter()

    const { title } = router.query

    const handleButtonClicked = (value) => {
        console.log(`Search button clicked ${value}`)
        dispatch(
            setSearchQuery({
                ...defaultSearchParams,
                search: value,
                searchBy: 'title',
            })
        )

        //setSearchParams({ title: value })
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
                        value={title}
                        placeholder={'What do you want to watch?'}
                        onEnterPressed={(value) => handleButtonClicked(value)}
                    />
                </Form>
            </Formik>
            <Button
                data-testid={'search-button'}
                onClick={() => handleButtonClicked()}
            >
                Search
            </Button>
        </SearchBar>
    )
}

export default Search
