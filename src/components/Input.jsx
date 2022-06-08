import PropTypes from 'prop-types'
import React, { useState } from 'react'

import KeyCodes from '../shared/keycodes'

function StyledInput(props) {
    const { type, name, placeholder, onEnterPressed } = props

    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === KeyCodes.Enter) {
            console.log(value)
            props.onEnterPressed(value)
        }
    }

    return (
        <input
            style={{
                backgroundColor: '#424242',
                border: 'solid 1px #424242',
                color: '#555555',
                borderRadius: '3px',
                padding: '0.75em',
                width: '100%',
            }}
            placeholder={placeholder}
            type={type}
            name={name}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
        />
    )
}

StyledInput.PropTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onEnterPressed: PropTypes.func,
}

export default StyledInput
