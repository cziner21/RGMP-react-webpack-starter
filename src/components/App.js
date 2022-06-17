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
import Modal from './Modal.jsx'
import ManageMovie from './Movie/Manage.jsx'

import Genres from '../data/genres'
import { Movies } from '../data/movies'
import { sortByOptions } from '../data/sortByOptions'
import orderBy from '../shared/orderBy'

const App = () => {
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [selectedSortByOption, setSelectedSortByOption] = useState(null)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [currentMovie, setCurrentMovie] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [filteredMovies, setFilteredMovies] = useState([])

    useEffect(() => {
        setSelectedGenre(Genres[0])
        setSelectedSortByOption(sortByOptions[0])

        setFilteredMovies(orderBy(Movies, sortByOptions[0].id))
    }, [])

    const handleSortingChanged = (id) => {
        console.log(id)
        setSelectedSortByOption(sortByOptions.find((x) => x.id === id))
        console.log(orderBy(Movies, id))
        setFilteredMovies(orderBy(Movies, id))
    }

    const handleAddMovieClick = () => {
        if (isModalOpened) {
            return
        }

        setIsDeleting(false)
        setCurrentMovie(null)
        setIsModalOpened(true)
    }

    const handleEditMovieClick = (id) => {
        if (isModalOpened) {
            return
        }

        const currentMovie = Movies.find((x) => x.id === id)

        setIsDeleting(false)
        setCurrentMovie(currentMovie)
        setIsModalOpened(true)
    }

    const handleDeleteMovieClick = (id) => {
        if (isModalOpened) {
            return
        }

        const currentMovie = Movies.find((x) => x.id === id)

        setIsDeleting(true)
        setIsModalOpened(true)
    }

    return (
        <ErrorBoundary>
            <div className="app">
                <Header onAddMovie={() => handleAddMovieClick()} />
                <Container>
                    <ResultsFilter
                        selectedGenre={selectedGenre}
                        selectedSortByOption={selectedSortByOption}
                        onSelectGenre={(index) =>
                            setSelectedGenre(Genres[index])
                        }
                        onOptionSelected={(id) => handleSortingChanged(id)}
                    ></ResultsFilter>
                    <SearchResults
                        movies={filteredMovies}
                        onEditMovie={(id) => handleEditMovieClick(id)}
                        onDeleteMovie={(id) => handleDeleteMovieClick(id)}
                    />
                </Container>
                <Footer />
                <Modal
                    onHandleClose={() => setIsModalOpened(false)}
                    isOpen={isModalOpened}
                >
                    <ManageMovie movie={currentMovie} isDeleting={isDeleting} />
                </Modal>
            </div>
        </ErrorBoundary>
    )
}

export default App
