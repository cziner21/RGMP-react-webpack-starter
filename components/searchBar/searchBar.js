import React, { useState } from 'react'
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
import Link from 'next/link'

const SearchBar = styled.div`
    display: flex;
    & input {
        margin-right: 0.5em;
    }
`

function Search() {
    const dispatch = useDispatch()
    const router = useRouter()
    const [currentValue, setCurrentValue] = useState('')

    const { title } = router.query

    const handleButtonClicked = (value) => {
        //http://localhost:4000/movies?sortBy=title&sortOrder=asc&search=clover&searchBy=title&limit=100
        router.push('/search')
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
                        onHandleChange={(value) => setCurrentValue(value)}
                    />
                </Form>
            </Formik>
            <Link href={`/search?search=${currentValue}`}>
                <a
                    style={{
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                    data-testid={'search-button'}
                    onClick={() => handleButtonClicked()}
                >
                    Search
                </a>
            </Link>
        </SearchBar>
    )
}

export default Search
