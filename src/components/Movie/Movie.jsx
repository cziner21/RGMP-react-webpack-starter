import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CoverImage from './Image.jsx'
import MovieTitle from './Title.jsx'
import ReleaseDate from './ReleaseDate.jsx'
import ContextMenu from './Menu.jsx'
import MovieGenres from './Genres.jsx'
import { AppContext } from '../MainLayout.jsx'

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

function Movie({
    movie,
    coverPath,
    onEditMovie,
    onDeleteMovie,
    onMovieSelected,
}) {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const ctx = useContext(AppContext)

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
            <CoverImage
                imagePath={movie.poster_path}
                onClick={() => ctx.onSetCurrentMovie(movie)}
                data-cy={`cover-image__${movie.id}`}
            />
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
                        <MovieGenres genres={movie.genres} />
                    </div>
                </Details>
                <ReleaseDate>{movie.release_date.split('-')[0]}</ReleaseDate>
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
