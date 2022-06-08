import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import CoverImage from './Image.jsx'
import MovieTitle from './Title.jsx'
import ReleaseDate from './ReleaseDate.jsx'
import ContextMenu from './Menu.jsx'

const Details = styled.div`
    display: flex;
    flex-direction: column;
`

function Movie(props) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '150px',
                position: 'relative',
            }}
        >
            <CoverImage />
            <ContextMenu></ContextMenu>
            <div
                style={{
                    display: 'flex',
                    marginTop: '1em',
                    fontSize: '0.6em',
                    justifyContent: 'space-between',
                }}
            >
                <Details>
                    <MovieTitle>{props.title}</MovieTitle>
                    <div
                        style={{
                            marginTop: '0.8em',
                        }}
                    >
                        {props.genre.map((genre, index) => (
                            <span key={genre}>
                                {index === props.genre.length - 1
                                    ? genre
                                    : `${genre}, `}
                            </span>
                        ))}
                    </div>
                </Details>
                <ReleaseDate>{props.releaseDate}</ReleaseDate>
            </div>
        </div>
    )
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
    genre: PropTypes.arrayOf(PropTypes.string),
    releaseDate: PropTypes.string.isRequired,
    coverPath: PropTypes.string,
}

export { Movie }
