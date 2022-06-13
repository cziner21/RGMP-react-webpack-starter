import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CoverImage from './Image.jsx'
import MovieTitle from './Title.jsx'
import ReleaseDate from './ReleaseDate.jsx'
import ContextMenu from './Menu.jsx'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 150px;
    position: relative;
`

const Details = styled.div`
    display: flex;
    flex-direction: column;
`

function Movie({ movie, coverPath, onEditMovie, onDeleteMovie }) {
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <Container
            onMouseEnter={() => setIsMenuVisible(true)}
            onMouseLeave={() => setIsMenuVisible(false)}
        >
            <ContextMenu
                onEdit={() => onEditMovie()}
                onDelete={() => onDeleteMovie()}
                isVisible={isMenuVisible}
            />
            <CoverImage />
            <div
                style={{
                    display: 'flex',
                    marginTop: '1em',
                    fontSize: '0.6em',
                    justifyContent: 'space-between',
                }}
            >
                <Details>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <div
                        style={{
                            marginTop: '0.8em',
                        }}
                    >
                        {movie.genres.map((genre, index) => (
                            <span key={genre}>
                                {index === movie.genres.length - 1
                                    ? genre
                                    : `${genre}, `}
                            </span>
                        ))}
                    </div>
                </Details>
                <ReleaseDate>{movie.releaseDate}</ReleaseDate>
            </div>
        </Container>
    )
}

Movie.propTypes = {
    movie: PropTypes.any.isRequired,
    coverPath: PropTypes.string,
    onEditMovie: PropTypes.func.isRequired,
    onDeleteMovie: PropTypes.func.isRequired,
}

export { Movie }
