import React from 'react'

import Container from './Container.jsx'
import { ResultsFilter } from './Filter.jsx'
import { SearchResults } from './Results/Results.jsx'

const Home = () => {
    return (
        <Container>
            <ResultsFilter />
            <SearchResults />
        </Container>
    )
}

export default Home
