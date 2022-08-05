/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Button, AddMovieButton, SearchButton } from './Button.jsx'

afterEach(() => {
    cleanup()
})

describe('Button Component', () => {
    render(<Button>Confirm</Button>)
    const button = screen.getByText('Confirm')

    test('Button Rendering', () => {
        expect(button).toBeInTheDocument()
    })

    test('Button Text', () => {
        expect(button).toHaveTextContent('Confirm')
    })

    test('Button background color should be "#f65261"', () => {
        expect(button).toHaveStyle('background-color: #f65261')
    })
})

describe('Secondary Button component', () => {
    render(
        <Button secondary testId={'secondary-button'}>
            Secondary
        </Button>
    )
    const secondaryButton = screen.getByTestId('secondary-button')

    test('Button Text', () => {
        expect(secondaryButton).toHaveTextContent('Secondary')
    })

    test('Button background color should be "transparent"', () => {
        expect(secondaryButton).toHaveStyle('background-color: transparent')
    })
})

describe('AddMovieButton component', () => {
    render(<AddMovieButton testId={'add-movie'}>Add movie</AddMovieButton>)
    const addMovieButton = screen.getByTestId('add-movie')

    test('AddMovieButton background color should be "#555555"', () => {
        expect(addMovieButton).toHaveStyle('background-color: #555555')
    })
})

describe('SearchButton component', () => {
    render(<SearchButton testId={'search-button'}>Search</SearchButton>)
    const button = screen.getByTestId('search-button')

    test('SearchButton should have no border', () => {
        expect(button).toHaveStyle('border: none')
    })
})
