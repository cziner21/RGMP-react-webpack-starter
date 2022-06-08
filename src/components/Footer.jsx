import React from 'react'
import styled from 'styled-components'

import Brand from './Brand.jsx'

const Wrapper = styled.div`
    background-color: #555555;
    displax: flex;

    & > div {
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

export default function Footer() {
    return (
        <Wrapper>
            <Brand />
        </Wrapper>
    )
}
