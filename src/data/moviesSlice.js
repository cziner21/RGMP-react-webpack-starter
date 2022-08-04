import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const MoviesStatuses = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: 'failed',
}

const BASE_URL = 'http://localhost:4000/movies'

export const defaultSearchParams = {
    sortBy: 'title',
    sortOrder: 'asc',
    search: null,
    searchBy: null,
    filter: null,
    offset: null,
    limit: 100,
}

const initialState = {
    data: [],
    genres: [],
    searchQuery: defaultSearchParams,
    selectedGenres: [],
    selectedMovieId: null,
    isSingleMovie: false,
    status: MoviesStatuses.idle, // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    currentMovie: {},
}

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async (searchParams) => {
        const params = {
            sortBy: searchParams.sortBy ? searchParams.sortBy : 'title',
            sortOrder: searchParams.sortOrder ? searchParams.sortOrder : 'asc',
            search: searchParams.search ? searchParams.search : null,
            searchBy: searchParams.searchBy ? searchParams.searchBy : null,
            filter: searchParams.filter ? searchParams.filter : null,
            offset: searchParams.offset ? searchParams.offset : null,
            limit: searchParams.limit ? searchParams.limit : 100,
        }

        try {
            const response = await axios.get(BASE_URL, {
                params: params,
            })
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const createMovie = createAsyncThunk(
    'movies/createMovie',
    async (movie) => {
        try {
            const response = await axios.post(BASE_URL, movie)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const updateMovie = createAsyncThunk(
    'movies/updateMovie',
    async (movie) => {
        try {
            const response = await axios.put(BASE_URL, movie)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const deleteMovie = createAsyncThunk(
    'movies/deleteMovie',
    async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${id}`)
            return response.data
        } catch (error) {
            return error.message
        }
    }
)

export const getMovie = createAsyncThunk('movies/getMovie', async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`)
        return response.data
    } catch (error) {
        return error.message
    }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        },
        setSelectedGenres: (state, action) => {
            state.selectedGenres = action.payload
        },
        setSelectedMovieId: (state, action) => {
            state.selectedMovieId = action.payload
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = MoviesStatuses.loading
                state.isSingleMovie = false
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                const { totalAmount, data } = action.payload
                state.status = MoviesStatuses.succeeded
                state.isSingleMovie = false
                state.data = data

                const genres = data
                    .map((x) => x.genres)
                    .reduce((a, b) => {
                        return a.concat(b)
                    }, [])
                state.genres = Array.from(new Set(genres))
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = MoviesStatuses.failed
                state.isSingleMovie = false
                state.error = action.error.message
            })
            .addCase(getMovie.pending, (state, action) => {
                state.status = MoviesStatuses.loading
                state.isSingleMovie = true
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                const data = action.payload

                // Request failed with status code 404
                if (data === 'Request failed with status code 404') {
                    state.status = MoviesStatuses.failed
                    state.error = data
                    return
                }

                state.status = MoviesStatuses.succeeded
                state.isSingleMovie = true
                state.selectedMovieId = data.id

                state.data = data

                if (data) {
                    const genres = data.genres
                        .map((x) => x)
                        .reduce((a, b) => {
                            return a.concat(b)
                        }, [])
                    state.genres = Array.from(new Set(genres))
                }
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.status = MoviesStatuses.failed
                state.error = action.error.message
                state.isSingleMovie = true
            })
            .addCase(updateMovie.fulfilled, (state, action) => {
                console.log(action.payload)
                // todo refresh list, give notification
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(createMovie.fulfilled, (state, action) => {
                console.log(action.payload)
                // todo refresh list, give notification
            })
            .addCase(createMovie.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(deleteMovie.fulfilled, (state, action) => {
                console.log(action.payload)
                // todo refresh list, give notification
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.error = action.error.message
            })
    },
})

export const getSelectedMovieId = (state) => state.movies.selectedMovieId
export const getSelectedGenres = (state) => state.movies.selectedGenres
export const getSearchQuery = (state) => state.movies.searchQuery
export const allMovies = (state) => state.movies.data
export const allGenres = (state) => state.movies.genres
export const currentMovie = (state) => state.movies.currentMovie
export const getMoviesStatus = (state) => state.movies.status
export const getMoviesType = (state) => state.movies.isSingleMovie
export const getMoviesError = (state) => state.movies.error

export const { setSearchQuery, setSelectedGenres, setSelectedMovieId } =
    moviesSlice.actions

export default moviesSlice.reducer
