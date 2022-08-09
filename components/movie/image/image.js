import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from 'next/image'

const placeholder = '/150x200.png'

const CoverImage = styled.img`
    background-size: cover;
    background-image: url(${(props) =>
        props.imagePath ? props.imagePath : placeholder});
    background-color: #232323;
    width: 150px;
    height: 200px;
`

CoverImage.propTypes = {
    imagePath: PropTypes.string,
}

export default CoverImage
