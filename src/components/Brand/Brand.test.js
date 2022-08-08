import React from 'react'
import renderer from 'react-test-renderer'

import Brand from './Brand.jsx'

describe('Brand component test', () => {
    it('should renders correctly', () => {
        const brand = renderer.create(<Brand />).toJSON()
        expect(brand).toMatchSnapshot()
    })
})
