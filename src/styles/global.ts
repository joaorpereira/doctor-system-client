import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./variables";

type SectionTitleProps = {
  fontsize?: string;
};

type ColorProps = {
  color?: string;
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

export const Paragraph = styled.p<ColorProps>`
  color: ${({ color }) => (color ? color : `${colors.text}`)};
  text-transform: capitalize;
`;

export const Active = styled.div<ColorProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) =>
    color === "ATIVO" ? "#87b7ff30" : "#D3D3D330"};
  border-radius: 20px;
  padding: 2px;
  width: 70px;
  border: 1px solid
    ${({ color }) => (color === "ATIVO" ? "#87b7ff" : "#D3D3D3")};
  color: ${({ color }) => (color === "ATIVO" ? "#87b7ff" : "#D3D3D3")};
  font-weight: bold;
`;

export const reactSelectedStyle = {
  border: `1px solid ${colors.primary}`,
  height: "40px !important",
  minHeight: "40px !important",
  boxShadow: "none",
  "&:hover": {
    border: `1px solid ${colors.primary} !important`,
  },
  fontSize: "0.8rem",
  fontFamily: "Lato !important",
  fontWeight: 500,
  color: `${colors.text}`,
};
