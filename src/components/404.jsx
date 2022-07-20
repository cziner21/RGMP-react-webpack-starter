import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 250px - 3em);
    overflow-y: auto;
    background-color: #232323;
    color: #ffffff;
`

const Message = styled.div`
    font-size: 2rem;
`

const NotFound = () => {
    return (
        <Container>
            <Message>404 - Nincs megjeleníthető adat</Message>
        </Container>
    )
}

export default NotFound
