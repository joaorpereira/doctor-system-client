import { createGlobalStyle } from "styled-components";
import { colors } from "./variables";

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
