import { conversionSlice } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { store } from '../app.store'

import moviesReducer, {
    defaultSearchParams,
    MoviesStatuses,
    setSearchQuery,
    getSearchQuery,
} from './moviesSlice'

const mockDispatch = jest.fn()
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}))

describe('moviesSlice reducer', () => {
    it('should return the initial state', () => {
        const initialState = {
            data: [],
            genres: [],
            searchQuery: defaultSearchParams,
            selectedGenres: [],
            selectedMovieId: null,
            isSingleMovie: false,
            status: MoviesStatuses.idle,
            error: null,
            currentMovie: {},
        }

        expect(moviesReducer(undefined, {})).toEqual(initialState)
    })

    it('setting searchQuery to someting  strore state should change', () => {
        const initialState = {
            data: [],
            genres: [],
            searchQuery: defaultSearchParams,
            selectedGenres: [],
            selectedMovieId: null,
            isSingleMovie: false,
            status: MoviesStatuses.idle,
            error: null,
            currentMovie: {},
        }

        const query = {
            ...defaultSearchParams,
            search: 'Rambo',
            searchBy: 'title',
        }

        const action = setSearchQuery(query)

        const expectedState = {
            data: [],
            genres: [],
            searchQuery: {
                ...defaultSearchParams,
                search: 'Rambo',
                searchBy: 'title',
            },
            selectedGenres: [],
            selectedMovieId: null,
            isSingleMovie: false,
            status: MoviesStatuses.idle,
            error: null,
            currentMovie: {},
        }

        expect(moviesReducer(initialState, action)).toEqual(expectedState)
    })
})
