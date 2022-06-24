import { configureStore } from '@reduxjs/toolkit'

import moviesReducer from '../src/data/moviesSlice'

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    },
})
