import React, { useState, useEffect, useCallback } from 'react'

import { useDispatch } from 'react-redux'

import {
    setSearchParams,
    defaultSearchParams,
    setSelectedGenres,
    setSelectedMovieId,
} from '../data/moviesSlice'

import './app.css'
import ErrorBoundary from './ErrorBoundary.jsx'
import { Button, AddMovieButton } from './Button.jsx'
import { ResultsFilter } from './Filter.jsx'
import Search from './Search.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Container from './Container.jsx'
import { SearchResults } from './Results.jsx'
import Modal from './Modal.jsx'
import ManageMovie from './Movie/Manage.jsx'

import { allGenres } from '../data/moviesSlice'

import { Movies, getMovies } from '../data/movies'
import { sortByOptions } from '../data/sortByOptions'
import orderBy from '../shared/orderBy'

const App = () => {
    const [selectedGenre, setSelectedGenre] = useState(null)
    const [selectedSortByOption, setSelectedSortByOption] = useState(null)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [currentMovie, setCurrentMovie] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        setSelectedGenre(allGenres[0])
        setSelectedSortByOption(sortByOptions[0])
    }, [])

    const handleSortingChanged = (id) => {
        setSelectedSortByOption(sortByOptions.find((x) => x.id === id))
    }

    useEffect(() => {
        if (!selectedSortByOption) {
            return
        }

        dispatch(
            setSearchParams({
                ...defaultSearchParams,
                sortBy: selectedSortByOption.id,
                sortOrder: 'asc',
            })
        )
    }, [selectedSortByOption])

    const handleGenreSelect = (value) => {
        setSelectedGenre(allGenres[value])

        dispatch(setSelectedGenres([value]))

        dispatch(
            setSearchParams({
                ...defaultSearchParams,
                filter: value,
            })
        )
    }

    const handleAddMovieClick = () => {
        if (isModalOpened) {
            return
        }

        dispatch(setSelectedMovieId(null))

        setIsDeleting(false)
        setCurrentMovie(null)
        setIsModalOpened(true)
    }

    const handleEditMovieClick = (id) => {
        if (isModalOpened) {
            return
        }

        // --- Set selected movie id to global store
        dispatch(setSelectedMovieId(id))

        const currentMovie = Movies.find((x) => x.id === id)

        setIsDeleting(false)
        setCurrentMovie(currentMovie)
        setIsModalOpened(true)
    }

    const handleDeleteMovieClick = (id) => {
        if (isModalOpened) {
            return
        }

        // --- Set selected movie id to global store
        dispatch(setSelectedMovieId(id))

        setIsDeleting(true)
        setIsModalOpened(true)
    }

    return (
        <ErrorBoundary>
            <AppContext.Provider
                value={{
                    currentMovie: currentMovie,
                    onSetCurrentMovie: setCurrentMovie,
                }}
            >
                <div className="app">
                    <Header onAddMovie={() => handleAddMovieClick()} />
                    <Container>
                        <ResultsFilter
                            selectedGenre={selectedGenre}
                            selectedSortByOption={selectedSortByOption}
                            onSelectGenre={(index) => handleGenreSelect(index)}
                            onOptionSelected={(id) => handleSortingChanged(id)}
                        ></ResultsFilter>
                        <SearchResults
                            onEditMovie={(id) => handleEditMovieClick(id)}
                            onDeleteMovie={(id) => handleDeleteMovieClick(id)}
                        />
                    </Container>
                    <Footer />
                    <Modal
                        onHandleClose={() => setIsModalOpened(false)}
                        isOpen={isModalOpened}
                    >
                        <ManageMovie isDeleting={isDeleting} />
                    </Modal>
                </div>
            </AppContext.Provider>
        </ErrorBoundary>
    )
}

export const AppContext = React.createContext()

export default App
