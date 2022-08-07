import React from 'react'
import renderer from 'react-test-renderer'
import { screen, cleanup, render } from '@testing-library/react'
import '@testing-library/jest-dom'

import Checkbox from './Checkbox.jsx'

afterEach(() => {
    cleanup()
})

describe('Checkbox component test', () => {
    const cb = jest.fn()

    render(<Checkbox label={'Is test OK'} value={true} onChange={cb} />)
    const item = screen.getByTestId('checkbox')

    test('Checkbox Rendering', () => {
        expect(item).toBeInTheDocument()
    })
})
