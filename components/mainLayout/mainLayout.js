import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'

import {
    setSearchQuery,
    defaultSearchParams,
    setSelectedGenres,
    setSelectedMovieId,
} from '../../pages/api/moviesSlice'

import ErrorBoundary from '../errorBoundary/errorBoundary'

import Header from '../header/header'
import Footer from '../footer/footer'

import Modal from '../modal/modal'
import ManageMovie from '../movie/manage/manage'

import {
    allGenres,
    getSelectedMovieId,
    allMovies,
} from '../../pages/api/moviesSlice'

import { sortByOptions } from '../../pages/api/sortByOptions'

const MainLayout = ({ children }) => {
    const router = useRouter()
    const moviesFromRedux = useSelector(allMovies)
    const selectedMovieId = useSelector(getSelectedMovieId)

    const [selectedGenre, setSelectedGenre] = useState(null)
    const [selectedSortByOption, setSelectedSortByOption] = useState(null)
    const [isModalOpened, setIsModalOpened] = useState(false)
    const [currentMovie, setCurrentMovie] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     if (pathname === '/') {
    //         //navigate('/search')
    //     }
    // }, [pathname])

    useEffect(() => {
        if (selectedMovieId && moviesFromRedux) {
            setCurrentMovie(moviesFromRedux)
        }
    }, [selectedMovieId, moviesFromRedux])

    useEffect(() => {
        setSelectedGenre(allGenres[0])
        setSelectedSortByOption(sortByOptions[0])
    }, [])

    const handleSortingChanged = (id) => {
        const option = sortByOptions.find((x) => x.id === id)
        setSelectedSortByOption(option)

        setSearchParams({ sortBy: option.id })
    }

    useEffect(() => {
        if (!selectedSortByOption) {
            return
        }

        dispatch(
            setSearchQuery({
                ...defaultSearchParams,
                sortBy: selectedSortByOption.id,
                sortOrder: 'asc',
            })
        )
    }, [selectedSortByOption])

    const handleGenreSelect = (value) => {
        setSelectedGenre(allGenres[value])

        setSearchParams({ genre: value })
        dispatch(setSelectedGenres([value]))

        dispatch(
            setSearchQuery({
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

        const currentMovie = moviesFromRedux.find((x) => x.id === id)

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

    const handleSetCurrentMovie = (movie) => {
        setCurrentMovie(movie)

        // if (movie) {

        //     setSearchParams({ movie: movie.id })
        // }

        if (!movie) {
            dispatch(setSelectedMovieId(null))
            router.push('/search')
        }
    }

    return (
        <ErrorBoundary>
            <AppContext.Provider
                value={{
                    currentMovie: currentMovie,
                    selectedGenre: selectedGenre,
                    selectedSortByOption: selectedSortByOption,
                    onSetCurrentMovie: handleSetCurrentMovie,
                    onHandleEditMovieClick: handleEditMovieClick,
                    onHandleDeleteMovieClick: handleDeleteMovieClick,
                    onHandleGenreSelect: handleGenreSelect,
                    onHandleSortingChanged: handleSortingChanged,
                }}
            >
                <div className="app">
                    <Header onAddMovie={() => handleAddMovieClick()} />
                    {children}
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

export default MainLayout
