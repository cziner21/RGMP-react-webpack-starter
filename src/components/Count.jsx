import React from 'react'

const Count = ({ numberOfMovies }) => {
    return (
        <div style={{ marginBottom: '0.25rem' }}>
            <b data-cy="number-of-movies">{numberOfMovies}</b> movies found
        </div>
    )
}

export default Count
