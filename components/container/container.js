import React from 'react'
import styled from 'styled-components'

const Container = ({ children }) => {
    return (
        <section
            style={{
                padding: '1em 3em',
                backgroundColor: '#232323',
                color: '#ffffff',
            }}
        >
            {children}
        </section>
    )
}

export default Container
