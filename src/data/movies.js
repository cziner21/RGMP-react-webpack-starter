import PropTypes from 'prop-types'
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
    })
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export { MovieData, Movies }
