import styled from 'styled-components'
import React, { useEffect } from 'react'

import ReactPortal from './ReactPortal.jsx'

const Wrapper = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    z-index: 999;
    padding: 40px 20px 20px;
`

const Content = styled.div`
    width: 70%;
    height: auto;
    background-color: #232323;
    color: #fff;
    padding: 1em;
    font-size: 2rem;
    padding: 1em;
    overflow-y: auto;
`

const CloseButton = styled.div`
    cursor: pointer;
    paddin: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0.5em;
    right: 0.5em;
    position: absolute;
    font-size: 1.2rem;
    font-wight: 600;
    color: #ffffff;
    text-transform: uppercase;
    transition: all 0.2s ease-in-out;

    &:hover {
        transform: scale(1.3);
    }
`

function Modal({ children, isOpen, onHandleClose }) {
    useEffect(() => {
        const closeOnEscapeKey = (e) =>
            e.key === 'Escape' ? onHandleClose() : null
        document.body.addEventListener('keydown', closeOnEscapeKey)
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey)
        }
    }, [onHandleClose])

    if (!isOpen) {
        return null
    }

    return (
        <ReactPortal>
            <Wrapper>
                <div
                    style={{
                        position: 'relative',
                        width: '70%',
                    }}
                >
                    <CloseButton onClick={() => onHandleClose()}>×</CloseButton>
                </div>
                <Content>{children}</Content>
            </Wrapper>
        </ReactPortal>
    )
}

export default Modal
