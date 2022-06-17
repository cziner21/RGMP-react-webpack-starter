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

export { MovieData, Movies }
