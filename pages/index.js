import React from 'react'
import axios from 'axios'

import { BASE_URL } from './api/moviesSlice'
import Container from '../components/container/container'
import { ResultsFilter } from '../components/filter/filter'
import { SearchResults } from '../components/results/results'

const getMovies = async () => {
    const params = {
        sortBy: 'title',
        sortOrder: 'asc',
        search: null,
        searchBy: null,
        filter: null,
        offset: null,
        limit: 100,
    }

    const { data } = await axios.get(BASE_URL, {
        params: params,
    })

    console.log(data)
    return data
}

export async function getServerSideProps(context) {
    const response = await getMovies()

    return {
        props: {
            data: response.data,
        },
    }
}

const Home = ({ data }) => {
    return (
        <Container>
            <ResultsFilter />
            <SearchResults data={data} />
        </Container>
    )
}

export default Home
