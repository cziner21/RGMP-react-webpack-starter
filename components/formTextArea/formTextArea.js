import React from 'react'
import { useField } from 'formik'

import StyledLabel from '../label/label'
import { FormControl } from '../movie/manage/manage'

export const FormTextArea = ({ placeholder, label, isRequired, ...props }) => {
    const [field, meta] = useField(props)

    const inputStyle = {
        backgroundColor: '#424242',
        border: 'solid 1px #424242',
        color: field.value ? '#ffffff' : '#555555',
        borderRadius: '3px',
        padding: '0.75em',
        width: '100%',
        outline: 'none',
        borderColor: meta.touched && meta.error ? '#f65261' : 'rgb(66, 66, 66)',
    }

    return (
        <FormControl>
            <StyledLabel htmlFor={field.name}>
                {label} {isRequired ? '*' : ''}
            </StyledLabel>
            <textarea
                {...field}
                {...props}
                style={inputStyle}
                placeholder={placeholder}
            />
            {meta.touched && meta.error && (
                <div
                    style={{
                        color: '#f65261',
                        fontSize: '0.7rem',
                        marginTop: '0.25rem',
                    }}
                >
                    {meta.error}
                </div>
            )}
        </FormControl>
    )
}
