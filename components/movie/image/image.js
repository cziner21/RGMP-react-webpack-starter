import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from 'next/image'

const placeholder = '/150x200.png'

const CoverImage = (props) => {
    return (
        <Image
            style={{
                backgroundSize: 'cover',
                backgroundColor: '#232323',
            }}
            src={props.imagePath ? props.imagePath : placeholder}
            alt={props.imagePath ? props.imagePath : 'placeholder'}
            width={150}
            height={200}
        />
    )
}

// const CoverImage = styled.img`
//     background-size: cover;
//     background-image: url(${(props) =>
//         props.imagePath ? props.imagePath : placeholder});
//     background-color: #232323;
//     width: 150px;
//     height: 200px;
// `

CoverImage.propTypes = {
    imagePath: PropTypes.string,
}

export default CoverImage
