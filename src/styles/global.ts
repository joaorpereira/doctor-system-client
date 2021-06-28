import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./variables";

type SectionTitleProps = {
  fontsize?: string;
};

export default createGlobalStyle`
  html {
    width: 100vw;
    height: 100vh;
    background-color: ${colors.backgroundcolor};
    font-size: 16px;
  }
  * {
    margin: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body{
    font-family: 'Lato', sans-serif;
    overflow: hidden;

  }
  ul, li{
    list-style: none;
  }

  a{
    text-decoration: none ;
    color:inherit;
  }

  button{
    cursor: pointer;
  } 
`;

export const SectionTitle = styled.h1<SectionTitleProps>`
  font-family: "Poppins", sans-serif;
  font-size: ${({ fontsize }) => (fontsize ? fontsize : "2.4rem")};
  font-weight: 900;
  color: ${colors.text};
`;

export const Paragraph = styled.p`
  color: ${({ color }) => (color ? color : `${colors.text}`)};
  text-transform: capitalize;
`;
