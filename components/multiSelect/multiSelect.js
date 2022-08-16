import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useField } from 'formik'

import { allGenres } from '../../pages/api/moviesSlice'

import useOutsideClickHandler from '../../hooks/useOutsideClickHandler'
import Checkbox from '../checkBox/checkBox'

const Container = styled.div`
    background-color: #424242;
    border: solid 1px #424242;
    border-radius: 3px;
    padding: 0.75em;
    color: #ffffff;
    position: relative;
    display: flex;
    font-size: 0.8rem;
    margin-top: 0.5em;
    height: 37px;
`

const Selected = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const IndicatorContainer = styled.div`
    color: #f65261;
`

const Indicator = ({ isOpened }) => {
    if (isOpened) {
        return <IndicatorContainer>▲</IndicatorContainer>
    }

    return <IndicatorContainer>▼</IndicatorContainer>
}

const Wrapper = styled.div`
    position: absolute;
    top: calc(37px + 0.5em);
    left: 0;
    width: 100%;
    z-index: 2;
    border: solid 1px #424242;
    background-color: #232323;
    padding: 0.75em;
    > * {
        margin-bottom: 1em;
        &:last-child {
            margin-bottom: 0;
        }
    }
`

const MultiSelect = ({ currentMovieGenres, onItemClicked, ...props }) => {
    const [field, meta] = useField(props)

    const genres = useSelector(allGenres)

    const [open, setOpen] = useState(false)
    const container = useRef(null)

    const handleClickOutside = () => {
        setOpen(false)
    }

    useOutsideClickHandler(container, handleClickOutside)

    return (
        <>
            <Container ref={container}>
                <Selected onClick={() => setOpen(!open)}>
                    <span>Select Genre</span>
                    <Indicator isOpened={open} />
                </Selected>
                {open && (
                    <Wrapper>
                        {genres.map((genre) => (
                            <Checkbox
                                key={genre}
                                label={genre}
                                value={
                                    currentMovieGenres &&
                                    currentMovieGenres.some((x) => x === genre)
                                }
                                onChange={() => onItemClicked(genre)}
                            />
                        ))}
                    </Wrapper>
                )}
            </Container>
            {meta.touched && meta.error && (
                <div
                    style={{
                        color: '#f65261',
                        fontSize: '0.7rem',
                        marginTop: '0.25rem',
                    }}
                >
                    {meta.error}
                </div>
            )}
        </>
    )
}

export default MultiSelect
