import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./variables";

type SectionTitleProps = {
  fontsize?: string;
};

type ColorProps = {
  color?: string;
};

type BoxProps = {
  width?: string;
  flexBasis?: string;
};

type RowProps = {
  margin?: string;
  width?: string;
};

export default createGlobalStyle`
  html {
    background-color: ${colors.backgroundcolor};
    font-size: 14px;

  }
  * {
    margin: 0;
    box-sizing: border-box;
    outline: 0;
  }
  body{
    font-family: 'Lato', sans-serif;
    overflow-x: hidden;

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
  textarea{
    font-family: 'Lato', sans-serif;
  }
`;

export const SectionTitle = styled.h1<SectionTitleProps>`
  font-family: "Poppins", sans-serif;
  font-size: ${({ fontsize }) => (fontsize ? fontsize : "2.1rem")};
  font-weight: 900;
  color: ${colors.text};

  @media only screen and (min-width: 1360px) {
    font-size: ${({ fontsize }) => (fontsize ? fontsize : "2.4rem")};
  }
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

export const reactSelectedStyleSigupPage = {
  border: `1px solid ${colors.text}`,
  height: "45px !important",
  minHeight: "45px !important",
  boxShadow: "none",
  "&:hover": {
    border: `1px solid ${colors.text} !important`,
  },
  fontSize: "0.8rem",
  fontFamily: "Lato !important",
  fontWeight: 500,
  color: `${colors.text}`,
};

export const GlobalButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 400px;
  padding: 0px 0px 30px 0px;
`;

export const Box = styled.div<BoxProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ width }) => width && width};
  flex-basis: ${({ flexBasis }) => flexBasis && flexBasis};
  display: block;

  @media only screen and (min-width: 350px) and (max-width: 800px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
`;

export const Row = styled.div<RowProps>`
  display: flex;
  width: 100%;
  margin: ${({ margin }) => (margin ? margin : "0px 0px 10px 0px")};
`;

const margins: Record<string, string> = {
  rigth: "0px 5px 0px 0px",
  left: "0px 0px 0px 5px",
  leftRigth: "0px 5px 0px 5px",
};

export const Column = styled.div<RowProps>`
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => (margin ? margins[margin] : "")};
  width: ${({ width }) => width};
  position: relative;
`;
