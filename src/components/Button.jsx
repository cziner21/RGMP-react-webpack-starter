import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
    background-color: ${(props) =>
        props.secondary ? 'transparent' : '#f65261'};
    color: ${(props) => (props.secondary ? '#f65261' : '#ffffff')};
    font-size: 1rem;
    margin: 0;
    padding: 0.25em 1em;
    border: 2px solid #f65261;
    border-radius: 3px;
    text-transform: uppercase;
    cursor: pointer;
`

Button.propTypes = {
    secondary: PropTypes.bool,
}

const AddMovieButton = styled(Button)`
    color: #f65261;
    background-color: #555555;
    border: none;
`

const SearchButton = styled(Button)`
    background-color: transparent;
    border: none;
`

export { Button, AddMovieButton, SearchButton }
