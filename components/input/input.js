import React, { useState, useEffect } from 'react'
import { useField } from 'formik'

import KeyCodes from '../../shared/keycodes'

function StyledInput(props) {
    const [field, meta, helpers] = useField(props)

    const [currentValue, setCurrentValue] = useState('')

    useEffect(() => {
        setCurrentValue(props.value)
    }, [])

    const handleChange = (e) => {
        setCurrentValue(e.target.value)

        if (props.onHandleChange) {
            props.onHandleChange(e)
        }
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === KeyCodes.Enter) {
            console.log(currentValue)
            props.onEnterPressed(currentValue)
        }
    }

    const onHandleBlur = () => {
        if (props.onBlur) {
            props.onBlur(currentValue)
        }
    }

    const inputStyle = {
        backgroundColor: '#424242',
        border: 'solid 1px #424242',
        color: currentValue ? '#ffffff' : '#555555',
        borderRadius: '3px',
        padding: '0.75em',
        width: '100%',
        outline: 'none',
    }

    return (
        <>
            <input
                {...field}
                style={inputStyle}
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                value={currentValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={onHandleBlur}
            />
        </>
    )
}

export default StyledInput
