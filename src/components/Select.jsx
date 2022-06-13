import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import useOutsideClickHandler from '../hooks/useOutsideClickHandler.jsx'

const Container = styled.div`
    background-color: #424242;
    border: solid 1px #424242;
    border-radius: 3px;
    padding: 0.75em;
    color: #ffffff;
    position: relative;
    display: flex;
    font-size: 0.8rem;
    cursor: pointer;
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

const Select = ({ selectedItem, items, onItemClicked }) => {
    const [open, setOpen] = useState(false)
    const container = useRef(null)

    const handleClickOutside = () => {
        setOpen(false)
    }

    useOutsideClickHandler(container, handleClickOutside)

    if (!items || items.length < 1) {
        return null
    }

    console.log(items)

    return (
        <Container ref={container}>
            <Selected onClick={() => setOpen(!open)}>
                <span>{selectedItem}</span>
                <Indicator isOpened={open} />
            </Selected>
            {open && (
                <Wrapper>
                    {items.map((x) => (
                        <div key={x.id} onClick={() => onItemClicked(x.id)}>
                            <span>{x.name}</span>
                        </div>
                    ))}
                </Wrapper>
            )}
        </Container>
    )
}

export default Select
