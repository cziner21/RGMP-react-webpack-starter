import React from 'react'

import './app.css'
import { Button, AddMovieButton } from './Button.jsx'
import { ResultsFilter } from './Filter.jsx'
import Search from './Search.jsx'
import Header from './header.jsx'
import Container from './Container.jsx'

const App = () => {
    return (
        <div className="app">
            <Header />
            <Container>
                <ResultsFilter></ResultsFilter>
            </Container>
        </div>
    )
}

export default App
