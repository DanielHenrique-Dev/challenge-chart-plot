import styled from "styled-components";

export const DivFooter = styled.footer`
    background-color: #D3D3D3;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
`;

export const BtnGerar = styled.button`
    padding: 10px;
    border-radius: 3px;
    background-color: #0076CE;
    color: #FFF;

    margin-top: 0.5em;
    margin-left: 0.5em;

    transition: opacity .3s;

    &:hover{
        opacity: .7;
    }
`;