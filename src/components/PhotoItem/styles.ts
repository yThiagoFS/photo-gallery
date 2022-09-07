import styled from "styled-components"

export const Container = styled.div`
    background-color:#3d3f43;
    border-radius:10px;
    padding:10px;
    position:relative;

    img{
        max-width:100%;
        display:block;
        margin-bottom:10px;
        border-radius:10px;
    }
`

export const Modal = styled.div<{removing?:boolean}>`
    position:absolute;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:20px;
    background-color:gray;
    margin-bottom:10px;
    border-radius:10px;
    top:0;
    left:0;
    opacity:${props => props.removing ? '0.5' : 0};
    pointer-events:none;
`