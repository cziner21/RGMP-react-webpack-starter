import React, { useEffect, useState, useRef } from 'react'

const useOutsideClickHandler = (ref, callbackHandler) => {
    useEffect(() => {
        const handler = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callbackHandler()
            }
        }

        document.addEventListener('mousedown', handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [ref])
}

export default useOutsideClickHandler
