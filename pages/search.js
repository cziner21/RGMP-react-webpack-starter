import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { BASE_URL, defaultSearchParams } from './api/moviesSlice'

import Container from '../components/container/container'
import { ResultsFilter } from '../components/filter/filter'
import { SearchResults } from '../components/results/results'

const getMovies = async (searchParams) => {
    const params = {
        sortBy: searchParams.sortBy ? searchParams.sortBy : 'title',
        sortOrder: searchParams.sortOrder ? searchParams.sortOrder : 'asc',
        search: searchParams.search ? searchParams.search : null,
        searchBy: searchParams.searchBy ? searchParams.searchBy : null,
        filter: searchParams.filter ? searchParams.filter : null,
        offset: searchParams.offset ? searchParams.offset : null,
        limit: searchParams.limit ? searchParams.limit : 100,
    }

    const { data } = await axios.get(BASE_URL, {
        params: params,
    })

    debugger
    return data
}

export async function getServerSideProps(context) {
    const { query } = context

    let searchQuery = { ...defaultSearchParams }
    if (query.search?.length > 0) {
        searchQuery.search = query.search
        searchQuery.searchBy = 'title'
    }

    if (query.genre?.length > 0) {
        searchQuery.filter = query.genre
    }

    if (query.sortBy?.length > 0) {
        searchQuery.sortBy = query.sortBy
        searchQuery.sortOrder = query?.sortOrder ? query.sortOrder : 'asc'
    }

    if (query.sortBy?.length > 0) {
        searchQuery.sortBy = query.sortBy
        searchQuery.sortOrder = query?.sortOrder ? query.sortOrder : 'asc'
    }

    const response = await getMovies(searchQuery)
    debugger
    return {
        props: {
            data: response.data,
        },
    }
}

export default function Search({ data, context }) {
    const router = useRouter()

    return (
        <Container>
            <ResultsFilter />
            <SearchResults data={data} />
        </Container>
    )
}
