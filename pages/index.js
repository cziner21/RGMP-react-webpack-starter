import React from 'react'
import axios from 'axios'

import { BASE_URL, defaultSearchParams } from './api/moviesSlice'
import Container from '../components/container/container'
import { ResultsFilter } from '../components/filter/filter'
import { SearchResults } from '../components/results/results'

const getMovies = async () => {
    const { data } = await axios.get(BASE_URL, {
        params: defaultSearchParams,
    })

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
