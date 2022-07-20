import React from 'react'

function MovieGenres({ genres }) {
    if (!genres || genres.length < 1) {
        return null
    }

    return (
        <div>
            {genres.map((genre, index) => (
                <span key={genre}>
                    {index === genres.length - 1 ? genre : `${genre}, `}
                </span>
            ))}
        </div>
    )
}

export default MovieGenres
