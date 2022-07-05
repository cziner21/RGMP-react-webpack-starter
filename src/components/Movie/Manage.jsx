import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import {
    getSelectedMovieId,
    allMovies,
    createMovie,
    updateMovie,
    deleteMovie,
} from '../../data/moviesSlice'

import { Button } from '../Button.jsx'
import StyledInput from '../Input.jsx'
import StyledLabel from '../Label.jsx'
import MultiSelect from '../MultiSelect.jsx'
import { FormInput } from '../FormInput.jsx'
import { FormTextArea } from '../FormTextArea.jsx'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const Title = styled.div`
    color: #ffffff;
    text-transform: uppercase;
    font-size: 1.3rem;
    margin: 1em 0;
    letter-spacing: 0.1em;
`

const Footer = styled.div`
    margin-top: 1em;
    display: flex;
    justify-content: end;

    & > button:first-child {
        margin-right: 1em;
    }
`

export const FormControl = styled.div`
    margin-bottom: 0.25em;
`

const FormContainer = styled.div`
    display: grid;
    grid-gap: 1em;
    grid-template-columns: 2fr 1fr;

    & > div:nth-last-child(-n + 2) {
        grid-column: 1 / span 2;
    }
`

function ManageMovie({ isDeleting = false }) {
    const dispatch = useDispatch()
    const moviesFromRedux = useSelector(allMovies)
    const selectedMovieId = useSelector(getSelectedMovieId)

    const [genres, setGenres] = useState([])

    const movie = selectedMovieId
        ? moviesFromRedux.find((x) => x.id === selectedMovieId)
        : {
              title: '',
              release_date: '',
              poster_path: '',
              vote_average: 0,
              runtime: 0,
              genres: [],
              overview: '',
              tagline: '',
          }

    useEffect(() => {
        setGenres(movie.genres)
    }, [])

    const handleGenresClicked = (genre) => {
        const currentMovieGenres = genres.map((x) => x)
        console.log(currentMovieGenres)
        if (currentMovieGenres.some((x) => x === genre)) {
            const index = currentMovieGenres.indexOf(genre)
            currentMovieGenres.splice(index, 1)
        } else {
            currentMovieGenres.push(genre)
        }
        setGenres(currentMovieGenres)
    }

    const handleSubmit = (movie) => {
        console.log(movie)
        const copy = { ...movie }
        copy.genres = genres
        console.table(copy)

        copy.overview =
            copy.overview.length > 0
                ? copy.overview
                : 'Some overview text for the text field'

        selectedMovieId
            ? dispatch(updateMovie(copy))
            : dispatch(createMovie(copy))
    }

    const handleDelete = () => {
        dispatch(deleteMovie(selectedMovieId))
    }

    const validate = Yup.object({
        title: Yup.string().required('Required'),
        poster_path: Yup.string().required('Required'),
        tagline: Yup.string().required('Required'),
        overview: Yup.string().required('Required'),
        release_date: Yup.string().required('Required'),
        runtime: Yup.number()
            .required('Required')
            .min(1, 'Runtime must be greater then 0'),
        //genres: Yup.array().min(1, 'Select at least one genre'),
    })

    const DeleteMovie = () => {
        return (
            <Container>
                <Title>Delete movie</Title>
                <p
                    style={{
                        fontSize: '1rem',
                    }}
                >
                    Are you sure want to delete this movie?
                </p>
                <Footer>
                    <Button onClick={() => handleDelete()}>Confirm</Button>
                </Footer>
            </Container>
        )
    }

    if (isDeleting) {
        return <DeleteMovie />
    }

    return (
        <Container>
            <Title>{selectedMovieId ? 'Edit movie' : 'Add movie'}</Title>
            <Formik
                initialValues={movie}
                validationSchema={validate}
                onSubmit={(values) => {
                    handleSubmit(values)
                }}
            >
                {(formik) => (
                    <Form>
                        <FormContainer>
                            <FormInput
                                label="Title"
                                placeholder="Title"
                                name="title"
                                type="text"
                                isRequired
                            />

                            <FormInput
                                label="Release date"
                                placeholder="Select Date"
                                name="release_date"
                                type="text"
                                isRequired
                            />
                            <FormInput
                                label="Movie poster url"
                                placeholder="https://"
                                name="poster_path"
                                type="text"
                                isRequired
                            />
                            <FormInput
                                label="Raiting"
                                placeholder="0.0"
                                name="vote_average"
                                type="number"
                            />

                            <FormControl>
                                <StyledLabel>Genre</StyledLabel>
                                <MultiSelect
                                    name="genres"
                                    currentMovieGenres={genres}
                                    onItemClicked={(genre) =>
                                        handleGenresClicked(genre)
                                    }
                                />
                            </FormControl>
                            <FormInput
                                label="Runtime"
                                placeholder="minutes"
                                name="runtime"
                                type="number"
                                isRequired
                            />

                            <FormInput
                                label="Tagline"
                                placeholder=""
                                name="tagline"
                                type="text"
                                isRequired
                            />

                            <FormTextArea
                                name="overview"
                                label="Overview"
                                placeholder="Movie description"
                                isRequired
                            />
                        </FormContainer>

                        <Footer>
                            <Button secondary type="reset">
                                Reset
                            </Button>
                            <Button type="submit">Submit</Button>
                        </Footer>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}

export default ManageMovie
