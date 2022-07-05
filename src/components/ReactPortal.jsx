import { createPortal } from 'react-dom'
import { useState, useLayoutEffect } from 'react'

function ReactPortal({ children, containerId = 'react-portal-container' }) {
    const [containerElement, setContainerElement] = useState(null)

    useLayoutEffect(() => {
        let element = document.getElementById(containerId)
        let createdByReactPortal = false

        if (!element) {
            createdByReactPortal = true
            element = createReactPortalContainerElement(containerId)
        }

        setContainerElement(element)

        return () => {
            if (createdByReactPortal && element.parentNode) {
                element.parentNode.removeChild(element)
            }
        }
    }, [containerId])

    if (!containerElement) {
        return null
    }

    return createPortal(children, containerElement)
}

function createReactPortalContainerElement(containerId) {
    const containerElement = document.createElement('div')
    containerElement.setAttribute('id', containerId)
    document.body.appendChild(containerElement)
    return containerElement
}

export default ReactPortal
