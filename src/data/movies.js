import axios from 'axios'

import PropTypes, { number } from 'prop-types'
import Genres from './genres'

const MovieData = {}
MovieData.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
}

const Movies = []
for (let i = 10; i < 30; i++) {
    Movies.push({
        id: (i + 1).toString(),
        title: `Movie ${i}`,
        releaseDate: getRandom(2020, 1950),
        genres: Genres.sort(() => Math.random() - Math.random()).slice(
            0,
            getRandom(4, 0)
        ),
        rating: getRandom(1, 9, true),
        duration: getRandom(60, 300),
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis mi eget urna auctor ultrices id ac leo. Etiam vel mauris eu eros ultricies sodales. Proin posuere arcu in augue placerat consectetur. Donec in ante ornare, luctus lacus sit amet, mollis libero. Mauris tempor magna in laoreet ornare. Nullam imperdiet purus sit amet porttitor ultrices. Pellentesque habitant morbi tristique senectus.`,
    })
}

function getRandom(min, max, withFraction = false) {
    return withFraction
        ? (Math.random() * (max - min + 1) + min).toFixed(1)
        : Math.floor(Math.random() * (max - min + 1)) + min
}

export const SearchParams = {}
SearchParams.propTypes = {
    setOrder: PropTypes.string.isRequired,
    searchBy: PropTypes.string.isRequired,
    offset: PropTypes.string,
    limit: PropTypes.string,
    search: PropTypes.string,
    filter: PropTypes.arrayOf(PropTypes.string),
    sortBy: PropTypes.string,
}

export async function getMovies(searchParams) {
    const params = {
        sortBy: searchParams.sortBy ? searchParams.sortBy : 'title',
        setOrder: searchParams.isDescending ? 'desc' : 'asc',
        search: searchParams.search ? searchParams.search : null,
        searchBy: searchParams.searchBy ? searchParams.searchBy : null,
        filter: searchParams.genres ? searchParams.genres : null,
        offset: searchParams.offset ? searchParams.offset : null,
        limit: searchParams.limit ? searchParams.limit : 10,
    }

    try {
        const response = await axios.get('http://localhost:4000/movies', {
            params: params,
        })
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

// export async function SearchMovies(keyword) {
//     try {
//         const response = await axios.get('http://localhost:4000/movies', {
//             params: {
//                 search: keyword,
//             },
//         })
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function SearchBy(type) {
//     try {
//         const response = await axios.get('http://localhost:4000/movies', {
//             params: {
//                 searchBy: type,
//             },
//         })
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function FilterByGenres(genres) {
//     try {
//         const response = await axios.get('http://localhost:4000/movies', {
//             params: {
//                 filter: genres,
//             },
//         })
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     }
// }

// export async function SortBy(keyword) {
//     try {
//         const response = await axios.get('http://localhost:4000/movies', {
//             params: {
//                 sortBy: keyword,
//             },
//         })
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     }
// }

// const MovieBase = {}
// MovieBase.PropTypes = {
//     title: PropTypes.string.isRequired,
//     tagline: PropTypes.string,
//     vote_average: PropTypes.number,
//     vote_count: PropTypes.number,
//     release_date: PropTypes.string,
//     poster_path: PropTypes.string,
//     overview: PropTypes.string,
//     budget: PropTypes.number,
//     revenue: number,
//     runtime: number,
//     genres: PropTypes.arrayOf(PropTypes.string),
// }

export { MovieData, Movies }
