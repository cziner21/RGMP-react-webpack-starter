import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
    display: flex;
    align-items: center;
`

const StyledCheckbox = styled.input`
    accent-color: #f65261;
    margin-right: 0.5em;
`

const Checkbox = ({ label, value, onChange }) => {
    return (
        <StyledLabel>
            <StyledCheckbox
                type="checkbox"
                checked={value}
                onChange={onChange}
                data-testid="checkbox"
            />
            {label}
        </StyledLabel>
    )
}

export default Checkbox
