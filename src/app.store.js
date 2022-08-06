import { configureStore, combineReducers } from '@reduxjs/toolkit'

import moviesReducer from '../src/data/moviesSlice'

const rootReducer = combineReducers({
    movies: moviesReducer
})

export const store = preloadedState => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

// export const store = configureStore({
//     reducer: {
//         movies: moviesReducer,
//     },
// })
