import React from 'react'
import styled from 'styled-components'

import { Button } from '../Button.jsx'
import StyledInput from '../Input.jsx'
import StyledLabel from '../Label.jsx'
import MultiSelect from '../MultiSelect.jsx'

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
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

const FormControl = styled.div`
    margin-bottom: 0.25em;
`

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
                <Button>Confirm</Button>
            </Footer>
        </Container>
    )
}

function ManageMovie({ movie, isDeleting = false }) {
    if (isDeleting) {
        return <DeleteMovie />
    }

    return (
        <Container>
            <Title>{movie ? 'Edit movie' : 'Add movie'}</Title>
            <FormControl>
                <StyledLabel>Title</StyledLabel>
                <StyledInput placeholder={'Title'} />
            </FormControl>
            <FormControl>
                <StyledLabel>Movie url</StyledLabel>
                <StyledInput placeholder={'https://'} />
            </FormControl>
            <FormControl>
                <StyledLabel>Genre</StyledLabel>
                <MultiSelect />
            </FormControl>
            <Footer>
                <Button secondary>Reset</Button>
                <Button>Submit</Button>
            </Footer>
        </Container>
    )
}

export default ManageMovie
