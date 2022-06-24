import React from 'react'
import { createRoot } from 'react-dom/client'
import { store } from './app.store'
import { Provider } from 'react-redux'

import { fetchMovies } from './data/moviesSlice'

import App from './components/App'

//store.dispatch(fetchMovies())

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)
