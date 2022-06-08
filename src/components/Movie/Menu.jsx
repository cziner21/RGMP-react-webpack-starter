import styled from 'styled-components'

const ContextMenu = styled.div`
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    cursor: pointered;
    border: solid 1px #232323;
    background-color: #232323;
    color: #ffffff;

    &:after {
        content: '...';
        display: flex;
        align-items: center;
        justify-cintent: center;
    }
`

export default ContextMenu
