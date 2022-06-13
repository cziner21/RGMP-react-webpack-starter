import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

import useOutsideClickHandler from '../../hooks/useOutsideClickHandler.jsx'

const Container = styled.div`
    position: relative;
    display: inline-block;
`

const StyledButton = styled.button`
    display: ${(props) => (props.isVisible ? 'block' : 'none')};
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    cursor: pointered;
    border: solid 1px #232323;
    background-color: #232323;
    color: #ffffff;
    outline: 0;
`

const Wrapper = styled.div`
    position: absolute;
    top: calc(20px + 0.5em);
    right: 0;
    width: auto;
    z-index: 2;
    box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
    background-color: #232323;
`

const DropDownMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const MenuItem = styled.li`
    padding: 0.5em 1em;

    &:hover {
        background-color: #f65261;
        cursor: pointer;
    }
`

const ContextMenu = ({ isVisible, onDelete, onEdit }) => {
    const [open, setOpen] = useState(false)
    const container = useRef(null)

    const handleClickOutside = () => {
        setOpen(false)
    }

    useOutsideClickHandler(container, handleClickOutside)

    return (
        <Container ref={container}>
            <StyledButton
                isVisible={isVisible}
                type="button"
                onClick={() => setOpen(!open)}
            >
                ⋮
            </StyledButton>
            {open && (
                <Wrapper>
                    <DropDownMenu>
                        <MenuItem onClick={() => onEdit()}>Edit</MenuItem>
                        <MenuItem onClick={() => onDelete()}>Delete</MenuItem>
                    </DropDownMenu>
                </Wrapper>
            )}
        </Container>
    )
}

export default ContextMenu
