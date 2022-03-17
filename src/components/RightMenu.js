import React from 'react'
import styled from 'styled-components'

const RightMenu = () => {
    return (
        <Wrapper>RightMenu</Wrapper>
    )
}

const Wrapper = styled.section`
    height: 100vh;
    width: 100px;
    z-index: 1;
    min-width: 100px;
    backdrop-filter: blur(10px);
    background: rgba(34,34,34, 0.4);
    border-left: 1px solid rgba(255,255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`

export default RightMenu