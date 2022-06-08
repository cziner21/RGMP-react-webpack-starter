import React, { useState, useEffect } from 'react'

import './app.css'
import ErrorBoundary from './ErrorBoundary.jsx'
import { Button, AddMovieButton } from './Button.jsx'
import { ResultsFilter } from './Filter.jsx'
import Search from './Search.jsx'
import Header from './header.jsx'
import Footer from './Footer.jsx'
import Container from './Container.jsx'
import { SearchResults } from './Results.jsx'

import Genres from '../data/genres'

const App = () => {
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [selectedSortByOption, setSelectedSortByOption] = useState(null)

    useEffect(() => {
        setSelectedGenre(Genres[0])
    }, [])

    return (
        <ErrorBoundary>
            <div className="app">
                <Header />
                <Container>
                    <ResultsFilter
                        onSelectGenre={(index) =>
                            setSelectedGenre(Genres[index])
                        }
                        onOptionSelected={(id) => setSelectedSortByOption(id)}
                    ></ResultsFilter>
                    <SearchResults />
                </Container>
                <Footer />
            </div>
        </ErrorBoundary>
    )
}

export default App
