import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { defaultSearchParams, MoviesStatuses } from '../../data/moviesSlice'
import Search from './Search.jsx'

describe('Search panel interactive tests', () => {
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
    const mockStore = configureStore()
    let store

    it('Renders and match snapshot', () => {
        store = mockStore(initialState)

        const searchBar = renderer
            .create(
                <Provider store={store}>
                    <MemoryRouter>
                        <Search />
                    </MemoryRouter>
                </Provider>
            )
            .toJSON()
        expect(searchBar).toMatchSnapshot()
    })

    it('Updates on change', () => {
        store = mockStore(initialState)

        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <Search />
                </MemoryRouter>
            </Provider>
        )

        const inputElement = container.querySelector(`input[name="search"]`)

        fireEvent.change(inputElement, { target: { value: 'Rambo' } })

        expect(inputElement.value).toBe('Rambo')
    })
})
